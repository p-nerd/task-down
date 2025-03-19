import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const useTheme = create<{
    theme: "light" | "dark";
    toggleTheme: () => void;
}>()(
    persist(
        (set) => ({
            theme: "light",
            toggleTheme: () =>
                set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
        }),
        {
            name: "theme-storage",
        },
    ),
);

export const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <Button
            variant="secondary"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 rounded-full"
        >
            {theme === "light" ? (
                <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};
