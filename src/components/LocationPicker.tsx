import { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getCurrentLocation } from '@/utils/nativeUtils';

interface LocationPickerProps {
  onLocationSelect: (location: { latitude: number; longitude: number; address: string }) => void;
  onBack: () => void;
}

interface LocationOption {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'current' | 'popular' | 'search';
}

const mockPopularLocations: LocationOption[] = [
  {
    id: '1',
    name: 'India Gate',
    address: 'Rajpath, India Gate, New Delhi, Delhi 110001',
    latitude: 28.6129,
    longitude: 77.2295,
    type: 'popular'
  },
  {
    id: '2',
    name: 'Red Fort',
    address: 'Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi 110006',
    latitude: 28.6562,
    longitude: 77.2410,
    type: 'popular'
  },
  {
    id: '3',
    name: 'Connaught Place',
    address: 'Connaught Place, New Delhi, Delhi 110001',
    latitude: 28.6315,
    longitude: 77.2167,
    type: 'popular'
  },
  {
    id: '4',
    name: 'Chandni Chowk',
    address: 'Chandni Chowk, Delhi 110006',
    latitude: 28.6506,
    longitude: 77.2334,
    type: 'popular'
  }
];

const LocationPicker = ({ onLocationSelect, onBack }: LocationPickerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<LocationOption[]>(mockPopularLocations);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationOption | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get current location when component mounts
    handleGetCurrentLocation();
  }, []);

  const handleGetCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const position = await getCurrentLocation();
      const currentLocationData: LocationOption = {
        id: 'current',
        name: 'Current Location',
        address: `${position.latitude.toFixed(6)}, ${position.longitude.toFixed(6)}`,
        latitude: position.latitude,
        longitude: position.longitude,
        type: 'current'
      };
      
      setCurrentLocation(currentLocationData);
      setLocations([currentLocationData, ...mockPopularLocations]);
      
      toast({
        title: "Location Found",
        description: "Current location detected successfully",
      });
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to get current location",
        variant: "destructive"
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleLocationSelect = (location: LocationOption) => {
    onLocationSelect({
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address
    });
    
    toast({
      title: "Location Selected",
      description: location.name,
    });
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'current':
        return <Navigation className="h-4 w-4 text-primary" />;
      case 'popular':
        return <MapPin className="h-4 w-4 text-saffron" />;
      default:
        return <MapPin className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-lg font-semibold">Select Location</h2>
          <p className="text-sm text-muted-foreground">Choose your current or desired location</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Current Location Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Navigation className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Use Current Location</p>
                <p className="text-sm text-muted-foreground">
                  {isLoadingLocation ? 'Detecting location...' : 'Get precise GPS coordinates'}
                </p>
              </div>
            </div>
            <Button 
              onClick={handleGetCurrentLocation}
              disabled={isLoadingLocation}
              variant="outline"
              size="sm"
            >
              {isLoadingLocation ? 'Getting...' : 'Detect'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Location List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Available Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleLocationSelect(location)}
            >
              <div className="flex items-center gap-3">
                {getLocationIcon(location.type)}
                <div>
                  <p className="font-medium text-sm">{location.name}</p>
                  <p className="text-xs text-muted-foreground">{location.address}</p>
                  {location.type === 'current' && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-safety animate-pulse" />
                      <span className="text-xs text-safety">Live Location</span>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <CheckCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {filteredLocations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No locations found</p>
              <p className="text-xs">Try a different search term</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationPicker;
