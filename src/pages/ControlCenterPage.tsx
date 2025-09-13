import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield } from 'lucide-react';
import ControlCenter from '@/components/ControlCenter';
import { useToast } from '@/hooks/use-toast';

interface Driver {
  id: string;
  name: string;
  vehicleId: string;
  status: 'safe' | 'warning' | 'danger';
  location: string;
  shiftStart: string;
  lastAlert?: Date;
  alertCount: number;
}

const ControlCenterPage = () => {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      vehicleId: 'TR-001',
      status: 'safe',
      location: 'Highway I-95 North',
      shiftStart: '06:00',
      alertCount: 0
    },
    {
      id: '2',
      name: 'Maria Garcia',
      vehicleId: 'TR-007',
      status: 'warning',
      location: 'Route 66 West',
      shiftStart: '05:30',
      lastAlert: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      alertCount: 2
    },
    {
      id: '3',
      name: 'David Johnson',
      vehicleId: 'TR-015',
      status: 'danger',
      location: 'Interstate 10 East',
      shiftStart: '04:00',
      lastAlert: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      alertCount: 5
    },
    {
      id: '4',
      name: 'Sarah Chen',
      vehicleId: 'TR-023',
      status: 'safe',
      location: 'Highway 101 South',
      shiftStart: '07:00',
      alertCount: 1
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prev => prev.map(driver => {
        const random = Math.random();
        
        // 5% chance of status change
        if (random < 0.05) {
          const statuses: ('safe' | 'warning' | 'danger')[] = ['safe', 'warning', 'danger'];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          if (newStatus === 'danger' && driver.status !== 'danger') {
            // Show toast for new critical alert
            toast({
              title: "Critical Alert",
              description: `${driver.name} (${driver.vehicleId}) - Drowsiness detected!`,
              variant: "destructive",
            });
          }
          
          return {
            ...driver,
            status: newStatus,
            lastAlert: newStatus !== 'safe' ? new Date() : driver.lastAlert,
            alertCount: newStatus === 'danger' ? driver.alertCount + 1 : driver.alertCount
          };
        }
        
        return driver;
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [toast]);

  const handleContactDriver = (driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (driver) {
      toast({
        title: "Driver Contacted",
        description: `Connecting to ${driver.name} (${driver.vehicleId})...`,
      });
    }
  };

  const criticalAlerts = drivers.filter(d => d.status === 'danger').length;

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
                  <h1 className="text-xl font-bold">DriveGuard Control Center</h1>
                  <p className="text-xs text-muted-foreground">Fleet Safety Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="status-safe">
                System Operational
              </Badge>
              {criticalAlerts > 0 && (
                <Badge className="status-danger pulse-danger">
                  {criticalAlerts} Critical Alert{criticalAlerts > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Fleet Safety Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of driver safety across your entire fleet
          </p>
        </div>

        <ControlCenter 
          drivers={drivers} 
          onContactDriver={handleContactDriver}
        />
      </main>
    </div>
  );
};

export default ControlCenterPage;