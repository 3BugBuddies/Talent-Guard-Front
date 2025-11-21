import { useState } from "react";
import Container from "../../components/ui/Container";
import BenchmarkForm from "../../components/forms/BenchmarkForm";
import BenchmarkList from "../../components/dashboard/BenchmarkList";
import { Link } from "react-router-dom";

export default function AdminBenchmarks() {
  const [refreshList, setRefreshList] = useState(0);

  const handleSuccess = () => {
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-outfit">
      {/* Header Simples Admin */}
      <div className="bg-gray-900 text-white shadow-md mb-8">
        <Container className="py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Talent Guard | Admin</h1>
          <Link to="/" className="text-gray-300 hover:text-white text-sm">Voltar para Home</Link>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna da Esquerda: Formulário */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BenchmarkForm onSuccess={handleSuccess} />
            </div>
          </div>

          {/* Coluna da Direita: Lista */}
          <div className="lg:col-span-2">
            <BenchmarkList refreshTrigger={refreshList} />
          </div>

        </div>
      </Container>
    </div>
  );
}