import { useState } from 'react';
import { Home, Map, Shield, User, AlertTriangle, MessageCircle, Navigation, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import SafetyMap from './SafetyMap';
import DigitalID from './DigitalID';
import IncidentReporting from './IncidentReporting';
import { getCurrentLocation, shareLocation, callEmergencyNumber } from '@/utils/nativeUtils';

type TabType = 'home' | 'map' | 'id' | 'report';

const TouristApp = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent />;
      case 'map':
        return <SafetyMap />;
      case 'id':
        return <DigitalID />;
      case 'report':
        return <IncidentReporting />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType="tourist" notifications={3} />
      
      <main className="pb-20 px-4 py-6 max-w-md mx-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="flex items-center justify-around py-2 max-w-md mx-auto">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'map', icon: Map, label: 'Safety Map' },
            { id: 'id', icon: Shield, label: 'Digital ID' },
            { id: 'report', icon: AlertTriangle, label: 'Report' }
          ].map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(id as TabType)}
              className={`flex flex-col items-center gap-1 py-3 px-4 ${
                activeTab === id 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};

const HomeContent = () => {
  const { toast } = useToast();

  const handleSendGPS = async () => {
    try {
      const location = await getCurrentLocation();
      await shareLocation(
        location.latitude, 
        location.longitude, 
        `YatraShield GPS Update: I'm safe at ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
      );
      
      toast({
        title: "GPS Location Sent",
        description: "Your location has been shared with your emergency contacts",
      });
    } catch (error) {
      toast({
        title: "GPS Error",
        description: "Failed to send GPS location",
        variant: "destructive"
      });
    }
  };

  const handleShareLocation = async () => {
    try {
      const location = await getCurrentLocation();
      await shareLocation(
        location.latitude, 
        location.longitude, 
        'Sharing my location via YatraShield for safety'
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
  return (
    <div className="space-y-6">
      
      {/* Welcome Hero */}
      <Card className="hero-section text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-safety to-saffron opacity-90" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
        
        <CardContent className="relative z-10 p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold font-poppins mb-2">Welcome to YatraShield</h2>
          <p className="text-white/90 text-sm mb-4">Your AI-powered safety companion for travel in India</p>
          <div className="safety-indicator bg-white/20 text-white border-white/30 justify-center">
            <div className="w-2 h-2 rounded-full bg-safety animate-pulse" />
            <span>Currently in Safe Zone</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* Emergency SOS */}
        <Card className="border-danger/30 bg-danger/5">
          <CardContent className="p-3 text-center">
            <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="h-5 w-5 text-danger" />
            </div>
            <h3 className="font-semibold text-danger text-xs mb-2">Emergency</h3>
            <Button size="sm" className="sos-pulse bg-danger hover:bg-danger/90 text-xs px-2 py-1">
              SOS
            </Button>
          </CardContent>
        </Card>

        {/* Share Location */}
        <Card>
          <CardContent className="p-3 text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Share2 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-xs mb-2">Share Location</h3>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs px-2 py-1"
              onClick={handleShareLocation}
            >
              Send GPS
            </Button>
          </CardContent>
        </Card>

        {/* GPS Alert */}
        <Card>
          <CardContent className="p-3 text-center">
            <div className="w-10 h-10 bg-safety/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Navigation className="h-5 w-5 text-safety" />
            </div>
            <h3 className="font-semibold text-xs mb-2">GPS Alert</h3>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs px-2 py-1"
              onClick={handleSendGPS}
            >
              Send
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Safety Status */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-safety" />
            Current Safety Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Location Safety</span>
              <Badge className="bg-safety text-safety-foreground">Safe</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Crowd Density</span>
              <Badge className="bg-warning text-warning-foreground">Medium</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Weather Alert</span>
              <Badge className="bg-muted text-muted-foreground">Clear</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Tips */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-saffron" />
            Today's Safety Tips
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-saffron mt-2 flex-shrink-0" />
              <p>High tourist activity at India Gate - keep valuables secure</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-safety mt-2 flex-shrink-0" />
              <p>Weather is clear - perfect for outdoor sightseeing</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p>Download offline maps before visiting remote areas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-safety">95%</div>
            <div className="text-xs text-muted-foreground">Safety Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-primary">24/7</div>
            <div className="text-xs text-muted-foreground">Monitoring</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-saffron">2.4k</div>
            <div className="text-xs text-muted-foreground">Nearby Tourists</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TouristApp;
