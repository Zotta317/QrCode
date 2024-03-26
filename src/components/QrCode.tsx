import { Box, Button, FormControl, Input } from "@mui/material";
import QRCode  from "qrcode.react";
import { useRef, useState } from "react";

export default function QrCode() {
  const qrRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");

  const downloadQrCode = (evt: React.FormEvent) => {


    evt.preventDefault();

    let canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) {
      console.log("Canvas element not found.");
      return; 
    }

    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");

    anchor.href = image;
    console.log(anchor)
    anchor.download = "qr-demo.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    console.log(canvas);
    

    setUrl("");
  }

  const qrCode = (
    <QRCode
      id="qrCodeID"
      size={500}
      value={url}
      bgColor="white"
      fgColor="black"
      level="H"
    />
  );

  return (
    <Box gap={30} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <FormControl  className="qr-container__form">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <Button onClick={downloadQrCode} variant="contained">Download QR Code</Button>
      </FormControl>
      <Box ref={qrRef}>{qrCode}</Box>
    </Box>
  );
}