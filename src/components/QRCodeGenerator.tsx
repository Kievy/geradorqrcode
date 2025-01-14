import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [svgCode, setSvgCode] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (text) {
      generateQRCode();
    }
  }, [text]);

  const generateQRCode = async () => {
    try {
      // Generate PNG data URL
      const dataUrl = await QRCode.toDataURL(text, {
        width: 1500,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrDataUrl(dataUrl);

      // Generate SVG string
      const svgString = await QRCode.toString(text, {
        type: 'svg',
        margin: 1,
        width: 1500,
      });
      setSvgCode(svgString);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar QR Code",
        description: "Por favor, tente novamente.",
      });
    }
  };

  const downloadPNG = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado!",
      description: "Seu QR Code PNG foi baixado com sucesso.",
    });
  };

  const downloadSVG = () => {
    if (!svgCode) return;
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'qrcode.svg';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "Seu QR Code SVG foi baixado com sucesso.",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fadeIn">
      <Input
        type="text"
        placeholder="Digite o texto ou URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-white/10 text-white border-lightPurple"
      />
      
      {qrDataUrl && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <img src={qrDataUrl} alt="QR Code" className="w-full h-auto" />
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button
              onClick={downloadPNG}
              className="bg-lightPurple hover:bg-lightPurple/80 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              PNG
            </Button>
            <Button
              onClick={downloadSVG}
              className="bg-lightPurple hover:bg-lightPurple/80 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              SVG
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;