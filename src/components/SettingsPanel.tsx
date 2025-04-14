
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ModeToggle } from "./ModeToggle";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");
  const [passwordEnabled, setPasswordEnabled] = useState(false);

  const saveSettings = () => {
    // In a real app, we'd save these settings to local storage or a database
    localStorage.setItem("hexhub-user-name", name);
    localStorage.setItem("hexhub-user-email", email);
    localStorage.setItem("hexhub-password", password);
    localStorage.setItem("hexhub-password-enabled", String(passwordEnabled));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your HexHub experience and manage your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">User Information</h3>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">App Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password-enabled">Enable password protection</Label>
              <Switch 
                id="password-enabled" 
                checked={passwordEnabled}
                onCheckedChange={setPasswordEnabled}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Theme</h3>
            <div className="flex items-center justify-between">
              <Label>Dark Mode</Label>
              <ModeToggle />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">About</h3>
            <p className="text-sm text-muted-foreground">
              HexHub v1.0.0
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={saveSettings}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPanel;
