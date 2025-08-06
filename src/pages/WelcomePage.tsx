import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Calendar, Target, Star, ArrowRight } from 'lucide-react';
import todoLogo from '@/assets/todo-logo.png';

const WelcomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Smart Task Management",
      description: "Organize your tasks with priority levels, due dates, and completion tracking."
    },
    {
      icon: <Calendar className="w-8 h-8 text-secondary" />,
      title: "Due Date Reminders",
      description: "Never miss a deadline with our intuitive date tracking system."
    },
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "Priority System",
      description: "Focus on what matters most with our color-coded priority levels."
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Beautiful Interface",
      description: "Enjoy a clean, modern design that makes task management a pleasure."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <div className="text-center pt-8 sm:pt-16 pb-6 sm:pb-8 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 gap-2 sm:gap-4">
          <img 
            src={todoLogo} 
            alt="Todo Task Manager" 
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
          <h1 className="text-2xl sm:text-4xl font-bold text-primary-foreground text-center">
            Todo Task Manager
          </h1>
        </div>
        <p className="text-base sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto px-4 sm:px-6">
          Transform your productivity with our intuitive task management platform. 
          Organize, prioritize, and accomplish your goals effortlessly.
        </p>
      </div>

      {/* Features Grid */}
      <div className="flex-1 px-4 sm:px-6 pb-8 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary-foreground mb-8 sm:mb-12">
            Everything you need to stay organized
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      {feature.icon}
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-semibold text-primary-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-primary-foreground/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-4">
                Ready to get started?
              </h3>
              <p className="text-sm sm:text-base text-primary-foreground/80 mb-6 sm:mb-8 max-w-md mx-auto">
                Join thousands of users who have transformed their productivity with our task management solution.
              </p>
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => navigate('/login')}
                className="group w-full sm:w-auto"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 sm:py-6 border-t border-white/20 px-4">
        <p className="text-xs sm:text-sm text-primary-foreground/60">
          © 2024 Todo Task Manager. Built with ❤️ for productivity enthusiasts.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;