
import { useState } from "react";
import { ArrowLeft, Send, Download, Monitor, Smartphone, Tablet, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { generateWebCode } from "@/services/webGenerationService";
import CodeBlock from "@/components/CodeBlock";
import CodeEditor from "@/components/CodeEditor";
import PreviewWindow from "@/components/PreviewWindow";
import ResponsiveToggle from "@/components/ResponsiveToggle";

interface DevelopWebSectionProps {
  onBack: () => void;
}

interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

type DeviceType = "desktop" | "tablet" | "mobile";

const DevelopWebSection = ({ onBack }: DevelopWebSectionProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [editedCode, setEditedCode] = useState<GeneratedCode | null>(null);
  const [activeTab, setActiveTab] = useState("input");
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [copied, setCopied] = useState<{ html: boolean; css: boolean; js: boolean }>({
    html: false,
    css: false,
    js: false,
  });

  const displayCode = editedCode || generatedCode;

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a description",
        description: "Describe the website or component you want to create",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const code = await generateWebCode(prompt);
      setGeneratedCode(code);
      setEditedCode(code);
      setActiveTab("preview");
      toast({
        title: "Code generated successfully",
        description: "Your web code is ready to preview",
      });
    } catch (error) {
      toast({
        title: "Error generating code",
        description: "Please try again with a different prompt",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCodeChange = (type: keyof GeneratedCode, value: string) => {
    if (editedCode) {
      setEditedCode({
        ...editedCode,
        [type]: value,
      });
    }
  };

  const handleCopyCode = (type: keyof GeneratedCode) => {
    if (displayCode) {
      navigator.clipboard.writeText(displayCode[type]);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
      toast({
        title: `${type.toUpperCase()} copied to clipboard`,
        description: "You can now paste it in your project",
      });
    }
  };

  const handleDownloadZip = async () => {
    if (!displayCode) return;

    try {
      // Create a simple HTML file with the code
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
${displayCode.css}
  </style>
</head>
<body>
${displayCode.html}
<script>
${displayCode.js}
</script>
</body>
</html>`;

      // Create a Blob with the HTML content
      const blob = new Blob([htmlContent], { type: "text/html" });
      
      // Create a download link and trigger it
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-website.html";
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
      
      toast({
        title: "Downloaded successfully",
        description: "Your website has been downloaded as HTML",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your website",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold">DevelopWeb</h1>
        </div>
        {displayCode && (
          <div className="flex items-center space-x-2">
            <ResponsiveToggle 
              deviceType={deviceType} 
              onChange={setDeviceType} 
            />
            <Button 
              variant="outline" 
              onClick={handleDownloadZip}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="code" disabled={!displayCode}>Code</TabsTrigger>
          <TabsTrigger value="preview" disabled={!displayCode}>Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="space-y-6">
          <Card className="p-6">
            <div className="grid gap-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Describe your website or component</h2>
                <Textarea
                  placeholder="E.g., Create a landing page for a coffee shop with a hero section, about us, menu, and contact form"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
              
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !prompt.trim()}
                className="w-full sm:w-auto ml-auto"
              >
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Generate Website
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">About DevelopWeb</h2>
            <p className="mb-4">
              DevelopWeb is an AI-powered web development tool that transforms your text descriptions into 
              working websites and components, complete with HTML, CSS, and JavaScript.
            </p>
            <h3 className="text-lg font-medium mb-2">Features:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Generate complete website code from natural language descriptions</li>
              <li>Preview your website in real-time</li>
              <li>Test responsiveness with device preview options</li>
              <li>Edit the generated code directly</li>
              <li>Download the complete website as an HTML file</li>
              <li>Copy individual code sections for use in other projects</li>
            </ul>
            <p>
              Simply describe what you want to build, and let DevelopWeb generate 
              the code for you.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="code">
          {displayCode && (
            <div className="grid gap-6">
              <Card className="overflow-hidden">
                <div className="bg-muted p-4 flex justify-between items-center">
                  <h3 className="font-medium">HTML</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyCode("html")}
                  >
                    {copied.html ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy HTML
                  </Button>
                </div>
                <CodeEditor 
                  code={displayCode.html} 
                  language="html"
                  onChange={(value) => handleCodeChange("html", value)} 
                />
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-muted p-4 flex justify-between items-center">
                  <h3 className="font-medium">CSS</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyCode("css")}
                  >
                    {copied.css ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy CSS
                  </Button>
                </div>
                <CodeEditor 
                  code={displayCode.css} 
                  language="css"
                  onChange={(value) => handleCodeChange("css", value)} 
                />
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-muted p-4 flex justify-between items-center">
                  <h3 className="font-medium">JavaScript</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyCode("js")}
                  >
                    {copied.js ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy JavaScript
                  </Button>
                </div>
                <CodeEditor 
                  code={displayCode.js} 
                  language="javascript"
                  onChange={(value) => handleCodeChange("js", value)} 
                />
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="preview">
          {displayCode && (
            <Card className="overflow-hidden border border-border">
              <PreviewWindow 
                html={displayCode.html}
                css={displayCode.css}
                js={displayCode.js}
                deviceType={deviceType}
              />
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DevelopWebSection;
