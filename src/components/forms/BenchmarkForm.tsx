import { useState } from "react";
import { BenchmarkService } from "../../services/BenchmarkService";
import { BenchmarkTO, Level } from "../../types";

// Lista de Níveis (Enum)
const LEVELS: Level[] = [
  "JUNIOR",
  "PLENO",
  "SENIOR",
  "SPECIALIST",
  "MANAGER",
  "DIRECTOR",
  "VP",
  "C_LEVEL",
];

// Lista de Cargos Comuns (Varejo & Tech)
const COMMON_ROLES = [
  "Vendedor de Loja",
  "Gerente de Loja",
  "Caixa",
  "Supervisor de Vendas", // Varejo
  "Desenvolvedor Frontend",
  "Desenvolvedor Backend",
  "Full Stack Developer", // Tech
  "DevOps Engineer",
  "Data Scientist",
  "Product Owner",
  "Scrum Master",
  "UX/UI Designer",
  "Analista de Suporte",
  "QA Engineer",
];

interface BenchmarkFormProps {
  onSuccess: () => void;
}

export default function BenchmarkForm({ onSuccess }: BenchmarkFormProps) {
  const [formData, setFormData] = useState<Omit<BenchmarkTO, "idBenchmark">>({
    roleName: "",
    level: "JUNIOR",
    region: "",
    companySize: "Grande Porte", // Default
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
      await BenchmarkService.create(formData);
      alert("Benchmark de mercado criado com sucesso!");

      // Limpa o form
      setFormData({
        roleName: "",
        level: "JUNIOR",
        region: "",
        companySize: "Grande Porte",
        averageSalary: 0,
      });

      // Avisa o componente pai para recarregar a lista
      onSuccess();
    } catch (error) {
      console.error("Erro ao criar benchmark:", error);
      alert("Erro ao salvar dados de mercado.");
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

          {/* Região */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Região (Ex: SP, Nacional)
            </label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: São Paulo"
              required
            />
          </div>

          {/* Porte da Empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Porte da Empresa
            </label>
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="Startup">Startup</option>
              <option value="Pequena">Pequena</option>
              <option value="Média">Média</option>
              <option value="Grande Porte">Grande Porte</option>
              <option value="Multinacional">Multinacional</option>
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
