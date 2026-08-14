import { useState } from 'react';
import { MapPin, Shield, AlertTriangle, Navigation, Zap, Share2, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { shareLocation, getCurrentLocation, shareText } from '@/utils/nativeUtils';

interface SafetyZone {
  id: string;
  name: string;
  type: 'safe' | 'warning' | 'danger';
  description: string;
  coordinates: [number, number];
  radius: number;
}

const mockZones: SafetyZone[] = [
  {
    id: '1',
    name: 'India Gate Area',
    type: 'safe',
    description: 'High security zone with CCTV coverage',
    coordinates: [28.6129, 77.2295],
    radius: 500
  },
  {
    id: '2',
    name: 'Chandni Chowk',
    type: 'warning',
    description: 'Crowded area - pickpocket risk',
    coordinates: [28.6506, 77.2334],
    radius: 300
  },
  {
    id: '3',
    name: 'Construction Zone',
    type: 'danger',
    description: 'Avoid after 8 PM - poor lighting',
    coordinates: [28.6000, 77.2500],
    radius: 200
  }
];

const SafetyMap = () => {
  const [selectedZone, setSelectedZone] = useState<SafetyZone | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>([28.6139, 77.2090]);
  const { toast } = useToast();

  const handleShareLocation = async () => {
    try {
      const location = await getCurrentLocation();
      await shareLocation(
        location.latitude, 
        location.longitude, 
        'My current location - YatraShield Safety App'
      );
      
      toast({
        title: "Location Shared",
        description: "Your location has been shared successfully",
      });
    } catch (error) {
      toast({
        title: "Share Error",
        description: "Failed to share location",
        variant: "destructive"
      });
    }
  };

  const handleSafetyReport = async () => {
    try {
      const location = await getCurrentLocation();
      const reportText = `Safety Report from YatraShield
Location: ${location.latitude}, ${location.longitude}
Status: All clear in this area
Tourist safety monitoring active
Reported via YatraShield App`;

      await shareText('YatraShield Safety Report', reportText);
      
      toast({
        title: "Safety Report Shared",
        description: "Safety status report has been shared",
      });
    } catch (error) {
      toast({
        title: "Report Error",
        description: "Failed to share safety report",
        variant: "destructive"
      });
    }
  };

  const getZoneColor = (type: SafetyZone['type']) => {
    switch (type) {
      case 'safe': return 'bg-safety/20 border-safety';
      case 'warning': return 'bg-warning/20 border-warning';
      case 'danger': return 'bg-danger/20 border-danger';
    }
  };

  const getZoneIcon = (type: SafetyZone['type']) => {
    switch (type) {
      case 'safe': return <Shield className="h-4 w-4 text-safety" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'danger': return <Zap className="h-4 w-4 text-danger" />;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Map Container */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-safety/5">
        <CardContent className="p-0">
          
          {/* Mock Map Background with India Pattern */}
          <div className="h-80 bg-muted/30 india-pattern relative">
            
            {/* Map Grid Lines */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* User Location */}
            <div 
              className="absolute w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg transform -translate-x-2 -translate-y-2 z-20"
              style={{ left: '50%', top: '40%' }}
            >
              <div className="w-full h-full bg-primary rounded-full animate-ping" />
            </div>

            {/* Safety Zones */}
            {mockZones.map((zone) => {
              const isSelected = selectedZone?.id === zone.id;
              return (
                <div
                  key={zone.id}
                  className={`absolute rounded-full border-2 transition-all cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    getZoneColor(zone.type)
                  } ${isSelected ? 'scale-110 z-30' : 'z-10'}`}
                  style={{
                    left: Math.random() * 70 + 15 + '%',
                    top: Math.random() * 60 + 20 + '%',
                    width: '80px',
                    height: '80px'
                  }}
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="flex items-center justify-center h-full">
                    {getZoneIcon(zone.type)}
                  </div>
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 shadow-sm">
              <h3 className="text-sm font-semibold mb-2">Safety Zones</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-safety" />
                  <span>Safe</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span>Caution</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-danger" />
                  <span>Avoid</span>
                </div>
              </div>
            </div>

            {/* Current Location Button */}
            <Button 
              size="sm" 
              className="absolute bottom-4 right-4 bg-card/90 backdrop-blur"
              variant="outline"
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Zone Details */}
      {selectedZone && (
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getZoneIcon(selectedZone.type)}
                  <h3 className="font-semibold">{selectedZone.name}</h3>
                  <Badge variant={selectedZone.type === 'safe' ? 'default' : 'secondary'}>
                    {selectedZone.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedZone.description}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedZone(null)}>
                ×
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 min-w-fit"
          onClick={handleShareLocation}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Location
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 min-w-fit"
          onClick={handleSafetyReport}
        >
          <FileText className="h-4 w-4 mr-2" />
          Safety Report
        </Button>
      </div>
    </div>
  );
};

export default SafetyMap;
