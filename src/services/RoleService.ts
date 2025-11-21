// import { RoleTO } from "../types";
// import { apiRequest } from "./services";
// export const RoleService = {
//   /**
//    * GET /roles - Lista todos os cargos
//    */
//   getAll: async (): Promise<RoleTO[]> => {
//     return await apiRequest<RoleTO[]>("/roles", "GET");
//   },

//   /**
//    * GET /roles/{id} - Busca um cargo pelo ID
//    */
//   getById: async (id: number): Promise<RoleTO> => {
//     return await apiRequest<RoleTO>(`/roles/${id}`, "GET");
//   },

//   /**
//    * POST /roles - Cria um novo cargo
//    * Omitimos idRole pois é gerado pelo backend
//    */
//   create: async (role: Omit<RoleTO, "idRole">): Promise<RoleTO> => {
//     return await apiRequest<RoleTO>("/roles", "POST", role);
//   },

//   /**
//    * PUT /roles/{id} - Atualiza um cargo existente
//    */
//   update: async (role: RoleTO): Promise<RoleTO> => {
//     if (!role.idRole) throw new Error("ID do cargo obrigatório para atualização");
//     return await apiRequest<RoleTO>(`/roles/${role.idRole}`, "PUT", role);
//   },

//   /**
//    * DELETE /roles/{id} - Remove um cargo
//    */
//   delete: async (id: number): Promise<void> => {
//     return await apiRequest<void>(`/roles/${id}`, "DELETE");
//   }
// };

import { RoleTO } from "../types";

// Chave para salvar no navegador
const STORAGE_KEY = "tg_mock_roles";
const DELAY_MS = 500; // Simula lag de rede (loading)

// Dados iniciais (Seed) para não começar vazio
const INITIAL_ROLES: RoleTO[] = [
  { idRole: 1, name: "Desenvolvedor Frontend", level: "JUNIOR" },
  { idRole: 2, name: "Desenvolvedor Frontend", level: "PLENO" },
  { idRole: 3, name: "Desenvolvedor Backend", level: "SENIOR" },
  { idRole: 4, name: "Tech Lead", level: "SPECIALIST" },
  { idRole: 5, name: "Product Owner", level: "SENIOR" },
  { idRole: 6, name: "Gerente de Projetos", level: "MANAGER" },
  { idRole: 7, name: "UX/UI Designer", level: "PLENO" },
  { idRole: 8, name: "Diretor de TI", level: "DIRECTOR" },
  { idRole: 9, name: "CTO", level: "C_LEVEL" },
];

// Função auxiliar para simular delay
const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY_MS));

// Função auxiliar para ler do LocalStorage
const getRolesFromStorage = (): RoleTO[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ROLES));
    return INITIAL_ROLES;
  }
  return JSON.parse(stored);
};

export const RoleService = {
  /**
   * GET /roles - Lista todos os cargos (MOCK)
   */
  getAll: async (): Promise<RoleTO[]> => {
    await delay();
    return getRolesFromStorage();
  },

  /**
   * GET /roles/{id} - Busca um cargo pelo ID (MOCK)
   */
  getById: async (id: number): Promise<RoleTO> => {
    await delay();
    const roles = getRolesFromStorage();
    const role = roles.find((r) => r.idRole === id);
    if (!role) throw new Error("Cargo não encontrado");
    return role;
  },

  /**
   * POST /roles - Cria um novo cargo (MOCK)
   */
  create: async (role: Omit<RoleTO, "idRole">): Promise<RoleTO> => {
    await delay();
    const roles = getRolesFromStorage();

    // Gera ID autoincrementável baseado no maior ID existente
    const maxId =
      roles.length > 0 ? Math.max(...roles.map((r) => r.idRole)) : 0;
    const newRole: RoleTO = { ...role, idRole: maxId + 1 };

    const updatedRoles = [...roles, newRole];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRoles));

    return newRole;
  },

  /**
   * PUT /roles/{id} - Atualiza um cargo existente (MOCK)
   */
  update: async (role: RoleTO): Promise<RoleTO> => {
    await delay();
    if (!role.idRole)
      throw new Error("ID do cargo obrigatório para atualização");

    const roles = getRolesFromStorage();
    const index = roles.findIndex((r) => r.idRole === role.idRole);

    if (index === -1) throw new Error("Cargo não encontrado para atualização");

    roles[index] = role;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));

    return role;
  },

  /**
   * DELETE /roles/{id} - Remove um cargo (MOCK)
   */
  delete: async (id: number): Promise<void> => {
    await delay();
    const roles = getRolesFromStorage();
    const filteredRoles = roles.filter((r) => r.idRole !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRoles));
  },
};
