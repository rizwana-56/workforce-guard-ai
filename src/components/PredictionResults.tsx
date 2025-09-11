import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, TrendingUp, BarChart3, Shield } from "lucide-react";

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
        {/* Probability Visualization */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Risk Probability
            </CardTitle>
            <CardDescription>Visual representation of layoff probability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Layoff Risk</span>
                <span className="font-semibold">{Math.round(prediction.confidence)}%</span>
              </div>
              <Progress 
                value={prediction.confidence} 
                className={`h-3 ${
                  prediction.riskLevel === "Low" ? "[&>div]:bg-gradient-success" :
                  prediction.riskLevel === "Medium" ? "[&>div]:bg-gradient-warning" :
                  "[&>div]:bg-gradient-danger"
                }`}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Job Security</span>
                <span className="font-semibold">{Math.round(100 - prediction.confidence)}%</span>
              </div>
              <Progress 
                value={100 - prediction.confidence} 
                className="h-3 [&>div]:bg-gradient-success"
              />
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

      {/* Contributing Factors */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Contributing Factors
          </CardTitle>
          <CardDescription>
            Key factors influencing the prediction (positive factors reduce risk, negative increase risk)
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
  );
};

export default PredictionResults;