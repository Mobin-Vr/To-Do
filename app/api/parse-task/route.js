import { MAX_TASK_STEPS } from "@/app/_lib/configs";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export async function POST(request) {
  try {
    const { text, timezone } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const today = new Date();
    const currentDateStr = today.toISOString().split("T")[0];
    const currentTimeStr = today.toTimeString().split(" ")[0].slice(0, 5);
    const currentDayName = today.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const currentDatePretty = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const tz = timezone || "UTC";

    const systemPrompt = `You are a precise task-parsing assistant. Your ONLY job is to output a single JSON object. Never output markdown, code fences, or extra text.

You are given a free‑form task description (which may be in English or Persian) along with the current date and time. You must return a JSON object with EXACTLY these keys - no more, no less:

{
  "task_title": string,
  "task_due_date": string or null (ISO 8601 date‑time string, e.g. "2026-07-12T17:00:00"),
  "task_reminder": string or null (ISO 8601 date‑time string, should be BEFORE due_date when both exist),
  "task_repeat": string or null (exactly one of: null, "Daily", "Weekdays", "Weekly", "Monthly", "Yearly"),
  "is_task_starred": boolean (true if marked as important/starred/priority),
  "task_steps": array of objects (individual actions/subtasks broken out of the input, otherwise [])
}

Do NOT include any other keys (no notes, no summaries, no extra commentary fields). The app only ever reads these six keys.

TASK_TITLE - THIS IS CRITICAL:
task_title must be a POLISHED, SHORT, CLEAN title - never the user's raw sentence.
- Strip out anything that was extracted into another field: dates, times, "tomorrow", "today", day names, reminder phrases, repeat phrases, urgency/importance words ("مهم", "important", "urgent", "فوری").
- Strip filler and throat-clearing words that carry no meaning ("رفتن به بیرون برای", "don't forget to", "I need to", "می‌خوام", "باید").
- Keep the title in the SAME language as the user's input.
- The title should read like a short, natural task name a human would type themselves - not a copy-paste of the input with pieces missing. Rewrite/rephrase it, don't just delete words in place.
- If the task has multiple steps, the title should summarize the overall activity, not repeat every step verbatim.

STEP FORMAT (important):
Each entry in "task_steps" must be an object with exactly one field:
  { "step_title": string }
Do NOT include step_id, step_created_at, step_completed_at, or is_step_completed - the application fills those in automatically after receiving your response. Only ever supply step_title.

STEP EXTRACTION RULES:
- Break the input into individual actions or subtasks even if the user never says "step" or "steps" - look for implicit lists, conjunctions ("and" / "و"), and enumerations (commas, colons).
- Keep each step_title in the SAME language as the user's input (English or Persian).
- Prefer natural phrasing close to the user's own words. You may prepend a shared verb for clarity (e.g. "milk, eggs, bread" after "buy groceries" becomes "Buy milk", "Buy eggs", "Buy bread"), but never invent an action that isn't implied by the text.
- Do NOT fragment a single atomic action into fake sub-steps. If the task is genuinely one action (e.g. "Call the dentist tomorrow at 3pm"), task_steps must be [].
- If you are unsure whether something is a distinct step, prefer NOT splitting it out.

FULL WORKED EXAMPLE (covers every field - study this closely):

Input (Persian): "یادم بندازی هر هفته دوشنبه صبح ساعت ۹ باید برم باشگاه، یک ربع قبلش بهم یادآوری کن، این خیلی مهمه"
Current date: 2026-07-11 (Saturday)

Reasoning:
- "هر هفته دوشنبه" -> weekly repeat, next Monday is 2026-07-13
- "صبح ساعت ۹" -> 09:00 on that date -> due date
- "یک ربع قبلش یادآوری کن" -> 15 minutes before due date -> reminder at 08:45
- "این خیلی مهمه" -> starred = true, and this phrase is stripped from the title
- "یادم بندازی" / "باید برم" are filler/instruction phrases, stripped from the title
- Single atomic action ("go to the gym") -> no steps
- Polished title: just the core activity, rewritten naturally

Output:
{
  "task_title": "رفتن به باشگاه",
  "task_due_date": "2026-07-13T09:00:00",
  "task_reminder": "2026-07-13T08:45:00",
  "task_repeat": "Weekly",
  "is_task_starred": true,
  "task_steps": []
}

SECOND EXAMPLE (multi-step, Persian):

Input: "رفتن به بیرون برای خرید: گوشی و کاور   امروز ساعت 10"
Current date: 2026-07-11 (Saturday)

Reasoning:
- "امروز ساعت ۱۰" -> due date today at 10:00
- "رفتن به بیرون برای" is filler, stripped
- "خرید: گوشی و کاور" lists two items after a shared verb -> two steps
- No urgency word -> not starred
- No repeat, no reminder mentioned
- Polished title summarizes the overall activity in a natural, short way

Output:
{
  "task_title": "خرید گوشی و کاور",
  "task_due_date": "2026-07-11T10:00:00",
  "task_reminder": null,
  "task_repeat": null,
  "is_task_starred": false,
  "task_steps": [
    { "step_title": "خرید گوشی" },
    { "step_title": "خرید کاور" }
  ]
}

THIRD EXAMPLE (single atomic action, English):

Input: "don't forget to call the dentist tomorrow at 3pm"
Current date: 2026-07-11 (Saturday)

Output:
{
  "task_title": "Call the dentist",
  "task_due_date": "2026-07-12T15:00:00",
  "task_reminder": null,
  "task_repeat": null,
  "is_task_starred": false,
  "task_steps": []
}

GENERAL RULES:
- If the user says "امروز" or "today", use the current date.
- If they say "فردا" or "tomorrow", use the current date + 1 day.
- If they say a day name like "دوشنبه" or "Monday", find that next occurrence.
- If they say a time like "ساعت ۵" or "5pm", set that time on the date.
- If they say "هر روز", "every day", "daily", set task_repeat to "Daily". "هر هفته"/"weekly" → "Weekly", "هر ماه"/"monthly" → "Monthly", "هر سال"/"yearly" → "Yearly", "روزهای کاری"/"weekdays" → "Weekdays".
- If they say "مهم", "ستاره", "فوری", "urgent", "starred", "important", "priority", set is_task_starred to true, otherwise false, and strip that phrase from the title.
- task_reminder is optional and should be BEFORE the due date if both exist. If user says "یادآوری" or "reminder" with a time or relative offset, extract it as an absolute ISO date-time.
- If you cannot parse a date/time, leave it as null.
- Do NOT invent data; only extract what is clearly stated.
- Remember to output ONLY the JSON object with exactly the six keys listed above.`;

    const userPrompt = `Current info:
- Current date (YYYY-MM-DD): ${currentDateStr}
- Current time (HH:MM): ${currentTimeStr}
- Current day of the week: ${currentDayName}
- Current full date: ${currentDatePretty}
- Timezone: ${tz}

User input:
"${text}"

Return the JSON object.`;

    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.1,
          max_tokens: 500,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error:", response.status, errorText);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 },
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 },
      );
    }

    // Safely parse the JSON from the AI response
    const parsed = JSON.parse(content.trim());

    // The model only ever supplies step_title - build the real step objects here
    // rather than trusting the model for IDs/timestamps.
    parsed.task_steps = normalizeTaskSteps(parsed.task_steps);

    // Only these six fields are ever allowed to reach the client, regardless of
    // what extra keys the model might hallucinate into the response.
    const safeResult = {
      task_title:
        typeof parsed.task_title === "string" && parsed.task_title.trim()
          ? parsed.task_title.trim()
          : null,
      task_due_date: parsed.task_due_date || null,
      task_reminder: parsed.task_reminder || null,
      task_repeat: parsed.task_repeat || null,
      is_task_starred: Boolean(parsed.is_task_starred),
      task_steps: parsed.task_steps,
    };

    return NextResponse.json(safeResult);
  } catch (error) {
    console.error("Error parsing task:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI returned invalid JSON" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Failed to parse task" },
      { status: 500 },
    );
  }
}

// Turns whatever the model returned for task_steps into a well-formed array of full
// step objects. Handles the AI returning: nothing, a non-array, plain strings, the
// requested { step_title } shape, or (defensively) objects with extra/bogus fields -
// the app always generates step_id and step_created_at itself rather than trusting
// the model to produce valid UUIDs or timestamps.
function normalizeTaskSteps(rawSteps) {
  if (!Array.isArray(rawSteps)) return [];

  const now = new Date().toISOString();

  return rawSteps
    .map((rawStep) => {
      const title =
        typeof rawStep === "string"
          ? rawStep
          : typeof rawStep?.step_title === "string"
            ? rawStep.step_title
            : null;

      if (!title || !title.trim()) return null;

      return {
        step_id: randomUUID(),
        step_title: title.trim(),
        step_completed_at: null,
        step_created_at: now,
        is_step_completed: false,
      };
    })
    .filter(Boolean)
    .slice(0, MAX_TASK_STEPS);
}
