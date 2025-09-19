import AdminLayout from "../../Layouts/admin/AdminLayout";
import React, { useState } from "react";
import Header from "../../components/ui/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Film,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Menu,
} from "lucide-react";

// --- mêmes mockData que toi ---
const mockData = {
  stats: {
    totalMovies: 1245,
    totalUsers: 5432,
    totalRevenue: 12450000,
    avgRating: 4.2,
  },
  revenueByMonth: [
    { month: "Jan", revenue: 1850000 },
    { month: "Feb", revenue: 2210000 },
    { month: "Mar", revenue: 2890000 },
    { month: "Apr", revenue: 3520000 },
    { month: "May", revenue: 4210000 },
    { month: "Jun", revenue: 3880000 },
  ],
  topGenres: [
    { genre: "Action", count: 324, color: "#8b5cf6" },
    { genre: "Drama", count: 278, color: "#6366f1" },
    { genre: "Comedy", count: 196, color: "#a855f7" },
    { genre: "Sci-Fi", count: 154, color: "#d946ef" },
    { genre: "Thriller", count: 132, color: "#3b82f6" },
  ],
};

// Carte Statistique
const StatCard = ({ title, value, icon, change }) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        {change && (
          <div
            className={`flex items-center mt-2 text-sm ${
              change > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <TrendingUp size={14} className="mr-1" />
            <span>{change > 0 ? "+" : ""}
              {change}%
            </span>
          </div>
        )}
      </div>
      <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-300">
        {icon}
      </div>
    </div>
  </div>
);

// Dashboard
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="flex h-screen bg-gray-900 text-gray-200">
        <div className="flex flex-col flex-1">
          <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              <Header
                header={{
                  prefix : "Admin",
                  title: "Dashboard ",
                  subtitle: "Vue d'ensemble de votre bibliothèque de films",
                }}
              />

              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Films"
                  value={mockData.stats.totalMovies.toLocaleString()}
                  icon={<Film size={24} />}
                  change={2.5}
                />
                <StatCard
                  title="Utilisateurs"
                  value={mockData.stats.totalUsers.toLocaleString()}
                  icon={<Users size={24} />}
                  change={5.2}
                />
                <StatCard
                  title="Revenue Total"
                  value={`$${(mockData.stats.totalRevenue / 1000000).toFixed(1)}M`}
                  icon={<DollarSign size={24} />}
                  change={7.8}
                />
                <StatCard
                  title="Note Moyenne"
                  value={mockData.stats.avgRating}
                  icon={<Star size={24} />}
                  change={1.2}
                />
              </div>

              {/* Graphes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Revenue par Mois */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Revenue par Mois
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockData.revenueByMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Genres Populaires */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Genres Populaires
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockData.topGenres}
                        dataKey="count"
                        nameKey="genre"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {mockData.topGenres.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                
              </div>
              {/* Autres graphes ou sections peuvent être ajoutés ici */}

              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Genres Populaires */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Genres Populaires
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockData.topGenres}
                        dataKey="count"
                        nameKey="genre"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {mockData.topGenres.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Revenue par Mois */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Revenue par Mois
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockData.revenueByMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                

                
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
