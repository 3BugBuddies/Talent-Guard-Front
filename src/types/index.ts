// Enum de Risco (br.com.fiap.enums.RiskClassification)
export type RiskClassification = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// DTO de Cargo
export interface RoleTO {
  idRole: number;
  name: string;
  level: Level;
}

// DTO de Colaborador
export interface EmployeeTO {
  idEmployee: number; 
  fullName: string;
  birthDate: string; // Formato YYYY-MM-DD
  salary: number;
  department: string;
  educationLevel: string;
  hireDate: string; // Formato YYYY-MM-DD
  role: RoleTO;     // Objeto aninhado obrigatório
}

// DTO de Benchmark (Dados de Mercado)
export interface BenchmarkTO {
  idBenchmark?: number;
  roleName: string;
  level: Level;
  region: string;
  companySize: string;
  averageSalary: number;
}

// DTO de Análise Salarial
export interface SalaryAnalysisTO {
  employee: EmployeeTO;
  marketAverage: number;
  differencePercentage: number;
  risk: RiskClassification;
  recommendation: string;
}

// Tipo Estendido para o Frontend (para o Dashboard Visual)
export interface SalaryAnalysisEnhanced extends SalaryAnalysisTO {
  compaRatio: number;
  percentile: string;
  replacementCost: number;
  suggestedRaise: number;
  performanceRating: "Baixo" | "Médio" | "Alto" | "Top Performer";
  lastIncreaseMonths: number;
}


// Enums
export type Level = "JUNIOR" | "PLENO" | "SENIOR" | "SPECIALIST" | "MANAGER" | "DIRECTOR" | "VP" | "C_LEVEL";
// export type RiskClassification = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// export interface RoleTO {
//   idRole: number;
//   name: string;
//   level: Level;
// }

// export interface EmployeeTO {
//   idEmployee: number;
//   fullName: string;
//   birthDate: string;
//   salary: number;
//   department: string;
//   educationLevel: string;
//   hireDate: string;
//   role: RoleTO;
// }

// export interface BenchmarkTO {
//   idBenchmark?: number;
//   roleName: string;
//   level: Level;
//   region: string;
//   companySize: string;
//   averageSalary: number;
// }

// // O DTO INTELIGENTE QUE VEM DO BACKEND
// export interface SalaryAnalysisTO {
//   employee: EmployeeTO;
//   marketAverage: number;
  
//   // Dados Processados pelo Java
//   compaRatio: number;          // Ex: 0.85
//   differencePercentage: number; 
//   percentile: string;          // "Abaixo da Média"
//   replacementCost: number;     // R$ 45.000,00
//   suggestedRaise: number;      // R$ 1.500,00
  
//   // Dados Simulados/Inferidos pelo Java
//   performanceRating: "Baixo" | "Médio" | "Alto" | "Top Performer";
//   monthsSinceLastIncrease: number;

//   // Decisão de Negócio do Java
//   risk: RiskClassification;
//   recommendation: string;
// }
