"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut, checkLimits, trackUsage, type User } from "@/lib/supabase";
import { 
  Globe, 
  ShoppingCart, 
  LogOut, 
  Crown, 
  Copy, 
  Zap, 
  TrendingUp,
  Brain,
  Target,
  Sparkles,
  BarChart3,
  Settings,
  Bell,
  ChevronRight,
  Lock,
  Check
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"strategies" | "clone" | "scale">("strategies");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
    } catch (error) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleUseTool = async (type: "strategy" | "clone" | "scale") => {
    if (!user) return;

    const hasAccess = await checkLimits(user.id, type);
    
    if (!hasAccess) {
      alert("Você atingiu o limite do seu plano. Faça upgrade para continuar!");
      return;
    }

    await trackUsage(user.id, type);
    alert(`Ferramenta ${type} ativada! (Funcionalidade completa será implementada)`);
    loadUser(); // Reload to update usage
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  const planLimits = {
    free: { strategies: 1, clone: 0, scale: 0 },
    start: { strategies: 5, clone: 0, scale: 0 },
    growth: { strategies: 10, clone: 10, scale: 10 },
    pro: { strategies: Infinity, clone: Infinity, scale: Infinity }
  };

  const currentLimits = planLimits[user?.plan || 'free'];
  const isUnlimited = user?.plan === 'pro' || user?.email === 'henriquemoraesh@gmail.com';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-2xl blur-md"></div>
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                  <div className="relative">
                    <Globe className="w-6 h-6 text-white absolute -top-0.5 -left-0.5 opacity-60" />
                    <ShoppingCart className="w-7 h-7 text-white relative z-10" />
                  </div>
                </div>
              </div>
              <span className="text-xl font-black text-white">
                Global<span className="text-cyan-400">Market</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <Link 
                  href="/admin"
                  className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg font-semibold hover:bg-purple-500/30 transition-all flex items-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  Admin
                </Link>
              )}
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Bem-vindo, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-400">
            Plano atual: <span className="text-cyan-400 font-semibold capitalize">{user?.plan}</span>
            {isUnlimited && <span className="ml-2 text-green-400">• Acesso Ilimitado</span>}
          </p>
        </div>

        {/* Plan Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Brain className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">
                {isUnlimited ? '∞' : `${user?.strategies_used || 0}/${currentLimits.strategies}`}
              </span>
            </div>
            <h3 className="text-white font-semibold mb-1">Estratégias</h3>
            <p className="text-sm text-gray-400">Usadas este mês</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Copy className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">
                {isUnlimited ? '∞' : `${user?.clone_uses || 0}/${currentLimits.clone}`}
              </span>
            </div>
            <h3 className="text-white font-semibold mb-1">Clonagens</h3>
            <p className="text-sm text-gray-400">Usadas este mês</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">
                {isUnlimited ? '∞' : `${user?.scale_uses || 0}/${currentLimits.scale}`}
              </span>
            </div>
            <h3 className="text-white font-semibold mb-1">Escalas</h3>
            <p className="text-sm text-gray-400">Usadas este mês</p>
          </div>
        </div>

        {/* Upgrade Banner (if not pro) */}
        {user?.plan !== 'pro' && user?.email !== 'henriquemoraesh@gmail.com' && (
          <div className="mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Crown className="w-6 h-6 text-yellow-400" />
                  Faça Upgrade para Pro
                </h3>
                <p className="text-gray-300">
                  Acesso ilimitado a todas as ferramentas. Sem limites, sem restrições.
                </p>
              </div>
              <Link
                href="/#pricing"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105 whitespace-nowrap"
              >
                Ver Planos
              </Link>
            </div>
          </div>
        )}

        {/* Tools Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Ferramentas Disponíveis</h2>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-white/10">
            {[
              { id: 'strategies', label: 'Estratégias', icon: Brain },
              { id: 'clone', label: 'Clonagem', icon: Copy },
              { id: 'scale', label: 'Escala', icon: Zap }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Strategies Tab */}
          {activeTab === 'strategies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Análise de Mercado Global",
                  description: "Descubra produtos que estão vendendo milhões em outros países",
                  icon: Globe,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Copys Validadas",
                  description: "Acesse copys testadas e aprovadas que convertem",
                  icon: Target,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "Funis Completos",
                  description: "Funis de vendas prontos para implementar",
                  icon: BarChart3,
                  color: "from-green-500 to-emerald-500"
                },
                {
                  title: "Estratégias Avançadas",
                  description: "Táticas de marketing dos maiores players do mercado",
                  icon: Sparkles,
                  color: "from-orange-500 to-red-500"
                }
              ].map((strategy, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer group"
                  onClick={() => handleUseTool('strategy')}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategy.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <strategy.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{strategy.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{strategy.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-semibold text-sm">Acessar agora</span>
                    <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clone Tab */}
          {activeTab === 'clone' && (
            <div className="space-y-6">
              {(user?.plan === 'free' || user?.plan === 'start') && user?.email !== 'henriquemoraesh@gmail.com' ? (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                  <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Recurso Bloqueado</h3>
                  <p className="text-gray-400 mb-6">
                    A ferramenta de clonagem está disponível apenas nos planos Growth e Pro
                  </p>
                  <Link
                    href="/#pricing"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
                  >
                    Fazer Upgrade
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Copy className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Clone de Ofertas</h3>
                      <p className="text-gray-400">Replique ofertas de sucesso com 100% de funcionalidade</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400" />
                      <span>Copys completas e testadas</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400" />
                      <span>Funis de vendas prontos</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400" />
                      <span>Páginas otimizadas para conversão</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400" />
                      <span>Sequências de email automatizadas</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUseTool('clone')}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    Iniciar Clonagem
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Scale Tab */}
          {activeTab === 'scale' && (
            <div className="space-y-6">
              {(user?.plan === 'free' || user?.plan === 'start') && user?.email !== 'henriquemoraesh@gmail.com' ? (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                  <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Recurso Bloqueado</h3>
                  <p className="text-gray-400 mb-6">
                    A ferramenta AI Scale Gen está disponível apenas nos planos Growth e Pro
                  </p>
                  <Link
                    href="/#pricing"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
                  >
                    Fazer Upgrade
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">AI Scale Gen</h3>
                      <p className="text-gray-400">Escale seus produtos automaticamente com IA</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400" />
                      <span>Automação de campanhas</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400" />
                      <span>Otimização de conversão em tempo real</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400" />
                      <span>Análise preditiva de resultados</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400" />
                      <span>Expansão para novos mercados</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUseTool('scale')}
                    className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-yellow-500/50 transition-all hover:scale-105"
                  >
                    Iniciar Escala
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Atividade Recente</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-center py-8">
              Nenhuma atividade recente. Comece usando as ferramentas acima!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
