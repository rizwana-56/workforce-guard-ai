interface EmployeeData {
  age: string;
  department: string;
  jobRole: string;
  salary: string;
  overtime: string;
  performanceRating: string;
  yearsAtCompany: string;
}

interface PredictionResult {
  willBeLayedOff: boolean;
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  factors: {
    name: string;
    impact: number;
    isPositive: boolean;
  }[];
}

// Sophisticated prediction algorithm that considers multiple factors
export const predictLayoffRisk = async (data: EmployeeData): Promise<PredictionResult> => {
  // Simulate API delay for realistic experience
  await new Promise(resolve => setTimeout(resolve, 2000));

  const age = parseInt(data.age);
  const salary = parseInt(data.salary);
  const performanceRating = parseInt(data.performanceRating);
  const yearsAtCompany = parseFloat(data.yearsAtCompany);

  let riskScore = 0;
  const factors: { name: string; impact: number; isPositive: boolean }[] = [];

  // Age factor (higher risk for older employees in some scenarios)
  let ageImpact = 0;
  if (age > 55) {
    ageImpact = 15;
    riskScore += ageImpact;
  } else if (age < 25) {
    ageImpact = 8;
    riskScore += ageImpact;
  } else {
    ageImpact = -5;
    riskScore -= 5;
  }
  factors.push({
    name: "Age Factor",
    impact: ageImpact,
    isPositive: ageImpact < 0
  });

  // Department risk (some departments are more volatile)
  let deptImpact = 0;
  const departmentRisk = {
    "sales": 10,
    "marketing": 12,
    "support": 15,
    "operations": 8,
    "hr": 6,
    "finance": 4,
    "engineering": -2
  };
  deptImpact = departmentRisk[data.department as keyof typeof departmentRisk] || 5;
  riskScore += deptImpact;
  factors.push({
    name: "Department Risk",
    impact: deptImpact,
    isPositive: deptImpact < 0
  });

  // Salary factor (very high or very low salaries can be risky)
  let salaryImpact = 0;
  if (salary > 150000) {
    salaryImpact = 12; // High salary = cost cutting target
  } else if (salary < 40000) {
    salaryImpact = 8; // Low salary = potentially undervalued
  } else if (salary >= 60000 && salary <= 100000) {
    salaryImpact = -8; // Sweet spot
  } else {
    salaryImpact = 2;
  }
  riskScore += salaryImpact;
  factors.push({
    name: "Salary Range",
    impact: salaryImpact,
    isPositive: salaryImpact < 0
  });

  // Performance rating (most important factor)
  let perfImpact = 0;
  if (performanceRating >= 4) {
    perfImpact = -20; // Excellent performance = low risk
  } else if (performanceRating === 3) {
    perfImpact = 5; // Average performance = slight risk
  } else {
    perfImpact = 25; // Poor performance = high risk
  }
  riskScore += perfImpact;
  factors.push({
    name: "Performance Rating",
    impact: perfImpact,
    isPositive: perfImpact < 0
  });

  // Years at company (tenure can be protective or risky)
  let tenureImpact = 0;
  if (yearsAtCompany < 1) {
    tenureImpact = 18; // New hires are vulnerable
  } else if (yearsAtCompany >= 1 && yearsAtCompany <= 3) {
    tenureImpact = -5; // Good tenure range
  } else if (yearsAtCompany > 10) {
    tenureImpact = 8; // Very long tenure can be costly
  } else {
    tenureImpact = -10; // Sweet spot for tenure
  }
  riskScore += tenureImpact;
  factors.push({
    name: "Company Tenure",
    impact: tenureImpact,
    isPositive: tenureImpact < 0
  });

  // Overtime factor
  let overtimeImpact = 0;
  const overtimeRisk = {
    "never": 5, // Not contributing extra
    "rarely": 2,
    "sometimes": -3,
    "often": -8, // Dedicated employee
    "always": 10 // Might be inefficient or burned out
  };
  overtimeImpact = overtimeRisk[data.overtime as keyof typeof overtimeRisk] || 0;
  riskScore += overtimeImpact;
  factors.push({
    name: "Overtime Frequency",
    impact: overtimeImpact,
    isPositive: overtimeImpact < 0
  });

  // Add some randomness to simulate real-world complexity
  const randomFactor = (Math.random() - 0.5) * 10;
  riskScore += randomFactor;

  // Normalize score to 0-100 probability
  let confidence = Math.max(0, Math.min(100, riskScore + 50));
  
  // Determine risk level
  let riskLevel: "Low" | "Medium" | "High";
  if (confidence <= 33) {
    riskLevel = "Low";
  } else if (confidence <= 66) {
    riskLevel = "Medium";
  } else {
    riskLevel = "High";
  }

  // Determine if employee will be laid off (threshold around 60%)
  const willBeLayedOff = confidence > 60;

  return {
    willBeLayedOff,
    confidence: Math.round(confidence),
    riskLevel,
    factors: factors.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)) // Sort by impact magnitude
  };
};