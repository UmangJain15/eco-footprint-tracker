-- Create emissions table to store user emissions data
CREATE TABLE public.emissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('energy', 'transportation', 'waste')),
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create monthly targets table
CREATE TABLE public.monthly_targets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_amount DECIMAL(10, 2) NOT NULL DEFAULT 500,
  month DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, month)
);

-- Enable Row Level Security
ALTER TABLE public.emissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_targets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for emissions
CREATE POLICY "Users can view their own emissions" 
ON public.emissions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own emissions" 
ON public.emissions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emissions" 
ON public.emissions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emissions" 
ON public.emissions FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for monthly_targets
CREATE POLICY "Users can view their own targets" 
ON public.monthly_targets FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own targets" 
ON public.monthly_targets FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own targets" 
ON public.monthly_targets FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own targets" 
ON public.monthly_targets FOR DELETE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_emissions_updated_at
BEFORE UPDATE ON public.emissions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_monthly_targets_updated_at
BEFORE UPDATE ON public.monthly_targets
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();