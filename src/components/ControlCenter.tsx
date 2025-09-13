import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Monitor, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Truck,
  MapPin,
  Activity
} from 'lucide-react';

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

interface ControlCenterProps {
  drivers: Driver[];
  onContactDriver: (driverId: string) => void;
}

const ControlCenter: React.FC<ControlCenterProps> = ({ drivers, onContactDriver }) => {
  const safeDrivers = drivers.filter(d => d.status === 'safe').length;
  const warningDrivers = drivers.filter(d => d.status === 'warning').length;
  const dangerDrivers = drivers.filter(d => d.status === 'danger').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'danger': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <Clock className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'danger': return 'status-danger';
      case 'warning': return 'status-warning';
      default: return 'status-safe';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-status">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Drivers</p>
                <p className="text-3xl font-bold">{drivers.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-status">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Safe Drivers</p>
                <p className="text-3xl font-bold text-safe">{safeDrivers}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-safe" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-status">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-3xl font-bold text-warning">{warningDrivers}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-status">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-3xl font-bold text-danger">{dangerDrivers}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Driver Status List */}
      <Card className="shadow-status">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-primary" />
            Live Driver Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          {drivers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl font-semibold mb-2">No Active Drivers</p>
              <p className="text-muted-foreground">Drivers will appear here once they check in</p>
            </div>
          ) : (
            <div className="space-y-4">
              {drivers.map((driver) => (
                <div
                  key={driver.id}
                  className="flex items-center justify-between p-4 rounded-lg border transition-smooth hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${getStatusBadge(driver.status)}`}>
                      {getStatusIcon(driver.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{driver.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3 h-3" />
                          {driver.vehicleId}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {driver.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Started: {driver.shiftStart}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge className={getStatusBadge(driver.status)}>
                        {driver.status.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Alerts: {driver.alertCount}
                      </p>
                      {driver.lastAlert && (
                        <p className="text-xs text-muted-foreground">
                          Last: {driver.lastAlert.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      variant={driver.status === 'danger' ? 'danger' : 'default'}
                      size="sm"
                      onClick={() => onContactDriver(driver.id)}
                    >
                      Contact
                    </Button>
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

export default ControlCenter;