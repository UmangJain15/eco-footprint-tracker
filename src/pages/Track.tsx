import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransportationCalculator } from "@/components/calculators/TransportationCalculator";
import { WasteCalculator } from "@/components/calculators/WasteCalculator";
import { EnergyCalculator } from "@/components/calculators/EnergyCalculator";
import { Car, Trash2, Zap } from "lucide-react";

export default function Track() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Track Your CO₂ Emissions</h1>
            <p className="text-muted-foreground text-lg">Calculate your carbon footprint across different categories.</p>
          </div>
          
          <Tabs defaultValue="transportation" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="transportation" className="flex items-center gap-2">
                <Car className="h-4 w-4" /> Transportation
              </TabsTrigger>
              <TabsTrigger value="waste" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Waste
              </TabsTrigger>
              <TabsTrigger value="energy" className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> Energy
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="transportation"><TransportationCalculator /></TabsContent>
            <TabsContent value="waste"><WasteCalculator /></TabsContent>
            <TabsContent value="energy"><EnergyCalculator /></TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
