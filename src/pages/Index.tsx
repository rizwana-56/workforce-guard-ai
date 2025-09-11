import { useState } from "react";
import EmployeePredictionForm from "@/components/EmployeePredictionForm";
import PredictionResults from "@/components/PredictionResults";
import { predictLayoffRisk } from "@/lib/predictionEngine";
import { Button } from "@/components/ui/button";
import { RefreshCw, Brain, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmployeeData {
  age: string;
  department: string;
  jobRole: string;
  salary: string;
  overtime: string;
  performanceRating: string;
  yearsAtCompany: string;
}

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

const Index = () => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePrediction = async (data: EmployeeData) => {
    setIsLoading(true);
    try {
      const result = await predictLayoffRisk(data);
      setPrediction(result);
      toast({
        title: "Analysis Complete",
        description: `Prediction generated with ${result.confidence}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrediction(null);
    toast({
      title: "Reset Complete",
      description: "Form cleared for new prediction",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-lg shadow-card border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  LayoffAI Predictor
                </h1>
                <p className="text-muted-foreground">Advanced HR Analytics & Risk Assessment</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Insights</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!prediction ? (
            <div className="space-y-8">
              {/* Introduction */}
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Employee Layoff Risk Assessment
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our advanced machine learning model analyzes multiple employee factors to predict 
                  layoff risk with high accuracy. Get actionable insights to make informed HR decisions 
                  and improve talent retention strategies.
                </p>
              </div>

              {/* Form */}
              <EmployeePredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Prediction Results</h2>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="gap-2 transition-smooth hover:shadow-glow/20"
                >
                  <RefreshCw className="h-4 w-4" />
                  New Analysis
                </Button>
              </div>

              {/* Results */}
              <PredictionResults prediction={prediction} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card/90 backdrop-blur-lg border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>LayoffAI Predictor • Advanced HR Analytics • Built with AI/ML Technologies</p>
            <p className="mt-1">Empowering data-driven HR decisions for better workforce management</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
