import { useState, useEffect } from 'react';
import { QrCode, Shield, User, MapPin, Calendar, CheckCircle, Copy, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { generateQRCode, shareText } from '@/utils/nativeUtils';

interface TouristProfile {
  id: string;
  name: string;
  nationality: string;
  passportNumber: string;
  emergencyContact: string;
  currentLocation: string;
  checkInTime: string;
  safetyScore: number;
  verificationStatus: 'verified' | 'pending' | 'expired';
}

const mockProfile: TouristProfile = {
  id: 'YS-2025-IN-001234',
  name: 'Radhika Mehra',
  nationality: 'Indian',
  passportNumber: 'IN123456789',
  emergencyContact: '+91-98791-52484',
  currentLocation: 'Ahmedbad, India',
  checkInTime: '2025-01-15 14:30',
  safetyScore: 95,
  verificationStatus: 'verified'
};

const DigitalID = () => {
  const [showQR, setShowQR] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrExpiresAt, setQrExpiresAt] = useState<Date | null>(null);
  const { toast } = useToast();

  // Auto-refresh QR code every 10 minutes
  useEffect(() => {
    if (showQR && qrExpiresAt) {
      const timer = setTimeout(() => {
        generateNewQRCode();
      }, 10 * 60 * 1000); // 10 minutes

      return () => clearTimeout(timer);
    }
  }, [showQR, qrExpiresAt]);

  const generateNewQRCode = async () => {
    setIsGeneratingQR(true);
    try {
      // Create QR code data with tourist information and timestamp
      const qrData = JSON.stringify({
        id: mockProfile.id,
        name: mockProfile.name,
        nationality: mockProfile.nationality,
        verificationStatus: mockProfile.verificationStatus,
        safetyScore: mockProfile.safetyScore,
        timestamp: Date.now(),
        expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes from now
      });

      const qrDataUrl = await generateQRCode(qrData);
      setQrCodeDataUrl(qrDataUrl);
      setQrExpiresAt(new Date(Date.now() + (10 * 60 * 1000)));
      
      toast({
        title: "QR Code Generated",
        description: "Your secure verification QR code is ready",
      });
    } catch (error) {
      toast({
        title: "QR Generation Error",
        description: "Failed to generate QR code",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const handleShowQR = async () => {
    setShowQR(true);
    await generateNewQRCode();
  };

  const shareDigitalID = async () => {
    try {
      const idInfo = `YatraShield Digital ID
Name: ${mockProfile.name}
ID: ${mockProfile.id}
Nationality: ${mockProfile.nationality}
Safety Score: ${mockProfile.safetyScore}%
Status: ${mockProfile.verificationStatus}`;

      await shareText('YatraShield Digital ID', idInfo);
    } catch (error) {
      toast({
        title: "Share Error",
        description: "Failed to share digital ID",
        variant: "destructive"
      });
    }
  };

  const copyIDToClipboard = () => {
    navigator.clipboard.writeText(mockProfile.id);
    toast({
      title: "ID Copied",
      description: "YatraShield ID copied to clipboard",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-safety text-safety-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'expired': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 80) return 'text-safety';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="space-y-4">
      
      {/* Main ID Card */}
      <Card className="shield-card text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-safety opacity-90" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
        
        <CardContent className="relative z-10 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-poppins">YatraShield ID</h2>
                <p className="text-white/80 text-sm">Digital Tourist Identity</p>
              </div>
            </div>
            <Badge className={getStatusColor(mockProfile.verificationStatus)}>
              <CheckCircle className="h-3 w-3 mr-1" />
              {mockProfile.verificationStatus}
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wide">Tourist Name</p>
              <p className="text-lg font-semibold">{mockProfile.name}</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-white/60 text-xs uppercase tracking-wide">ID Number</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono">{mockProfile.id}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyIDToClipboard}
                    className="h-auto p-1 text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide">Safety Score</p>
                <p className={`text-lg font-bold ${getSafetyScoreColor(mockProfile.safetyScore)}`}>
                  {mockProfile.safetyScore}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Quick Verification
            </div>
            {qrExpiresAt && (
              <div className="text-xs text-muted-foreground">
                Expires: {qrExpiresAt.toLocaleTimeString()}
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showQR ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-medium">Show QR Code for Instant Verification</p>
                <p className="text-sm text-muted-foreground">
                  Let authorities quickly verify your identity and safety status
                </p>
              </div>
              <Button 
                onClick={handleShowQR} 
                className="bg-primary hover:bg-primary-dark"
                disabled={isGeneratingQR}
              >
                {isGeneratingQR ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate QR Code'
                )}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              {/* Generated QR Code */}
              <div className="w-48 h-48 mx-auto p-4 bg-white rounded-xl border-2 border-primary/20 shadow-lg">
                {qrCodeDataUrl ? (
                  <img 
                    src={qrCodeDataUrl} 
                    alt="YatraShield QR Code" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin" />
                  </div>
                )}
              </div>
              
              <div>
                <p className="font-medium text-primary">QR Code Active</p>
                <p className="text-xs text-muted-foreground">Valid for 10 minutes</p>
                {qrExpiresAt && (
                  <p className="text-xs text-muted-foreground">
                    Expires at {qrExpiresAt.toLocaleTimeString()}
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowQR(false)}
                  size="sm"
                  className="flex-1"
                >
                  Hide QR Code
                </Button>
                <Button 
                  onClick={generateNewQRCode}
                  disabled={isGeneratingQR}
                  size="sm"
                  className="flex-1"
                >
                  {isGeneratingQR ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Refresh
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Nationality</p>
              <p className="font-medium">{mockProfile.nationality}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Passport</p>
              <p className="font-medium font-mono">{mockProfile.passportNumber}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{mockProfile.currentLocation}</p>
                <p className="text-xs text-muted-foreground">Last updated: {mockProfile.checkInTime}</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-2">Emergency Contact</p>
            <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
              <p className="font-mono text-sm">{mockProfile.emergencyContact}</p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open(`tel:${mockProfile.emergencyContact}`, '_system')}
              >
                Call
              </Button>
            </div>
          </div>

          {/* Share Digital ID */}
          <div className="pt-2">
            <Button 
              onClick={shareDigitalID}
              variant="outline" 
              className="w-full"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Share Digital ID
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalID;
