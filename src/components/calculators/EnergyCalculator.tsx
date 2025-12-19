import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calculator, Zap, Lightbulb } from "lucide-react";

export function EnergyCalculator() {
  const [electricity, setElectricity] = useState("");
  const [lpg, setLpg] = useState("");
  const [renewable, setRenewable] = useState(false);
  const [result, setResult] = useState<{ electricity: number; lpg: number; total: number } | null>(null);

  const calculateEmissions = () => {
    const elecEmission = parseFloat(electricity || "0") * 0.82 * (renewable ? 0.3 : 1);
    const lpgEmission = parseFloat(lpg || "0") * 2.98;
    setResult({
      electricity: Math.round(elecEmission * 100) / 100,
      lpg: Math.round(lpgEmission * 100) / 100,
      total: Math.round((elecEmission + lpgEmission) * 100) / 100,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" /> Energy Emissions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Monthly Electricity (kWh)</Label>
            <Input type="number" value={electricity} onChange={(e) => setElectricity(e.target.value)} placeholder="e.g., 300" />
          </div>
          <div className="space-y-2">
            <Label>LPG/Gas Usage (kg/month)</Label>
            <Input type="number" value={lpg} onChange={(e) => setLpg(e.target.value)} placeholder="e.g., 14" />
          </div>
          <div className="flex items-center justify-between md:col-span-2 p-4 bg-muted rounded-lg">
            <div>
              <Label>Using Renewable Energy?</Label>
              <p className="text-sm text-muted-foreground">Solar panels, wind, etc.</p>
            </div>
            <Switch checked={renewable} onCheckedChange={setRenewable} />
          </div>
        </div>

        <Button onClick={calculateEmissions} className="w-full gradient-eco">
          <Calculator className="h-4 w-4 mr-2" /> Calculate Emissions
        </Button>

        {result && (
          <>
            <Card className="bg-muted">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">Total Monthly CO₂</p>
                <p className="text-4xl font-display font-bold text-primary">{result.total} kg</p>
                <div className="flex justify-center gap-6 mt-4">
                  <div><p className="text-xs text-muted-foreground">Electricity</p><p className="font-semibold">{result.electricity} kg</p></div>
                  <div><p className="text-xs text-muted-foreground">LPG/Gas</p><p className="font-semibold">{result.lpg} kg</p></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold flex items-center gap-2 mb-3"><Lightbulb className="h-4 w-4 text-warning" /> Tips to Reduce</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Switch to LED bulbs (save up to 75% energy)</li>
                  <li>• Use energy-efficient appliances</li>
                  <li>• Install solar panels</li>
                  <li>• Turn off appliances when not in use</li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </CardContent>
    </Card>
  );
}
