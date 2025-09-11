import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Building2, DollarSign, Clock, Star, Calendar } from "lucide-react";

interface EmployeeData {
  age: string;
  department: string;
  jobRole: string;
  salary: string;
  overtime: string;
  performanceRating: string;
  yearsAtCompany: string;
}

interface EmployeePredictionFormProps {
  onSubmit: (data: EmployeeData) => void;
  isLoading: boolean;
}

const EmployeePredictionForm = ({ onSubmit, isLoading }: EmployeePredictionFormProps) => {
  const [formData, setFormData] = useState<EmployeeData>({
    age: "",
    department: "",
    jobRole: "",
    salary: "",
    overtime: "",
    performanceRating: "",
    yearsAtCompany: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof EmployeeData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(formData).every(value => value !== "");

  return (
    <Card className="shadow-card border-border/50 bg-card/95 backdrop-blur-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            Employee Assessment
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Enter employee details to assess layoff risk using our advanced AI prediction model
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age Input */}
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 font-medium">
                <User className="h-4 w-4 text-primary" />
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 35"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="transition-smooth focus:shadow-glow/20"
                min="18"
                max="70"
              />
            </div>

            {/* Department Select */}
            <div className="space-y-2">
              <Label htmlFor="department" className="flex items-center gap-2 font-medium">
                <Building2 className="h-4 w-4 text-primary" />
                Department
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                <SelectTrigger className="transition-smooth focus:shadow-glow/20">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Role Input */}
            <div className="space-y-2">
              <Label htmlFor="jobRole" className="flex items-center gap-2 font-medium">
                <User className="h-4 w-4 text-primary" />
                Job Role
              </Label>
              <Input
                id="jobRole"
                placeholder="e.g., Senior Developer"
                value={formData.jobRole}
                onChange={(e) => handleInputChange("jobRole", e.target.value)}
                className="transition-smooth focus:shadow-glow/20"
              />
            </div>

            {/* Salary Input */}
            <div className="space-y-2">
              <Label htmlFor="salary" className="flex items-center gap-2 font-medium">
                <DollarSign className="h-4 w-4 text-primary" />
                Annual Salary (USD)
              </Label>
              <Input
                id="salary"
                type="number"
                placeholder="e.g., 75000"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                className="transition-smooth focus:shadow-glow/20"
                min="0"
              />
            </div>

            {/* Overtime Select */}
            <div className="space-y-2">
              <Label htmlFor="overtime" className="flex items-center gap-2 font-medium">
                <Clock className="h-4 w-4 text-primary" />
                Overtime Frequency
              </Label>
              <Select value={formData.overtime} onValueChange={(value) => handleInputChange("overtime", value)}>
                <SelectTrigger className="transition-smooth focus:shadow-glow/20">
                  <SelectValue placeholder="Select overtime frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="rarely">Rarely</SelectItem>
                  <SelectItem value="sometimes">Sometimes</SelectItem>
                  <SelectItem value="often">Often</SelectItem>
                  <SelectItem value="always">Always</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Performance Rating Select */}
            <div className="space-y-2">
              <Label htmlFor="performanceRating" className="flex items-center gap-2 font-medium">
                <Star className="h-4 w-4 text-primary" />
                Performance Rating
              </Label>
              <Select value={formData.performanceRating} onValueChange={(value) => handleInputChange("performanceRating", value)}>
                <SelectTrigger className="transition-smooth focus:shadow-glow/20">
                  <SelectValue placeholder="Select performance rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Needs Improvement</SelectItem>
                  <SelectItem value="2">2 - Below Average</SelectItem>
                  <SelectItem value="3">3 - Average</SelectItem>
                  <SelectItem value="4">4 - Above Average</SelectItem>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Years at Company Input */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="yearsAtCompany" className="flex items-center gap-2 font-medium">
                <Calendar className="h-4 w-4 text-primary" />
                Years at Company
              </Label>
              <Input
                id="yearsAtCompany"
                type="number"
                placeholder="e.g., 3.5"
                value={formData.yearsAtCompany}
                onChange={(e) => handleInputChange("yearsAtCompany", e.target.value)}
                className="transition-smooth focus:shadow-glow/20"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-gradient-primary hover:shadow-glow text-white font-medium py-3 transition-smooth disabled:opacity-50"
          >
            {isLoading ? "Analyzing..." : "Predict Layoff Risk"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeePredictionForm;