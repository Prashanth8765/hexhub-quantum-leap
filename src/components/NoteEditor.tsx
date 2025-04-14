
import { useState } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface NoteEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const NoteEditor = ({ content, onChange }: NoteEditorProps) => {
  // In a real application, we would implement a rich text editor
  // For this demo, we'll use a simple textarea with style buttons
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-2 flex items-center space-x-1 border-b">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Underline className="h-4 w-4" />
        </Button>
        <span className="w-px h-6 bg-border mx-1"></span>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignRight className="h-4 w-4" />
        </Button>
        <span className="w-px h-6 bg-border mx-1"></span>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Type className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[300px] border-0 focus-visible:ring-0 resize-none p-4"
        placeholder="Start typing your note here..."
      />
    </div>
  );
};

export default NoteEditor;
