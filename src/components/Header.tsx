import { Shield, Menu, Bell, User, MapPin, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import yatraShieldLogo from '@/assets/yatrashield-logo.png';
import { useToast } from '@/hooks/use-toast';
import { shareText, callEmergencyNumber, getCurrentLocation, shareLocation } from '@/utils/nativeUtils';

interface HeaderProps {
  onMenuClick?: () => void;
  userType?: 'tourist' | 'admin';
  notifications?: number;
}

const Header = ({ onMenuClick, userType = 'tourist', notifications = 0 }: HeaderProps) => {
  const { toast } = useToast();

  const mockNotifications = [
    {
      id: '1',
      title: 'Safety Alert',
      message: 'You are entering a high-crowd zone',
      time: '5 mins ago',
      type: 'warning'
    },
    {
      id: '2',
      title: 'Weather Update',
      message: 'Clear weather for outdoor activities',
      time: '15 mins ago',
      type: 'info'
    },
    {
      id: '3',
      title: 'Safety Tip',
      message: 'Keep valuables secure in crowded areas',
      time: '1 hour ago',
      type: 'tip'
    }
  ];

  const handleProfileShare = async () => {
    try {
      const profileInfo = `YatraShield Tourist Profile
Safety Status: Active
Location: Ahmedabad, India
Safety Score: 95%
Join YatraShield for secure travel!`;

      await shareText('YatraShield Profile', profileInfo);
    } catch (error) {
      toast({
        title: "Share Error",
        description: "Failed to share profile",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been safely logged out",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'tip': return '💡';
      default: return '📢';
    }
  };
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        
        {/* Left Section - Logo & Menu */}
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button variant="ghost" size="sm" onClick={onMenuClick} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            <img src={yatraShieldLogo} alt="YatraShield" className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold font-poppins text-primary">YatraShield</h1>
              <p className="text-xs text-muted-foreground">
                {userType === 'admin' ? 'Admin Dashboard' : 'Tourist Safety'}
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Status (Tourist view) */}
        {userType === 'tourist' && (
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="h-4 w-4 text-safety" />
            <div className="safety-indicator safety-safe">
              <div className="w-2 h-2 rounded-full bg-safety animate-pulse" />
              <span>Safe Zone</span>
            </div>
          </div>
        )}

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-saffron text-saffron-foreground"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Notifications</h3>
                <div className="space-y-2">
                  {mockNotifications.map((notification) => (
                    <Card key={notification.id}>
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {notifications === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No new notifications</p>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="end">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Sita Maheshwari</h3>
                  <p className="text-xs text-muted-foreground">Tourist • Delhi</p>
                </div>
                
                <Separator />
                
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={handleProfileShare}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-destructive hover:text-destructive" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Emergency SOS (Tourist only) */}
          {userType === 'tourist' && (
            <Button 
              variant="destructive" 
              size="sm" 
              className="sos-pulse font-medium"
              onClick={async () => {
                try {
                  await callEmergencyNumber('112');
                  const location = await getCurrentLocation();
                  await shareLocation(location.latitude, location.longitude, 'EMERGENCY - YatraShield SOS Alert');
                  toast({
                    title: "Emergency SOS Activated",
                    description: "Emergency services contacted and location shared",
                  });
                } catch (error) {
                  toast({
                    title: "SOS Error", 
                    description: "Please call 112 directly",
                    variant: "destructive"
                  });
                }
              }}
            >
              <Shield className="h-4 w-4 mr-2" />
              SOS
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
