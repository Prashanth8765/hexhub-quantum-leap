
import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronRight, File, Folder, Plus, Upload, Trash, Edit, Eye, Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface AimlIareSectionProps {
  onBack: () => void;
}

// Define the types for our data structure
export interface ResourceFile {
  id: string;
  name: string;
  type: "pdf" | "ppt" | "doc" | "img" | "txt" | "note";
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResourceFolder {
  id: string;
  name: string;
  files: ResourceFile[];
  folders: ResourceFolder[];
  createdAt: Date;
  updatedAt: Date;
}

// Initialize with 8 semesters as top-level folders
const initialSemesters: ResourceFolder[] = Array(8).fill(null).map((_, i) => ({
  id: `sem-${i + 1}`,
  name: `Semester ${i + 1}`,
  files: [],
  folders: [],
  createdAt: new Date(),
  updatedAt: new Date()
}));

const AimlIareSection = ({ onBack }: AimlIareSectionProps) => {
  const [semesters, setSemesters] = useState<ResourceFolder[]>(initialSemesters);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<ResourceFile | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState("");

  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  // Create a new folder
  const createFolder = (parentId: string, name: string) => {
    const newFolder: ResourceFolder = {
      id: `folder-${Date.now()}`,
      name,
      files: [],
      folders: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedSemesters = [...semesters];
    const parent = findFolderById(updatedSemesters, parentId);
    
    if (parent) {
      parent.folders.push(newFolder);
      parent.updatedAt = new Date();
      setSemesters(updatedSemesters);
      // Auto-expand the parent folder
      const newExpanded = new Set(expandedFolders);
      newExpanded.add(parentId);
      setExpandedFolders(newExpanded);
      toast.success(`Folder "${name}" created successfully`);
    }
  };

  // Helper function to find a folder by ID
  const findFolderById = (folders: ResourceFolder[], id: string): ResourceFolder | null => {
    for (const folder of folders) {
      if (folder.id === id) return folder;
      
      const found = findFolderById(folder.folders, id);
      if (found) return found;
    }
    return null;
  };

  // Upload a new file
  const uploadFile = (folderId: string, file: File) => {
    // In a real app, we would handle the file upload here
    const fileType = getFileType(file.name);
    
    const newFile: ResourceFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      type: fileType,
      content: URL.createObjectURL(file), // In a real app, this would be the file content or URL
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedSemesters = [...semesters];
    const parent = findFolderById(updatedSemesters, folderId);
    
    if (parent) {
      parent.files.push(newFile);
      parent.updatedAt = new Date();
      setSemesters(updatedSemesters);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  // Determine file type from file name
  const getFileType = (fileName: string): ResourceFile["type"] => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (ext === 'ppt' || ext === 'pptx') return 'ppt';
    if (ext === 'doc' || ext === 'docx') return 'doc';
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') return 'img';
    if (ext === 'txt') return 'txt';
    return 'note';
  };

  // View a file
  const viewFile = (file: ResourceFile) => {
    setSelectedFile(file);
    setEditContent(file.content);
    setEditMode(false);
    setViewDialogOpen(true);
  };

  // Delete a file
  const deleteFile = (folderId: string, fileId: string) => {
    const updatedSemesters = [...semesters];
    const parent = findFolderById(updatedSemesters, folderId);
    
    if (parent) {
      parent.files = parent.files.filter(f => f.id !== fileId);
      parent.updatedAt = new Date();
      setSemesters(updatedSemesters);
      toast.success("File deleted successfully");
    }
  };

  // Delete a folder
  const deleteFolder = (parentId: string, folderId: string) => {
    const updatedSemesters = [...semesters];
    const parent = findFolderById(updatedSemesters, parentId);
    
    if (parent) {
      parent.folders = parent.folders.filter(f => f.id !== folderId);
      parent.updatedAt = new Date();
      setSemesters(updatedSemesters);
      toast.success("Folder deleted successfully");
    }
  };

  // Save edited content
  const saveEditedContent = () => {
    if (!selectedFile) return;
    
    const updatedSemesters = [...semesters];
    let found = false;
    
    for (const semester of updatedSemesters) {
      for (const file of semester.files) {
        if (file.id === selectedFile.id) {
          file.content = editContent;
          file.updatedAt = new Date();
          found = true;
          break;
        }
      }
      if (found) break;
      
      // Recursively search in subfolders
      const searchInFolders = (folders: ResourceFolder[]) => {
        for (const folder of folders) {
          for (const file of folder.files) {
            if (file.id === selectedFile.id) {
              file.content = editContent;
              file.updatedAt = new Date();
              found = true;
              return true;
            }
          }
          if (searchInFolders(folder.folders)) return true;
        }
        return false;
      };
      
      if (searchInFolders(semester.folders)) break;
    }
    
    setSemesters(updatedSemesters);
    setEditMode(false);
    toast.success("Changes saved successfully");
  };

  // Render file icon based on type
  const renderFileIcon = (type: ResourceFile["type"]) => {
    switch (type) {
      case 'pdf':
        return <File className="h-4 w-4 text-red-500" />;
      case 'ppt':
        return <File className="h-4 w-4 text-orange-500" />;
      case 'doc':
        return <File className="h-4 w-4 text-blue-500" />;
      case 'img':
        return <File className="h-4 w-4 text-green-500" />;
      case 'txt':
        return <File className="h-4 w-4 text-gray-500" />;
      case 'note':
        return <File className="h-4 w-4 text-purple-500" />;
    }
  };

  // Render content based on file type
  const renderFileContent = (file: ResourceFile) => {
    switch (file.type) {
      case 'pdf':
        return (
          <div className="bg-gray-100 p-4 rounded-md text-center h-full flex flex-col items-center justify-center">
            <p>PDF Viewer would go here in a production app</p>
            <p className="text-sm text-muted-foreground mt-2">{file.name}</p>
            <Button className="mt-4" onClick={() => window.open(file.content, '_blank')}>
              Open PDF
            </Button>
          </div>
        );
      case 'img':
        return (
          <div className="text-center h-full flex flex-col items-center justify-center">
            <img 
              src={file.content} 
              alt={file.name} 
              className="max-w-full max-h-[70vh] object-contain" 
            />
            <p className="text-sm text-muted-foreground mt-2">{file.name}</p>
          </div>
        );
      case 'txt':
      case 'note':
        return editMode ? (
          <div className="h-full">
            <textarea
              className="w-full h-[60vh] p-4 border rounded-md"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
              <Button onClick={saveEditedContent}>Save Changes</Button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-md h-full">
            <p className="whitespace-pre-wrap">{file.content}</p>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-4 rounded-md text-center h-full flex flex-col items-center justify-center">
            <p>Preview not available for this file type</p>
            <p className="text-sm text-muted-foreground mt-2">{file.name}</p>
            {file.content && (
              <Button className="mt-4" onClick={() => window.open(file.content, '_blank')}>
                Open File
              </Button>
            )}
          </div>
        );
    }
  };

  // Render a folder and its contents recursively
  const renderFolder = (folder: ResourceFolder, parentId: string = "") => {
    const isExpanded = expandedFolders.has(folder.id);
    
    return (
      <div key={folder.id} className="mb-1">
        <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-md">
          <div 
            className="flex items-center flex-1 cursor-pointer" 
            onClick={() => toggleFolder(folder.id)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 mr-2 shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2 shrink-0" />
            )}
            <Folder className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate">{folder.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Only show add options for user-created folders or semester folders */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60" align="end">
                <div className="grid gap-2">
                  <h4 className="font-medium">Add to {folder.name}</h4>
                  <div className="grid gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        const name = prompt("Enter folder name");
                        if (name) createFolder(folder.id, name);
                      }}
                    >
                      <Folder className="mr-2 h-4 w-4" />
                      New Folder
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.accept = '.pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt';
                        fileInput.onchange = (e) => {
                          const files = (e.target as HTMLInputElement).files;
                          if (files && files.length > 0) {
                            uploadFile(folder.id, files[0]);
                          }
                        };
                        fileInput.click();
                      }}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload File
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Only show delete for user-created folders (not semester folders) */}
            {parentId && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ${folder.name}?`)) {
                    deleteFolder(parentId, folder.id);
                  }
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {isExpanded && (
          <div className="pl-6 pr-2 space-y-1">
            {/* Render subfolders */}
            {folder.folders.map(subfolder => renderFolder(subfolder, folder.id))}
            
            {/* Render files */}
            {folder.files.map(file => (
              <div 
                key={file.id}
                className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-md"
              >
                <div 
                  className="flex items-center flex-1 cursor-pointer"
                  onClick={() => viewFile(file)}
                >
                  {renderFileIcon(file.type)}
                  <span className="ml-2 truncate">{file.name}</span>
                </div>
                
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Menu className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => viewFile(file)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      
                      {(file.type === 'txt' || file.type === 'note') && (
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedFile(file);
                            setEditContent(file.content);
                            setEditMode(true);
                            setViewDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuItem 
                        onClick={() => {
                          if (file.content) {
                            const a = document.createElement('a');
                            a.href = file.content;
                            a.download = file.name;
                            a.click();
                          }
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${file.name}?`)) {
                            deleteFile(folder.id, file.id);
                          }
                        }}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            
            {folder.folders.length === 0 && folder.files.length === 0 && (
              <div className="py-2 px-2 text-sm text-muted-foreground">
                This folder is empty
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">AIML-IARE Resources</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <div className="border rounded-lg p-4 h-[70vh] overflow-auto">
          <div className="font-medium mb-4">Semesters</div>
          <ScrollArea className="h-[calc(70vh-40px)]">
            {semesters.map(semester => renderFolder(semester))}
          </ScrollArea>
        </div>
        
        <div className="border rounded-lg p-6 h-[70vh] flex items-center justify-center bg-muted/50">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">AI/ML Academic Resources</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Browse the semester structure on the left to access academic materials for the
              Artificial Intelligence & Machine Learning program.
            </p>
            <p className="text-sm text-muted-foreground">
              Click on a semester to expand it and view or manage its contents.
            </p>
          </div>
        </div>
      </div>
      
      {/* File View/Edit Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedFile && (
                <>
                  {renderFileIcon(selectedFile.type)}
                  <span className="ml-2">{selectedFile.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="h-[calc(80vh-100px)] overflow-auto">
            {selectedFile && renderFileContent(selectedFile)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AimlIareSection;
