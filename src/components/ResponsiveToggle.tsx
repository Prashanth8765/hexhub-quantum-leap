
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ResponsiveToggleProps {
  deviceType: "desktop" | "tablet" | "mobile";
  onChange: (deviceType: "desktop" | "tablet" | "mobile") => void;
}

const ResponsiveToggle = ({ deviceType, onChange }: ResponsiveToggleProps) => {
  return (
    <ToggleGroup type="single" value={deviceType} onValueChange={(value) => {
      if (value) onChange(value as "desktop" | "tablet" | "mobile");
    }}>
      <ToggleGroupItem value="desktop" className="px-3">
        <Monitor className="h-4 w-4" />
        <span className="sr-only">Desktop</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="tablet" className="px-3">
        <Tablet className="h-4 w-4" />
        <span className="sr-only">Tablet</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="mobile" className="px-3">
        <Smartphone className="h-4 w-4" />
        <span className="sr-only">Mobile</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ResponsiveToggle;
