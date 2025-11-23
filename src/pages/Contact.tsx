import { useState, FormEvent } from 'react'
import { CheckCircle, ChevronDown } from 'lucide-react'

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="py-12 flex-grow">{children}</section>
)

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg h-full border border-gray-100 dark:border-dark-border transition-colors">
    {children}
  </div>
)

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
)

const Button = ({ children, onClick, type, disabled, variant = 'primary', className }: { children: React.ReactNode, onClick?: () => void, type?: "submit" | "button", disabled?: boolean, variant?: 'primary' | 'light', className?: string }) => (
  <button
    type={type || 'button'}
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
      variant === 'primary' 
        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
    } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
)

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const faqItems = [
  {
    question: 'O que é o TalentGuard Career Monitor?',
    answer: 'É uma plataforma B2B SaaS (Software as a Service) de People Analytics. Nossa principal função é transformar a gestão de RH de reativa para proativa, utilizando Inteligência Artificial para analisar dados e identificar riscos de turnover (rotatividade) e disparidades salariais antes que o pedido de demissão aconteça.'
  },
  {
    question: 'Como o TalentGuard usa Inteligência Artificial?',
    answer: 'Utilizamos dois modelos principais de Machine Learning (IA):\n\n1. Modelo de **Classificação**: Calcula um "Índice de Risco" (Baixo, Médio, Alto) para cada colaborador, comparando seu perfil com o histórico de quem saiu da empresa.\n\n2. Modelo de **Regressão**: Calcula o "Benchmark Salarial", ou seja, o salário justo de mercado para o cargo, permitindo à empresa corrigir problemas de equidade salarial.'
  },
  {
    question: 'Qual o nosso modelo de negócios e planos de assinatura?',
    answer: 'Nosso modelo é B2B (Business to Business), focado em médias e grandes empresas. A receita é baseada em assinaturas recorrentes mensais (MRR), proporcionais ao número de funcionários monitorados (vidas):\n\n- **Plano Pro (até 200 vidas)**: R$ 1.500/mês\n- **Plano Enterprise (até 1000 vidas)**: R$ 5.000/mês'
  },
  {
    question: 'O que é o "Índice de Saúde de Carreira" e como ele me ajuda?',
    answer: 'É um indicador proativo gerado pela nossa IA, que consolida fatores de risco de um colaborador. Ele ajuda o Gestor de RH a priorizar quem mais precisa de atenção ou intervenção (como um 1:1, plano de carreira ou ajuste salarial), focando os esforços de retenção onde o risco de perda de talento é mais alto.'
  },
  {
    question: 'Qual a nossa garantia de disponibilidade (SLA)?',
    answer: 'Garantimos uma Disponibilidade Mínima Mensal (Uptime) de **99,4%** para as funcionalidades críticas do sistema (Dashboard e API de Predição). Caso esse nível não seja atingido, aplicamos multas e descontos progressivos na fatura mensal do cliente.'
  },
  {
    question: 'Quanto tempo leva para a IA analisar o perfil de um colaborador?',
    answer: 'Devido à nossa arquitetura desacoplada (Java e Python com Flask), o tempo de resposta da API para uma análise de risco individual não deve exceder **2 segundos** por colaborador processado. A visibilidade do status (Heurística de Nielsen) é mantida durante o "Processando IA...".'
  },
]

// --- Componente Principal ---

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Por favor, insira o seu nome.'
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, insira um email válido.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido.'
    }

    if (!formData.phone.trim()) newErrors.phone = 'Por favor, insira o seu número de telefone.'
    else if (!/^\+?[\d\s-()]{7,20}$/.test(formData.phone)) newErrors.phone = 'Por favor, insira o seu número de telefone válido.'

    if (!formData.subject.trim()) newErrors.subject = 'Por favor, insira o tema do assunto.'

    if (!formData.message.trim()) newErrors.message = 'Por favor, insira a sua mensagem.'
    else if (formData.message.length < 10) newErrors.message = 'A mensagem deve ter pelo menos 10 caracteres.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    // Simulação de envio
    setTimeout(() => {
      setShowSuccess(true)
      setIsSubmitting(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 1500)
  }

  const resetForm = () => {
    setShowSuccess(false)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 flex flex-col font-outfit">
    
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Coluna da Esquerda: FAQ */}
            <div className="space-y-6">
              <div className="mb-8">
                 <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Perguntas Frequentes</h2>
                 <p className="text-gray-600 dark:text-gray-400">
                   Encontre respostas rápidas sobre nossa metodologia de IA e modelos de negócio.
                 </p>
              </div>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-5 py-4 bg-white dark:bg-dark-surface-hover text-gray-900 dark:text-white font-medium text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="pr-4">{item.question}</span>
                      <ChevronDown 
                        className={`transform transition-transform text-indigo-600 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                        size={20}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                          {item.answer.split('\n').map((line, lineIndex) => (
                            <p key={lineIndex} className="mb-2 last:mb-0">{line}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna da Direita: Formulário */}
            <Card>
              {showSuccess ? (
                <div className="text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                  <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mensagem Enviada!</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Obrigado por entrar em contato. Retornaremos em breve.</p>
                  <Button onClick={resetForm} variant="light">
                    Enviar Outra Mensagem
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Fale Conosco</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Dúvidas, elogios, críticas e conselhos? Entre em contato, estamos aqui para ouvir você!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nome <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Qual é o seu nome?"
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-colors 
                        bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white 
                        border-gray-300 dark:border-gray-600
                        placeholder-gray-400 dark:placeholder-gray-500
                        ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Qual é o seu email?"
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-colors 
                        bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white 
                        border-gray-300 dark:border-gray-600
                        placeholder-gray-400 dark:placeholder-gray-500
                        ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Número de Telefone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Qual o seu telefone?"
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-colors 
                        bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white 
                        border-gray-300 dark:border-gray-600
                        placeholder-gray-400 dark:placeholder-gray-500
                        ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tema do Assunto <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Qual o motivo do contato?"
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-colors 
                        bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white 
                        border-gray-300 dark:border-gray-600
                        placeholder-gray-400 dark:placeholder-gray-500
                        ${errors.subject ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mensagem <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Como podemos lhe ajudar?"
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-colors resize-y 
                        bg-white dark:bg-gray-800 
                        text-gray-900 dark:text-white 
                        border-gray-300 dark:border-gray-600
                        placeholder-gray-400 dark:placeholder-gray-500
                        ${errors.message ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      className="w-full"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  )
}