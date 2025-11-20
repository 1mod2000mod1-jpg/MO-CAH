import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Investment } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  investments: Investment[];
  addInvestment: (investment: Omit<Investment, 'id' | 'userId'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('moneycash_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      loadInvestments(userData.id);
    }
  }, []);

  const loadInvestments = (userId: string) => {
    const saved = localStorage.getItem(`moneycash_investments_${userId}`);
    if (saved) {
      setInvestments(JSON.parse(saved));
    }
  };

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('moneycash_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name, createdAt: foundUser.createdAt };
      setUser(userData);
      localStorage.setItem('moneycash_user', JSON.stringify(userData));
      loadInvestments(foundUser.id);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    const users = JSON.parse(localStorage.getItem('moneycash_users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('moneycash_users', JSON.stringify(users));
    
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name, createdAt: newUser.createdAt };
    setUser(userData);
    localStorage.setItem('moneycash_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setInvestments([]);
    localStorage.removeItem('moneycash_user');
  };

  const addInvestment = (investment: Omit<Investment, 'id' | 'userId'>) => {
    if (!user) return;

    const newInvestment: Investment = {
      ...investment,
      id: Date.now().toString(),
      userId: user.id
    };

    const updated = [...investments, newInvestment];
    setInvestments(updated);
    localStorage.setItem(`moneycash_investments_${user.id}`, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, investments, addInvestment }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
