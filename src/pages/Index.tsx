import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Leaf, Car, Trash2, Zap, BarChart3, Target, TreePine, ArrowRight, Globe, Wind, Droplets, Users } from "lucide-react";

export default function Index() {
  const features = [
    { icon: Car, title: "Transportation Tracking", description: "Calculate emissions from your daily commute.", color: "bg-eco-sky" },
    { icon: Trash2, title: "Waste Management", description: "Track waste and learn to reduce impact.", color: "bg-eco-earth" },
    { icon: Zap, title: "Energy Consumption", description: "Monitor home energy usage.", color: "bg-eco-nature" },
    { icon: BarChart3, title: "Analytics Dashboard", description: "Visualize progress with charts.", color: "bg-eco-water" },
  ];

  return (
    <Layout>
      <section className="relative overflow-hidden gradient-hero">
        <div className="container relative py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Leaf className="h-4 w-4" />
              Start Your Sustainability Journey
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-foreground">
              Track Your Carbon Footprint. <span className="text-primary">Protect Our Planet.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Monitor your CO₂ emissions from transportation, waste, and energy. Make informed decisions for a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="gradient-eco shadow-eco text-lg px-8">
                <Link to="/signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link to="/track">Track Emissions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ value: "2.5M+", label: "Tons CO₂ Tracked", icon: Globe }, { value: "150K+", label: "Active Users", icon: Users }, { value: "500K+", label: "Trees Saved", icon: TreePine }].map((stat, i) => (
              <div key={i} className="flex items-center justify-center gap-4">
                <div className="p-3 rounded-xl gradient-eco"><stat.icon className="h-6 w-6 text-primary-foreground" /></div>
                <div><p className="text-3xl font-display font-bold">{stat.value}</p><p className="text-muted-foreground">{stat.label}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Everything You Need to Track Your Impact</h2>
            <p className="text-muted-foreground text-lg">Comprehensive tools to monitor and reduce your carbon emissions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="group hover:shadow-eco transition-all duration-300">
                <CardContent className="pt-6">
                  <div className={`inline-flex p-3 rounded-xl ${f.color} mb-4`}><f.icon className="h-6 w-6 text-primary-foreground" /></div>
                  <h3 className="text-xl font-display font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold">What Are CO₂ Emissions?</h2>
              <p className="text-muted-foreground text-lg">Carbon dioxide is a greenhouse gas released when we burn fossil fuels. It's the primary driver of climate change.</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10"><Target className="h-5 w-5 text-primary" /></div>
                  <div><h4 className="font-semibold">Why Track CO₂?</h4><p className="text-muted-foreground">Understanding emissions is the first step to reducing them.</p></div>
                </div>
              </div>
              <Button asChild className="gradient-eco"><Link to="/learn">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
            <Card className="shadow-card">
              <CardContent className="p-8 grid grid-cols-2 gap-6">
                {[{ icon: Wind, title: "Air Quality" }, { icon: Droplets, title: "Water Resources" }, { icon: TreePine, title: "Biodiversity" }].map((item, i) => (
                  <div key={i} className={i === 2 ? "col-span-2" : ""}>
                    <div className="p-3 rounded-xl bg-muted inline-flex mb-2"><item.icon className="h-6 w-6 text-primary" /></div>
                    <h4 className="font-display font-semibold">{item.title}</h4>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <Card className="gradient-eco text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-primary-foreground/80 text-lg mb-6">Join thousands tracking their carbon footprint.</p>
              <Button size="lg" variant="secondary" asChild><Link to="/signup">Start Tracking Now <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
