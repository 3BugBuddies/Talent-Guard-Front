// import { RoleTO } from "../types";
// import { apiRequest } from "./services";

// export const RoleService = {
//   getAll: async (): Promise<RoleTO[]> => {
//     return await apiRequest<RoleTO[]>("/roles", "GET");
//   },

//   getById: async (id: number): Promise<RoleTO> => {
//     return await apiRequest<RoleTO>(`/roles/${id}`, "GET");
//   },

//   // Caso: criar cargos via Front(Admin)
//   create: async (role: Omit<RoleTO, "idRole">): Promise<RoleTO> => {
//     return await apiRequest<RoleTO>("/roles", "POST", role);
//   },
// };

import { RoleTO } from "../types";

// Mock estático com diversos cargos para teste
const MOCK_ROLES: RoleTO[] = [
  // TI
  { idRole: 1, name: "Desenvolvedor Frontend", level: "JUNIOR" },
  { idRole: 2, name: "Desenvolvedor Frontend", level: "PLENO" },
  { idRole: 3, name: "Desenvolvedor Frontend", level: "SENIOR" },
  { idRole: 4, name: "Desenvolvedor Backend", level: "SENIOR" },
  { idRole: 10, name: "Tech Lead", level: "SPECIALIST" },
  
  // Marketing/Vendas
  { idRole: 5, name: "Analista de Marketing", level: "PLENO" },
  { idRole: 6, name: "Gerente de Vendas", level: "MANAGER" },
  
  // RH
  { idRole: 7, name: "Analista de RH", level: "JUNIOR" },
  { idRole: 8, name: "Business Partner", level: "SENIOR" },
  
  // Executivo
  { idRole: 9, name: "CTO", level: "C_LEVEL" },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const RoleService = {
  /**
   * Retorna a lista de cargos disponíveis
   */
  getAll: async (): Promise<RoleTO[]> => {
    await delay(300); // Pequeno delay para simular API
    return MOCK_ROLES;
  },

  getById: async (id: number): Promise<RoleTO> => {
    await delay(200);
    const role = MOCK_ROLES.find(r => r.idRole === id);
    if (!role) throw new Error("Cargo não encontrado");
    return role;
  }
};