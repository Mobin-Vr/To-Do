import { supabase } from "@/app/_lib/supabase";

export async function checkDatabaseHealth() {
  try {
    const { data, error } = await supabase
      .from("health_check")
      .select("status")
      .limit(1)
      .single();

    if (error) {
      console.error("Database error:", error.message);
      return { online: false, error: error.message };
    }

    return { online: true, status: data.status };
  } catch (err) {
    console.error("Network error:", err.message);
    return { online: false, error: "Network error" };
  }
}
