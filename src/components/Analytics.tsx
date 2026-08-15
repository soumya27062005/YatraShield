import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Users, MapPin, AlertTriangle, Calendar, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  onBack: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ onBack }) => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for charts
  const safetyTrends = [
    { date: '2024-01-01', safe: 85, warning: 12, danger: 3 },
    { date: '2024-01-02', safe: 88, warning: 10, danger: 2 },
    { date: '2024-01-03', safe: 82, warning: 15, danger: 3 },
    { date: '2024-01-04', safe: 90, warning: 8, danger: 2 },
    { date: '2024-01-05', safe: 87, warning: 11, danger: 2 },
    { date: '2024-01-06', safe: 91, warning: 7, danger: 2 },
    { date: '2024-01-07', safe: 89, warning: 9, danger: 2 },
  ];

  const touristData = [
    { location: 'Mumbai', tourists: 1200 },
    { location: 'Delhi', tourists: 980 },
    { location: 'Goa', tourists: 756 },
    { location: 'Jaipur', tourists: 654 },
    { location: 'Ahmedabad', tourists: 543 },
    { location: 'Agra', tourists: 432 },
  ];

  const incidentTypes = [
    { name: 'Lost Item', value: 35, color: '#f59e0b' },
    { name: 'Medical', value: 25, color: '#ef4444' },
    { name: 'Theft', value: 20, color: '#dc2626' },
    { name: 'Transport', value: 15, color: '#3b82f6' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  const responseTimeData = [
    { hour: '00:00', time: 3.2 },
    { hour: '06:00', time: 2.8 },
    { hour: '12:00', time: 4.1 },
    { hour: '18:00', time: 3.7 },
    { hour: '24:00', time: 3.0 },
  ];

  const stats = [
    {
      title: 'Total Tourists',
      value: '4,562',
      change: '+12.5%',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Active Incidents',
      value: '23',
      change: '-8.3%',
      icon: AlertTriangle,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Safe Zones',
      value: '156',
      change: '+3.2%',
      icon: MapPin,
      color: 'text-safety',
      bgColor: 'bg-safety/10'
    },
    {
      title: 'Avg Response Time',
      value: '3.2 min',
      change: '-15.7%',
      icon: TrendingUp,
      color: 'text-saffron',
      bgColor: 'bg-saffron/10'
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
            <h1 className="text-xl font-semibold text-foreground">Analytics Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Safety Zone Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={safetyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="safe" stackId="1" stroke="hsl(var(--safety))" fill="hsl(var(--safety) / 0.3)" />
                <Area type="monotone" dataKey="warning" stackId="1" stroke="hsl(var(--warning))" fill="hsl(var(--warning) / 0.3)" />
                <Area type="monotone" dataKey="danger" stackId="1" stroke="hsl(var(--danger))" fill="hsl(var(--danger) / 0.3)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tourist Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Tourist Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={touristData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tourists" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Incident Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Incident Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={incidentTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {incidentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Response Time Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-saffron" />
                Response Time Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="time" stroke="hsl(var(--saffron))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'incident', message: 'New incident reported in Mumbai', time: '2 min ago', color: 'text-danger' },
                  { type: 'tourist', message: 'New tourist registered from Delhi', time: '5 min ago', color: 'text-primary' },
                  { type: 'safety', message: 'Safety zone updated in Goa', time: '12 min ago', color: 'text-safety' },
                  { type: 'alert', message: 'Weather alert issued for Ahmedabad', time: '18 min ago', color: 'text-warning' },
                  { type: 'resolved', message: 'Incident resolved in Jaipur', time: '25 min ago', color: 'text-safety' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className={`text-xs ${activity.color}`}>{activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
