import React, { createContext, useContext, useState, useCallback } from 'react';
import { CURRENT_USER, User } from '@/constants/data';

type GameContextType = {
  user: User;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  totalXP: number;
  notifications: string[];
  dismissNotification: () => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [totalXP, setTotalXP] = useState(CURRENT_USER.xp);
  const [notifications, setNotifications] = useState<string[]>([]);

  const addXP = useCallback((amount: number) => {
    setTotalXP(prev => prev + amount);
    setUser(prev => {
      const newXP = prev.xp + amount;
      if (newXP >= prev.maxXp) {
        setNotifications(n => [...n, `Level Up! You reached level ${prev.level + 1}!`]);
        return { ...prev, xp: newXP - prev.maxXp, level: prev.level + 1, maxXp: Math.floor(prev.maxXp * 1.2) };
      }
      return { ...prev, xp: newXP };
    });
  }, []);

  const incrementStreak = useCallback(() => {
    setUser(prev => ({ ...prev, streak: prev.streak + 1 }));
    setNotifications(n => [...n, `🔥 ${user.streak + 1} day streak!`]);
  }, [user.streak]);

  const dismissNotification = useCallback(() => {
    setNotifications(prev => prev.slice(1));
  }, []);

  return (
    <GameContext.Provider value={{ user, addXP, incrementStreak, totalXP, notifications, dismissNotification }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
