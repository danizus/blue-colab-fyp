import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserRole, JobSeekerProfile, RecruiterProfile } from '@/types';
import { mockJobSeeker, mockRecruiter } from '@/data/mockData';

type AuthUser = JobSeekerProfile | RecruiterProfile;

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole, extra?: Record<string, any>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (role === 'jobseeker') {
      setUser({ ...mockJobSeeker, email });
    } else {
      setUser({ ...mockRecruiter, email });
    }
  }, []);

  const signup = useCallback(async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole,
    extra?: Record<string, any>
  ) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (role === 'jobseeker') {
      setUser({
        ...mockJobSeeker,
        id: `js-${Date.now()}`,
        email,
        name,
        profileCompleteness: 20,
        skills: []
      });
    } else {
      setUser({
        ...mockRecruiter,
        id: `rec-${Date.now()}`,
        email,
        name,
        company: extra?.company || 'Your Company',
        jobsPosted: 0
      });
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
