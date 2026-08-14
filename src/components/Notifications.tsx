import React, { useState } from 'react';
import { ArrowLeft, Bell, BellRing, AlertTriangle, Shield, MapPin, Clock, MoreVertical, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface NotificationsProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'emergency' | 'safety' | 'info' | 'warning' | 'success';
  timestamp: Date;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  location?: string;
  actionUrl?: string;
}

const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Emergency Alert',
      message: 'Heavy rainfall warning issued for your area. Please stay indoors and avoid travel.',
      type: 'emergency',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
      priority: 'high',
      location: 'Mumbai, Maharashtra'
    },
    {
      id: '2',
      title: 'Safety Zone Update',
      message: 'New safe zone added near your location: Tourist Information Center',
      type: 'safety',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isRead: false,
      priority: 'medium',
      location: 'Colaba, Mumbai'
    },
    {
      id: '3',
      title: 'SOS Alert Resolved',
      message: 'Your SOS alert has been successfully resolved. Thank you for using YatraShield.',
      type: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Travel Advisory',
      message: 'Road closure on NH-8 due to construction work. Plan alternate routes.',
      type: 'warning',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: true,
      priority: 'medium',
      location: 'NH-8, Gujarat'
    },
    {
      id: '5',
      title: 'Profile Verification',
      message: 'Your profile has been successfully verified. You now have access to all premium features.',
      type: 'success',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      priority: 'low'
    },
    {
      id: '6',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM IST. Some features may be unavailable.',
      type: 'info',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      priority: 'low'
    },
    {
      id: '7',
      title: 'Location Alert',
      message: 'You have entered a high-risk area. Please exercise extra caution and stay alert.',
      type: 'warning',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isRead: true,
      priority: 'high',
      location: 'Delhi NCR'
    },
    {
      id: '8',
      title: 'Feature Update',
      message: 'New features available: Enhanced QR code sharing and improved location tracking.',
      type: 'info',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      isRead: true,
      priority: 'low'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'emergency': return AlertTriangle;
      case 'safety': return Shield;
      case 'warning': return AlertTriangle;
      case 'success': return Shield;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'text-danger bg-danger/10 border-danger/20';
      case 'safety': return 'text-safety bg-safety/10 border-safety/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'success': return 'text-safety bg-safety/10 border-safety/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge className="bg-danger/10 text-danger">High</Badge>;
      case 'medium': return <Badge className="bg-warning/10 text-warning">Medium</Badge>;
      default: return <Badge variant="secondary">Low</Badge>;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: false } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read.",
    });
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (activeTab) {
      case 'unread': return !notif.isRead;
      case 'emergency': return notif.type === 'emergency';
      case 'safety': return notif.type === 'safety';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="bg-danger text-danger-foreground">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="emergency">
              Emergency
            </TabsTrigger>
            <TabsTrigger value="safety">
              Safety
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {activeTab === 'unread' ? 'No unread notifications' : 'No notifications found'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => {
                const IconComponent = getNotificationIcon(notification.type);
                return (
                  <Card 
                    key={notification.id}
                    className={`transition-all hover:shadow-md ${
                      !notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-semibold text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </h3>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                )}
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTimestamp(notification.timestamp)}
                                </div>
                                
                                {notification.location && (
                                  <>
                                    <Separator orientation="vertical" className="h-3" />
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {notification.location}
                                    </div>
                                  </>
                                )}
                                
                                <Separator orientation="vertical" className="h-3" />
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {notification.isRead ? (
                                  <DropdownMenuItem onClick={() => markAsUnread(notification.id)}>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Mark as unread
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    <Bell className="h-4 w-4 mr-2" />
                                    Mark as read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem 
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;
