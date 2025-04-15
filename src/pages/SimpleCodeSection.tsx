
import { useState } from "react";
import { ArrowLeft, Copy, Code, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateCode } from "@/services/codeGenerationService";
import CodeBlock from "@/components/CodeBlock";
import LanguageSelector from "@/components/LanguageSelector";
import { toast } from "@/hooks/use-toast";

interface SimpleCodeSectionProps {
  onBack: () => void;
}

const SimpleCodeSection = ({ onBack }: SimpleCodeSectionProps) => {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<Array<{ code: string; description: string }>>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what code you want to generate",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const code = await generateCode(prompt, language);
      setGeneratedCode(code);
      toast({
        title: "Code generated successfully",
        description: `Generated ${code.length} code snippets`,
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

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to clipboard",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">SimpleCode</h1>
      </div>
      
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="generate">Generate Code</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-6">
          <Card className="p-6">
            <div className="grid gap-6">
              <div>
                <Label htmlFor="prompt">What code would you like to generate?</Label>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    id="prompt"
                    placeholder="E.g., Create a function to sort an array of objects by a property"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1"
                  />
                  <LanguageSelector 
                    selected={language} 
                    onSelect={setLanguage}
                  />
                </div>
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
                    Generate Code
                  </>
                )}
              </Button>
            </div>
          </Card>

          {generatedCode.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Generated Code</h2>
              {generatedCode.map((snippet, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="bg-muted p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{snippet.description}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(snippet.code)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  <CodeBlock code={snippet.code} language={language} />
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="about">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">About SimpleCode</h2>
            <p className="mb-4">
              SimpleCode is an AI-powered code generation tool that transforms natural language into 
              code snippets across multiple programming languages.
            </p>
            <h3 className="text-lg font-medium mb-2">Features:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Generate code from plain text descriptions</li>
              <li>Support for multiple programming languages (JavaScript, Python, Java, C++)</li>
              <li>Syntax highlighting for better readability</li>
              <li>Copy code with a single click</li>
              <li>Generate multiple related methods in a single request</li>
            </ul>
            <p>
              Simply describe what you want to build, select your preferred programming language, 
              and let SimpleCode generate the code for you.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimpleCodeSection;
