// DashboardContent.js
export default function DashboardContent() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-white">Tableau de bord</h2>
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm text-gray-400">
          <p>Bienvenue dans le tableau de bord admin.</p>
          
          {/* Content grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard 
              title="Utilisateurs actifs" 
              value="125" 
              color="blue" 
            />
            <StatCard 
              title="Nouveaux abonnements" 
              value="42" 
              color="green" 
            />
            <StatCard 
              title="Contenus ajoutés" 
              value="89" 
              color="purple" 
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-800',
    green: 'bg-green-50 text-green-800',
    purple: 'bg-purple-50 text-purple-800'
  };

  return (
    <div className={`p-4 rounded-lg ${colorClasses[color]}`}>
      <h3 className="font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}