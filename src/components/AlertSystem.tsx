import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Volume2, VolumeX, Bell, Clock } from 'lucide-react';

interface Alert {
  id: string;
  type: 'drowsy' | 'fatigue' | 'normal';
  timestamp: Date;
  driverName: string;
  vehicleId: string;
  severity: 'low' | 'medium' | 'high';
}

interface AlertSystemProps {
  alerts: Alert[];
  onClearAlert: (alertId: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ 
  alerts, 
  onClearAlert, 
  soundEnabled, 
  onToggleSound 
}) => {
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null);

  // Get latest high-priority alert
  useEffect(() => {
    const highPriorityAlert = alerts
      .filter(alert => alert.type !== 'normal' && alert.severity === 'high')
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
    
    setActiveAlert(highPriorityAlert || null);
  }, [alerts]);

  // Play sound for alerts
  useEffect(() => {
    if (activeAlert && soundEnabled) {
      // In a real app, you'd play an actual sound file
      console.log('🔊 DROWSINESS ALERT SOUND PLAYING');
    }
  }, [activeAlert, soundEnabled]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'secondary';
    }
  };

  const recentAlerts = alerts
    .filter(alert => alert.type !== 'normal')
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Active Alert Display */}
      {activeAlert && (
        <Card className="border-danger shadow-alert">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-danger text-danger-foreground">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-danger">DROWSINESS ALERT</h3>
                  <p className="text-muted-foreground">
                    Driver: {activeAlert.driverName} | Vehicle: {activeAlert.vehicleId}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activeAlert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleSound}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onClearAlert(activeAlert.id)}
                >
                  Acknowledge
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alert History */}
      <Card className="shadow-status">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            Alert History
            <Badge variant="secondary">{recentAlerts.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentAlerts.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No alerts recorded</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 rounded-lg border transition-smooth hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.severity === 'high' ? 'bg-danger' :
                      alert.severity === 'medium' ? 'bg-warning' : 'bg-muted'
                    }`} />
                    <div>
                      <p className="font-medium">
                        {alert.type === 'drowsy' ? 'Drowsiness Detected' : 'Fatigue Alert'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {alert.driverName} - {alert.vehicleId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={`mb-1 ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertSystem;