import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

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
  monthlyTarget: number;
  setMonthlyTarget: (value: number) => void;
  isLoading: boolean;
}

const EmissionsContext = createContext<EmissionsContextType | undefined>(undefined);

export function EmissionsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [emissions, setEmissions] = useState<EmissionsData>({
    transport: 0,
    waste: 0,
    energy: 0,
  });
  const [monthlyTarget, setMonthlyTargetState] = useState(300);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch emissions data when user logs in
  useEffect(() => {
    if (user) {
      fetchEmissions();
      fetchMonthlyTarget();
    } else {
      // Reset when logged out
      setEmissions({ transport: 0, waste: 0, energy: 0 });
      setMonthlyTargetState(300);
    }
  }, [user]);

  const fetchEmissions = async () => {
    if (!user) return;
    setIsLoading(true);

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('emissions')
      .select('category, amount')
      .eq('user_id', user.id)
      .gte('date', firstDayOfMonth);

    if (error) {
      console.error('Error fetching emissions:', error);
      setIsLoading(false);
      return;
    }

    // Aggregate emissions by category
    const aggregated = { transport: 0, waste: 0, energy: 0 };
    data?.forEach((entry) => {
      if (entry.category === 'transportation') {
        aggregated.transport += Number(entry.amount);
      } else if (entry.category === 'waste') {
        aggregated.waste += Number(entry.amount);
      } else if (entry.category === 'energy') {
        aggregated.energy += Number(entry.amount);
      }
    });

    setEmissions(aggregated);
    setIsLoading(false);
  };

  const fetchMonthlyTarget = async () => {
    if (!user) return;

    const today = new Date();
    // Use UTC to avoid timezone issues
    const firstDayOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;

    const { data, error } = await supabase
      .from('monthly_targets')
      .select('target_amount')
      .eq('user_id', user.id)
      .eq('month', firstDayOfMonth)
      .maybeSingle();

    if (error) {
      console.error('Error fetching monthly target:', error);
      return;
    }

    if (data) {
      setMonthlyTargetState(Number(data.target_amount));
    }
  };

  const saveEmission = async (category: 'energy' | 'transportation' | 'waste', amount: number) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];

    // Check if there's an existing entry for today
    const { data: existing } = await supabase
      .from('emissions')
      .select('id, amount')
      .eq('user_id', user.id)
      .eq('category', category)
      .eq('date', today)
      .maybeSingle();

    if (existing) {
      // Update existing entry
      await supabase
        .from('emissions')
        .update({ amount })
        .eq('id', existing.id);
    } else {
      // Insert new entry
      await supabase
        .from('emissions')
        .insert({
          user_id: user.id,
          category,
          amount,
          date: today,
        });
    }
  };

  const setTransportEmissions = (value: number) => {
    setEmissions(prev => ({ ...prev, transport: value }));
    saveEmission('transportation', value);
  };

  const setWasteEmissions = (value: number) => {
    setEmissions(prev => ({ ...prev, waste: value }));
    saveEmission('waste', value);
  };

  const setEnergyEmissions = (value: number) => {
    setEmissions(prev => ({ ...prev, energy: value }));
    saveEmission('energy', value);
  };

  const clearAllEmissions = async () => {
    setEmissions({ transport: 0, waste: 0, energy: 0 });
    
    if (user) {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
      
      await supabase
        .from('emissions')
        .delete()
        .eq('user_id', user.id)
        .gte('date', firstDayOfMonth);
    }
  };

  const setMonthlyTarget = async (value: number) => {
    setMonthlyTargetState(value);
    
    if (!user) return;

    const today = new Date();
    // Use UTC to avoid timezone issues
    const firstDayOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;

    const { data: existing } = await supabase
      .from('monthly_targets')
      .select('id')
      .eq('user_id', user.id)
      .eq('month', firstDayOfMonth)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('monthly_targets')
        .update({ target_amount: value })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('monthly_targets')
        .insert({
          user_id: user.id,
          target_amount: value,
          month: firstDayOfMonth,
        });
    }
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
      monthlyTarget,
      setMonthlyTarget,
      isLoading,
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
