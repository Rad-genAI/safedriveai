import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Truck, Clock } from 'lucide-react';

interface DriverData {
  name: string;
  vehicleId: string;
  shiftStart: string;
  lastBreak: string;
}

interface DriverRegistrationProps {
  onRegister: (driverData: DriverData) => void;
}

const DriverRegistration: React.FC<DriverRegistrationProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<DriverData>({
    name: '',
    vehicleId: '',
    shiftStart: '',
    lastBreak: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.vehicleId) {
      onRegister(formData);
    }
  };

  const handleInputChange = (field: keyof DriverData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-status">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <User className="w-6 h-6 text-primary" />
          Driver Check-In
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Driver Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleId" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Vehicle/Truck ID
            </Label>
            <Input
              id="vehicleId"
              type="text"
              placeholder="e.g., TR-001, VH-205"
              value={formData.vehicleId}
              onChange={(e) => handleInputChange('vehicleId', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shiftStart" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Shift Start Time
            </Label>
            <Input
              id="shiftStart"
              type="time"
              value={formData.shiftStart}
              onChange={(e) => handleInputChange('shiftStart', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastBreak" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Last Break Time
            </Label>
            <Input
              id="lastBreak"
              type="time"
              value={formData.lastBreak}
              onChange={(e) => handleInputChange('lastBreak', e.target.value)}
            />
          </div>

          <Button type="submit" variant="hero" className="w-full" size="lg">
            Start Driving Session
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DriverRegistration;