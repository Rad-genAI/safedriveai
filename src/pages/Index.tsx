import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Eye, 
  Users, 
  BarChart3, 
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Monitor
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Real-time Eye Tracking',
      description: 'Advanced computer vision detects drowsiness and fatigue in real-time'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Instant Alerts',
      description: 'Immediate notifications for drivers and fleet managers when fatigue is detected'
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: 'Control Center',
      description: 'Centralized dashboard for monitoring multiple drivers simultaneously'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics & Reports',
      description: 'Comprehensive data logging and analysis of driver behavior patterns'
    }
  ];

  const stats = [
    { label: 'Accident Reduction', value: '78%', color: 'text-safe' },
    { label: 'Response Time', value: '<2s', color: 'text-primary' },
    { label: 'Accuracy Rate', value: '94%', color: 'text-safe' },
    { label: 'Fleet Coverage', value: '24/7', color: 'text-primary' }
  ];


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-hero">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">DriveGuard</h1>
                <p className="text-xs text-muted-foreground">Driver Fatigue Detection System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="status-safe">
                <CheckCircle className="w-3 h-3 mr-1" />
                System Active
              </Badge>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Prevent Accidents<br />
            <span className="text-white/90">Before They Happen</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Advanced AI-powered driver fatigue detection system that monitors drivers in real-time 
            and alerts both drivers and fleet managers to prevent accidents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90"
              onClick={() => navigate('/driver')}
            >
              Driver Interface
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/control')}
            >
              Control Center
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How DriveGuard Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive system monitors, alerts, and protects your drivers 24/7
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-status transition-smooth hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 gradient-hero rounded-full flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose your interface to begin monitoring driver safety in real-time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/driver')}
            >
              <Users className="w-5 h-5 mr-2" />
              Driver Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/control')}
            >
              <Monitor className="w-5 h-5 mr-2" />
              Control Center
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-semibold">DriveGuard</span>
          </div>
          <p className="text-muted-foreground">
            Advanced Driver Fatigue Detection System - Keeping roads safer, one driver at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
