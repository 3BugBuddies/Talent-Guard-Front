import { useEffect, useState } from "react";
import { BenchmarkService } from "../../services/BenchmarkService";
import { RoleService } from "../../services/RoleService";
import { BenchmarkTO, Level, RoleTO } from "../../types";

interface BenchmarkFormProps {
  onSuccess: () => void;
}
interface BenchmarkFormData {
  idRole: number;
  averageSalary: number;
}

export default function BenchmarkForm({ onSuccess }: BenchmarkFormProps) {
  const [availableRoles, setAvailableRoles] = useState<RoleTO[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [formData, setFormData] = useState<BenchmarkFormData>({
    idRole: 0,
    averageSalary: 0,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoadingRoles(true);

      try {
        const roles = await RoleService.getAll();
        setAvailableRoles(roles);
      } catch (error) {
        console.error("Erro ao carregar cargos:", error);
        alert("Erro ao carregar cargos. Verifique se o backend está rodando.");
      } finally {
        setIsLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.idRole) {
      alert("Por favor, selecione um cargo.");
      return;
    }

    const selectedRole = availableRoles.find(r => r.idRole === formData.idRole);
    try {
      const payload: BenchmarkTO = {
        role: {
          idRole: formData.idRole,
          name: selectedRole ? selectedRole.name : "",
          level: selectedRole ? selectedRole.level as Level : "JUNIOR",
        },
        averageSalary: formData.averageSalary,
        floorSalary: formData.averageSalary * 0.8,
        ceilingSalary: formData.averageSalary * 1.2,
      };

      await BenchmarkService.create(payload);

      alert("Benchmark de mercado criado com sucesso!");

      setFormData({
        idRole: 0,
        averageSalary: 0,
      });

      onSuccess();
    } catch (error) {
      console.error("Erro ao criar benchmark:", error);
      alert(
        "Erro ao salvar dados de mercado. Verifique se o backend está rodando."
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Cadastrar Novo Benchmark de Mercado
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* INPUT UNIFICADO: Cargo + Nível */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cargo & Nível
            </label>
            <select
              name="idRole"
              value={formData.idRole}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              required
              disabled={isLoadingRoles}
            >
              <option value={0} disabled>
                {isLoadingRoles ? "Carregando cargos..." : "Selecione o Cargo..."}
              </option>
              
              {availableRoles.map((role) => (
                <option key={role.idRole} value={role.idRole}>
                  {/* Exibe Cargo + Nível juntos */}
                  {role.name} - {role.level}
                </option>
              ))}
            </select>
            {availableRoles.length === 0 && !isLoadingRoles && (
              <p className="text-xs text-red-500 mt-1">
                Nenhum cargo encontrado. Cadastre cargos na aba "Cargos" primeiro.
              </p>
            )}
          </div>

          {/* Média Salarial */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Média Salarial de Mercado (R$)
            </label>
            <input
              type="number"
              name="averageSalary"
              value={formData.averageSalary}
              onChange={handleChange}
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              * Mínimo e Máximo serão calculados automaticamente (+/- 20%)
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors font-medium mt-4"
        >
          Salvar Benchmark
        </button>
      </form>
    </div>
  );
}
