import { createContext, useContext, useState, ReactNode } from "react";

interface EmissionsData {
  transport: number;
  waste: number;
  energy: number;
}

interface EmissionsContextType {
  emissions: EmissionsData;
  setTransportEmissions: (value: number) => void;
  setWasteEmissions: (value: number) => void;
  setEnergyEmissions: (value: number) => void;
  clearAllEmissions: () => void;
  totalEmissions: number;
}

const EmissionsContext = createContext<EmissionsContextType | undefined>(undefined);

export function EmissionsProvider({ children }: { children: ReactNode }) {
  const [emissions, setEmissions] = useState<EmissionsData>({
    transport: 0,
    waste: 0,
    energy: 0,
  });

  const setTransportEmissions = (value: number) => {
    setEmissions(prev => ({ ...prev, transport: value }));
  };

  const setWasteEmissions = (value: number) => {
    setEmissions(prev => ({ ...prev, waste: value }));
  };

  const setEnergyEmissions = (value: number) => {
    setEmissions(prev => ({ ...prev, energy: value }));
  };

  const clearAllEmissions = () => {
    setEmissions({ transport: 0, waste: 0, energy: 0 });
  };

  const totalEmissions = emissions.transport + emissions.waste + emissions.energy;

  return (
    <EmissionsContext.Provider value={{
      emissions,
      setTransportEmissions,
      setWasteEmissions,
      setEnergyEmissions,
      clearAllEmissions,
      totalEmissions,
    }}>
      {children}
    </EmissionsContext.Provider>
  );
}

export function useEmissions() {
  const context = useContext(EmissionsContext);
  if (!context) {
    throw new Error("useEmissions must be used within an EmissionsProvider");
  }
  return context;
}
