import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { apiService } from '../../services/api';
import type { DashboardMetrics } from '@shared/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const { data } = await apiService.dashboard.getMetrics();
      if (data?.data) {
        setMetrics(data.data);
      }
    } catch (error) {
      console.error('Erro ao carregar métricas:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total de Chamados',
      value: metrics?.total_tickets ?? 0,
      icon: Ticket,
      color: 'from-blue-500 to-cyan-500',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Em Aberto',
      value: metrics?.open_tickets ?? 0,
      icon: AlertCircle,
      color: 'from-orange-500 to-red-500',
      trend: '-5%',
      trendUp: true,
    },
    {
      title: 'Em Andamento',
      value: metrics?.in_progress_tickets ?? 0,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      trend: '+8%',
      trendUp: false,
    },
    {
      title: 'Concluídos',
      value: metrics?.resolved_tickets ?? 0,
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
      trend: '+23%',
      trendUp: true,
    },
  ];

  const secondaryStats = [
    {
      title: 'Unidades Ativas',
      value: metrics?.total_units ?? 0,
      icon: Building2,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Usuários Cadastrados',
      value: metrics?.total_users ?? 0,
      icon: Users,
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Visão geral do sistema de chamados
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline btn-sm">
            Exportar Relatório
          </button>
          <button className="btn btn-primary btn-sm">
            Novo Chamado
          </button>
        </div>
      </motion.div>

      {/* Cards Principais */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              className="glass-card p-6 glass-card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trendUp ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {stat.trendUp ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.trend}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Cards Secundários */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
      >
        {secondaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              className="glass-card p-6 glass-card-hover"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Gráficos e Tabelas Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Chamados por Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Chamados por Status
            </h3>
            <button className="text-primary-400 hover:text-primary-300 text-sm">
              Ver detalhes
            </button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Gráfico será implementado com Recharts</p>
            </div>
          </div>
        </motion.div>

        {/* Gráfico de Chamados por Período */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Chamados por Período
            </h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50">
              <option value="7">Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Gráfico será implementado com Recharts</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chamados Recentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Chamados Recentes
          </h3>
          <button className="btn btn-outline btn-sm">
            Ver todos
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Número
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Título
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Unidade
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Prioridade
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Criado
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4 text-sm font-medium text-primary-400">
                    CHM-2024-{String(i).padStart(5, '0')}
                  </td>
                  <td className="py-4 px-4 text-sm text-white">
                    Problema com {['iluminação', 'rede', 'impressora', 'ar condicionado', 'porta'][i - 1]}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400">
                    {['Escola Municipal A', 'Posto de Saúde B', 'Secretaria C', 'Ginásio D', 'Prefeitura'][i - 1]}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`badge badge-${['open', 'in-progress', 'waiting', 'resolved', 'open'][i - 1]}`}>
                      {['Aberto', 'Em Andamento', 'Aguardando', 'Concluído', 'Aberto'][i - 1]}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`badge badge-${['baixa', 'media', 'alta', 'critica', 'media'][i - 1]}`}>
                      {['Baixa', 'Média', 'Alta', 'Crítica', 'Média'][i - 1]}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400">
                    {`${i}/03/2024`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
