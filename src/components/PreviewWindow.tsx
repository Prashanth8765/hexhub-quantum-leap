
import { useEffect, useRef } from "react";

interface PreviewWindowProps {
  html: string;
  css: string;
  js: string;
  deviceType: "desktop" | "tablet" | "mobile";
}

const PreviewWindow = ({ html, css, js, deviceType }: PreviewWindowProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      
      // Create the HTML content as a data URL to avoid cross-origin issues
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;
      
      // Use data URL instead of direct document manipulation
      const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
      iframe.src = dataUrl;
    }
  }, [html, css, js]);

  // Set width and height based on device type
  const getDeviceWidth = () => {
    switch (deviceType) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    <div className="w-full overflow-auto flex justify-center bg-muted p-4">
      <iframe
        ref={iframeRef}
        className="border border-border bg-white shadow-md"
        style={{ 
          width: getDeviceWidth(),
          height: "600px",
          maxWidth: "100%",
          transition: "width 0.3s ease",
        }}
        title="Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default PreviewWindow;
