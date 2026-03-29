"use client";
import { Moon, SunDim } from "@workspace/ui/lib";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  size?: number;
}

const ThemeToggle = ({ size }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saveTheme = localStorage.getItem("theme");
    if (saveTheme) {
      setTheme(saveTheme);
      setMounted(true);
    } else {
      setTheme("light");
    }
  }, []);

  const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };
  console.log(mounted);
  if (!mounted) return <div className="w-9.25 h-9.25">Loading</div>;

  return (
    <div onClick={changeTheme} className="">
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
