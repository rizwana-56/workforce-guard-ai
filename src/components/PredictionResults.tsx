import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, TrendingUp, BarChart3, Shield, Lightbulb, Target, Users, BookOpen } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface PredictionData {
  willBeLayedOff: boolean;
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  factors: {
    name: string;
    impact: number;
    isPositive: boolean;
  }[];
}

interface PredictionResultsProps {
  prediction: PredictionData;
}

const PredictionResults = ({ prediction }: PredictionResultsProps) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low": return "success";
      case "Medium": return "warning";
      case "High": return "danger";
      default: return "success";
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low": return <CheckCircle className="h-5 w-5" />;
      case "Medium": return <AlertTriangle className="h-5 w-5" />;
      case "High": return <AlertTriangle className="h-5 w-5" />;
      default: return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getGradientClass = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low": return "bg-gradient-success";
      case "Medium": return "bg-gradient-warning";
      case "High": return "bg-gradient-danger";
      default: return "bg-gradient-success";
    }
  };

  // Prepare chart data
  const pieChartData = [
    { name: 'Layoff Risk', value: prediction.confidence, color: '#ef4444' },
    { name: 'Job Security', value: 100 - prediction.confidence, color: '#22c55e' }
  ];

  const factorsChartData = prediction.factors.map(factor => ({
    name: factor.name.replace(' Factor', '').replace(' Rating', '').replace(' Range', '').replace(' Risk', ''),
    impact: Math.abs(factor.impact),
    type: factor.isPositive ? 'Positive' : 'Negative',
    fill: factor.isPositive ? '#22c55e' : '#ef4444'
  }));

  // Generate recommendations based on risk factors
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Performance-based recommendations
    const perfFactor = prediction.factors.find(f => f.name.includes('Performance'));
    if (perfFactor && !perfFactor.isPositive) {
      recommendations.push({
        icon: Target,
        title: "Performance Improvement Plan",
        description: "Implement a structured performance improvement plan with clear goals, regular check-ins, and skill development opportunities.",
        priority: "High"
      });
    }

    // Department-based recommendations
    const deptFactor = prediction.factors.find(f => f.name.includes('Department'));
    if (deptFactor && !deptFactor.isPositive) {
      recommendations.push({
        icon: Users,
        title: "Cross-Department Training",
        description: "Consider cross-training in more stable departments to increase versatility and reduce department-specific risk.",
        priority: "Medium"
      });
    }

    // Tenure-based recommendations
    const tenureFactor = prediction.factors.find(f => f.name.includes('Tenure'));
    if (tenureFactor && !tenureFactor.isPositive) {
      if (tenureFactor.impact > 15) {
        recommendations.push({
          icon: BookOpen,
          title: "Onboarding & Mentorship",
          description: "Pair with experienced mentors and provide comprehensive onboarding to accelerate integration and value delivery.",
          priority: "High"
        });
      } else {
        recommendations.push({
          icon: Target,
          title: "Career Development Path",
          description: "Create a clear career progression plan to retain long-term employees and leverage their institutional knowledge.",
          priority: "Medium"
        });
      }
    }

    // Salary-based recommendations
    const salaryFactor = prediction.factors.find(f => f.name.includes('Salary'));
    if (salaryFactor && !salaryFactor.isPositive) {
      recommendations.push({
        icon: TrendingUp,
        title: "Compensation Review",
        description: "Conduct a market-rate analysis and consider salary adjustments to align with industry standards and performance.",
        priority: "Medium"
      });
    }

    // General recommendations based on risk level
    if (prediction.riskLevel === "High") {
      recommendations.push({
        icon: Shield,
        title: "Immediate Intervention Required",
        description: "Schedule urgent one-on-one meetings to address concerns and develop an action plan to improve job security.",
        priority: "Critical"
      });
    } else if (prediction.riskLevel === "Medium") {
      recommendations.push({
        icon: Lightbulb,
        title: "Proactive Engagement",
        description: "Increase regular check-ins and provide additional support to prevent risk escalation.",
        priority: "Medium"
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  return (
    <div className="space-y-6">
      {/* Main Prediction Card */}
        <Card className={`shadow-card border-border/50 ${getGradientClass(prediction.riskLevel)} text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          <CardHeader className="text-center space-y-4 relative z-10">
            <div className="flex justify-center">
              {getRiskIcon(prediction.riskLevel)}
            </div>
            <CardTitle className="text-3xl font-bold">
              {prediction.willBeLayedOff ? "At Risk" : "Safe"}
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Layoff Prediction Result
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 relative z-10">
            <div className="text-center space-y-2">
              <div className="text-6xl font-bold drop-shadow-lg">
                {Math.round(prediction.confidence)}%
              </div>
              <p className="text-white/90">Confidence Level</p>
            </div>
            
            <div className="flex justify-center">
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-lg font-semibold bg-white/20 text-white border-white/30 backdrop-blur-sm"
              >
                {prediction.riskLevel} Risk
              </Badge>
            </div>
          </CardContent>
        </Card>

      {/* Risk Analysis Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart Visualization */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Risk Distribution
            </CardTitle>
            <CardDescription>Visual breakdown of layoff risk vs job security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Level Indicator */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Risk Assessment
            </CardTitle>
            <CardDescription>Overall risk classification and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className={`p-3 rounded-lg text-center ${
                prediction.riskLevel === "Low" ? "bg-gradient-success text-white" : "bg-muted text-muted-foreground"
              }`}>
                <div className="text-sm font-medium">Low</div>
                <div className="text-xs">0-33%</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${
                prediction.riskLevel === "Medium" ? "bg-gradient-warning text-white" : "bg-muted text-muted-foreground"
              }`}>
                <div className="text-sm font-medium">Medium</div>
                <div className="text-xs">34-66%</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${
                prediction.riskLevel === "High" ? "bg-gradient-danger text-white" : "bg-muted text-muted-foreground"
              }`}>
                <div className="text-sm font-medium">High</div>
                <div className="text-xs">67-100%</div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {prediction.riskLevel === "Low" && "Employee shows strong job security indicators."}
              {prediction.riskLevel === "Medium" && "Employee may need attention to improve job security."}
              {prediction.riskLevel === "High" && "Employee requires immediate attention and support."}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contributing Factors with Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Factor Impact Analysis
            </CardTitle>
            <CardDescription>
              Visual representation of factors affecting the prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={factorsChartData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name === 'impact' ? 'Impact' : name]}
                    labelFormatter={(label) => `Factor: ${label}`}
                  />
                  <Bar dataKey="impact" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Factor Details
            </CardTitle>
            <CardDescription>
              Detailed breakdown of contributing factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prediction.factors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <span className={`text-sm font-semibold ${
                      factor.isPositive ? "text-success" : "text-danger"
                    }`}>
                      {factor.isPositive ? "+" : "-"}{Math.abs(factor.impact)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.abs(factor.impact)} 
                    className={`h-2 ${
                      factor.isPositive ? "[&>div]:bg-gradient-success" : "[&>div]:bg-gradient-danger"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Section */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            AI-Generated Recommendations
          </CardTitle>
          <CardDescription>
            Actionable insights and strategies to improve employee retention and reduce layoff risk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border border-border/50 bg-muted/30 space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    rec.priority === "Critical" ? "bg-gradient-danger" :
                    rec.priority === "High" ? "bg-gradient-warning" :
                    "bg-gradient-primary"
                  }`}>
                    <rec.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                      <Badge 
                        variant={rec.priority === "Critical" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResults;