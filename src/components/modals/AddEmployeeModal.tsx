import { useState, useEffect } from "react";
import { EmployeeTO, RoleTO } from "../../types";
import { RoleService } from "../../services/RoleService";

type NewEmployee = Omit<EmployeeTO, "idEmployee">;

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: NewEmployee) => void;
}

const INITIAL_STATE: NewEmployee = {
  fullName: "",
  birthDate: "",
  salary: 0,
  department: "",
  educationLevel: "Graduação",
  hireDate: new Date().toISOString().split("T")[0],
  role: {
    idRole: 0,
    name: "",
    level: "JUNIOR",
  },
};

export default function AddEmployeeModal({
  isOpen,
  onClose,
  onSave,
}: AddEmployeeModalProps) {
  const [formData, setFormData] = useState<NewEmployee>(INITIAL_STATE);
  const [roles, setRoles] = useState<RoleTO[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoadingRoles(true);
      RoleService.getAll()
        .then((data) => setRoles(data))
        .catch((err) => console.error("Erro ao carregar cargos:", err))
        .finally(() => setLoadingRoles(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleRoleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedRole = roles.find((r) => r.idRole === selectedId);

    if (selectedRole) {
      setFormData((prev) => ({
        ...prev,
        role: selectedRole,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData(INITIAL_STATE);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
          <h3 className="text-xl font-bold">Novo Colaborador</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 font-bold text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Ana Silva"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Admissão
              </label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departamento
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: TI, RH..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salário (R$)
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                step="0.01"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Escolaridade
              </label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Ensino Médio">Ensino Médio</option>
                <option value="Graduação">Graduação</option>
                <option value="Pós-Graduação">Pós-Graduação</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutorado">Doutorado</option>
              </select>
            </div>

            {/* Seção Cargo*/}
            <div className="col-span-2 pt-2 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-500 mb-2 uppercase">
                Cargo e Função
              </p>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selecione o Cargo
              </label>
              {loadingRoles ? (
                <p className="text-sm text-gray-500">Carregando cargos...</p>
              ) : (
                <select
                  name="role"
                  value={formData.role.idRole || ""}
                  onChange={handleRoleSelect}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  required
                >
                  <option value="" disabled>
                    Selecione...
                  </option>
                  {roles.map((role) => (
                    <option key={role.idRole} value={role.idRole}>
                      {role.name} - {role.level}
                    </option>
                  ))}
                </select>
              )}
              <p className="text-xs text-gray-500 mt-1">
                * O nível é definido automaticamente pelo cargo selecionado.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
            >
              Cadastrar Colaborador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
