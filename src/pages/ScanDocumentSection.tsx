import { useState } from "react";
import { ArrowLeft, Camera, Upload, FileUp, Download, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Webcam from "react-webcam";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import html2pdf from "html2pdf.js";
import imageCompression from "browser-image-compression";

// Manual type definition for react-dropzone
interface FileWithPreview extends File {
  preview: string;
}

interface ScanDocumentSectionProps {
  onBack: () => void;
}

const ScanDocumentSection = ({ onBack }: ScanDocumentSectionProps) => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleCapture = () => {
    const webcamElement = document.querySelector('video');
    if (webcamElement) {
      const canvas = document.createElement('canvas');
      canvas.width = webcamElement.videoWidth;
      canvas.height = webcamElement.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(webcamElement, 0, 0);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setCapturedImages(prev => [...prev, imageUrl]);
        toast.success("Image captured successfully!");
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(file => {
        const fileWithPreview = file as FileWithPreview;
        fileWithPreview.preview = URL.createObjectURL(file);
        return fileWithPreview;
      });
      setUploadedFiles(prev => [...prev, ...newFiles]);
      toast.success(`${files.length} file(s) uploaded successfully!`);
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => {
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.preview = URL.createObjectURL(file);
      return fileWithPreview;
    });
    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast.success(`${acceptedFiles.length} file(s) uploaded successfully!`);
  };

  const handleDeleteImage = (index: number, isUploaded: boolean) => {
    if (isUploaded) {
      setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      setCapturedImages(prev => prev.filter((_, i) => i !== index));
    }
    toast.success("Document deleted successfully!");
  };

  const handlePreviewImage = (src: string) => {
    setSelectedImage(src);
    setIsPreviewOpen(true);
  };

  // Compress file size
  const compressFile = async (file: File) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Error compressing image:", error);
      return file;
    }
  };

  // Create PDF from all scanned/uploaded documents
  const handleCreatePdf = async () => {
    if (capturedImages.length === 0 && uploadedFiles.length === 0) {
      toast.error("No documents to export!");
      return;
    }

    const container = document.createElement('div');
    
    // Add all captured images
    capturedImages.forEach(img => {
      const imgElement = document.createElement('img');
      imgElement.src = img;
      imgElement.style.width = '100%';
      imgElement.style.marginBottom = '20px';
      container.appendChild(imgElement);
    });
    
    // Add all uploaded files
    uploadedFiles.forEach(file => {
      const imgElement = document.createElement('img');
      imgElement.src = file.preview;
      imgElement.style.width = '100%';
      imgElement.style.marginBottom = '20px';
      container.appendChild(imgElement);
    });
    
    // Generate PDF
    const opt = {
      margin: 10,
      filename: 'scanned_documents.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().from(container).set(opt).save();
    toast.success("PDF created successfully!");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">Scan Document</h1>
      </div>
      
      {isCameraOpen ? (
        <div className="mb-8 text-center">
          <Webcam
            audio={false}
            mirrored={false}
            className="mx-auto max-w-full border rounded-lg shadow-md"
            height={480}
            width={640}
            screenshotFormat="image/jpeg"
          />
          <div className="mt-4 flex justify-center gap-3">
            <Button onClick={handleCapture}>
              <Camera className="mr-2 h-4 w-4" />
              Capture
            </Button>
            <Button variant="outline" onClick={() => setIsCameraOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="border rounded-lg p-6 text-center flex flex-col items-center justify-center h-60">
            <Button onClick={() => setIsCameraOpen(true)} className="mb-3">
              <Camera className="mr-2 h-4 w-4" />
              Open Camera
            </Button>
            <p className="text-sm text-muted-foreground max-w-xs">
              Use your device camera to scan documents, receipts, whiteboards, and more.
            </p>
          </div>
          
          <div 
            className="border rounded-lg p-6 text-center flex flex-col items-center justify-center h-60 border-dashed cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => document.getElementById('file-upload')?.click()}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleDrop(Array.from(e.dataTransfer.files));
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="font-medium mb-1">Drag and drop or click to upload</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Upload PDF, JPG, PNG or other image files from your device.
            </p>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      )}
      
      {/* Document management section */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Documents</h2>
        {(capturedImages.length > 0 || uploadedFiles.length > 0) && (
          <Button onClick={handleCreatePdf}>
            <FileUp className="mr-2 h-4 w-4" />
            Export to PDF
          </Button>
        )}
      </div>
      
      {capturedImages.length === 0 && uploadedFiles.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/30">
          <p className="text-muted-foreground">No documents yet. Capture or upload to get started.</p>
        </div>
      ) : (
        <ScrollArea className="h-[50vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {capturedImages.map((src, index) => (
              <div key={`captured-${index}`} className="border rounded-lg overflow-hidden group relative">
                <img 
                  src={src} 
                  alt={`Captured document ${index + 1}`} 
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handlePreviewImage(src)}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handlePreviewImage(src)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteImage(index, false)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = src;
                      link.download = `document-${index}.jpg`;
                      link.click();
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-2 text-sm font-medium truncate">Captured Doc {index + 1}</div>
              </div>
            ))}
            
            {uploadedFiles.map((file, index) => (
              <div key={`uploaded-${index}`} className="border rounded-lg overflow-hidden group relative">
                <img 
                  src={file.preview} 
                  alt={file.name} 
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handlePreviewImage(file.preview)}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handlePreviewImage(file.preview)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteImage(index, true)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = file.preview;
                      link.download = file.name;
                      link.click();
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-2 text-sm font-medium truncate">{file.name}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      
      {/* Image Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="text-center py-4">
              <img 
                src={selectedImage} 
                alt="Document preview" 
                className="max-h-[70vh] max-w-full mx-auto"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScanDocumentSection;
