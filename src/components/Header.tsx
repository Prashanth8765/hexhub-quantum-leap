
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header = ({ onSettingsClick }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/9ba793d9-7c52-414f-b854-930389686c3c.png"
            alt="HexHub Logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-hexhub-primary to-hexhub-secondary bg-clip-text text-transparent">
            HexHub
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="text-foreground"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
