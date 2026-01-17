import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Trash2, Zap, Database, Calculator, Bike, Bus } from "lucide-react";
import { PiMotorcycleFill } from "react-icons/pi";

export default function Learn() {
  // Transportation - Vehicle Types (matching Track CO2)
  const transportCategories = [
    { icon: Car, title: "Car", desc: "Emissions vary by fuel type. Petrol, diesel, electric, CNG, and hybrid options available.", factor: "Petrol: 0.21, Diesel: 0.27, Electric: 0.05, CNG: 0.16, Hybrid: 0.12 kg CO₂/km" },
    { icon: Bike, title: "Bike (Bicycle)", desc: "Zero-emission transportation. Cycling produces no direct CO₂ emissions.", factor: "0 kg CO₂/km (emission-free)" },
    { icon: Bus, title: "Bus", desc: "Public transport with shared emissions per passenger. More efficient than individual vehicles.", factor: "Petrol: 0.089, Diesel: 0.101, Electric: 0.02 kg CO₂/km per person" },
    { title: "Scooter", desc: "Two-wheeler with lower emissions than cars. Popular for short-distance commutes.", factor: "Petrol: 0.08, Diesel: 0.09, Electric: 0.015 kg CO₂/km", isScooter: true },
  ];

  // Waste Categories (matching Track CO2)
  const wasteCategories = [
    { name: "Plastic", factor: "6.0 kg CO₂/kg", tip: "Reduce single-use plastics and recycle" },
    { name: "Paper", factor: "1.1 kg CO₂/kg", tip: "Go digital and recycle paper products" },
    { name: "Organic", factor: "0.5 kg CO₂/kg", tip: "Compost food waste at home" },
    { name: "Metal", factor: "1.5 kg CO₂/kg", tip: "Recycle aluminum and steel cans" },
    { name: "E-waste", factor: "20.0 kg CO₂/kg", tip: "Donate or recycle electronics properly" },
  ];

  // Energy Categories (matching Track CO2)
  const energyCategories = [
    { name: "Electricity", factor: "0.82 kg CO₂/kWh", desc: "Grid electricity from power plants" },
    { name: "LPG/Gas", factor: "2.98 kg CO₂/kg", desc: "Cooking and heating fuel" },
    { name: "Renewable Energy", factor: "70% reduction", desc: "Solar panels, wind power reduce emissions" },
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

          {/* Transportation Section */}
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" /> Transportation
          </h2>
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {transportCategories.map((item, i) => (
              <Card key={i} className="shadow-card">
                <CardContent className="pt-5 pb-5">
                  <div className="flex gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 h-fit">
                      {item.isScooter ? (
                        <PiMotorcycleFill className="h-6 w-6 text-primary" />
                      ) : item.icon ? (
                        <item.icon className="h-6 w-6 text-primary" />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{item.desc}</p>
                      <p className="text-xs font-mono bg-muted p-2 rounded-md">{item.factor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Waste Section */}
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Trash2 className="h-6 w-6 text-primary" /> Waste
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {wasteCategories.map((item, i) => (
              <Card key={i} className="shadow-card">
                <CardContent className="pt-5 pb-5">
                  <h3 className="text-lg font-display font-semibold mb-2">{item.name}</h3>
                  <p className="text-xs font-mono bg-muted p-2 rounded-md mb-2">{item.factor}</p>
                  <p className="text-muted-foreground text-sm">{item.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Energy Section */}
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" /> Energy
          </h2>
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {energyCategories.map((item, i) => (
              <Card key={i} className="shadow-card">
                <CardContent className="pt-5 pb-5">
                  <h3 className="text-lg font-display font-semibold mb-2">{item.name}</h3>
                  <p className="text-xs font-mono bg-muted p-2 rounded-md mb-2">{item.factor}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
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
