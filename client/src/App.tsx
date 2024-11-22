import React, { createContext, useContext, useEffect, useState } from 'react';
import devConfig from './dev.json';
import { CatalogsPage } from './pages/CatalogsPage';
import { Locale, Vertical } from "./types";
import PagesRouter from './PagesRouter';

// Define the type for global context
export type GlobalContextType = {
  locales: Locale[]; 
  verticals: Vertical[];     
};

// Create the context with null as the initial value
export const GlobalContext = createContext<GlobalContextType | null>(null);

export function useGlobalContext() {
  return useContext(GlobalContext);
}

const App: React.FC = () => {
  const { API_URL } = devConfig;

  const [metaData, setMetaData] = useState<GlobalContextType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        
        setMetaData({
          locales: result.locales,
          verticals: result.verticals
        });
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <GlobalContext.Provider value={metaData}>
      <PagesRouter />
    </GlobalContext.Provider>
  );
};

export default App;
