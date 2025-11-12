"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, supabase, type User, type Announcement } from "@/lib/supabase";
import { 
  Globe, 
  ShoppingCart, 
  LogOut, 
  Crown,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  Bell,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Info,
  BarChart3,
  Copy,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    content: "",
    type: "info" as "info" | "warning" | "success"
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await getCurrentUser();
      
      if (!currentUser || (currentUser.role !== 'admin' && currentUser.email !== 'henriquemoraesh@gmail.com')) {
        router.push("/dashboard");
        return;
      }

      setUser(currentUser);
      await loadUsers();
      await loadAnnouncements();
    } catch (error) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setUsers(data);
  };

  const loadAnnouncements = async () => {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setAnnouncements(data);
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const { error } = await supabase
      .from('announcements')
      .insert({
        title: announcementData.title,
        content: announcementData.content,
        type: announcementData.type,
        created_by: user.id
      });

    if (error) {
      alert("Erro ao criar aviso: " + error.message);
      return;
    }

    setAnnouncementData({ title: "", content: "", type: "info" });
    setShowAnnouncementForm(false);
    loadAnnouncements();
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este aviso?")) return;

    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Erro ao deletar aviso: " + error.message);
      return;
    }

    loadAnnouncements();
  };

  const handleUpdateUserPlan = async (userId: string, newPlan: string) => {
    const { error } = await supabase
      .from('users')
      .update({ plan: newPlan })
      .eq('id', userId);

    if (error) {
      alert("Erro ao atualizar plano: " + error.message);
      return;
    }

    loadUsers();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.plan !== 'free').length,
    totalRevenue: users.reduce((acc, u) => {
      const prices = { free: 0, start: 97, growth: 350, pro: 500 };
      return acc + (prices[u.plan] || 0);
    }, 0),
    growthRate: "+23%"
  };

  const announcementIcons = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle
  };

  const announcementColors = {
    info: "from-blue-500 to-cyan-500",
    warning: "from-yellow-500 to-orange-500",
    success: "from-green-500 to-emerald-500"
  };

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
              <div>
                <span className="text-xl font-black text-white">
                  Global<span className="text-cyan-400">Market</span>
                </span>
                <div className="text-xs text-purple-400 font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  ADMIN PANEL
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="px-4 py-2 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                Dashboard
              </Link>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-400" />
            Painel Administrativo
          </h1>
          <p className="text-gray-400">
            Controle total do Global Market
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">{stats.totalUsers}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Total de Usuários</h3>
            <p className="text-sm text-gray-400">Cadastrados na plataforma</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{stats.activeUsers}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Usuários Ativos</h3>
            <p className="text-sm text-gray-400">Com planos pagos</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">R$ {stats.totalRevenue.toLocaleString()}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Receita Mensal</h3>
            <p className="text-sm text-gray-400">Estimada atual</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">{stats.growthRate}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Crescimento</h3>
            <p className="text-sm text-gray-400">Últimos 30 dias</p>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Avisos e Notificações</h2>
            <button
              onClick={() => setShowAnnouncementForm(!showAnnouncementForm)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Aviso
            </button>
          </div>

          {showAnnouncementForm && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Criar Novo Aviso</h3>
              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={announcementData.title}
                    onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Título do aviso"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Conteúdo
                  </label>
                  <textarea
                    value={announcementData.content}
                    onChange={(e) => setAnnouncementData({ ...announcementData, content: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors h-32 resize-none"
                    placeholder="Conteúdo do aviso"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo
                  </label>
                  <select
                    value={announcementData.type}
                    onChange={(e) => setAnnouncementData({ ...announcementData, type: e.target.value as any })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="info">Informação</option>
                    <option value="warning">Aviso</option>
                    <option value="success">Sucesso</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
                  >
                    Publicar Aviso
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAnnouncementForm(false)}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {announcements.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Nenhum aviso publicado ainda</p>
              </div>
            ) : (
              announcements.map((announcement) => {
                const Icon = announcementIcons[announcement.type];
                const colorClass = announcementColors[announcement.type];
                
                return (
                  <div
                    key={announcement.id}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">{announcement.title}</h3>
                          <p className="text-gray-300 mb-3">{announcement.content}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(announcement.created_at).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Users Management */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Gerenciar Usuários</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Plano</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Uso</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Cadastro</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{u.email}</span>
                          {u.email === 'henriquemoraesh@gmail.com' && (
                            <Crown className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={u.plan}
                          onChange={(e) => handleUpdateUserPlan(u.id, e.target.value)}
                          className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                          disabled={u.email === 'henriquemoraesh@gmail.com'}
                        >
                          <option value="free">Free</option>
                          <option value="start">Start</option>
                          <option value="growth">Growth</option>
                          <option value="pro">Pro</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-gray-400" title="Estratégias">
                            <Copy className="w-4 h-4 inline mr-1" />
                            {u.strategies_used}
                          </span>
                          <span className="text-gray-400" title="Clonagens">
                            <Copy className="w-4 h-4 inline mr-1" />
                            {u.clone_uses}
                          </span>
                          <span className="text-gray-400" title="Escalas">
                            <Zap className="w-4 h-4 inline mr-1" />
                            {u.scale_uses}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(u.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
