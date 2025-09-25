import { useEffect, useState } from "react";
import Header from "../../components/ui/Header";
import { FaHeart } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { Folder, Film, Star, TrendingUp, Badge, HeartCrack, HeartHandshake } from "lucide-react";
import { getDashboardSummary } from "../../../services/dashboardService";

const COLORS = ['#a78bfa', '#67e8f9', '#fde68a', '#fca5a5', '#86efac', '#f9a8d4'];

const StatCard = ({ title, value, icon, change }) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 flex justify-between items-start">
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value?.toLocaleString() || 0}</h3>
      {change !== undefined && (
        <div className={`flex items-center mt-2 text-sm ${change > 0 ? "text-green-400" : "text-red-400"}`}>
          <TrendingUp size={14} className="mr-1" />
          <span>{change > 0 ? "+" : ""}{change}%</span>
        </div>
      )}
    </div>
    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-300 flex items-center justify-center">
      {icon}
    </div>
  </div>
);

export default function EditorDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month'); // week, month, year
  const [activeChart, setActiveChart] = useState('cartoons'); // cartoons, favorites

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getDashboardSummary();
        setData(result);
      } catch (err) {
        console.error("Erreur de chargement du dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (!data) return (
    <div className="flex justify-center items-center h-64 text-red-500">
      <p className="text-lg">Aucune donnée disponible</p>
    </div>
  );

  const getTimeSeriesData = () => {
    const keyMap = {
      month: { cartoons: data.cartoonsByMonth, favorites: data.favoritesByMonth },
      week: { cartoons: data.cartoonsByWeek, favorites: data.favoritesByWeek },
      year: { cartoons: data.cartoonsByYear, favorites: data.favoritesByYear },
    };
    return keyMap[timeRange]?.[activeChart] || [];
  };

  const timeSeriesData = getTimeSeriesData();

  return (
    <div className="flex flex-col flex-1 bg-gray-900 text-gray-200 min-h-screen">
      <main className="flex-1 pb-8 px-4 sm:px-6 lg:px-8 py-8">
        <Header
          header={{ prefix: "Editor", title: "Dashboard", subtitle: "Vue d'ensemble de votre application" }}
        />

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Catégories" value={data.totalCategories} icon={<Folder size={24} />} />
          <StatCard title="Cartoons" value={data.totalCartoons} icon={<Film size={24} />} />
          <StatCard title="Favoris" value={data.totalFavorites} icon={<FaHeart size={24} />} />
        </div>

        {/* Sélecteur de période */}
        <div className="flex justify-start mb-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-2 py-1 border rounded-xl bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">Par semaine</option>
            <option value="month">Par mois</option>
            <option value="year">Par année</option>
          </select>
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Graphique temporel */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h3 className="text-lg font-semibold text-white">Évolution dans le temps</h3>
              <div className="flex gap-2 flex-wrap">
                {['cartoons', 'favorites'].map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveChart(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      activeChart === type ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {type === 'cartoons' ? 'Cartoons' : 'Favoris'}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="label" stroke="#9CA3AF"/>
                  <YAxis stroke="#9CA3AF"/>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} name="Nombre" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Cartoons par catégorie */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Cartoons par catégorie</h3>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.byCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                  <XAxis dataKey="label" angle={-45} textAnchor="end" height={60} stroke="#9CA3AF"/>
                  <YAxis stroke="#9CA3AF"/>
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </div>

        {/* Graphiques secondaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          

          {/* Top favoris */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Top 10 des favoris</h3>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.topFavorites}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                  <XAxis type="number" stroke="#9CA3AF"/>
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={140}
                    stroke="#9CA3AF"
                    tick={({ x, y, payload }) => {
                      const label = payload.value.length > 20 ? payload.value.slice(0, 17) + '...' : payload.value;
                      return (
                        <text x={x} y={y} dy={4} textAnchor="end" fill="#9CA3AF" fontSize={12}>
                          {label}
                        </text>
                      );
                    }}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Résumé textuel */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-white">Top des favoris</h3>
            <div className="space-y-2">
              {data.topFavorites.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="truncate flex-1 mr-2 text-white">{item.label}</span>
                  <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm whitespace-nowrap">
                    {item.count} favoris
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        

      </main>
    </div>
  );
}
