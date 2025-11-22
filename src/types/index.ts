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
  floorSalary: number;
  averageSalary: number;
  ceilingSalary: number;
  referenceDate?: string; // YYYY-MM-DD
  role: RoleTO;
}

export interface SalaryAnalysisTO {
  idSalaryAnalysis?: number;
  employee: EmployeeTO;
  benchmark: BenchmarkTO;
  recordedSalary: number;
  marketAverage: number;
  risk: RiskClassification;
  analysisDate?: string;
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

// Enum de Risco (br.com.fiap.enums.RiskClassification)
// export type RiskClassification = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// // DTO de Cargo
// export interface RoleTO {
//   idRole: number;
//   name: string;
//   level: Level;
// }

// // DTO de Colaborador
// export interface EmployeeTO {
//   idEmployee: number;
//   fullName: string;
//   birthDate: string; // Formato YYYY-MM-DD
//   salary: number;
//   department: string;
//   educationLevel: string;
//   hireDate: string; // Formato YYYY-MM-DD
//   role: RoleTO;     // Objeto aninhado obrigatório
// }

// // DTO de Benchmark (Dados de Mercado)
// export interface BenchmarkTO {
//   idBenchmark?: number;
//   roleName: string;
//   level: Level;
//   region: string;
//   companySize: string;
//   averageSalary: number;
// }

// // DTO de Análise Salarial
// export interface SalaryAnalysisTO {
//   employee: EmployeeTO;
//   marketAverage: number;
//   differencePercentage: number;
//   risk: RiskClassification;
//   recommendation: string;
// }

// // Tipo Estendido para o Frontend (para o Dashboard Visual)
// export interface SalaryAnalysisEnhanced extends SalaryAnalysisTO {
//   compaRatio: number;
//   percentile: string;
//   replacementCost: number;
//   suggestedRaise: number;
//   performanceRating: "Baixo" | "Médio" | "Alto" | "Top Performer";
//   lastIncreaseMonths: number;
// }
