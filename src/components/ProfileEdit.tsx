import React, { useState } from 'react';
import { ArrowLeft, Camera, Save, User, Phone, MapPin, Mail, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { openCamera, selectPhotoFromGallery } from '@/utils/nativeUtils';

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  passport: string;
  emergencyContact: string;
  currentLocation: string;
  avatar: string;
  safetyScore: number;
  verified: boolean;
}

interface ProfileEditProps {
  onBack: () => void;
  initialData?: ProfileData;
  onSave: (data: ProfileData) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ onBack, initialData, onSave }) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(initialData || {
    id: 'YS-2024-001',
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    phone: '+91 98765 43210',
    nationality: 'Indian',
    passport: 'M1234567',
    emergencyContact: '+91 98765 43211',
    currentLocation: 'Mumbai, Maharashtra',
    avatar: '',
    safetyScore: 95,
    verified: true
  });

  const handleInputChange = (field: keyof ProfileData, value: string | number | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = async (source: 'camera' | 'gallery') => {
    try {
      const imageData = source === 'camera' 
        ? await openCamera() 
        : await selectPhotoFromGallery();
      
      if (imageData) {
        handleInputChange('avatar', imageData);
        toast({
          title: "Photo Updated",
          description: "Profile photo has been updated successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Photo Error",
        description: "Failed to update profile photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSave(profileData);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      onBack();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Edit Profile</h1>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isUpdating}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Photo Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Photo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAvatarChange('camera')}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAvatarChange('gallery')}
                >
                  Gallery
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="id">Tourist ID</Label>
                <Input
                  id="id"
                  value={profileData.id}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={profileData.verified ? "default" : "secondary"} className="mt-6">
                  <Shield className="h-3 w-3 mr-1" />
                  {profileData.verified ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
            </div>

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </CardContent>
        </Card>

        {/* Travel Information */}
        <Card>
          <CardHeader>
            <CardTitle>Travel Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={profileData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                placeholder="Enter your nationality"
              />
            </div>

            <div>
              <Label htmlFor="passport">Passport Number</Label>
              <Input
                id="passport"
                value={profileData.passport}
                onChange={(e) => handleInputChange('passport', e.target.value)}
                placeholder="Enter your passport number"
              />
            </div>

            <div>
              <Label htmlFor="location">Current Location</Label>
              <Input
                id="location"
                value={profileData.currentLocation}
                onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                placeholder="Enter your current location"
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-danger" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="emergency">Emergency Contact Number</Label>
              <Input
                id="emergency"
                value={profileData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Enter emergency contact number"
              />
            </div>
          </CardContent>
        </Card>

        {/* Safety Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-safety" />
              Safety Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Safety Score</span>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-safety">
                  {profileData.safetyScore}%
                </div>
                <Badge variant="secondary" className="bg-safety/10 text-safety">
                  Excellent
                </Badge>
              </div>
            </div>
            <div className="mt-2 w-full bg-muted rounded-full h-2">
              <div 
                className="bg-safety h-2 rounded-full transition-all duration-300"
                style={{ width: `${profileData.safetyScore}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEdit;
