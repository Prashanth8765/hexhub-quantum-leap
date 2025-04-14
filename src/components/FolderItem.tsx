
import { useState } from "react";
import { ChevronRight, ChevronDown, Lock, Folder, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NoteFile, NoteFolder } from "@/pages/NotesSection";

interface FolderItemProps {
  folder: NoteFolder;
  files: NoteFile[];
  onFileClick: (file: NoteFile) => void;
  onToggleLock: (file: NoteFile) => void;
}

const FolderItem = ({ folder, files, onFileClick, onToggleLock }: FolderItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-md overflow-hidden"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-accent/50">
          <div className="flex items-center">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 mr-2 shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2 shrink-0" />
            )}
            <Folder className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate">{folder.isLocked ? "🔒 " : ""}{folder.name}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              // In a real app, we would prompt for password here
              alert(folder.isLocked ? "Folder unlocked" : "Folder locked");
              folder.isLocked = !folder.isLocked;
            }}
          >
            <Lock className="h-4 w-4" />
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-6 pr-2 py-1 space-y-1">
          {files.length > 0 ? (
            files.map(file => (
              <div 
                key={file.id}
                className="flex items-center justify-between py-1 px-2 hover:bg-accent/50 rounded cursor-pointer"
                onClick={() => onFileClick(file)}
              >
                <div className="flex items-center">
                  <File className="h-4 w-4 mr-2 shrink-0" />
                  <span className="truncate">{file.isLocked ? "🔒 " : ""}{file.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLock(file);
                  }}
                >
                  <Lock className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground py-1 px-2">
              No files in this folder
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FolderItem;
