"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/app/_lib/utils";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "relative flex items-center justify-center pt-1",
        caption_label: "relative z-0 text-sm font-medium",
        nav: "pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between",

        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground w-8 rounded-md text-[0.8rem] font-normal text-blue-500",
        week: "mt-2 flex w-full text-gray-700",

        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),

        day_button:
          "inline-flex h-8 w-8 items-center justify-center rounded-md p-0 font-normal aria-selected:opacity-100",

        range_start: "day-range-start",
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        PreviousMonthButton: ({ className, ...buttonProps }) => (
          <button
            {...buttonProps}
            type="button"
            className={cn(
              "pointer-events-auto absolute left-0 z-30 ml-4 mt-20 inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent p-0 transition-colors",
              "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "[&_svg]:opacity-50 hover:[&_svg]:opacity-100 focus-visible:[&_svg]:opacity-100",
              className,
            )}
          >
            <ChevronLeft className="pointer-events-none h-4 w-4 shrink-0 transition-opacity" />
          </button>
        ),

        NextMonthButton: ({ className, ...buttonProps }) => (
          <button
            {...buttonProps}
            type="button"
            className={cn(
              "pointer-events-auto absolute right-0 z-30 mr-4 mt-20 inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent p-0 transition-colors",
              "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "[&_svg]:opacity-50 hover:[&_svg]:opacity-100 focus-visible:[&_svg]:opacity-100",
              className,
            )}
          >
            <ChevronRight className="pointer-events-none h-4 w-4 shrink-0 transition-opacity" />
          </button>
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
