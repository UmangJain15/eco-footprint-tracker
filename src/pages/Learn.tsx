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
      <div className="container py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">How CO₂ Is Tracked</h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto">Understanding the science behind carbon emission calculations.</p>
          </div>

          <Card className="mb-12 shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <Database className="h-7 w-7" /> Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg md:text-xl">Our calculations are based on internationally recognized emission factors from the IPCC (Intergovernmental Panel on Climate Change) and EPA (Environmental Protection Agency).</p>
              <p className="text-muted-foreground text-lg">These factors are updated regularly to reflect the latest scientific understanding of greenhouse gas emissions.</p>
            </CardContent>
          </Card>

          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Emission Categories</h2>
          <div className="space-y-8">
            {sources.map((src, i) => (
              <Card key={i} className="shadow-card">
                <CardContent className="pt-8 pb-8">
                  <div className="flex gap-6">
                    <div className="p-4 rounded-2xl bg-primary/10 h-fit">
                      <src.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-display font-semibold mb-3">{src.title}</h3>
                      <p className="text-muted-foreground text-lg md:text-xl mb-4">{src.desc}</p>
                      <p className="text-base font-mono bg-muted p-3 rounded-lg">{src.factor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <Calculator className="h-7 w-7" /> Calculation Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-lg md:text-xl">CO₂ emissions are calculated using: <strong className="text-primary">Activity Data × Emission Factor = CO₂ Emissions</strong></p>
              <ul className="space-y-4 text-muted-foreground text-lg">
                <li>• <strong className="text-foreground">Activity Data:</strong> The amount of activity (km driven, kWh used, kg waste)</li>
                <li>• <strong className="text-foreground">Emission Factor:</strong> CO₂ produced per unit of activity</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
