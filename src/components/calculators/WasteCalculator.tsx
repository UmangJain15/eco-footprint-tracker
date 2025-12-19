import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Trash2, Lightbulb } from "lucide-react";

const wasteCategories = [
  { name: "Plastic", factor: 6.0, tip: "Reduce single-use plastics and recycle" },
  { name: "Paper", factor: 1.1, tip: "Go digital and recycle paper products" },
  { name: "Organic", factor: 0.5, tip: "Compost food waste at home" },
  { name: "Metal", factor: 1.5, tip: "Recycle aluminum and steel cans" },
  { name: "E-waste", factor: 20.0, tip: "Donate or recycle electronics properly" },
];

export function WasteCalculator() {
  const [waste, setWaste] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, number> | null>(null);

  const calculateEmissions = () => {
    const emissions: Record<string, number> = {};
    wasteCategories.forEach(cat => {
      emissions[cat.name] = Math.round((parseFloat(waste[cat.name] || "0") * cat.factor) * 100) / 100;
    });
    setResults(emissions);
  };

  const total = results ? Object.values(results).reduce((a, b) => a + b, 0) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Trash2 className="h-5 w-5" /> Waste Emissions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wasteCategories.map(cat => (
            <div key={cat.name} className="space-y-2">
              <Label>{cat.name} (kg/month)</Label>
              <Input type="number" value={waste[cat.name] || ""} onChange={(e) => setWaste({ ...waste, [cat.name]: e.target.value })} placeholder="0" />
            </div>
          ))}
        </div>

        <Button onClick={calculateEmissions} className="w-full gradient-eco">
          <Calculator className="h-4 w-4 mr-2" /> Calculate Emissions
        </Button>

        {results && (
          <>
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <p className="text-muted-foreground">Total Monthly CO₂</p>
                  <p className="text-4xl font-display font-bold text-primary">{Math.round(total * 100) / 100} kg</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {wasteCategories.map(cat => (
                    <div key={cat.name} className="text-center p-2 bg-background rounded-lg">
                      <p className="text-xs text-muted-foreground">{cat.name}</p>
                      <p className="font-semibold">{results[cat.name]} kg</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold flex items-center gap-2 mb-3"><Lightbulb className="h-4 w-4 text-warning" /> Tips to Reduce</h4>
                <ul className="space-y-2">
                  {wasteCategories.map(cat => (
                    <li key={cat.name} className="text-sm text-muted-foreground">• <strong>{cat.name}:</strong> {cat.tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </CardContent>
    </Card>
  );
}
