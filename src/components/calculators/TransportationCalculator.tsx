import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { AlertTriangle, Calculator, Car, CalendarIcon, Leaf, Train, Bike, Wrench, Users, Zap } from "lucide-react";
import { useEmissions } from "@/context/EmissionsContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const vehicleTypes = ["Car", "Bike", "Bus", "Scooter"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "CNG", "Hybrid"];

const emissionFactors: Record<string, Record<string, number>> = {
  Car: { Petrol: 0.21, Diesel: 0.27, Electric: 0.05, CNG: 0.16, Hybrid: 0.12 },
  Bike: { Petrol: 0, Diesel: 0, Electric: 0, CNG: 0, Hybrid: 0 },
  Bus: { Petrol: 0.089, Diesel: 0.101, Electric: 0.02, CNG: 0.07, Hybrid: 0.06 },
  Scooter: { Petrol: 0.08, Diesel: 0.09, Electric: 0.015, CNG: 0.06, Hybrid: 0.05 },
};

const sustainabilityTips = [
  {
    icon: Train,
    title: "Use Public Transport",
    description: "Switch to buses, trains, or metro for daily commutes. Public transport can reduce your carbon footprint by up to 45%.",
  },
  {
    icon: Bike,
    title: "Consider Cycling",
    description: "For short distances, cycling is emission-free and great for your health. Even 2-3 days a week makes a difference.",
  },
  {
    icon: Users,
    title: "Carpool When Possible",
    description: "Share rides with colleagues or neighbors. Carpooling can cut your per-person emissions by 50-75%.",
  },
  {
    icon: Zap,
    title: "Switch to Electric",
    description: "Electric vehicles produce significantly lower emissions. Consider hybrid as a transition step.",
  },
  {
    icon: Wrench,
    title: "Regular Maintenance",
    description: "Keep your vehicle well-maintained. Proper tire pressure and timely servicing can improve fuel efficiency by 10-15%.",
  },
  {
    icon: Leaf,
    title: "Eco-Driving Habits",
    description: "Avoid aggressive acceleration, maintain steady speeds, and reduce idling to save fuel and reduce emissions.",
  },
];

export function TransportationCalculator() {
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [vehicleAge, setVehicleAge] = useState("");
  const [lastService, setLastService] = useState<Date | undefined>();
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { setTransportEmissions } = useEmissions();

  const isOldVehicle = parseInt(vehicleAge) >= 15;

  const calculateEmissions = () => {
    if (!vehicleType || !fuelType || !distance) {
      toast({
        title: "Missing Fields",
        description: "Please fill in vehicle type, fuel type, and distance traveled.",
        variant: "destructive",
      });
      return;
    }
    const factor = emissionFactors[vehicleType]?.[fuelType] || 0.2;
    const ageFactor = isOldVehicle ? 1.5 : 1 + (parseInt(vehicleAge) || 0) * 0.02;
    const emission = parseFloat(distance) * factor * ageFactor;
    const roundedEmission = Math.round(emission * 100) / 100;
    setResult(roundedEmission);
    setTransportEmissions(roundedEmission);
    toast({
      title: "Transport Emissions Saved",
      description: `${roundedEmission} kg CO₂ added to your dashboard.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Car className="h-5 w-5" /> Transportation Emissions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isOldVehicle && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Vehicle Age Warning</AlertTitle>
            <AlertDescription>
              Your vehicle is over 15 years old. Consider replacing it or servicing immediately. Old vehicles produce 50% more CO₂, contribute to air pollution, and pose health hazards.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Vehicle Type</Label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
              <SelectContent>{vehicleTypes.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Fuel Type</Label>
            <Select value={fuelType} onValueChange={setFuelType}>
              <SelectTrigger><SelectValue placeholder="Select fuel" /></SelectTrigger>
              <SelectContent>{fuelTypes.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Vehicle Age (years)</Label>
            <Input type="number" value={vehicleAge} onChange={(e) => setVehicleAge(e.target.value)} placeholder="e.g., 5" />
          </div>
          <div className="space-y-2">
            <Label>Last Service Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !lastService && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lastService ? format(lastService, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={lastService}
                  onSelect={setLastService}
                  disabled={(date) => date > new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Distance Traveled (km/month)</Label>
            <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 500" />
          </div>
        </div>

        <Button onClick={calculateEmissions} className="w-full gradient-eco">
          <Calculator className="h-4 w-4 mr-2" /> Calculate Emissions
        </Button>

        {result !== null && (
          <>
            <Card className="bg-muted">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">Monthly CO₂ Emissions</p>
                <p className="text-4xl font-display font-bold text-primary">{result} kg</p>
              </CardContent>
            </Card>

            {/* Sustainability Tips Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <Leaf className="h-5 w-5" />
                <span>Tips to Reduce Your Carbon Footprint</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sustainabilityTips.map((tip, index) => (
                  <Card 
                    key={index} 
                    className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 bg-gradient-to-br from-background to-muted/50"
                  >
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <tip.icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-sm">{tip.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Alert className="border-primary/20 bg-primary/5">
                <Leaf className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Every Action Counts!</AlertTitle>
                <AlertDescription>
                  Small changes in your daily commute can lead to significant reductions in your carbon footprint. 
                  Start with one tip today and gradually adopt more sustainable practices.
                </AlertDescription>
              </Alert>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
