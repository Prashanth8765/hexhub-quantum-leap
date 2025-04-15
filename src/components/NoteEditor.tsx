
import { useState, useRef, useEffect } from "react";
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Type, ChevronDown, X, FileText, Heading1, Heading2, Heading3,
  Link as LinkIcon, Image, MoreHorizontal, Code, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

// Heading styles
const headingStyles = [
  { name: "Heading 1", command: "formatBlock", value: "h1", icon: <Heading1 className="h-4 w-4 mr-2" /> },
  { name: "Heading 2", command: "formatBlock", value: "h2", icon: <Heading2 className="h-4 w-4 mr-2" /> },
  { name: "Heading 3", command: "formatBlock", value: "h3", icon: <Heading3 className="h-4 w-4 mr-2" /> },
  { name: "Paragraph", command: "formatBlock", value: "p", icon: <FileText className="h-4 w-4 mr-2" /> },
];

// Background colors for highlighting
const backgroundColors = [
  { name: "None", value: "transparent" },
  { name: "Yellow", value: "#FEF3C7" },
  { name: "Green", value: "#D1FAE5" },
  { name: "Blue", value: "#DBEAFE" },
  { name: "Purple", value: "#EDE9FE" },
  { name: "Pink", value: "#FCE7F3" },
];

const NoteEditor = ({ content, onChange }: NoteEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [currentFontSize, setCurrentFontSize] = useState("16px");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentBgColor, setCurrentBgColor] = useState("transparent");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  
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
    handleFormatText("fontSize", (parseInt(size) / 16).toString());
  };

  // Function to handle font color change
  const handleFontColorChange = (color: string) => {
    setCurrentColor(color);
    handleFormatText("foreColor", color);
  };

  // Function to handle background color change
  const handleBgColorChange = (color: string) => {
    setCurrentBgColor(color);
    handleFormatText("hiliteColor", color);
  };

  // Function to insert a link
  const handleInsertLink = () => {
    if (linkUrl.trim()) {
      document.execCommand('createLink', false, linkUrl);
      setShowLinkDialog(false);
      setLinkUrl("");
      setLinkText("");
      
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  // Function to export note as PDF
  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "This functionality would generate and download a PDF of your note.",
    });
    
    // In a real implementation, we would use a library like jsPDF or html2pdf
    if (typeof window !== "undefined") {
      window.print();
    }
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
    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: 'HexHub Note',
        text: editorRef.current?.innerText || 'No content to share',
      })
      .then(() => {
        toast({
          title: "Shared",
          description: "Your note has been shared successfully.",
        });
      })
      .catch((error) => {
        toast({
          title: "Share failed",
          description: "There was an error sharing your note.",
          variant: "destructive",
        });
      });
    } else {
      toast({
        title: "Share Note",
        description: "This functionality would allow you to share your note via various channels.",
      });
    }
  };

  // Function to create a heading
  const handleHeadingChange = (value: string) => {
    handleFormatText("formatBlock", value);
  };

  // Sync the initial content with the div
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-card">
      <div className="bg-muted p-2 flex flex-wrap items-center gap-1 border-b">
        {/* Text formatting buttons */}
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("bold")}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("italic")}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("underline")}
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
        
        <span className="w-px h-6 bg-border mx-1"></span>
        
        {/* Headings dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Heading</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {headingStyles.map((style) => (
              <DropdownMenuItem 
                key={style.value} 
                onClick={() => handleHeadingChange(style.value)}
                className="cursor-pointer flex items-center"
              >
                {style.icon}
                <span>{style.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="w-px h-6 bg-border mx-1"></span>
        
        {/* Text alignment buttons */}
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("justifyLeft")}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("justifyCenter")}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("justifyRight")}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
        
        <span className="w-px h-6 bg-border mx-1"></span>
        
        {/* List buttons */}
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("insertUnorderedList")}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("insertOrderedList")}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
        
        <span className="w-px h-6 bg-border mx-1 hidden sm:block"></span>
        
        {/* Insert buttons - visible on larger screens */}
        <div className="hidden sm:flex items-center space-x-1">
          <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                title="Insert Link"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Insert Link</DialogTitle>
                <DialogDescription>
                  Add a hyperlink to your note
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="link-text"
                    placeholder="Link text (optional)"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="col-span-4"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="link-url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="col-span-4"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={() => setShowLinkDialog(false)} variant="outline">
                  Cancel
                </Button>
                <Button type="button" onClick={handleInsertLink}>
                  Insert
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("insertImage", "")}
            title="Insert Image"
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("formatBlock", "blockquote")}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleFormatText("formatBlock", "pre")}
            title="Code Block"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>
        
        {/* More options dropdown for smaller screens */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="sm:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setShowLinkDialog(true)}>
              <LinkIcon className="h-4 w-4 mr-2" />
              <span>Insert Link</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFormatText("insertImage", "")}>
              <Image className="h-4 w-4 mr-2" />
              <span>Insert Image</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFormatText("formatBlock", "blockquote")}>
              <Quote className="h-4 w-4 mr-2" />
              <span>Quote</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFormatText("formatBlock", "pre")}>
              <Code className="h-4 w-4 mr-2" />
              <span>Code Block</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <span className="w-px h-6 bg-border mx-1"></span>
        
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
        
        {/* Background color dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 flex items-center gap-1 hidden sm:flex">
              <div 
                className="h-4 w-4 rounded-full border" 
                style={{ backgroundColor: currentBgColor }}
              ></div>
              <span className="text-xs">Highlight</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {backgroundColors.map((color) => (
              <DropdownMenuItem 
                key={color.value} 
                onClick={() => handleBgColorChange(color.value)}
                className="cursor-pointer flex items-center gap-2"
              >
                <div 
                  className="h-4 w-4 rounded-full border" 
                  style={{ backgroundColor: color.value }}
                ></div>
                <span>{color.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="ml-auto flex gap-1">
          <Button variant="ghost" size="sm" onClick={handleSave} className="hidden sm:flex">
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare} className="hidden sm:flex">
            Share
          </Button>
          <Button variant="ghost" size="sm" onClick={handleExportPDF} className="hidden sm:flex">
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSave}>
                Save
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF}>
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div 
        ref={editorRef}
        className="min-h-[300px] p-4 outline-none overflow-auto prose prose-sm max-w-none"
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
