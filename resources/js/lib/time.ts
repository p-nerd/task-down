import dayjs from "dayjs";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const time = {
    date: {
        /**
         * Returns the current date and time in YYYY-MM-DD HH:mm:ss format
         */
        now: (): string => {
            return dayjs().format("YYYY-MM-DD HH:mm:ss");
        },

        /**
         * Returns tomorrow's date at the current time in YYYY-MM-DD HH:mm:ss format
         */
        tomorrow: (): string => {
            return dayjs().add(1, "day").format("YYYY-MM-DD HH:mm:ss");
        },

        /**
         * Converts date string to Unix timestamp in milliseconds
         */
        value: (date: string): number => {
            return dayjs(date).valueOf();
        },
    },

    format: {
        /*
         * Original formatted (default, e.g., 2024-01-15 00:00:00)
         */
        date: (date: string, template: string = "YYYY-MM-DD HH:mm:ss") => {
            const formatted = dayjs(date).format(template);
            if (formatted === "Invalid Date") {
                throw new Error("Invalid date provided");
            }
            return formatted;
        },

        /*
         * Only date formatted (default, e.g., 2024-01-15)
         */
        odate: (date: string) => {
            return time.format.date(date, "YYYY-MM-DD");
        },

        /*
         * Time only (e.g., "14:30" or "2:30 PM")
         */
        time: (date: string, is24Hour: boolean = false) => {
            return time.format.date(date, is24Hour ? "HH:mm" : "h:mm A");
        },

        /*
         * Short date (e.g., "Jan 15, 2024")
         */
        short: (date: string) => {
            return time.format.date(date, "MMM D, YYYY");
        },

        /*
         * Short date with time (e.g., "Jan 15, 2024 @ 2:30 PM")
         */
        shortt: (date: string) => {
            const d = time.format.short(date);
            const t = time.format.time(date);
            return `${d} ${t}`;
        },

        relative: (date: string): string | null => {
            switch (true) {
                case time.is.yesterday(date):
                    return "Yesterday";
                case time.is.today(date):
                    return "Today";
                case time.is.tommorrow(date):
                    return "Tommorrow";
                default:
                    return null;
            }
        },
    },

    is: {
        /**
         * Checks if the given date is overdue (before the start of today)
         */
        overdue: (date: string): boolean => {
            const now = dayjs();
            const startOfToday = now.startOf("day");
            return dayjs(date).isBefore(startOfToday);
        },

        /**
         * Checks if the given date falls within today (between start and end of current day)
         */
        today: (date: string): boolean => {
            const now = dayjs();
            const dateObject = dayjs(date);
            const startOfToday = now.startOf("day");
            const endOfToday = now.endOf("day");
            return dateObject.isSameOrAfter(startOfToday) && dateObject.isSameOrBefore(endOfToday);
        },

        /**
         * Checks if the given date is upcoming (after the end of today)
         */
        upcoming: (date: string): boolean => {
            const now = dayjs();
            const endOfToday = now.endOf("day");
            return dayjs(date).isAfter(endOfToday);
        },

        /**
         * Checks if the given date falls within yesterday (between start and end of yesterday's day)
         */
        yesterday: (date: string): boolean => {
            const now = dayjs();
            const dateObject = dayjs(date);
            const startOfYesterday = now.subtract(1, "day").startOf("day");
            const endOfYesterday = now.subtract(1, "day").endOf("day");
            return (
                dateObject.isSameOrAfter(startOfYesterday) &&
                dateObject.isSameOrBefore(endOfYesterday)
            );
        },

        /**
         * Checks if the given date falls within tommorrow (between start and end of tomorrow's day)
         */
        tommorrow: (date: string): boolean => {
            const now = dayjs();
            const dateObject = dayjs(date);
            const startOfTomorrow = now.add(1, "day").startOf("day");
            const endOfTomorrow = now.add(1, "day").endOf("day");
            return (
                dateObject.isSameOrAfter(startOfTomorrow) &&
                dateObject.isSameOrBefore(endOfTomorrow)
            );
        },
    },
};
