import React, { createContext, useContext, useState } from 'react';
import axiosInstance from '../core/api/stipex';

interface StipexContextType {
  enableProtection: () => Promise<void>;
}

const StipexContext = createContext<StipexContextType | undefined>(undefined);

export const StipexProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const enableProtection = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/protection');
      console.log(response.data);
    } catch (error) {
      console.error('Error enabling protection', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StipexContext.Provider value={{ enableProtection }}>
      {children}
    </StipexContext.Provider>
  );
};

export const useStipex = () => {
  const context = useContext(StipexContext);
  if (!context) {
    throw new Error('useStipex must be used within a StipexProvider');
  }
  return context;
};
