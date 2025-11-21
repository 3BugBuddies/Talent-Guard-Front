import { useState, useEffect } from "react";
import { RoleTO } from "../../types";
import { RoleService } from "../../services/RoleService";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";
import RoleModal from "../../components/modals/RoleModal";

export default function AdminRoles() {
  const [roles, setRoles] = useState<RoleTO[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<RoleTO | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<RoleTO | null>(null);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await RoleService.getAll();
      setRoles(data);
    } catch (error) {
      console.error("Erro ao carregar cargos:", error);
      alert("Erro ao carregar lista de cargos.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setRoleToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (role: RoleTO) => {
    setRoleToEdit(role);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (role: RoleTO) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  const handleSaveRole = async (roleData: Omit<RoleTO, "idRole"> | RoleTO) => {
    try {
      if ("idRole" in roleData) {
        await RoleService.update(roleData);
        alert("Cargo atualizado com sucesso!");
      } else {
        await RoleService.create(roleData);
        alert("Cargo criado com sucesso!");
      }
      loadRoles();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar cargo:", error);
      alert("Erro ao salvar cargo. Verifique se o backend está rodando.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!roleToDelete?.idRole) return;
    try {
      await RoleService.delete(roleToDelete.idRole);

      setRoles((prev) => prev.filter((r) => r.idRole !== roleToDelete.idRole));
      alert("Cargo removido!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert(
        "Erro ao deletar cargo. Ele pode estar vinculado a um funcionário."
      );
    } finally {
      setIsDeleteModalOpen(false);
      setRoleToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
      {/* Header com Ação Principal */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Gestão de Cargos e Níveis
          </h3>
          <p className="text-sm text-gray-500">
            Cadastre e padronize os cargos da organização
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <span className="text-xl leading-none pb-1">+</span> Novo Cargo
        </button>
      </div>

      {/* Tabela de Listagem */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Carregando cargos...
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Nome do Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Nível Hierárquico
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr
                  key={role.idRole}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    #{role.idRole}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {role.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Badge de Nível com cores baseadas na hierarquia */}
                    <span
                      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-bold rounded-full
                      ${
                        ["C_LEVEL", "VP", "DIRECTOR"].includes(role.level)
                          ? "bg-purple-100 text-purple-800"
                          : ["MANAGER", "SPECIALIST"].includes(role.level)
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {role.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(role)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(role)}
                      className="text-red-600 hover:text-red-900 font-medium transition-colors"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
        roleToEdit={roleToEdit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        employeeName={`o cargo "${roleToDelete?.name} - ${roleToDelete?.level}"`}
      />
    </div>
  );
}
