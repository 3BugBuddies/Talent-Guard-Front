import { useState, FormEvent } from 'react'
import { CheckCircle, ChevronDown } from 'lucide-react'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'


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
    question: 'Como abrir um chamado',
    answer: 'entre em contato com o time talent guard'
  },
  {
    question: 'Como abrir um chamado',
    answer: 'entre em contato com o time talent guard'
  },
    {
    question: 'Como abrir um chamado',
    answer: 'entre em contato com o time talent guard'
  },
]

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

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, insira o seu nome.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, insira um email válido.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido.'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Por favor, insira o seu número de telefone.'
    } else if (!/^\+?[\d\s-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Por favor, insira o seu número de telefone válido.'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Por favor, insira o tema do assunto.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Por favor, insira a sua mensagem.'
    } else if (formData.message.length < 10) {
      newErrors.message = 'A mensagem deve ter pelo menos 10 caracteres.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    setTimeout(() => {
      setShowSuccess(true)
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 1500)
  }

  const resetForm = () => {
    setShowSuccess(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <Section>
      <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Perguntas mais comuns</h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 bg-white text-gray-900 font-medium text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown 
                    className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 py-4 bg-white">
                    <div className="text-gray-700 leading-relaxed">
                      {item.answer.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2 last:mb-0">{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          {showSuccess ? (
            <div className="text-center flex flex-col items-center justify-center h-full">
              <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h2>
              <p className="text-gray-600 mb-6">Obrigado por entrar em contato. Retornaremos em breve.</p>
              <Button onClick={resetForm} variant="light">
                Enviar Outra Mensagem
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Fale Conosco</h2>
              <p className="text-gray-600 mb-8">
                Dúvidas, elogios, críticas e conselhos? Entre em contato, estamos aqui para ouvir você!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Qual é o seu nome?"
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Qual é o seu email?"
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Telefone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Qual o seu telefone?"
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Tema do Assunto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Qual o motivo do contato?"
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Como podemos lhe ajudar?"
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
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

    
  )
}