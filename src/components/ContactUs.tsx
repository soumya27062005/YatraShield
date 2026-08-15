import React, { useState } from 'react';
import { ArrowLeft, Send, Phone, Mail, MapPin, Clock, MessageCircle, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ContactUsProps {
  onBack: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
        priority: 'medium'
      });
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: '24/7 Emergency Helpline',
      value: '+91 1800-112-100',
      description: 'Immediate assistance for emergencies',
      color: 'text-danger',
      bgColor: 'bg-danger/10'
    },
    {
      icon: Mail,
      title: 'Email Support',
      value: 'yatrashield@gmail.com',
      description: 'General inquiries and support',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      value: '+91 98791 52484',
      description: 'Quick chat support',
      color: 'text-safety',
      bgColor: 'bg-safety/10'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      value: 'Ahmedabad, India',
      description: 'Ministry of Tourism office',
      color: 'text-saffron',
      bgColor: 'bg-saffron/10'
    }
  ];

  const faqItems = [
    {
      question: 'How do I activate SOS alerts?',
      answer: 'Hold the SOS button for 3 seconds or use the quick action in your profile.',
      category: 'Emergency'
    },
    {
      question: 'Can I use YatraShield offline?',
      answer: 'Core safety features work offline, but some features require internet connectivity.',
      category: 'Technical'
    },
    {
      question: 'How is my location data protected?',
      answer: 'All location data is encrypted and only shared with authorized emergency contacts.',
      category: 'Privacy'
    },
    {
      question: 'What languages are supported?',
      answer: 'YatraShield supports 8+ Indian languages including Hindi, Gujarati, English, and more.',
      category: 'General'
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
            <h1 className="text-xl font-semibold text-foreground">Contact Us</h1>
          </div>
          <Badge variant="secondary" className="bg-safety/10 text-safety">
            <Clock className="h-3 w-3 mr-1" />
            24/7 Support
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactMethods.map((method, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${method.bgColor}`}>
                    <method.icon className={`h-5 w-5 ${method.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{method.title}</h3>
                    <p className="text-sm font-medium text-primary mt-1">{method.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency Support</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="privacy">Privacy Concern</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief subject line"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Describe your inquiry or issue in detail..."
                  rows={5}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                  </div>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {faq.category}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Office Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Support Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Emergency Support</span>
              <Badge className="bg-danger/10 text-danger">24/7 Available</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">General Support</span>
              <span className="text-sm text-muted-foreground">9:00 AM - 9:00 PM IST</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Technical Support</span>
              <span className="text-sm text-muted-foreground">Mon-Fri, 10:00 AM - 6:00 PM IST</span>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Expectations */}
        <Card>
          <CardHeader>
            <CardTitle>Expected Response Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { type: 'Emergency', time: 'Immediate', color: 'text-danger' },
              { type: 'Urgent', time: 'Within 2 hours', color: 'text-warning' },
              { type: 'High Priority', time: 'Within 24 hours', color: 'text-saffron' },
              { type: 'General', time: 'Within 48 hours', color: 'text-primary' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.type}</span>
                <span className={`text-sm font-medium ${item.color}`}>{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactUs;
