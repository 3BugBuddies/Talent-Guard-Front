import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Container from "../ui/Container";

export enum Level {
  JUNIOR = "JUNIOR",
  PLENO = "PLENO",
  SENIOR = "SENIOR",
  SPECIALIST = "SPECIALIST",
  MANAGER = "MANAGER",
}

export interface RoleTO {
  idRole: number;
  name: string;
  description: string;
  level: Level;
}

export interface BenchmarkSalaryTO {
  idBenchmarkSalary?: number;
  floorSalary: number;
  averageSalary: number;
  ceilingSalary: number;
  referenceDate: string;
  role: RoleTO;
}

const MOCK_ROLES: RoleTO[] = [
  {
    idRole: 1,
    name: "Desenvolvedor Front-end",
    description: "Foco em React",
    level: Level.JUNIOR,
  },
  {
    idRole: 2,
    name: "Desenvolvedor Back-end",
    description: "Foco em Java",
    level: Level.PLENO,
  },
  {
    idRole: 3,
    name: "Tech Lead",
    description: "Liderança técnica",
    level: Level.SENIOR,
  },
  {
    idRole: 4,
    name: "Product Owner",
    description: "Gestão de produto",
    level: Level.PLENO,
  },
];

export default function BenchmarkForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [selectedRoleId, setSelectedRoleId] = useState<number | string>("");
  const [formData, setFormData] = useState({
    floorSalary: "",
    averageSalary: "",
    ceilingSalary: "",
    referenceDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const roleSelected = MOCK_ROLES.find(
        (r) => r.idRole === Number(selectedRoleId)
      );

      if (!roleSelected) {
        alert("Por favor, selecione um cargo válido.");
        setLoading(false);
        return;
      }

      const payload: BenchmarkSalaryTO = {
        floorSalary: Number(formData.floorSalary),
        averageSalary: Number(formData.averageSalary),
        ceilingSalary: Number(formData.ceilingSalary),
        referenceDate: formData.referenceDate,
        role: roleSelected,
      };

      console.log("Payload enviado para API:", payload);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMsg("Benchmark de mercado salvo com sucesso!");

      setFormData({
        floorSalary: "",
        averageSalary: "",
        ceilingSalary: "",
        referenceDate: new Date().toISOString().split("T")[0],
      });
      setSelectedRoleId("");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-10 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Cadastro de Salário de Mercado
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Insira os dados de referência do mercado (Benchmark) para comparação
            futura.
          </p>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md border border-green-200 flex justify-between items-center">
            <span>{successMsg}</span>
            <button
              onClick={() => setSuccessMsg("")}
              className="text-sm font-bold"
            >
              X
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cargo (Role)
            </label>
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              <option value="" disabled>
                Selecione um cargo...
              </option>
              {MOCK_ROLES.map((role) => (
                <option key={role.idRole} value={role.idRole}>
                  {role.name} - {role.level}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Piso Salarial (Floor)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">R$</span>
                </div>
                <input
                  type="number"
                  name="floorSalary"
                  value={formData.floorSalary}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="block w-full rounded-md border-gray-300 pl-10 p-2 border focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Média Salarial
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">R$</span>
                </div>
                <input
                  type="number"
                  name="averageSalary"
                  value={formData.averageSalary}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="block w-full rounded-md border-gray-300 pl-10 p-2 border focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teto Salarial (Ceiling)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">R$</span>
                </div>
                <input
                  type="number"
                  name="ceilingSalary"
                  value={formData.ceilingSalary}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="block w-full rounded-md border-gray-300 pl-10 p-2 border focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Referência
            </label>
            <input
              type="date"
              name="referenceDate"
              value={formData.referenceDate}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
            <p className="mt-1 text-xs text-gray-500">
              Data da pesquisa de mercado.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {loading ? "Salvando..." : "Salvar Benchmark"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
