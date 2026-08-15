import React, { useState } from 'react';
import { ArrowLeft, Phone, Star, Search, MapPin, Clock, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { callEmergencyNumber } from '@/utils/nativeUtils';

interface EmergencyNumbersProps {
  onBack: () => void;
}

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  category: string;
  description: string;
  availability: string;
  location?: string;
  priority: 'critical' | 'high' | 'medium';
  isTollFree: boolean;
}

const EmergencyNumbers: React.FC<EmergencyNumbersProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const emergencyContacts: EmergencyContact[] = [
    // National Emergency Numbers
    {
      id: '1',
      name: 'Police Emergency',
      number: '100',
      category: 'Police',
      description: 'Immediate police assistance for crimes and emergencies',
      availability: '24/7',
      priority: 'critical',
      isTollFree: true
    },
    {
      id: '2',
      name: 'Fire Emergency',
      number: '101',
      category: 'Fire',
      description: 'Fire department for fire emergencies and rescue',
      availability: '24/7',
      priority: 'critical',
      isTollFree: true
    },
    {
      id: '3',
      name: 'Medical Emergency',
      number: '108',
      category: 'Medical',
      description: 'Free emergency medical service and ambulance',
      availability: '24/7',
      priority: 'critical',
      isTollFree: true
    },
    {
      id: '4',
      name: 'Disaster Management',
      number: '112',
      category: 'Emergency',
      description: 'Unified emergency helpline for all emergencies',
      availability: '24/7',
      priority: 'critical',
      isTollFree: true
    },
    {
      id: '5',
      name: 'Women Helpline',
      number: '1091',
      category: 'Women Safety',
      description: 'National helpline for women in distress',
      availability: '24/7',
      priority: 'high',
      isTollFree: true
    },
    {
      id: '6',
      name: 'Child Helpline',
      number: '1098',
      category: 'Child Safety',
      description: 'Free emergency phone service for children',
      availability: '24/7',
      priority: 'high',
      isTollFree: true
    },
    {
      id: '7',
      name: 'Tourist Helpline',
      number: '1363',
      category: 'Tourism',
      description: 'Ministry of Tourism helpline for tourists',
      availability: '24/7',
      priority: 'high',
      isTollFree: true
    },
    {
      id: '8',
      name: 'Railway Enquiry',
      number: '139',
      category: 'Transport',
      description: 'Railway passenger enquiry and complaints',
      availability: '24/7',
      priority: 'medium',
      isTollFree: true
    },
    {
      id: '9',
      name: 'Road Accident Emergency',
      number: '1073',
      category: 'Transport',
      description: 'Highway patrol and road accident assistance',
      availability: '24/7',
      priority: 'high',
      isTollFree: true
    },
    {
      id: '10',
      name: 'Senior Citizen Helpline',
      number: '14567',
      category: 'Senior Care',
      description: 'Helpline for senior citizens',
      availability: '24/7',
      priority: 'medium',
      isTollFree: true
    },
    // State-specific numbers (sample)
    {
      id: '11',
      name: 'Ahmedabad Police Control Room',
      number: '100',
      category: 'Police',
      description: 'Ahmedabad police emergency control room',
      availability: '24/7',
      location: 'Ahmedabad',
      priority: 'critical',
      isTollFree: true
    },
    {
      id: '12',
      name: 'Delhi Police Control Room',
      number: '100',
      category: 'Police',
      description: 'Delhi police emergency control room',
      availability: '24/7',
      location: 'Delhi',
      priority: 'critical',
      isTollFree: true
    },
    {
      id: '13',
      name: 'Bengaluru Traffic Police',
      number: '103',
      category: 'Transport',
      description: 'Bengaluru traffic police assistance',
      availability: '24/7',
      location: 'Bengaluru',
      priority: 'medium',
      isTollFree: true
    },
    {
      id: '14',
      name: 'Kerala Police',
      number: '100',
      category: 'Police',
      description: 'Kerala state police emergency',
      availability: '24/7',
      location: 'Kerala',
      priority: 'critical',
      isTollFree: true
    },
    {
      id: '15',
      name: 'Goa Tourism Helpline',
      number: '0832-2438001',
      category: 'Tourism',
      description: 'Goa tourism assistance and information',
      availability: '9 AM - 6 PM',
      location: 'Goa',
      priority: 'medium',
      isTollFree: false
    }
  ];

  const categories = ['all', 'Police', 'Medical', 'Fire', 'Emergency', 'Women Safety', 'Tourism', 'Transport', 'Child Safety'];

  const filteredContacts = emergencyContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.number.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCall = (number: string, name: string) => {
    try {
      callEmergencyNumber(number);
      toast({
        title: "Calling Emergency Service",
        description: `Connecting to ${name}...`,
      });
    } catch (error) {
      toast({
        title: "Call Failed",
        description: "Unable to make the call. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyNumber = (number: string, name: string) => {
    navigator.clipboard.writeText(number);
    toast({
      title: "Number Copied",
      description: `${name} number copied to clipboard.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-danger bg-danger/10';
      case 'high': return 'text-warning bg-warning/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Police': return '👮';
      case 'Medical': return '🏥';
      case 'Fire': return '🔥';
      case 'Emergency': return '🚨';
      case 'Women Safety': return '👩';
      case 'Tourism': return '🏛️';
      case 'Transport': return '🚗';
      case 'Child Safety': return '👶';
      default: return '📞';
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
            <h1 className="text-xl font-semibold text-foreground">Emergency Numbers</h1>
          </div>
          <Badge variant="secondary" className="bg-danger/10 text-danger">
            <Phone className="h-3 w-3 mr-1" />
            India
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emergency services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category === 'all' ? 'All' : `${getCategoryIcon(category)} ${category}`}
              </Button>
            ))}
          </div>
        </div>

        {/* Critical Emergency Numbers at Top */}
        <Card className="border-danger/20 bg-danger/5">
          <CardHeader>
            <CardTitle className="text-danger flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Critical Emergency Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {emergencyContacts
                .filter(contact => contact.priority === 'critical')
                .slice(0, 4)
                .map((contact) => (
                  <Button
                    key={contact.id}
                    variant="outline"
                    className="h-auto p-3 flex-col gap-1 border-danger/30 hover:bg-danger/10"
                    onClick={() => handleCall(contact.number, contact.name)}
                  >
                    <span className="text-lg font-bold text-danger">{contact.number}</span>
                    <span className="text-xs text-center">{contact.name}</span>
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* All Emergency Contacts */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">All Emergency Services</h2>
          
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getCategoryIcon(contact.category)}</span>
                      <h3 className="font-semibold text-foreground">{contact.name}</h3>
                      <Badge className={`text-xs ${getPriorityColor(contact.priority)}`}>
                        {contact.priority}
                      </Badge>
                      {contact.isTollFree && (
                        <Badge variant="secondary" className="text-xs bg-safety/10 text-safety">
                          Toll Free
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {contact.availability}
                      </div>
                      {contact.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {contact.location}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => handleCall(contact.number, contact.name)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      {contact.number}
                    </Button>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyNumber(contact.number, contact.name)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-8">
            <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No emergency numbers found matching your search.</p>
          </div>
        )}

        {/* Important Notes */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>• All emergency numbers are available 24/7 unless otherwise specified</p>
            <p>• Keep your location services enabled for faster emergency response</p>
            <p>• Save important numbers in your phone's emergency contacts list</p>
            <p>• Some services may have language preferences - specify your preferred language</p>
            <p>• For tourists: Always inform the operator that you are a foreign tourist</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyNumbers;
