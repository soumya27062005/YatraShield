import { useState } from 'react';
import { LayoutDashboard, Users, MapPin, AlertTriangle, Settings, BarChart3, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from './Header';
import AdminDashboard from './AdminDashboard';

type AdminTab = 'dashboard' | 'incidents' | 'tourists' | 'zones' | 'analytics' | 'settings';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'incidents':
        return <IncidentManagement />;
      case 'tourists':
        return <TouristManagement />;
      case 'zones':
        return <ZoneManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType="admin" notifications={7} />
      
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-card border-r border-border h-[calc(100vh-73px)] p-4">
          <div className="space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'incidents', icon: AlertTriangle, label: 'Incidents' },
              { id: 'tourists', icon: Users, label: 'Tourists' },
              { id: 'zones', icon: MapPin, label: 'Safety Zones' },
              { id: 'analytics', icon: BarChart3, label: 'Analytics' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map(({ id, icon: Icon, label }) => (
              <Button
                key={id}
                variant="ghost"
                onClick={() => setActiveTab(id as AdminTab)}
                className={`w-full justify-start ${
                  activeTab === id 
                    ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4 mr-3" />
                {label}
              </Button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto max-h-[calc(100vh-73px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Placeholder components for other admin sections
const IncidentManagement = () => (
  <div className="text-center py-12">
    <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Incident Management</h2>
    <p className="text-muted-foreground">Detailed incident response and case management system</p>
  </div>
);

const TouristManagement = () => (
  <div className="text-center py-12">
    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Tourist Management</h2>
    <p className="text-muted-foreground">Digital ID verification and tourist tracking system</p>
  </div>
);

const ZoneManagement = () => (
  <div className="text-center py-12">
    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Safety Zone Management</h2>
    <p className="text-muted-foreground">Configure and manage geo-fenced safety zones</p>
  </div>
);

const Analytics = () => (
  <div className="text-center py-12">
    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Analytics & Reports</h2>
    <p className="text-muted-foreground">Comprehensive safety analytics and reporting dashboard</p>
  </div>
);

const SystemSettings = () => (
  <div className="text-center py-12">
    <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
    <h2 className="text-2xl font-semibold mb-2">System Settings</h2>
    <p className="text-muted-foreground">Configure system parameters and user permissions</p>
  </div>
);

export default AdminPanel;
