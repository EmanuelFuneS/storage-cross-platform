"use client";
import { Moon, SunDim } from "@workspace/ui/lib";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  size?: number;
}

const ThemeToggle = ({ size }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9.25 h-9.25" />;

  return (
    <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <Moon
          size={size || 25}
          className="hover:scale-115 transform transition-transform duration-300"
        />
      ) : (
        <SunDim
          size={size || 25}
          className="hover:scale-115 transform transition-transform duration-300"
        />
      )}
    </div>
  );
};

export default ThemeToggle;
