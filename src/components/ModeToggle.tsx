
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("hexhub-theme", newTheme);
  };
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("hexhub-theme") as "light" | "dark" | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className={`h-5 w-5 ${theme === 'light' ? 'block' : 'hidden'}`} />
      <Moon className={`h-5 w-5 ${theme === 'dark' ? 'block' : 'hidden'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
