import { ArrowRight, BarChart3, ShieldCheck, Users } from "lucide-react";
import Footer from "../components/Footer";
import HomeContainer from "../components/ui/HomeContainer";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg transition-colors duration-300">

      {/* Background Decorativo (Gradient Blur) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/20 dark:bg-blue-900/10 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-400/20 dark:bg-purple-900/10 blur-[100px]" />
      </div>
      <div className="flex flex-row align-end ml-20" >
        <ThemeToggle />
      </div>

      <main className="flex-grow flex items-center">

        <HomeContainer>

          <div className="flex flex-col lg:flex-row items-center gap-1 py-2 lg:py-2">

            {/* Texto (Lado Esquerdo) */}
            <div className="w-full lg:w-1/2 text-center ml-20 lg:text-left animate-slideUp">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wide mb-6">
                Global Solution 2025
              </div>

              <h1 className="font-outfit text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
                O Futuro do <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Trabalho é Agora
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Visão preditiva. Retenção estratégica. Equidade para todos.
                Prepare sua organização para 2030 com inteligência de dados e humanidade.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/login">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    Acessar Plataforma <ArrowRight size={20} />
                  </button>
                </Link>
                <a href="#features">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                    Saiba Mais
                  </button>
                </a>
              </div>
            </div>

            {/* Imagem Hero (Lado Direito) */}
            <div className="w-full lg:w-1/2 animate-fadeIn delay-200">
              <div className="relative w-full max-w-lg mx-auto group">
                {/* Efeito de Glow atrás da imagem */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[20px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                <img
                  src="/img/logo-transp-1.png" 
                  alt="Talent Guard Dashboard"
                  className="relative rounded-[10px] shadow-2xl w-full h-auto object-cover bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Seção de Features (Pilares) */}
          <div id="features" className="mx-10 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 dark:border-gray-800">
            <FeatureCard
              icon={<BarChart3 size={32} className="text-blue-500" />}
              title="Visão Preditiva"
              description="Antecipe tendências de mercado e gaps salariais antes que eles se tornem um problema."
            />
            <FeatureCard
              icon={<ShieldCheck size={32} className="text-purple-500" />}
              title="Retenção Estratégica"
              description="Identifique talentos em risco e aja proativamente para manter sua equipe engajada."
            />
            <FeatureCard
              icon={<Users size={32} className="text-green-500" />}
              title="Equidade & Inclusão"
              description="Garanta salários justos e oportunidades iguais baseadas em dados reais, não em viés."
            />
          </div>

        </HomeContainer>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 bg-gray-50 dark:bg-gray-800 w-8 h-8 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}