
import { useState, useEffect } from "react";
import CodeBlock from "@/components/CodeBlock";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ code, language, onChange }: CodeEditorProps) => {
  const [value, setValue] = useState(code);
  const [viewMode, setViewMode] = useState<"view" | "edit">("view");

  useEffect(() => {
    setValue(code);
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full">
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "view" | "edit")} className="w-full">
        <div className="flex justify-end border-b">
          <TabsList className="bg-transparent">
            <TabsTrigger value="view" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
              View
            </TabsTrigger>
            <TabsTrigger value="edit" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
              Edit
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="view" className="p-0 mt-0">
          <CodeBlock code={value} language={language} />
        </TabsContent>
        
        <TabsContent value="edit" className="p-0 mt-0">
          <Textarea
            value={value}
            onChange={handleChange}
            className="font-mono text-sm rounded-none p-4 min-h-[300px] border-0 resize-y"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeEditor;
