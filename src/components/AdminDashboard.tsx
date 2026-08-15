import { useState } from 'react';
import { Users, AlertTriangle, Shield, MapPin, TrendingUp, Clock, CheckCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DashboardStats {
  activeTourists: number;
  safeZones: number;
  warningZones: number;
  dangerZones: number;
  activeIncidents: number;
  resolvedToday: number;
  avgResponseTime: string;
  safetyScore: number;
}

interface IncidentAlert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  location: string;
  tourist: string;
  time: string;
  status: 'new' | 'assigned' | 'investigating' | 'resolved';
  responder?: string;
}

const mockStats: DashboardStats = {
  activeTourists: 2847,
  safeZones: 156,
  warningZones: 23,
  dangerZones: 4,
  activeIncidents: 12,
  resolvedToday: 45,
  avgResponseTime: '4.2 mins',
  safetyScore: 94
};

const mockIncidents: IncidentAlert[] = [
  {
    id: 'INC-2024-001',
    type: 'Theft',
    severity: 'high',
    location: 'Lal Darwaza Market',
    tourist: 'Radhika Mehra',
    time: '14:35',
    status: 'new'
  },
  {
    id: 'INC-2024-002',
    type: 'Medical',
    severity: 'emergency',
    location: 'River-Front Area',
    tourist: 'Rushan Raza',
    time: '14:28',
    status: 'assigned',
    responder: 'Unit-47'
  },
  {
    id: 'INC-2024-003',
    type: 'Harassment',
    severity: 'medium',
    location: 'Narol',
    tourist: 'Priyanka Mishra',
    time: '14:15',
    status: 'investigating',
    responder: 'Unit-23'
  }
];

const AdminDashboard = () => {
  const [selectedIncident, setSelectedIncident] = useState<IncidentAlert | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-safety text-safety-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-saffron text-saffron-foreground';
      case 'emergency': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-danger text-danger-foreground';
      case 'assigned': return 'bg-saffron text-saffron-foreground';
      case 'investigating': return 'bg-warning text-warning-foreground';
      case 'resolved': return 'bg-safety text-safety-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Tourists */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Tourists</p>
                <p className="text-2xl font-bold">{mockStats.activeTourists.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-safety">
                  <TrendingUp className="h-3 w-3" />
                  +12% from yesterday
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Zones */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Safety Zones</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-safety">{mockStats.safeZones}</span>
                  <span className="text-sm text-warning">{mockStats.warningZones}</span>
                  <span className="text-sm text-danger">{mockStats.dangerZones}</span>
                </div>
                <p className="text-xs text-muted-foreground">Safe / Warning / Danger</p>
              </div>
              <div className="w-12 h-12 bg-safety/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-safety" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Incidents */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Incidents</p>
                <p className="text-2xl font-bold text-danger">{mockStats.activeIncidents}</p>
                <p className="text-xs text-safety">
                  {mockStats.resolvedToday} resolved today
                </p>
              </div>
              <div className="w-12 h-12 bg-danger/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-danger" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">{mockStats.avgResponseTime}</p>
                <div className="flex items-center gap-1 text-xs text-safety">
                  <TrendingUp className="h-3 w-3 rotate-180" />
                  -15% improvement
                </div>
              </div>
              <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-saffron" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-safety" />
            Overall Safety Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-safety">{mockStats.safetyScore}%</span>
              <Badge className="bg-safety text-safety-foreground">Excellent</Badge>
            </div>
            <Progress value={mockStats.safetyScore} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Based on incident reports, response times, and tourist feedback
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Incident Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-danger" />
              Live Incident Monitor
            </div>
            <Badge className="bg-danger/10 text-danger">
              {mockIncidents.filter(i => i.status === 'new').length} New Alerts
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockIncidents.map((incident) => (
              <div 
                key={incident.id}
                className="border rounded-lg p-4 space-y-3 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => setSelectedIncident(incident)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                    <span className="font-medium">{incident.type}</span>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {incident.time}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span>{incident.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-primary" />
                    <span>{incident.tourist}</span>
                  </div>
                </div>

                {incident.responder && (
                  <div className="text-sm text-safety">
                    Assigned to: {incident.responder}
                  </div>
                )}

                <div className="flex gap-2">
                  {incident.status === 'new' && (
                    <Button size="sm" className="bg-saffron hover:bg-saffron-dark">
                      Assign Responder
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  {incident.status !== 'resolved' && (
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Mark Resolved
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tourist Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Tourist Density Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
            
            {/* Mock map with density indicators */}
            <div className="absolute inset-0 india-pattern opacity-20" />
            
            {/* High density areas */}
            <div className="absolute top-8 left-12 w-16 h-16 bg-danger/30 rounded-full animate-pulse" />
            <div className="absolute top-12 right-16 w-12 h-12 bg-warning/30 rounded-full animate-pulse" />
            <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-safety/30 rounded-full animate-pulse" />
            <div className="absolute bottom-12 right-8 w-14 h-14 bg-saffron/30 rounded-full animate-pulse" />
            
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-primary/50 mx-auto" />
              <p className="text-sm text-muted-foreground">Real-time tourist distribution</p>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-danger rounded-full" />
                  <span>High Density</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-warning rounded-full" />
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-safety rounded-full" />
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
