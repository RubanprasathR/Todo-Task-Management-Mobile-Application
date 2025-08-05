import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('todo-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem('todo-user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem('todo-user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate Google login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: 'google-1',
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=google-user`
      };
      
      setUser(mockUser);
      localStorage.setItem('todo-user', JSON.stringify(mockUser));
      // Save Google email as recent login email
      localStorage.setItem('recentLoginEmail', mockUser.email);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('todo-user');
  };

  const value = {
    user,
    login,
    signup,
    loginWithGoogle,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};