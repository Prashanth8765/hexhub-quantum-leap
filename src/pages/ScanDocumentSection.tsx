
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanDocumentSectionProps {
  onBack: () => void;
}

const ScanDocumentSection = ({ onBack }: ScanDocumentSectionProps) => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">Scan Document</h1>
      </div>
      
      <div className="rounded-lg border border-border p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground">
          Scan, manage, and edit physical documents—all offline. This section is under development.
        </p>
      </div>
    </div>
  );
};

export default ScanDocumentSection;
