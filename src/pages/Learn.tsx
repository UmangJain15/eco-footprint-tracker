import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Trash2, Zap, Factory, Database, Calculator } from "lucide-react";

export default function Learn() {
  const sources = [
    { icon: Car, title: "Transportation", desc: "Emissions from burning fuel in vehicles. Calculated using distance × fuel consumption × emission factor.", factor: "0.21 kg CO₂/km for petrol cars" },
    { icon: Trash2, title: "Waste", desc: "Emissions from decomposition and processing of waste materials.", factor: "Varies by material: 6kg/kg for plastic, 0.5kg/kg for organic" },
    { icon: Zap, title: "Energy", desc: "Emissions from electricity generation and fuel combustion at home.", factor: "0.82 kg CO₂/kWh for electricity" },
  ];

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">How CO₂ Is Tracked</h1>
            <p className="text-muted-foreground text-lg">Understanding the science behind carbon emission calculations.</p>
          </div>

          <Card className="mb-8">
            <CardHeader><CardTitle className="flex items-center gap-2"><Database className="h-5 w-5" /> Data Sources</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p>Our calculations are based on internationally recognized emission factors from the IPCC (Intergovernmental Panel on Climate Change) and EPA (Environmental Protection Agency).</p>
              <p className="text-muted-foreground">These factors are updated regularly to reflect the latest scientific understanding of greenhouse gas emissions.</p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-display font-bold mb-6">Emission Categories</h2>
          <div className="space-y-6">
            {sources.map((src, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 h-fit"><src.icon className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2">{src.title}</h3>
                      <p className="text-muted-foreground mb-2">{src.desc}</p>
                      <p className="text-sm font-mono bg-muted p-2 rounded">{src.factor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" /> Calculation Method</CardTitle></CardHeader>
            <CardContent>
              <p className="mb-4">CO₂ emissions are calculated using: <strong>Activity Data × Emission Factor = CO₂ Emissions</strong></p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Activity Data:</strong> The amount of activity (km driven, kWh used, kg waste)</li>
                <li>• <strong>Emission Factor:</strong> CO₂ produced per unit of activity</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
