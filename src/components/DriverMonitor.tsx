import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Camera, AlertTriangle, CheckCircle } from 'lucide-react';

interface DriverMonitorProps {
  driverName: string;
  vehicleId: string;
  onAlert: (alertType: 'drowsy' | 'normal') => void;
}

const DriverMonitor: React.FC<DriverMonitorProps> = ({ driverName, vehicleId, onAlert }) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [eyesStatus, setEyesStatus] = useState<'open' | 'closed' | 'drowsy'>('open');
  const [alertCount, setAlertCount] = useState(0);
  const [lastAlert, setLastAlert] = useState<Date | null>(null);

  // Simulate eye tracking
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Simulate eye detection with random values
      const random = Math.random();
      
      if (random < 0.1) {
        // 10% chance of drowsy detection
        setEyesStatus('drowsy');
        setAlertCount(prev => prev + 1);
        setLastAlert(new Date());
        onAlert('drowsy');
      } else if (random < 0.3) {
        // 20% chance of eyes closed
        setEyesStatus('closed');
      } else {
        // 70% chance of normal status
        setEyesStatus('open');
        onAlert('normal');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring, onAlert]);

  const getStatusColor = () => {
    switch (eyesStatus) {
      case 'drowsy': return 'danger';
      case 'closed': return 'warning';
      default: return 'safe';
    }
  };

  const getStatusText = () => {
    switch (eyesStatus) {
      case 'drowsy': return 'DROWSY DETECTED';
      case 'closed': return 'Eyes Closed';
      default: return 'Alert & Active';
    }
  };

  const getStatusIcon = () => {
    switch (eyesStatus) {
      case 'drowsy': return <AlertTriangle className="w-5 h-5" />;
      case 'closed': return <EyeOff className="w-5 h-5" />;
      default: return <Eye className="w-5 h-5" />;
    }
  };

  return (
    <Card className="w-full shadow-status">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-primary" />
            Driver Monitoring System
          </span>
          <Badge variant={isMonitoring ? "default" : "secondary"}>
            {isMonitoring ? 'ACTIVE' : 'INACTIVE'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Driver Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Driver Name</p>
            <p className="font-semibold">{driverName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Vehicle ID</p>
            <p className="font-semibold">{vehicleId}</p>
          </div>
        </div>

        {/* Camera Feed Simulation */}
        <div className="relative">
          <div className="bg-muted rounded-lg aspect-video flex items-center justify-center border-2 border-dashed">
            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {isMonitoring ? 'Camera Feed Active' : 'Camera Feed Inactive'}
              </p>
            </div>
          </div>
          
          {/* Status Overlay */}
          {isMonitoring && (
            <div className="absolute top-4 right-4">
              <Badge 
                className={`flex items-center gap-2 px-3 py-2 ${
                  eyesStatus === 'drowsy' ? 'status-danger pulse-danger' :
                  eyesStatus === 'closed' ? 'status-warning' : 'status-safe'
                }`}
              >
                {getStatusIcon()}
                {getStatusText()}
              </Badge>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            variant={isMonitoring ? "danger" : "hero"}
            className="flex-1"
          >
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Button>
        </div>

        {/* Stats */}
        {isMonitoring && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-danger">{alertCount}</p>
              <p className="text-sm text-muted-foreground">Total Alerts</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Last Alert</p>
              <p className="font-medium">
                {lastAlert ? lastAlert.toLocaleTimeString() : 'None'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverMonitor;