import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Target, TrendingDown, Trash2, LogOut, Settings, Leaf, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEmissions } from "@/context/EmissionsContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { emissions, clearAllEmissions, totalEmissions, monthlyTarget, setMonthlyTarget } = useEmissions();
  const navigate = useNavigate();
  const [newTarget, setNewTarget] = useState(monthlyTarget.toString());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const current = Math.round(totalEmissions * 100) / 100;
  const progressPercent = Math.min((current / monthlyTarget) * 100, 100);
  const remaining = Math.max(monthlyTarget - current, 0);
  const isOverTarget = current > monthlyTarget;

  const categoryData = [
    { name: "Transportation", value: emissions.transport, color: "hsl(199, 89%, 48%)" },
    { name: "Waste", value: emissions.waste, color: "hsl(38, 92%, 50%)" },
    { name: "Energy", value: emissions.energy, color: "hsl(142, 55%, 35%)" },
  ];

  const comparisonData = [
    { name: "Current", value: current, fill: isOverTarget ? "hsl(0, 84%, 60%)" : "hsl(142, 55%, 35%)" },
    { name: "Target", value: monthlyTarget, fill: "hsl(199, 89%, 48%)" },
  ];

  const monthlyData = [
    { month: "Current", transport: emissions.transport, waste: emissions.waste, energy: emissions.energy },
  ];

  const handleClearEmissions = () => {
    clearAllEmissions();
    toast({
      title: "Emissions Cleared",
      description: "All your emission data has been reset.",
    });
  };

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
    navigate("/");
  };

  const handleSetTarget = () => {
    const targetValue = parseFloat(newTarget);
    if (isNaN(targetValue) || targetValue <= 0) {
      toast({
        title: "Invalid Target",
        description: "Please enter a valid positive number.",
        variant: "destructive",
      });
      return;
    }
    setMonthlyTarget(targetValue);
    setIsDialogOpen(false);
    toast({
      title: "Target Updated",
      description: `Monthly target set to ${targetValue} kg CO₂.`,
    });
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <h1 className="text-3xl font-display font-bold">Your Dashboard</h1>
          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="hover-scale">
                  <Settings className="h-4 w-4 mr-2" />
                  Set Target
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set Monthly CO₂ Target</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Target (kg CO₂)</label>
                    <Input 
                      type="number" 
                      value={newTarget} 
                      onChange={(e) => setNewTarget(e.target.value)}
                      placeholder="Enter target in kg"
                    />
                  </div>
                  <Button onClick={handleSetTarget} className="w-full">Save Target</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="destructive" onClick={handleClearEmissions} className="hover-scale">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <Button variant="secondary" onClick={handleSignOut} className="hover-scale">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Progress Bar Card */}
        <Card className="mb-8 animate-fade-in overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {isOverTarget ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <Leaf className="h-5 w-5 text-primary" />
                )}
                <span className="font-semibold">
                  {isOverTarget ? "Over Target!" : "On Track"}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {current} / {monthlyTarget} kg CO₂
              </span>
            </div>
            <div className="relative h-8 bg-muted rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out ${
                  isOverTarget ? 'bg-destructive' : 'bg-primary'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                {isOverTarget ? (
                  <span className="text-destructive-foreground">{Math.round((current / monthlyTarget) * 100)}% of target</span>
                ) : (
                  <span>{Math.round(progressPercent)}% used</span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-3 text-sm">
              <span className="text-muted-foreground">Remaining: <span className="font-medium text-foreground">{remaining.toFixed(1)} kg</span></span>
              <span className={`font-medium ${isOverTarget ? 'text-destructive' : 'text-primary'}`}>
                {isOverTarget ? `${(current - monthlyTarget).toFixed(1)} kg over` : `${((remaining / monthlyTarget) * 100).toFixed(0)}% left`}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-scale cursor-pointer transition-shadow hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Monthly Target</p>
                  <p className="text-2xl font-bold">{monthlyTarget} kg CO₂</p>
                </div>
                <Target className="h-8 w-8 text-primary transition-transform hover:rotate-12" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover-scale cursor-pointer transition-shadow hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Current Emissions</p>
                  <p className="text-2xl font-bold">{current} kg CO₂</p>
                </div>
                <TrendingDown className="h-8 w-8 text-primary transition-transform hover:scale-110" />
              </div>
            </CardContent>
          </Card>
          <Card className="hover-scale cursor-pointer transition-shadow hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Remaining Budget</p>
                  <p className={`text-2xl font-bold ${isOverTarget ? 'text-destructive' : ''}`}>
                    {isOverTarget ? `-${(current - monthlyTarget).toFixed(1)}` : remaining.toFixed(1)} kg CO₂
                  </p>
                </div>
                <Leaf className={`h-8 w-8 transition-transform hover:scale-110 ${isOverTarget ? 'text-destructive' : 'text-primary'}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Target vs Current Comparison */}
        <Card className="mb-8 transition-shadow hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader><CardTitle>Target vs Current Emissions</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={comparisonData} layout="vertical">
                <XAxis type="number" domain={[0, Math.max(monthlyTarget, current) * 1.1]} />
                <YAxis type="category" dataKey="name" width={60} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value} kg CO₂`, '']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="transition-shadow hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.35s' }}>
            <CardHeader><CardTitle>Emissions by Category</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="transport" fill="hsl(199, 89%, 48%)" name="Transport" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="waste" fill="hsl(38, 92%, 50%)" name="Waste" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="energy" fill="hsl(142, 55%, 35%)" name="Energy" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="transition-shadow hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader><CardTitle>Breakdown</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie 
                    data={categoryData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60} 
                    outerRadius={100} 
                    dataKey="value" 
                    label={({ name, value }) => `${name}: ${value}kg`}
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {categoryData.map((entry, index) => <Cell key={index} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer" />)}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}