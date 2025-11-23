import Card from "../components/ui/Card"
import Container from "../components/ui/Container"
import FadeIn from "../components/ui/FadeIn"
import Section from "../components/ui/Section"


interface TeamMember {
  name: string
  rm: string
  course: string
  position: string
  bio: string
  image: string
  linkedin: string
  github: string
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
]

export default function Team() {
  return (
    <Section background="dark">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text-orange mb-4">
            Conheça o nosso Time Bug Buddies
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Pessoas que fazem as coisas acontecerem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <FadeIn
              key={member.name}
              delay={index * 200}
            >
              <Card hover className="overflow-hidden">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-primary-600 font-medium text-sm mb-2">
                  {member.rm}
                </p>
                
                <p className="text-primary-600 font-medium text-sm mb-2">
                  {member.course}
                </p>
                
                <p className="text-primary-600 font-medium mb-4">
                  {member.position}
                </p>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex space-x-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 bg-gray-100 text-gray-600 rounded-full hover:bg-primary-600 hover:text-white transition-all duration-200 hover:-translate-y-1"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <img src='img/LinkedIn_1_.png' alt='Linkedin'/>
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 bg-gray-100 text-gray-600 rounded-full hover:bg-primary-600 hover:text-white transition-all duration-200 hover:-translate-y-1"
                    aria-label={`GitHub de ${member.name}`}
                  >
                    <img src='img/github.png' alt='GitHub'/>
                  </a>
                </div>
              </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}