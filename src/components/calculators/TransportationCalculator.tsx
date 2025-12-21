import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Calculator, Car } from "lucide-react";
import { useEmissions } from "@/context/EmissionsContext";
import { toast } from "@/hooks/use-toast";

const vehicleTypes = ["Car", "Bike", "Bus", "Train", "Motorcycle", "Airplane"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "CNG", "Hybrid"];

const emissionFactors: Record<string, Record<string, number>> = {
  Car: { Petrol: 0.21, Diesel: 0.27, Electric: 0.05, CNG: 0.16, Hybrid: 0.12 },
  Bike: { Petrol: 0, Diesel: 0, Electric: 0, CNG: 0, Hybrid: 0 },
  Bus: { Petrol: 0.089, Diesel: 0.101, Electric: 0.02, CNG: 0.07, Hybrid: 0.06 },
  Train: { Petrol: 0.041, Diesel: 0.041, Electric: 0.02, CNG: 0.03, Hybrid: 0.03 },
  Motorcycle: { Petrol: 0.103, Diesel: 0.12, Electric: 0.02, CNG: 0.08, Hybrid: 0.07 },
  Airplane: { Petrol: 0.255, Diesel: 0.255, Electric: 0.1, CNG: 0.2, Hybrid: 0.18 },
};

export function TransportationCalculator() {
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [vehicleAge, setVehicleAge] = useState("");
  const [lastService, setLastService] = useState("");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { setTransportEmissions } = useEmissions();

  const isOldVehicle = parseInt(vehicleAge) >= 15;

  const calculateEmissions = () => {
    if (!vehicleType || !fuelType || !distance) return;
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
            <Input type="month" value={lastService} onChange={(e) => setLastService(e.target.value)} />
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
          <Card className="bg-muted">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Monthly CO₂ Emissions</p>
              <p className="text-4xl font-display font-bold text-primary">{result} kg</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
