import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Shield, Globe, Moon, Sun, Volume2, VolumeX, MapPin, Smartphone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    // Notifications
    pushNotifications: true,
    emergencyAlerts: true,
    safetyUpdates: true,
    locationAlerts: true,
    incidentReports: false,
    
    // Privacy & Security
    locationSharing: true,
    profileVisibility: 'public',
    dataCollection: true,
    biometricAuth: false,
    
    // App Settings
    darkMode: false,
    language: 'en',
    autoLocation: true,
    soundEnabled: true,
    
    // Emergency Settings
    sosTimeout: '5',
    emergencyContacts: true,
    autoShare: true,
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive app notifications' },
        { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Critical safety alerts', badge: 'Important' },
        { key: 'safetyUpdates', label: 'Safety Updates', description: 'Zone and location updates' },
        { key: 'locationAlerts', label: 'Location Alerts', description: 'Alerts based on your location' },
        { key: 'incidentReports', label: 'Incident Reports', description: 'Nearby incident notifications' },
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { key: 'locationSharing', label: 'Location Sharing', description: 'Share location with emergency contacts' },
        { key: 'dataCollection', label: 'Data Collection', description: 'Help improve YatraShield' },
        { key: 'biometricAuth', label: 'Biometric Authentication', description: 'Use fingerprint/face unlock' },
      ]
    },
    {
      title: 'App Preferences',
      icon: Smartphone,
      items: [
        { key: 'autoLocation', label: 'Auto Location Detection', description: 'Automatically detect your location' },
        { key: 'soundEnabled', label: 'Sound Effects', description: 'App sounds and alerts' },
      ]
    },
    {
      title: 'Emergency Settings',
      icon: Shield,
      items: [
        { key: 'emergencyContacts', label: 'Emergency Contacts', description: 'Auto-notify emergency contacts' },
        { key: 'autoShare', label: 'Auto Share Location', description: 'Share location during SOS' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Theme Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.darkMode ? (
                  <Moon className="h-5 w-5 text-primary" />
                ) : (
                  <Sun className="h-5 w-5 text-saffron" />
                )}
                <div>
                  <Label className="text-base font-medium">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    {settings.darkMode ? 'Dark mode' : 'Light mode'}
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <Label className="text-base font-medium">Language</Label>
                  <p className="text-sm text-muted-foreground">App display language</p>
                </div>
              </div>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                  <SelectItem value="mr">मराठी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                  <SelectItem value="gu">ગુજરાતી</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Label className="text-base font-medium">{item.label}</Label>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs bg-danger/10 text-danger">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <Switch
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                    />
                  </div>
                  {itemIndex < section.items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Who can see your profile</p>
              </div>
              <Select 
                value={settings.profileVisibility} 
                onValueChange={(value) => handleSettingChange('profileVisibility', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="contacts">Contacts Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">SOS Timeout</Label>
                <p className="text-sm text-muted-foreground">Seconds before auto-activation</p>
              </div>
              <Select 
                value={settings.sosTimeout} 
                onValueChange={(value) => handleSettingChange('sosTimeout', value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3s</SelectItem>
                  <SelectItem value="5">5s</SelectItem>
                  <SelectItem value="10">10s</SelectItem>
                  <SelectItem value="15">15s</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              About YatraShield
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-medium">2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Build</span>
              <span className="text-sm font-medium">2024.01.15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Platform</span>
              <span className="text-sm font-medium">Capacitor</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <Button variant="outline" className="w-full">
            Export My Data
          </Button>
          <Button variant="outline" className="w-full">
            Reset to Defaults
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
