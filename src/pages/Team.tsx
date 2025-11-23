import { Github, Linkedin } from "lucide-react";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import FadeIn from "../components/ui/FadeIn";

interface TeamMember {
  name: string;
  rm: string;
  course: string;
  position: string;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Mariana Inoue',
    rm: 'RM - 565834',
    course: 'Turma 1TDSR - 2025',
    position: 'Leader',
    bio: 'Com uma paixão por interfaces elegantes e intuitivas, eu crio experiências visuais atraentes e funcionais que encantam os usuários. Nas horas vagas, a natação é meu refúgio e estou explorando o desafiador mundo das travessias aquáticas.',
    image: '/img/mari.jpg',
    linkedin: 'https://www.linkedin.com/in/mariana-inoue/',
    github: 'https://github.com/Mariinoue'
  },
  {
    name: 'Giovanna Neri',
    rm: 'RM - 566154',
    course: 'Turma 1TDSR - 2025',
    position: 'Dev FullStack',
    bio: 'Tem como foco o design e a gestão de bancos de dados, garantindo a integridade, organização e acesso eficiente às informações.',
    image: '/img/giovanna-perfil.jpeg',
    linkedin: 'https://www.linkedin.com/in/giovanna-neri-8b28062b5/',
    github: 'https://github.com/Giovanna-Nerii'
  },
  {
    name: 'Gabriel Nogueira',
    rm: 'RM - 563925',
    course: 'Turma 1TDSR - 2025',
    position: 'Product Manager',
    bio: 'Desenvolvedor Backend com foco em Java. Ex-pro player de e-sports, desenvolvi liderança, trabalho em equipe e trago uma visão estratégica para negócios. Apaixonado por poker, vôlei e cozinhar para meus amigos e familiares.',
    image: '/img/gabriel-perfil-2.jpg',
    linkedin: 'https://www.linkedin.com/in/gabriel-nogueira-peixoto/',
    github: 'https://github.com/GNogueirovski'
  }
];

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg transition-colors duration-300 font-outfit">

      {/* Conteúdo Principal */}
      <main className="flex-grow py-12 md:py-16">
        <Container>

          {/* Título e Subtítulo */}
          <div className="text-center mb-12 md:mb-16 animate-slideUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Conheça o nosso Time <span className="text-indigo-600">Bug Buddies</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Pessoas que fazem as coisas acontecerem com tecnologia e inovação.
            </p>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <FadeIn
                key={member.name}
                delay={index * 200}
              >
                <div className="h-full">
                  <Card hover className="h-full flex flex-col overflow-hidden bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border transition-colors duration-300">

                    {/* Imagem com Aspect Ratio */}
                    <div className="relative overflow-hidden aspect-square group">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay Gradiente no Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Ver perfil completo
                        </span>
                      </div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {member.name}
                        </h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wide">
                          {member.position}
                        </p>
                      </div>

                      {/* Info Acadêmica */}
                      <div className="flex flex-wrap gap-2 mb-4 text-xs font-medium">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                          {member.rm}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                          {member.course}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                        {member.bio}
                      </p>

                      {/* Redes Sociais */}
                      <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-full hover:bg-[#0077b5] hover:text-white dark:hover:bg-[#0077b5] dark:hover:text-white transition-all duration-200 hover:-translate-y-1 shadow-sm"
                          aria-label={`LinkedIn de ${member.name}`}
                        >
                          <Linkedin size={20} />
                        </a>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-full hover:bg-[#333] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 hover:-translate-y-1 shadow-sm"
                          aria-label={`GitHub de ${member.name}`}
                        >
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </Card>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}