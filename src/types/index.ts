export type Level =
  | "JUNIOR"
  | "PLENO"
  | "SENIOR"
;

export type RiskClassification = "ABOVE_CEILING" | "ON_TARGET" | "BELOW_FLOOR";

export interface RoleTO {
  idRole?: number;
  name: string;
  description?: string;
  level: Level;
}

export interface EmployeeTO {
  idEmployee?: number;
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  hireDate: string; // YYYY-MM-DD
  salary: number;
  department: string;
  educationLevel: string;
  role: RoleTO;
}
export interface BenchmarkTO {
  idBenchmark?: number;
  role: RoleTO;
  averageSalary: number;
  floorSalary: number;
  ceilingSalary: number;
  referenceDate?: string;
}

export interface SalaryAnalysisTO {
  idSalaryAnalysis?: number;
  employee: EmployeeTO;
  benchmark: BenchmarkTO;
  recordedSalary: number;
  marketAverage: number;
  risk: RiskClassification;
  analysisDate?: string;
  differencePercentage: number;
  recommendation: string;
}

export interface SalaryAnalysisEnhanced
  extends Omit<SalaryAnalysisTO, "idSalaryAnalysis"> {
  idSalaryAnalysis?: number;
  differencePercentage: number;
  recommendation: string;
  compaRatio: number;
  percentile: string;
  replacementCost: number;
  suggestedRaise: number;
  performanceRating: "Baixo" | "Médio" | "Alto" | "Top Performer";
  lastIncreaseMonths: number;
}