
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Clock, HardDrive, BookOpen } from "lucide-react";
import { Algorithm } from "@/data/algorithmsData";
import CodeBlock from "@/components/CodeBlock";
import { toast } from "sonner";

interface AlgorithmDetailProps {
  algorithm: Algorithm;
  onBack: () => void;
}

const AlgorithmDetail = ({ algorithm, onBack }: AlgorithmDetailProps) => {
  const [activeTab, setActiveTab] = useState("java");

  const handleCopyCode = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`${language} code copied to clipboard!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Algorithms
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{algorithm.name}</CardTitle>
              <CardDescription className="text-base mt-2">
                {algorithm.description}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="capitalize">
              {algorithm.category.replace('_', ' ')}
            </Badge>
          </div>
          
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Time: {algorithm.timeComplexity}</span>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Space: {algorithm.spaceComplexity}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="java">Java</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="theory">Theory</TabsTrigger>
        </TabsList>

        <TabsContent value="java" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Java Implementation</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCode(algorithm.javaCode, "Java")}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <CodeBlock code={algorithm.javaCode} language="java" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="python" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Python Implementation</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCode(algorithm.pythonCode, "Python")}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <CodeBlock code={algorithm.pythonCode} language="python" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Algorithm Explanation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {algorithm.explanation}
              </p>
              
              <div>
                <h4 className="font-semibold mb-3">Key Points:</h4>
                <ul className="space-y-2">
                  {algorithm.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlgorithmDetail;
