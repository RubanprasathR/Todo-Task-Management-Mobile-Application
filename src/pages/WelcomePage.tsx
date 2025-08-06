import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Target, ArrowRight } from 'lucide-react';
import todoLogo from '@/assets/todo-logo.png';

const WelcomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Simple Task Management",
      description: "Add, edit, and complete tasks easily"
    },
    {
      icon: <Calendar className="w-6 h-6 text-secondary" />,
      title: "Due Dates",
      description: "Keep track of important deadlines"
    },
    {
      icon: <Target className="w-6 h-6 text-accent" />,
      title: "Priority Levels",
      description: "Focus on what matters most"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col items-center justify-center p-4">
      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
        
        {/* Header */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-2xl">
              <img 
                src={todoLogo} 
                alt="Todo Task Manager" 
                className="w-16 h-16"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Todo Task Manager
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay organized and productive with our simple task management app
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-background/80 p-3 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-6">
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Ready to start?
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Get organized in seconds
            </p>
            <Button 
              onClick={() => navigate('/login')}
              className="w-full group"
              size="lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Simple Footer */}
          <p className="text-xs text-muted-foreground/60">
            Simple • Fast • Reliable
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;