import { RoleTO } from "../types";
import { apiRequest } from "./services";

export const RoleService = {
  getAll: async (): Promise<RoleTO[]> => {
    return await apiRequest<RoleTO[]>("/role", "GET");
  },

  getById: async (id: number): Promise<RoleTO> => {
    return await apiRequest<RoleTO>(`/role/${id}`, "GET");
  },

  create: async (role: RoleTO): Promise<RoleTO> => {
    return await apiRequest<RoleTO>("/role", "POST", role);
  },

  update: async (role: RoleTO): Promise<RoleTO> => {
    if (!role.idRole) throw new Error("ID do cargo obrigatório para atualização");
    return await apiRequest<RoleTO>(`/role/${role.idRole}`, "PUT", role);
  },

  delete: async (id: number): Promise<void> => {
    await apiRequest<void>(`/role/${id}`, "DELETE");
  }
};