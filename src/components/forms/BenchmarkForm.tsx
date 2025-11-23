import { useEffect, useState } from "react";
import { BenchmarkService } from "../../services/BenchmarkService";
import { RoleService } from "../../services/RoleService";
import { BenchmarkTO, Level, RoleTO } from "../../types";
import { Loader2 } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (roles.length > 0) {
          setFormData(prev => ({ ...prev, idRole: roles[0].idRole ?? 0 }));
        }
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
    setIsSubmitting(true);

    if (!formData.idRole) {
      alert("Por favor, selecione um cargo.");
      setIsSubmitting(false);
      return;
    }

    const selectedRole = availableRoles.find(r => r.idRole === formData.idRole);
    if (!selectedRole) {
      alert("Cargo selecionado é inválido.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload: BenchmarkTO = {
        role: {
          idRole: formData.idRole,
          name: selectedRole.name,
          level: selectedRole.level as Level,
        },
        averageSalary: formData.averageSalary,
        floorSalary: formData.averageSalary * 0.8,
        ceilingSalary: formData.averageSalary * 1.2,
      };

      await BenchmarkService.create(payload);

      alert("Benchmark de mercado criado com sucesso!");

      setFormData({
        idRole: selectedRole.idRole ?? 0,
        averageSalary: 0,
      });

      onSuccess();
    } catch (error) {
      console.error("Erro ao criar benchmark:", error);
      alert(
        "Erro ao salvar dados de mercado. Verifique se o backend está rodando."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow border border-gray-100 dark:border-dark-border">
      <h2 className="text-xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">
        Cadastrar Novo Benchmark de Mercado
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cargo & Nível
            </label>
            <select
              name="idRole"
              value={formData.idRole}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 
                         focus:ring-2 focus:ring-green-500 outline-none 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
              disabled={isLoadingRoles || isSubmitting}
            >
              <option value={0} disabled>
                {isLoadingRoles ? "Carregando cargos..." : "Selecione o Cargo..."}
              </option>

              {availableRoles.map((role) => (
                <option key={role.idRole} value={role.idRole}>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Média Salarial de Mercado (R$)
            </label>
            <input
              type="number"
              name="averageSalary"
              value={formData.averageSalary}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 
                         focus:ring-2 focus:ring-green-500 outline-none 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-400 mt-1 dark:text-gray-500">
              * Mínimo e Máximo serão calculados automaticamente (+/- 20%)
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoadingRoles}
          className={`w-full bg-green-600 text-white py-2 px-4 rounded-md 
                      hover:bg-green-700 transition-colors font-medium mt-4 
                      ${isSubmitting ? "opacity-75 cursor-not-allowed" : "shadow-md dark:shadow-green-900/50"}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 size={18} className="animate-spin mr-2" />
              Salvando...
            </span>
          ) : (
            "Salvar Benchmark"
          )}
        </button>
      </form>
    </div>
  );
}