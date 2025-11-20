import { RoleTO } from "../types";
import { apiRequest } from "./services";

export const RoleService = {
  getAll: async (): Promise<RoleTO[]> => {
    return await apiRequest<RoleTO[]>("/roles", "GET");
  },

  getById: async (id: number): Promise<RoleTO> => {
    return await apiRequest<RoleTO>(`/roles/${id}`, "GET");
  },

  // Caso: criar cargos via Front(Admin)
  create: async (role: Omit<RoleTO, "idRole">): Promise<RoleTO> => {
    return await apiRequest<RoleTO>("/roles", "POST", role);
  },
};
