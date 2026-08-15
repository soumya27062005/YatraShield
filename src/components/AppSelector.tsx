import { useState } from 'react';
import { Shield, Users, Monitor, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import yatraShieldLogo from '@/assets/yatrashield-logo.png';
import TouristApp from './TouristApp';
import AdminPanel from './AdminPanel';

type AppType = 'selector' | 'tourist' | 'admin';

const AppSelector = () => {
  const [currentApp, setCurrentApp] = useState<AppType>('selector');

  if (currentApp === 'tourist') {
    return (
      <div>
        <TouristApp />
        <Button 
          onClick={() => setCurrentApp('selector')} 
          variant="ghost" 
          size="sm" 
          className="fixed top-4 left-4 z-50 bg-card/90 backdrop-blur"
        >
          ← Back
        </Button>
      </div>
    );
  }

  if (currentApp === 'admin') {
    return (
      <div>
        <AdminPanel />
        <Button 
          onClick={() => setCurrentApp('selector')} 
          variant="ghost" 
          size="sm" 
          className="fixed top-4 left-4 z-50 bg-card/90 backdrop-blur"
        >
          ← Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-safety/5 to-saffron/5 india-pattern">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 shield-glow">
            <img src={yatraShieldLogo} alt="YatraShield" className="w-full h-full" />
          </div>
          
          <h1 className="text-5xl font-bold font-poppins mb-4 bg-gradient-to-r from-primary via-safety to-saffron bg-clip-text text-transparent">
            YatraShield
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2">
            Smart Tourist Safety Monitoring & Incident Response System
          </p>
          
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            AI-powered safety companion with geo-fencing, blockchain digital ID, and real-time incident response for secure travel in India
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <Card className="text-center border-safety/20 bg-safety/5">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-safety/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-safety" />
              </div>
              <h3 className="font-semibold text-safety mb-2">AI-Powered Safety</h3>
              <p className="text-sm text-muted-foreground">
                Real-time threat detection and geo-fenced zone monitoring with smart alerts
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Geo-Fencing</h3>
              <p className="text-sm text-muted-foreground">
                Dynamic safety zone mapping with instant notifications and route guidance
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-saffron/20 bg-saffron/5">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-saffron" />
              </div>
              <h3 className="font-semibold text-saffron mb-2">Blockchain ID</h3>
              <p className="text-sm text-muted-foreground">
                Secure digital identity verification with QR-based instant authentication
              </p>
            </CardContent>
          </Card>
        </div>

        {/* App Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          {/* Tourist App */}
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/30" 
                onClick={() => setCurrentApp('tourist')}>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-safety rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold font-poppins mb-3 text-primary">Tourist App</h2>
              <p className="text-muted-foreground mb-6">
                Your personal safety companion for secure travel in India
              </p>
              
              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-safety" />
                  <span>Emergency SOS & Incident Reporting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Live Safety Map & Geo-fencing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-saffron" />
                  <span>Blockchain Digital ID & QR Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span>Smart Alerts & Travel Tips</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-primary hover:bg-primary-dark group-hover:shadow-md">
                Open Tourist App
              </Button>
            </CardContent>
          </Card>

          {/* Admin Panel */}
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-saffron/30" 
                onClick={() => setCurrentApp('admin')}>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-saffron to-warning rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Monitor className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold font-poppins mb-3 text-saffron">Admin Dashboard</h2>
              <p className="text-muted-foreground mb-6">
                Real-time monitoring and incident response for authorities
              </p>
              
              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-danger" />
                  <span>Live Incident Monitor & Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Tourist Density Heatmaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-safety" />
                  <span>Geo-fence Zone Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-saffron" />
                  <span>Analytics & Safety Reports</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-saffron hover:bg-saffron-dark group-hover:shadow-md">
                Access Admin Panel
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            <strong className="text-primary font-semibold">YatraShield</strong> - 
            A Protective Shield for Every Journey in India
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <span>🛡️ 24/7 Monitoring</span>
            <span>🏛️ Government Approved</span>
            <span>🔒 Blockchain Secured</span>
            <span>🇮🇳 Made for India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSelector;
