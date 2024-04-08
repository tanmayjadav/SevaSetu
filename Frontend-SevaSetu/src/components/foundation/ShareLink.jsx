import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { Toaster, toast } from "sonner";

const ShareLink = ({id}) => {
    const text = `https://seva-setu.vercel.app/foundation/details/${id}`
    const qrRef = useRef();
    const copyImageToClipboard = () => {
        const svgString = new XMLSerializer().serializeToString(qrRef.current);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    
        const url = URL.createObjectURL(svgBlob);
    
        const img = new Image();
        img.src = url;
    
        // When the image is loaded, create a canvas, draw the image, and copy it to the clipboard
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]).then(() => {
              toast.success('QR code image copied to clipboard!');
            }).catch((error) => {
              console.error('Failed to copy QR code image:', error);
              toast.error('Failed to copy QR code image to clipboard.');
            });
          }, 'image/png');
        };
      };
    
    const copyURLClipboard = async () =>{
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Text copied to clipboard:');
          } catch (error) {
            toast.error('Error copying to clipboard');
          }
    }
    
  return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share QR</DialogTitle>
        </DialogHeader>
        <div className="white">
          <QRCode
            ref={qrRef} 
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`https://seva-setu.vercel.app/foundation/details/${id}`}
            viewBox={`0 0 256 256`} 
          />
        </div>
        <DialogFooter>
          <Button type="submit" variant="outline" onClick={copyImageToClipboard}>
            Copy QR to Clipboard
          </Button>
          <Button type="submit" variant="outline" onClick={copyURLClipboard}>
            Copy URL to Clipboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Toaster richColors ></Toaster>
    </>
  );
};

export default ShareLink;
