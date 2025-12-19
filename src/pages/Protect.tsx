import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, Recycle, Sun, Lightbulb, Car, TreePine, Quote } from "lucide-react";

export default function Protect() {
  const tips = [
    { icon: Bus, title: "Use Public Transport", desc: "Taking the bus or train can reduce your carbon footprint by up to 50% compared to driving alone." },
    { icon: Recycle, title: "Reduce Plastic Usage", desc: "Carry reusable bags, bottles, and containers. Say no to single-use plastics." },
    { icon: Sun, title: "Use Renewable Energy", desc: "Switch to solar panels or choose a green energy provider for your home." },
    { icon: Lightbulb, title: "Energy-Efficient Appliances", desc: "Replace old appliances with energy-efficient models. Use LED bulbs." },
    { icon: Car, title: "Consider Electric Vehicles", desc: "EVs produce zero direct emissions and can significantly reduce your carbon footprint." },
    { icon: TreePine, title: "Plant Trees", desc: "Trees absorb CO₂. Support reforestation efforts or plant trees in your community." },
  ];

  const quotes = [
    { text: "The Earth does not belong to us: we belong to the Earth.", author: "Marlee Matlin" },
    { text: "We do not inherit the Earth from our ancestors; we borrow it from our children.", author: "Native American Proverb" },
    { text: "The greatest threat to our planet is the belief that someone else will save it.", author: "Robert Swan" },
  ];

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Protect the Environment</h1>
            <p className="text-muted-foreground text-lg">Simple actions you can take to reduce your carbon footprint.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {tips.map((tip, i) => (
              <Card key={i} className="hover:shadow-eco transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="p-3 rounded-xl gradient-eco h-fit"><tip.icon className="h-6 w-6 text-primary-foreground" /></div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">{tip.title}</h3>
                      <p className="text-muted-foreground text-sm">{tip.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold mb-6 text-center">Inspirational Quotes</h2>
          <div className="space-y-4">
            {quotes.map((q, i) => (
              <Card key={i} className="bg-muted/50">
                <CardContent className="pt-6">
                  <Quote className="h-6 w-6 text-primary mb-2" />
                  <p className="text-lg italic mb-2">"{q.text}"</p>
                  <p className="text-muted-foreground text-sm">— {q.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
