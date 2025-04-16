import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Copy, Check, Upload, File, Loader2 } from "lucide-react";
import imageCompression from 'browser-image-compression';
import html2pdf from 'html2pdf.js';

const ScanDocumentSection = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const handleFiles = async (files: File[]) => {
    setIsLoading(true);
    const compressedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const compressedFile = await compressFile(file);
        compressedFiles.push(compressedFile);
        setProgress((i + 1) / files.length * 100);
      } catch (error) {
        console.error("Error compressing file:", error);
        toast({
          title: "Error compressing file",
          description: `Could not compress ${file.name}. Please try again.`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    setSelectedFiles(compressedFiles);
    setIsLoading(false);
    toast({
      title: "Files processed successfully",
      description: "Your files have been compressed and are ready for PDF creation.",
    });
  };

  // The error is in the compressFile function. Let's fix it by converting the Blob to a File
  const compressFile = async (imageFile: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedBlob = await imageCompression(imageFile, options);
      
      // Convert Blob to File by creating a new File object
      const compressedFile = new File(
        [compressedBlob], 
        imageFile.name, 
        { type: compressedBlob.type, lastModified: Date.now() }
      );
      
      return compressedFile;
    } catch (error) {
      console.error("Error compressing file:", error);
      return imageFile;
    }
  };

  const handleCopyToClipboard = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to copy",
        variant: "destructive",
      });
      return;
    }

    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    navigator.clipboard.writeText(imageUrls.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Image URLs copied to clipboard",
      description: "You can now paste the image URLs",
    });
  };

  // The error is in the handleCreatePdf function. Let's fix the html2pdf call
  const handleCreatePdf = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to create a PDF",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const container = document.createElement("div");

      selectedFiles.forEach((file) => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "100%";
        img.style.pageBreakAfter = "always";
        container.appendChild(img);
      });

      document.body.appendChild(container);

      // Fix the html2pdf constructor call
      const pdfBlob = await html2pdf().from(container).outputPdf("blob");
      
      document.body.removeChild(container);

      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "scanned_document.pdf";
      link.click();

      toast({
        title: "PDF created successfully",
        description: "Your PDF has been downloaded",
      });
    } catch (error) {
      console.error("Error creating PDF:", error);
      toast({
        title: "Error creating PDF",
        description: "There was an error creating your PDF",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">ScanDocument</h1>

      <Card className="p-6 mb-4">
        <div
          {...getRootProps()}
          className="relative border-2 border-dashed rounded-md p-8 cursor-pointer bg-muted hover:bg-accent transition-colors"
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
            {isDragActive ? (
              <p className="text-sm">Drop the files here ...</p>
            ) : (
              <p className="text-sm">
                Drag 'n' drop some files here, or click to select files
              </p>
            )}
          </div>
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-muted opacity-75">
              <Loader2 className="animate-spin h-6 w-6" />
            </div>
          )}
        </div>
      </Card>

      {isLoading && (
        <Progress value={progress} className="mb-4" />
      )}

      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Selected Files</h2>
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-1.5 py-1.5 px-3 rounded-md border border-border">
                <File className="h-4 w-4" />
                <p className="text-sm font-medium">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={handleCopyToClipboard} disabled={selectedFiles.length === 0 || isLoading}>
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Image URLs
            </>
          )}
        </Button>
        <Button onClick={handleCreatePdf} disabled={selectedFiles.length === 0 || isLoading}>
          Create PDF
        </Button>
      </div>
    </div>
  );
};

export default ScanDocumentSection;
