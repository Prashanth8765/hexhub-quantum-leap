
import { useState } from "react";
import { ArrowLeft, FolderPlus, FilePlus, Lock, Save, Share2, FileDown, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import NoteEditor from "@/components/NoteEditor";
import FolderItem from "@/components/FolderItem";

interface NotesSectionProps {
  onBack: () => void;
}

export interface NoteFile {
  id: string;
  name: string;
  content: string;
  isLocked: boolean;
  parentId: string | null;
}

export interface NoteFolder {
  id: string;
  name: string;
  isLocked: boolean;
  parentId: string | null;
}

const NotesSection = ({ onBack }: NotesSectionProps) => {
  const [folders, setFolders] = useState<NoteFolder[]>([
    { id: "folder-1", name: "Personal", isLocked: false, parentId: null },
    { id: "folder-2", name: "Work", isLocked: true, parentId: null },
  ]);
  
  const [files, setFiles] = useState<NoteFile[]>([
    { id: "file-1", name: "Welcome Note", content: "Welcome to HexHub Notes!", isLocked: false, parentId: null },
    { id: "file-2", name: "Secret Note", content: "This is a private note.", isLocked: true, parentId: null },
    { id: "file-3", name: "Meeting Notes", content: "Discuss project timeline", isLocked: false, parentId: "folder-1" },
  ]);
  
  const [activeFile, setActiveFile] = useState<NoteFile | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [showNewFileInput, setShowNewFileInput] = useState(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: NoteFolder = {
        id: `folder-${Date.now()}`,
        name: newFolderName,
        isLocked: false,
        parentId: null
      };
      setFolders([...folders, newFolder]);
      setNewFolderName("");
      setShowNewFolderInput(false);
    }
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const newFile: NoteFile = {
        id: `file-${Date.now()}`,
        name: newFileName,
        content: "",
        isLocked: false,
        parentId: null
      };
      setFiles([...files, newFile]);
      setNewFileName("");
      setShowNewFileInput(false);
    }
  };

  const handleFileClick = (file: NoteFile) => {
    if (file.isLocked) {
      // In a real app, we would prompt for password here
      alert("This file is locked. Please enter password to view.");
      // For demo purposes, we'll just unlock it
      const updatedFile = { ...file, isLocked: false };
      setFiles(files.map(f => f.id === file.id ? updatedFile : f));
      setActiveFile(updatedFile);
    } else {
      setActiveFile(file);
    }
  };

  const handleContentChange = (content: string) => {
    if (activeFile) {
      const updatedFile = { ...activeFile, content };
      setActiveFile(updatedFile);
      setFiles(files.map(f => f.id === activeFile.id ? updatedFile : f));
    }
  };

  const handleToggleLock = (file: NoteFile) => {
    // In a real app, we would prompt for password here for locking/unlocking
    const updatedFiles = files.map(f => {
      if (f.id === file.id) {
        return { ...f, isLocked: !f.isLocked };
      }
      return f;
    });
    setFiles(updatedFiles);
    
    // If we're locking the active file, close it
    if (activeFile && activeFile.id === file.id && !file.isLocked) {
      setActiveFile(null);
    }
  };

  const rootFiles = files.filter(file => file.parentId === null);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">Notes</h1>
        <div className="ml-auto flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowNewFolderInput(!showNewFolderInput)}
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowNewFileInput(!showNewFileInput)}
          >
            <FilePlus className="h-4 w-4 mr-2" />
            New Note
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showNewFolderInput && (
        <div className="flex mb-4">
          <Input 
            value={newFolderName} 
            onChange={(e) => setNewFolderName(e.target.value)} 
            placeholder="Enter folder name" 
            className="mr-2"
          />
          <Button onClick={handleCreateFolder}>Create</Button>
          <Button variant="ghost" onClick={() => setShowNewFolderInput(false)}>Cancel</Button>
        </div>
      )}
      
      {showNewFileInput && (
        <div className="flex mb-4">
          <Input 
            value={newFileName} 
            onChange={(e) => setNewFileName(e.target.value)} 
            placeholder="Enter note name" 
            className="mr-2"
          />
          <Button onClick={handleCreateFile}>Create</Button>
          <Button variant="ghost" onClick={() => setShowNewFileInput(false)}>Cancel</Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Folders & Notes</h2>
          
          <div className="space-y-2">
            {folders.map(folder => (
              <FolderItem 
                key={folder.id} 
                folder={folder} 
                files={files.filter(file => file.parentId === folder.id)} 
                onFileClick={handleFileClick}
                onToggleLock={handleToggleLock}
              />
            ))}
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Files</h3>
              <ul className="space-y-1">
                {rootFiles.map(file => (
                  <li key={file.id} className="flex items-center justify-between py-1 px-2 hover:bg-accent/50 rounded cursor-pointer" onClick={() => handleFileClick(file)}>
                    <span className="truncate">
                      {file.isLocked ? "🔒 " : ""}{file.name}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLock(file);
                      }}
                    >
                      <Lock className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 border rounded-lg p-4">
          {activeFile ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{activeFile.name}</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileDown className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <NoteEditor content={activeFile.content} onChange={handleContentChange} />
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Select a note or create a new one to start editing
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
