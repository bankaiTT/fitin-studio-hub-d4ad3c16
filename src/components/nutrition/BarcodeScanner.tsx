import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Scan, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState('');
  const { toast } = useToast();

  const handleScan = () => {
    if (!barcode) return;
    
    toast({
      title: 'Barcode Scanned',
      description: `Looking up product: ${barcode}`,
    });
    
    // In production, this would call a food database API
    setBarcode('');
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Scan className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Barcode Scanner</h3>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Enter barcode or scan"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleScan()}
          />
          <Button onClick={handleScan} disabled={!barcode}>
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => {
            toast({
              title: 'Camera Scanner',
              description: 'Camera scanner will be available soon',
            });
          }}
        >
          <Scan className="w-4 h-4" />
          Scan with Camera
        </Button>
      </div>
    </Card>
  );
};
