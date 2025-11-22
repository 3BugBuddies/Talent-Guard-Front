import { useState } from "react";
import { BenchmarkService } from "../../services/BenchmarkService";
import { BenchmarkTO, Level } from "../../types";
import { COMMON_ROLES, LEVELS } from "../../constants";

interface BenchmarkFormProps {
  onSuccess: () => void;
}
interface BenchmarkFormData {
  roleName: string;
  level: Level;
  averageSalary: number;
}

export default function BenchmarkForm({ onSuccess }: BenchmarkFormProps) {
  const [formData, setFormData] = useState<BenchmarkFormData>({
    roleName: "",
    level: "JUNIOR",
    averageSalary: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "averageSalary" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: BenchmarkTO = {
        role: {
          name: formData.roleName,
          level: formData.level,
        },
        averageSalary: formData.averageSalary,
        floorSalary: formData.averageSalary * 0.8,
        ceilingSalary: formData.averageSalary * 1.2,
      };

      await BenchmarkService.create(payload);

      alert("Benchmark de mercado criado com sucesso!");

      setFormData({
        roleName: "",
        level: "JUNIOR",
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
          {/* Seleção de Cargo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cargo (Role)
            </label>
            <select
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              required
            >
              <option value="" disabled>
                Selecione um cargo...
              </option>
              {COMMON_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Seleção de Nível */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nível (Senioridade)
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
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
