import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Target, TrendingDown, TrendingUp, Leaf } from "lucide-react";

const monthlyData = [
  { month: "Jan", transport: 120, waste: 45, energy: 180 },
  { month: "Feb", transport: 100, waste: 40, energy: 160 },
  { month: "Mar", transport: 90, waste: 35, energy: 150 },
  { month: "Apr", transport: 85, waste: 38, energy: 140 },
  { month: "May", transport: 80, waste: 32, energy: 130 },
  { month: "Jun", transport: 75, waste: 30, energy: 120 },
];

const categoryData = [
  { name: "Transportation", value: 75, color: "hsl(199, 89%, 48%)" },
  { name: "Waste", value: 30, color: "hsl(38, 92%, 50%)" },
  { name: "Energy", value: 120, color: "hsl(142, 55%, 35%)" },
];

export default function Dashboard() {
  const target = 300;
  const current = 225;
  const progress = (current / target) * 100;

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-display font-bold mb-8">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Monthly Target</p>
                  <p className="text-2xl font-bold">{target} kg CO₂</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Current Emissions</p>
                  <p className="text-2xl font-bold">{current} kg CO₂</p>
                </div>
                <TrendingDown className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-eco text-primary-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Progress</p>
                  <p className="text-2xl font-bold">{Math.round(100 - progress)}% Under Target</p>
                </div>
                <Leaf className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader><CardTitle>Target Progress</CardTitle></CardHeader>
            <CardContent>
              <Progress value={progress} className="h-4" />
              <p className="text-sm text-muted-foreground mt-2">{current} kg of {target} kg monthly target</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Monthly Emissions Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="transport" fill="hsl(199, 89%, 48%)" name="Transport" />
                  <Bar dataKey="waste" fill="hsl(38, 92%, 50%)" name="Waste" />
                  <Bar dataKey="energy" fill="hsl(142, 55%, 35%)" name="Energy" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Emissions by Category</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}kg`}>
                    {categoryData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
