import { useState } from 'react';
import { AlertTriangle, Camera, MapPin, Phone, MessageSquare, Upload, Clock, CheckCircle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { openCamera, selectPhotoFromGallery, getCurrentLocation, shareLocation, callEmergencyNumber } from '@/utils/nativeUtils';
import LocationPicker from './LocationPicker';

type IncidentType = 'theft' | 'harassment' | 'health' | 'accident' | 'fraud' | 'other';

interface IncidentReport {
  id: string;
  type: IncidentType;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  description: string;
  location: string;
  timestamp: string;
  status: 'reported' | 'investigating' | 'resolved';
  responseTime?: string;
}

const mockReports: IncidentReport[] = [
  {
    id: 'INC-001',
    type: 'theft',
    severity: 'high',
    description: 'Pickpocketing at Chandni Chowk market',
    location: 'Manek Chowk, Ahmedabad',
    timestamp: '2024-01-15 10:30',
    status: 'investigating',
    responseTime: '5 mins'
  },
  {
    id: 'INC-002',
    type: 'health',
    severity: 'medium',
    description: 'Food poisoning symptoms',
    location: 'Connaught Place, Delhi',
    timestamp: '2024-01-14 18:45',
    status: 'resolved',
    responseTime: '12 mins'
  }
];

const IncidentReporting = () => {
  const [isReporting, setIsReporting] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedType, setSelectedType] = useState<IncidentType | ''>('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'emergency' | ''>('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>('Detecting location...');
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number; address: string } | null>(null);
  const { toast } = useToast();

  const incidentTypes = [
    { value: 'theft', label: 'Theft/Robbery', color: 'bg-danger' },
    { value: 'harassment', label: 'Harassment', color: 'bg-warning' },
    { value: 'health', label: 'Medical Emergency', color: 'bg-danger' },
    { value: 'accident', label: 'Accident', color: 'bg-warning' },
    { value: 'fraud', label: 'Fraud/Scam', color: 'bg-saffron' },
    { value: 'other', label: 'Other', color: 'bg-muted' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low Priority', color: 'bg-safety' },
    { value: 'medium', label: 'Medium', color: 'bg-warning' },
    { value: 'high', label: 'High Priority', color: 'bg-saffron' },
    { value: 'emergency', label: 'Emergency', color: 'bg-danger' }
  ];

  const handleEmergencySOS = async () => {
    try {
      const location = await getCurrentLocation();
      const locationText = `Emergency at ${location.latitude}, ${location.longitude}`;
      
      // Share location with emergency services
      await shareLocation(location.latitude, location.longitude, 'EMERGENCY - YatraShield SOS Alert');
      
      // Call emergency number (Indian emergency services)
      callEmergencyNumber('112');
      
      toast({
        title: "Emergency SOS Activated",
        description: "Emergency services have been notified. Help is on the way.",
      });
    } catch (error) {
      toast({
        title: "SOS Error",
        description: "Failed to send emergency alert. Please call 112 directly.",
        variant: "destructive"
      });
    }
  };

  const handleTakePhoto = async () => {
    try {
      const imageDataUrl = await openCamera();
      if (imageDataUrl) {
        setCapturedImages([...capturedImages, imageDataUrl]);
        toast({
          title: "Photo Captured",
          description: "Photo added as evidence",
        });
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Failed to access camera",
        variant: "destructive"
      });
    }
  };

  const handleSelectFromGallery = async () => {
    try {
      const imageDataUrl = await selectPhotoFromGallery();
      if (imageDataUrl) {
        setCapturedImages([...capturedImages, imageDataUrl]);
        toast({
          title: "Photo Selected",
          description: "Photo added as evidence",
        });
      }
    } catch (error) {
      toast({
        title: "Gallery Error",
        description: "Failed to access photo gallery",
        variant: "destructive"
      });
    }
  };

  const handleLocationSelect = (location: { latitude: number; longitude: number; address: string }) => {
    setSelectedLocation(location);
    setCurrentLocation(location.address);
    setShowLocationPicker(false);
    
    toast({
      title: "Location Updated",
      description: "Incident location has been set",
    });
  };

  const handleGetCurrentLocation = async () => {
    try {
      setCurrentLocation('Getting location...');
      const position = await getCurrentLocation();
      const locationText = `${position.latitude.toFixed(6)}, ${position.longitude.toFixed(6)}`;
      setCurrentLocation(locationText);
      setSelectedLocation({
        latitude: position.latitude,
        longitude: position.longitude,
        address: locationText
      });
      
      toast({
        title: "Location Updated",
        description: "Current location detected",
      });
    } catch (error) {
      setCurrentLocation('Location unavailable');
      toast({
        title: "Location Error",
        description: "Failed to get current location",
        variant: "destructive"
      });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = capturedImages.filter((_, i) => i !== index);
    setCapturedImages(updatedImages);
  };

  const handleSubmitReport = async () => {
    if (!selectedType || !severity || !description.trim()) {
      toast({
        title: "Incomplete Report",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get current location if not already set
      let reportLocation = selectedLocation;
      if (!reportLocation) {
        const position = await getCurrentLocation();
        reportLocation = {
          latitude: position.latitude,
          longitude: position.longitude,
          address: `${position.latitude.toFixed(6)}, ${position.longitude.toFixed(6)}`
        };
      }

      // Simulate API call with location data
      console.log('Submitting report with:', {
        type: selectedType,
        severity,
        description,
        location: reportLocation,
        images: capturedImages,
        timestamp: new Date().toISOString()
      });
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsReporting(false);
        setSelectedType('');
        setSeverity('');
        setDescription('');
        setCapturedImages([]);
        setSelectedLocation(null);
        setCurrentLocation('Detecting location...');
        
        toast({
          title: "Report Submitted",
          description: "Your incident has been reported. Authorities will respond shortly.",
        });
      }, 2000);
      
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Submission Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-saffron text-saffron-foreground';
      case 'investigating': return 'bg-warning text-warning-foreground';
      case 'resolved': return 'bg-safety text-safety-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-safety text-safety-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-saffron text-saffron-foreground';
      case 'emergency': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (showLocationPicker) {
    return (
      <LocationPicker 
        onLocationSelect={handleLocationSelect}
        onBack={() => setShowLocationPicker(false)}
      />
    );
  }

  if (isReporting) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-danger">
              <AlertTriangle className="h-5 w-5" />
              Report Incident
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Incident Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Type of Incident</label>
              <Select value={selectedType} onValueChange={(value: IncidentType) => setSelectedType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${type.color}`} />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Severity */}
            <div>
              <label className="text-sm font-medium mb-2 block">Severity Level</label>
              <Select value={severity} onValueChange={(value: any) => setSeverity(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${level.color}`} />
                        {level.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Describe the incident in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium mb-2 block">Current Location</label>
              <div className="flex gap-2">
                <Input value={currentLocation} readOnly className="flex-1" />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowLocationPicker(true)}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleGetCurrentLocation}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Evidence (Optional)</label>
              
              {/* Captured Images */}
              {capturedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {capturedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Evidence ${index + 1}`} 
                        className="w-full h-20 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-3">
                  Add photos or documents as evidence
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="ghost" size="sm" onClick={handleTakePhoto}>
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSelectFromGallery}>
                    <Upload className="h-4 w-4 mr-2" />
                    From Gallery
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={() => setIsReporting(false)} 
                variant="outline" 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitReport} 
                disabled={isSubmitting}
                className="flex-1 bg-danger hover:bg-danger/90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* Emergency SOS */}
      <Card className="border-danger/50 bg-danger/5">
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto">
              <Phone className="h-8 w-8 text-danger" />
            </div>
            <div>
              <h3 className="font-bold text-danger text-lg">Emergency SOS</h3>
              <p className="text-sm text-muted-foreground">
                Press for immediate emergency assistance
              </p>
            </div>
            <Button 
              onClick={handleEmergencySOS}
              className="sos-pulse bg-danger hover:bg-danger/90 w-full"
              size="lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              EMERGENCY SOS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Incident */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold">Report an Incident</h3>
              <p className="text-sm text-muted-foreground">
                File a non-emergency safety report
              </p>
            </div>
            <Button 
              onClick={() => setIsReporting(true)}
              variant="outline"
              className="w-full"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Report Incident
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockReports.map((report) => (
            <div key={report.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                <Badge className={getSeverityColor(report.severity)}>
                  {report.severity}
                </Badge>
                <span className="text-sm font-medium capitalize">{report.type}</span>
              </div>
              <Badge className={getStatusColor(report.status)}>
                {report.status === 'resolved' && <CheckCircle className="h-3 w-3 mr-1" />}
                {report.status}
              </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{report.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{report.location}</span>
                <span>{report.timestamp}</span>
              </div>
              
              {report.responseTime && (
                <div className="text-xs text-safety">
                  Response time: {report.responseTime}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentReporting;
