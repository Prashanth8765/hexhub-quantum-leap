
import { useState, useRef, useEffect } from "react";
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Type, ChevronDown, X, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface NoteEditorProps {
  content: string;
  onChange: (content: string) => void;
}

// Font sizes for the dropdown
const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];

// Font colors for the dropdown
const fontColors = [
  { name: "Black", value: "#000000" },
  { name: "Gray", value: "#6B7280" },
  { name: "Red", value: "#EF4444" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Green", value: "#10B981" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
];

const NoteEditor = ({ content, onChange }: NoteEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [currentFontSize, setCurrentFontSize] = useState("16px");
  const [currentColor, setCurrentColor] = useState("#000000");
  
  // Function to handle text formatting commands
  const handleFormatText = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      // Get the content after formatting
      const newContent = editorRef.current.innerHTML;
      onChange(newContent);
    }
  };

  // Function to handle font size change
  const handleFontSizeChange = (size: string) => {
    setCurrentFontSize(size);
    handleFormatText("fontSize", size);
  };

  // Function to handle font color change
  const handleFontColorChange = (color: string) => {
    setCurrentColor(color);
    handleFormatText("foreColor", color);
  };

  // Function to export note as PDF
  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "This functionality would generate and download a PDF of your note.",
    });
  };

  // Function to save note
  const handleSave = () => {
    toast({
      title: "Saved",
      description: "Your note has been saved successfully.",
    });
  };

  // Function to share note
  const handleShare = () => {
    toast({
      title: "Share Note",
      description: "This functionality would allow you to share your note via various channels.",
    });
  };

  // Sync the initial content with the div
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-2 flex flex-wrap items-center gap-1 border-b">
        {/* Text formatting buttons */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleFormatText("bold")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleFormatText("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleFormatText("underline")}
        >
          <Underline className="h-4 w-4" />
        </Button>
        
        <span className="w-px h-6 bg-border mx-1"></span>
        
        {/* Text alignment buttons */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleFormatText("justifyLeft")}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleFormatText("justifyCenter")}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleFormatText("justifyRight")}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        
        <span className="w-px h-6 bg-border mx-1"></span>
        
        {/* List buttons */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleFormatText("insertUnorderedList")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => handleFormatText("insertOrderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        
        {/* Font size dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 flex items-center gap-1">
              <Type className="h-4 w-4" />
              <span className="text-xs">{currentFontSize}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {fontSizes.map((size) => (
              <DropdownMenuItem 
                key={size} 
                onClick={() => handleFontSizeChange(size)}
                className="cursor-pointer"
              >
                <span style={{ fontSize: size }}>{size}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Font color dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 flex items-center gap-1">
              <div 
                className="h-4 w-4 rounded-full border" 
                style={{ backgroundColor: currentColor }}
              ></div>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {fontColors.map((color) => (
              <DropdownMenuItem 
                key={color.value} 
                onClick={() => handleFontColorChange(color.value)}
                className="cursor-pointer flex items-center gap-2"
              >
                <div 
                  className="h-4 w-4 rounded-full" 
                  style={{ backgroundColor: color.value }}
                ></div>
                <span>{color.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="ml-auto flex gap-1">
          <Button variant="ghost" size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            Share
          </Button>
          <Button variant="ghost" size="sm" onClick={handleExportPDF}>
            Export
          </Button>
        </div>
      </div>
      
      <div 
        ref={editorRef}
        className="min-h-[300px] p-4 outline-none overflow-auto"
        contentEditable
        onInput={() => {
          if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
          }
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default NoteEditor;
