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
        .then(setRoles)
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
      setFormData((prev) => ({ ...prev, role: selectedRole }));
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
        <div className="px-6 py-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg flex justify-between">
          <h3 className="text-xl font-bold">Novo Colaborador</h3>
          <button onClick={onClose} className="text-white text-2xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Datas */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nascimento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admissão
              </label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Departamento e Salário */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Departamento
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salário (R$)
              </label>
              <input
                type="number"
                step="0.01"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Escolaridade */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Escolaridade
              </label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Graduação">Graduação</option>
                <option value="Pós-Graduação">Pós-Graduação</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutorado">Doutorado</option>
              </select>
            </div>

            <div className="col-span-2 border-t pt-4 mt-2">
              <h4 className="font-bold text-gray-600">Dados do Cargo (Role)</h4>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Selecionar Cargo Existente
              </label>
              {loadingRoles ? (
                <p>Carregando...</p>
              ) : (
                <select
                  value={formData.role.idRole || ""}
                  onChange={handleRoleSelect}
                  className="w-full border p-2 rounded bg-gray-50"
                  required
                >
                  <option value="" disabled>
                    Selecione...
                  </option>
                  {roles.map((r) => (
                    <option key={r.idRole} value={r.idRole}>
                      {r.name} - {r.level}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded shadow"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
