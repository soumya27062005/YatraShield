import React from 'react';
import { Shield, Phone, Mail, MapPin, ExternalLink, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Access',
      links: [
        { label: 'Emergency Numbers', action: () => onNavigate('emergency-numbers') },
        { label: 'Contact Us', action: () => onNavigate('contact-us') },
        { label: 'Safety Guidelines', action: () => onNavigate('safety-guidelines') },
        { label: 'Report Incident', action: () => onNavigate('report-incident') },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', action: () => onNavigate('help') },
        { label: 'Tourist Assistance', action: () => onNavigate('assistance') },
        { label: 'Live Chat', action: () => onNavigate('chat') },
        { label: 'Feedback', action: () => onNavigate('feedback') },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Travel Tips', action: () => onNavigate('travel-tips') },
        { label: 'Safe Zones Map', action: () => onNavigate('map') },
        { label: 'Weather Updates', action: () => onNavigate('weather') },
        { label: 'Local Guides', action: () => onNavigate('guides') },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', action: () => onNavigate('privacy') },
        { label: 'Terms of Service', action: () => onNavigate('terms') },
        { label: 'Data Protection', action: () => onNavigate('data-protection') },
        { label: 'Accessibility', action: () => onNavigate('accessibility') },
      ]
    }
  ];

  const importantContacts = [
    {
      icon: Phone,
      label: 'Emergency Helpline',
      value: '112',
      description: 'Unified emergency number',
      color: 'text-danger'
    },
    {
      icon: Phone,
      label: 'Tourist Helpline',
      value: '1363',
      description: '24/7 tourism assistance',
      color: 'text-primary'
    },
    {
      icon: Mail,
      label: 'Support Email',
      value: 'yatrashield@gmail.com',
      description: 'General inquiries',
      color: 'text-safety'
    }
  ];

  const governmentPartners = [
    'Ministry of Tourism, Government of India',
    'Ministry of Home Affairs',
    'National Disaster Management Authority',
    'Indian Railways',
    'State Tourism Departments'
  ];

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="p-6 space-y-8">
        {/* Important Contacts Banner */}
        <div className="bg-gradient-to-r from-danger/10 via-primary/10 to-safety/10 rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Phone className="h-5 w-5 text-danger" />
            Emergency Contacts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {importantContacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-3">
                <contact.icon className={`h-4 w-4 ${contact.color}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{contact.value}</p>
                  <p className="text-xs text-muted-foreground">{contact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-primary justify-start"
                      onClick={link.action}
                    >
                      {link.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        {/* Government Partners */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Government Partners
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {governmentPartners.map((partner, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-primary rounded-full" />
                <span className="text-sm text-muted-foreground">{partner}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* App Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">YatraShield</span>
            <div className="w-2 h-2 bg-safety rounded-full animate-pulse" />
          </div>
          
          <p className="text-sm text-muted-foreground max-w-2xl">
            YatraShield is India's comprehensive tourist safety platform, developed in partnership with 
            the Government of India to ensure secure and memorable travel experiences for all visitors.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Available in 8+ Indian languages
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Trusted by 50,000+ tourists
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Covering 28 states & 8 UTs
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© {currentYear} YatraShield</span>
            <span>|</span>
            <span>Government of India Initiative</span>
            <span>|</span>
            <span>Made with</span>
            <Heart className="h-3 w-3 text-danger fill-current" />
            <span>for safe travels</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              App Store
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              Play Store
            </Button>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Version 2.1.0 | Build 2025.08.31 | Powered by Soumya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
