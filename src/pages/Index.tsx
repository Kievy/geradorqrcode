import QRCodeGenerator from "@/components/QRCodeGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-darkPurple text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Crie seu QRCODE</h1>
        <QRCodeGenerator />
      </div>
    </div>
  );
};

export default Index;