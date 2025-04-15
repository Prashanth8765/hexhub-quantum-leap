
import { useState, useRef, useCallback } from "react";
import { ArrowLeft, Camera, File, Download, Share2, Trash2, Edit, Save, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";
import html2pdf from "html2pdf.js";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

// Define interfaces for our document and folder types
interface ScannedDocument {
  id: string;
  name: string;
  images: string[];
  createdAt: number;
  folderId: string | null;
}

interface DocumentFolder {
  id: string;
  name: string;
}

interface ScanDocumentSectionProps {
  onBack: () => void;
}

const ScanDocumentSection = ({ onBack }: ScanDocumentSectionProps) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [activeTab, setActiveTab] = useState("scan");
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [documents, setDocuments] = useState<ScannedDocument[]>(() => {
    const savedDocs = localStorage.getItem("scanned-documents");
    return savedDocs ? JSON.parse(savedDocs) : [];
  });
  const [folders, setFolders] = useState<DocumentFolder[]>(() => {
    const savedFolders = localStorage.getItem("document-folders");
    return savedFolders ? JSON.parse(savedFolders) : [{ id: "default", name: "Main Folder" }];
  });
  const [newDocName, setNewDocName] = useState("Document");
  const [selectedDocument, setSelectedDocument] = useState<ScannedDocument | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>("default");
  const isMobile = useIsMobile();

  // Save to localStorage whenever documents or folders change
  useCallback(() => {
    localStorage.setItem("scanned-documents", JSON.stringify(documents));
  }, [documents]);

  useCallback(() => {
    localStorage.setItem("document-folders", JSON.stringify(folders));
  }, [folders]);

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImages((prevImages) => [...prevImages, imageSrc]);
        toast.success("Image captured successfully");
      }
    }
  }, [webcamRef]);

  const compressImage = async (imageDataUrl: string) => {
    try {
      const file = await fetch(imageDataUrl).then(r => r.blob());
      const options = {
        maxSizeMB: 1, // Max file size in MB
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      const compressedFile = await imageCompression(file, options);
      return URL.createObjectURL(compressedFile);
    } catch (error) {
      console.error("Error compressing image:", error);
      return imageDataUrl; // Return original on error
    }
  };

  const saveDocument = async () => {
    if (capturedImages.length === 0) {
      toast.error("No images captured");
      return;
    }

    try {
      // Compress all images
      const compressedImages = await Promise.all(
        capturedImages.map(img => compressImage(img))
      );

      const newDocument: ScannedDocument = {
        id: uuidv4(),
        name: newDocName || "Document",
        images: compressedImages,
        createdAt: Date.now(),
        folderId: selectedFolderId
      };

      setDocuments(prev => {
        const updated = [...prev, newDocument];
        localStorage.setItem("scanned-documents", JSON.stringify(updated));
        return updated;
      });

      setCapturedImages([]);
      setNewDocName("Document");
      setActiveTab("documents");
      toast.success("Document saved successfully");
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Error saving document");
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => {
      const updated = prev.filter(doc => doc.id !== id);
      localStorage.setItem("scanned-documents", JSON.stringify(updated));
      return updated;
    });
    
    if (selectedDocument?.id === id) {
      setSelectedDocument(null);
    }
    
    toast.success("Document deleted");
  };

  const removeImage = (index: number) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  };

  const createFolder = () => {
    if (!newFolderName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }

    const newFolder: DocumentFolder = {
      id: uuidv4(),
      name: newFolderName
    };

    setFolders(prev => {
      const updated = [...prev, newFolder];
      localStorage.setItem("document-folders", JSON.stringify(updated));
      return updated;
    });

    setNewFolderName("");
    toast.success("Folder created");
  };

  const exportToPdf = async (doc: ScannedDocument) => {
    try {
      // Create a container for our images
      const container = document.createElement("div");
      container.style.padding = "20px";
      
      doc.images.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.style.width = "100%";
        img.style.marginBottom = "20px";
        img.style.pageBreakInside = "avoid";
        container.appendChild(img);
      });

      // Use html2pdf to convert and download
      const options = {
        filename: `${doc.name}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      document.body.appendChild(container);
      await html2pdf().set(options).from(container).save();
      document.body.removeChild(container);
      
      toast.success("PDF exported successfully");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF");
    }
  };

  const shareDocument = async (doc: ScannedDocument) => {
    try {
      // Create a temporary container to generate the PDF
      const container = document.createElement("div");
      container.style.padding = "20px";
      
      doc.images.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.style.width = "100%";
        img.style.marginBottom = "20px";
        container.appendChild(img);
      });

      document.body.appendChild(container);
      
      // Generate PDF blob
      const pdfBlob = await html2pdf().set({
        margin: 1,
        filename: `${doc.name}.pdf`,
        image: { type: 'jpeg', quality: 0.8 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(container).output('blob');
      
      document.body.removeChild(container);

      // Use Web Share API if available
      if (navigator.share) {
        const file = new File([pdfBlob], `${doc.name}.pdf`, { type: 'application/pdf' });
        await navigator.share({
          title: doc.name,
          files: [file]
        });
        toast.success("Document shared successfully");
      } else {
        // Fallback to download if Web Share API isn't available
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${doc.name}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Document downloaded successfully");
      }
    } catch (error) {
      console.error("Error sharing document:", error);
      toast.error("Failed to share document");
    }
  };

  const renameDocument = (id: string, newName: string) => {
    if (!newName.trim()) {
      toast.error("Document name cannot be empty");
      return;
    }

    setDocuments(prev => {
      const updated = prev.map(doc => 
        doc.id === id ? { ...doc, name: newName } : doc
      );
      localStorage.setItem("scanned-documents", JSON.stringify(updated));
      return updated;
    });

    if (selectedDocument?.id === id) {
      setSelectedDocument(prev => prev ? { ...prev, name: newName } : null);
    }
    
    toast.success("Document renamed");
  };

  // Filter documents by selected folder
  const filteredDocuments = documents.filter(
    doc => doc.folderId === selectedFolderId
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">Scan Document</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Scan</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span>Documents</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="scan" className="space-y-4">
          <div className="rounded-lg border border-border overflow-hidden">
            {isMobile ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: { ideal: "environment" }
                }}
                className="w-full h-auto aspect-[3/4] object-cover"
              />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full max-h-96 object-cover"
              />
            )}
          </div>
          
          <div className="flex items-center gap-4 justify-center my-4">
            <Button onClick={captureImage} className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span>Capture</span>
            </Button>
          </div>
          
          {capturedImages.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Captured Images</h2>
              
              <div className="mb-4">
                <label htmlFor="documentName" className="block text-sm font-medium mb-1">
                  Document Name
                </label>
                <Input
                  id="documentName"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="Enter document name"
                  className="mb-2"
                />
                
                <label htmlFor="folderSelect" className="block text-sm font-medium mb-1">
                  Save to Folder
                </label>
                <select
                  id="folderSelect"
                  value={selectedFolderId || ""}
                  onChange={(e) => setSelectedFolderId(e.target.value === "" ? null : e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {capturedImages.map((image, index) => (
                  <div key={index} className="relative rounded-lg border border-border overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Captured ${index + 1}`} 
                      className="w-full h-36 object-cover"
                    />
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button onClick={saveDocument} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Document</span>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <select
                value={selectedFolderId || ""}
                onChange={(e) => setSelectedFolderId(e.target.value === "" ? null : e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FolderPlus className="h-4 w-4" />
                  <span>New Folder</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create New Folder</AlertDialogTitle>
                  <AlertDialogDescription>
                    Enter a name for your new folder.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder name"
                  className="my-4"
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={createFolder}>Create</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <File className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No documents found</h3>
              <p className="text-muted-foreground">
                Go to the Scan tab to create your first document.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted-foreground/10 relative overflow-hidden">
                    {doc.images.length > 0 && (
                      <img 
                        src={doc.images[0]} 
                        alt={doc.name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium truncate">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Rename Document</AlertDialogTitle>
                          </AlertDialogHeader>
                          <Input
                            defaultValue={doc.name}
                            id={`rename-${doc.id}`}
                            className="my-4"
                          />
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                              const input = document.getElementById(`rename-${doc.id}`) as HTMLInputElement;
                              renameDocument(doc.id, input.value);
                            }}>
                              Save
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => exportToPdf(doc)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => shareDocument(doc)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete
                                your document "{doc.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteDocument(doc.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScanDocumentSection;
