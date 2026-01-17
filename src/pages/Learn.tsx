import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Trash2, Zap, Factory, Database, Calculator, Plane, Utensils, ShoppingBag, Droplets, Building2 } from "lucide-react";

export default function Learn() {
  const sources = [
    { icon: Car, title: "Transportation", desc: "Emissions from burning fuel in vehicles. Calculated using distance × fuel consumption × emission factor.", factor: "0.21 kg CO₂/km for petrol cars" },
    { icon: Plane, title: "Air Travel", desc: "Emissions from aviation fuel combustion during flights. Includes radiative forcing effects.", factor: "0.255 kg CO₂/km for economy class" },
    { icon: Trash2, title: "Waste", desc: "Emissions from decomposition and processing of waste materials.", factor: "Varies by material: 6kg/kg for plastic, 0.5kg/kg for organic" },
    { icon: Zap, title: "Energy", desc: "Emissions from electricity generation and fuel combustion at home.", factor: "0.82 kg CO₂/kWh for electricity" },
    { icon: Utensils, title: "Food & Diet", desc: "Emissions from food production, processing, transportation, and storage.", factor: "2.5 kg CO₂/kg for beef, 0.9 kg CO₂/kg for chicken" },
    { icon: ShoppingBag, title: "Shopping & Goods", desc: "Emissions from manufacturing, packaging, and shipping consumer products.", factor: "Varies: 20 kg CO₂ for a pair of jeans" },
    { icon: Droplets, title: "Water Usage", desc: "Emissions from water treatment, pumping, and heating.", factor: "0.34 kg CO₂ per 1000 liters treated" },
    { icon: Building2, title: "Housing & Construction", desc: "Emissions from building materials, heating, cooling, and maintenance.", factor: "50 kg CO₂/m² for concrete construction" },
  ];

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">How CO₂ Is Tracked</h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">Understanding the science behind carbon emission calculations.</p>
          </div>

          <Card className="mb-8 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Database className="h-5 w-5" /> Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-base">Our calculations are based on internationally recognized emission factors from the IPCC (Intergovernmental Panel on Climate Change) and EPA (Environmental Protection Agency).</p>
              <p className="text-muted-foreground text-sm">These factors are updated regularly to reflect the latest scientific understanding of greenhouse gas emissions.</p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-display font-bold mb-6">Emission Categories</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {sources.map((src, i) => (
              <Card key={i} className="shadow-card">
                <CardContent className="pt-5 pb-5">
                  <div className="flex gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 h-fit">
                      <src.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-semibold mb-2">{src.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{src.desc}</p>
                      <p className="text-xs font-mono bg-muted p-2 rounded-md">{src.factor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="h-5 w-5" /> Calculation Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-base">CO₂ emissions are calculated using: <strong className="text-primary">Activity Data × Emission Factor = CO₂ Emissions</strong></p>
              <ul className="space-y-2 text-muted-foreground text-sm">
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
