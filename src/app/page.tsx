"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  Globe, 
  Zap, 
  Target, 
  Copy, 
  BarChart3, 
  Sparkles,
  ChevronRight,
  Check,
  Crown,
  Rocket,
  Brain,
  DollarSign,
  Users,
  Lock,
  ArrowRight,
  Star,
  Quote,
  Award,
  TrendingDown
} from "lucide-react";

export default function GlobaLaunch() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("Brasil");

  const trendingProducts = [
    {
      id: 1,
      name: "Fórmula Negócio Online",
      category: "Infoproduto",
      revenue: "R$ 2.4M/mês",
      growth: "+340%",
      country: "🇧🇷 Brasil",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Emagrecimento Definitivo",
      category: "Saúde",
      revenue: "R$ 1.8M/mês",
      growth: "+280%",
      country: "🇺🇸 EUA",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Curso de Trading",
      category: "Finanças",
      revenue: "R$ 3.1M/mês",
      growth: "+420%",
      country: "🇧🇷 Brasil",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Inglês em 6 Meses",
      category: "Educação",
      revenue: "R$ 950K/mês",
      growth: "+195%",
      country: "🇧🇷 Brasil",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Henrique",
      role: "Ex-Vendedor, Hoje Afiliado",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      content: "Gastei R$ 23 mil em cursos nos últimos 2 anos. Resultado? Zero. Com o GlobaLaunch, clonei uma oferta em 48h e fiz R$ 31 mil no primeiro mês. Cancelei tudo.",
      revenue: "R$ 31K no 1º mês",
      rating: 5
    },
    {
      name: "Mariana Souza",
      role: "Mãe e Empreendedora Digital",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      content: "Trabalhava 12h por dia tentando entender marketing. Agora a IA faz tudo. Repliquei 4 ofertas dos EUA e estou faturando mais que meu antigo salário. Sem curso, sem enrolação.",
      revenue: "4 ofertas replicadas",
      rating: 5
    },
    {
      name: "Roberto Lima",
      role: "Afiliado Profissional",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      content: "Fiz 6 em 7 pela primeira vez na vida. A ferramenta de clonagem é absurda. Peguei uma oferta que fatura milhões nos EUA, adaptei pro Brasil e explodiu. Nunca mais compro curso.",
      revenue: "R$ 180K em 45 dias",
      rating: 5
    },
    {
      name: "Juliana Ferreira",
      role: "Lançadora de Infoprodutos",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      content: "Meu último lançamento foi um fracasso. Usei o GlobaLaunch pra analisar o que tava errado e clonar estratégias que funcionam. Próximo lançamento: R$ 420K. A diferença é brutal.",
      revenue: "R$ 420K no relançamento",
      rating: 5
    },
    {
      name: "Felipe Andrade",
      role: "Gestor de Tráfego",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      content: "Meus clientes dobraram o ROI. Agora entrego campanhas baseadas em estratégias validadas globalmente. Parei de testar no escuro. A IA mostra exatamente o que funciona.",
      revenue: "+150% ROI clientes",
      rating: 5
    },
    {
      name: "Amanda Costa",
      role: "Agência de Marketing",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
      content: "Minha agência estava estagnada. Com o Scale Gen, conseguimos escalar 8 clientes simultaneamente. Faturamento da agência cresceu 230% em 3 meses. Ferramenta indispensável.",
      revenue: "+230% faturamento",
      rating: 5
    }
  ];

  const stats = [
    { value: "10.247", label: "Usuários Ativos", icon: Users },
    { value: "R$ 52M+", label: "Gerado em Vendas", icon: DollarSign },
    { value: "1.834", label: "Ofertas Clonadas", icon: Copy },
    { value: "4.9/5", label: "Avaliação Média", icon: Star }
  ];

  const plans = [
    {
      name: "Start",
      price: "97",
      description: "Ideal para começar",
      features: [
        "5 estratégias completas/mês",
        "Análise de marketing básica",
        "Acesso a copys e funis validados",
        "Atualizações semanais",
        "Suporte por email"
      ],
      limits: {
        strategies: "5 por mês",
        clone: "Não incluído",
        scale: "Não incluído"
      },
      icon: Rocket,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Growth",
      price: "350",
      description: "Para escalar resultados",
      features: [
        "10 estratégias completas/mês",
        "Clonagem de ofertas (10 usos/mês)",
        "Ferramenta de Escala (10 usos/mês)",
        "Automação de campanhas",
        "Análise de neuromarketing",
        "Suporte prioritário"
      ],
      limits: {
        strategies: "10 por mês",
        clone: "10 clonagens/mês",
        scale: "10 escalas/mês"
      },
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      name: "Pro",
      price: "500",
      description: "Domínio total do mercado",
      features: [
        "Estratégias ILIMITADAS",
        "Clonagem ILIMITADA",
        "AI Scale Gen ILIMITADO",
        "Insights avançados de IA",
        "Análise global de mercados",
        "Consultoria estratégica mensal",
        "Suporte VIP 24/7"
      ],
      limits: {
        strategies: "Ilimitado",
        clone: "Ilimitado",
        scale: "Ilimitado"
      },
      icon: Crown,
      color: "from-amber-500 to-orange-500"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "IA Estratégica",
      description: "Inteligência artificial que analisa padrões de sucesso e replica estratégias vencedoras"
    },
    {
      icon: Copy,
      title: "Clone de Ofertas",
      description: "Replique ofertas de sucesso com 100% de funcionalidade validada - nosso diferencial"
    },
    {
      icon: Globe,
      title: "Expansão Global",
      description: "Adapte automaticamente suas estratégias para qualquer país do mundo"
    },
    {
      icon: BarChart3,
      title: "Análise Completa",
      description: "Veja copys, funis, storytellings e campanhas dos maiores players"
    },
    {
      icon: Zap,
      title: "AI Scale Gen",
      description: "Ferramenta exclusiva que escala seus produtos automaticamente"
    },
    {
      icon: Target,
      title: "Zero Cursos",
      description: "Elimine gastos com cursos - a IA faz todo o trabalho estratégico por você"
    }
  ];

  const handleCheckout = async (planId: string) => {
    // This will be implemented with actual Stripe integration
    console.log('Checkout for plan:', planId);
    alert('Sistema de pagamento será configurado com suas credenciais Stripe');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"></div>
        
        <nav className="relative border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Logo Nova - Mais Criativa e Memorável */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/50 rotate-6 hover:rotate-0 transition-transform">
                    <Globe className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-950 animate-bounce"></div>
                </div>
                <div>
                  <span className="text-2xl font-black text-white tracking-tight">
                    Globa<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Launch</span>
                  </span>
                  <div className="text-[10px] text-purple-400 font-semibold tracking-widest -mt-1">CLONE & SCALE</div>
                </div>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                Começar Agora
              </button>
            </div>
          </div>
        </nav>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Inteligência Artificial Estratégica</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Acesse a Inteligência Por Trás<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dos Produtos Que Mais Vendem
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              Descubra, clone e escale ofertas de sucesso global com IA. 
              <span className="text-purple-400 font-semibold"> Sem cursos. Sem tentativa e erro.</span> Apenas resultados.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center gap-2">
                Testar Gratuitamente
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
                Ver Demonstração
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>1 produto grátis para testar</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Sem cartão de crédito</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Prova Social com Números */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Produtos em Alta <span className="text-purple-400">Agora</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Veja o que está vendendo milhões e replique o sucesso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                  {product.growth}
                </div>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-400 font-semibold">{product.category}</span>
                  <span className="text-xs text-gray-400">{product.country}</span>
                </div>
                
                <h3 className="text-white font-bold text-lg">{product.name}</h3>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-green-400 font-bold">{product.revenue}</span>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 text-sm font-semibold">
                    Clonar
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20 inline-flex items-center gap-2">
            Ver Todos os Produtos
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonials Section - Prova Social APELATIVA com Pessoas Reais */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>Resultados Reais • Pessoas Reais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Eles Cancelaram Todos os Cursos e <span className="text-purple-400">Começaram a Lucrar</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Mais de 10 mil pessoas já descobriram que não precisam de mais nenhum curso. Só do GlobaLaunch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-purple-400 mb-4 opacity-50" />
              
              <p className="text-gray-300 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>

              <div className="mt-4 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                <div className="text-green-400 font-bold">{testimonial.revenue}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            <span>Garantia de 7 dias</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            <span>Cancele quando quiser</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            <span>Suporte em português</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tudo Que Você Precisa Para <span className="text-purple-400">Dominar o Mercado</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ferramentas profissionais que eliminam a necessidade de cursos caros e tentativa e erro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Clone Feature Highlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/30 border border-purple-500/50 rounded-full text-purple-200 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Nosso Diferencial</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                Clone Ofertas de Sucesso com <span className="text-purple-400">100% de Funcionalidade</span>
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Não perca tempo recriando do zero. Nossa IA analisa, valida e entrega ofertas completas e funcionais. 
                Copys, funis, páginas, emails - tudo pronto para você adaptar e lucrar.
              </p>

              <ul className="space-y-4">
                {[
                  "Copys testadas e validadas",
                  "Funis de vendas completos",
                  "Estratégias de tráfego pago",
                  "Sequências de email prontas",
                  "Páginas de vendas otimizadas"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 inline-flex items-center gap-2">
                Começar a Clonar Agora
                <Copy className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-semibold">Oferta Clonada</span>
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">Validada</span>
                </div>
                
                <div className="space-y-3">
                  <div className="h-3 bg-purple-500/30 rounded-full w-full"></div>
                  <div className="h-3 bg-purple-500/30 rounded-full w-4/5"></div>
                  <div className="h-3 bg-purple-500/30 rounded-full w-3/4"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">340%</div>
                    <div className="text-xs text-gray-400">Taxa de Conversão</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">R$ 2.4M</div>
                    <div className="text-xs text-gray-400">Faturamento/mês</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section - ATUALIZADO COM NOVOS LIMITES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Escolha Seu Plano e <span className="text-purple-400">Pare de Comprar Cursos</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Investimento que se paga sozinho. Tudo que você precisa está aqui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:shadow-2xl transition-all ${
                plan.popular 
                  ? 'border-purple-500 shadow-xl shadow-purple-500/20 scale-105' 
                  : 'border-white/10 hover:border-purple-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                  Mais Popular
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                <plan.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">R$ {plan.price}</span>
                  <span className="text-gray-400">/mês</span>
                </div>
              </div>

              {/* Limites do Plano */}
              <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-sm text-gray-400 mb-2">Limites mensais:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white">
                    <span>Estratégias:</span>
                    <span className="font-bold text-purple-400">{plan.limits.strategies}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Clonagem:</span>
                    <span className="font-bold text-purple-400">{plan.limits.clone}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Escala:</span>
                    <span className="font-bold text-purple-400">{plan.limits.scale}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleCheckout(plan.name.toLowerCase())}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                Começar Agora
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-400">
            ✨ <span className="text-purple-400 font-semibold">Teste grátis:</span> 1 produto completo sem cartão de crédito
          </p>
          <p className="text-gray-400">
            Todos os planos incluem garantia de 7 dias. Cancele quando quiser.
          </p>
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50 blur-3xl"></div>
          
          <div className="relative space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Pare de Comprar Cursos.<br />
              Comece a <span className="underline">Lucrar de Verdade</span>.
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tudo que você precisa para vender está aqui. Estratégias validadas, ofertas prontas, IA que trabalha por você.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
                Testar Gratuitamente
                <Rocket className="w-5 h-5" />
              </button>
              <button className="px-10 py-5 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/30 transition-all border border-white/30">
                Ver Planos
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>+10.000 usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>R$ 50M+ gerados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-950"></div>
              </div>
              <span className="text-xl font-bold text-white">GlobaLaunch</span>
            </div>
            
            <p className="text-gray-400 text-sm">
              © 2024 GlobaLaunch. Transforme estratégias em lucro.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
