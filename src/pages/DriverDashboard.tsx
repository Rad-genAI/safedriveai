import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import DriverRegistration from '@/components/DriverRegistration';
import DriverMonitor from '@/components/DriverMonitor';
import AlertSystem from '@/components/AlertSystem';

interface DriverData {
  name: string;
  vehicleId: string;
  shiftStart: string;
  lastBreak: string;
}

interface Alert {
  id: string;
  type: 'drowsy' | 'fatigue' | 'normal';
  timestamp: Date;
  driverName: string;
  vehicleId: string;
  severity: 'low' | 'medium' | 'high';
}

const DriverDashboard = () => {
  const [driverData, setDriverData] = useState<DriverData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleDriverRegister = (data: DriverData) => {
    setDriverData(data);
  };

  const handleAlert = (alertType: 'drowsy' | 'normal') => {
    if (alertType === 'drowsy' && driverData) {
      const newAlert: Alert = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'drowsy',
        timestamp: new Date(),
        driverName: driverData.name,
        vehicleId: driverData.vehicleId,
        severity: 'high'
      };
      setAlerts(prev => [newAlert, ...prev]);
    }
  };

  const handleClearAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleLogout = () => {
    setDriverData(null);
    setAlerts([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg gradient-hero">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">DriveGuard Driver</h1>
                  <p className="text-xs text-muted-foreground">Real-time Safety Monitoring</p>
                </div>
              </div>
            </div>
            {driverData && (
              <Button variant="outline" onClick={handleLogout}>
                End Session
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!driverData ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Driver Check-In</h1>
              <p className="text-xl text-muted-foreground">
                Please register your details to begin your monitored driving session
              </p>
            </div>
            <DriverRegistration onRegister={handleDriverRegister} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {driverData.name}
              </h1>
              <p className="text-muted-foreground">
                Vehicle: {driverData.vehicleId} | Session started at {driverData.shiftStart || 'N/A'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Monitor */}
              <div className="lg:col-span-2">
                <DriverMonitor
                  driverName={driverData.name}
                  vehicleId={driverData.vehicleId}
                  onAlert={handleAlert}
                />
              </div>

              {/* Alert System */}
              <div className="lg:col-span-1">
                <AlertSystem
                  alerts={alerts}
                  onClearAlert={handleClearAlert}
                  soundEnabled={soundEnabled}
                  onToggleSound={() => setSoundEnabled(!soundEnabled)}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DriverDashboard;