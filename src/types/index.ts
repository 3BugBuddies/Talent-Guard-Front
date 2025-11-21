// Enums do Java
export type Level =
  | "JUNIOR"
  | "PLENO"
  | "SENIOR"
  | "SPECIALIST"
  | "MANAGER"
  | "DIRECTOR"
  | "VP"
  | "C_LEVEL";
export type RiskClassification = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// RoleTO.java
export interface RoleTO {
  idRole?: number; // Opcional na criação
  name: string;
  level: Level;
  description?: string;
}

// EmployeeTO.java
export interface EmployeeTO {
  idEmployee?: number; // Opcional na criação
  fullName: string;
  birthDate: string; // LocalDate -> String (ISO)
  salary: number; // BigDecimal -> number
  department: string;
  educationLevel: string;
  hireDate: string; // LocalDate -> String (ISO)
  role: RoleTO; // Objeto aninhado
}

// BenchmarkTO.java
export interface BenchmarkTO {
  idBenchmark?: number;
  roleName: string;
  level: Level;
  region: string;
  companySize: string;
  averageSalary: number; // BigDecimal -> number
}

// SalaryAnalysisTO.java
export interface SalaryAnalysisTO {
  employee: EmployeeTO;
  marketAverage: number;
  differencePercentage: number;
  risk: RiskClassification;
  recommendation: string;
}

// Tipo para uso exclusivo no Front (Estende o original)
export interface SalaryAnalysisEnhanced extends SalaryAnalysisTO {
  compaRatio: number;
  percentile: string;
  replacementCost: number;
  suggestedRaise: number;

  performanceRating: "Baixo" | "Médio" | "Alto" | "Top Performer";
  lastIncreaseMonths: number;
}
