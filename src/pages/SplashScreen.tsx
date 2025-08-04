import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import todoLogo from '@/assets/todo-logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigate('/tasks');
      } else {
        navigate('/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="text-center animate-bounce-in">
        <div className="mb-8">
          <img 
            src={todoLogo} 
            alt="Todo Task Manager" 
            className="w-24 h-24 mx-auto mb-4 animate-pulse"
          />
        </div>
        <h1 className="text-4xl font-bold text-primary-foreground mb-2">
          Todo Task Manager
        </h1>
        <p className="text-primary-foreground/80 text-lg">
          Organize your life, one task at a time
        </p>
        <div className="mt-8">
          <div className="w-8 h-8 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;