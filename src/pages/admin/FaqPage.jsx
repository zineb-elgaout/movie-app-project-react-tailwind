import { useState } from "react";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { FiEye, FiEdit, FiTrash2, FiExternalLink} from 'react-icons/fi';

// Données simulées pour les FAQ
const initialFaqs = [
  {
    id: 1,
    createdAt: "2023-10-01",
    createdByEmail: "admin@toontime.com",
    createdByRole: "Administrateur",
    question: "Comment créer un compte sur ToonTime ?",
    answer: "Cliquez sur 'S'inscrire' en haut à droite de la page d'accueil. Entrez votre email, créez un mot de passe et validez votre compte via le lien que vous recevrez par email."
  },
  {
    id: 2,
    createdAt: "2023-10-02",
    createdByEmail: "moderateur@toontime.com",
    createdByRole: "Modérateur",
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons les cartes Visa, Mastercard, PayPal et les cartes cadeaux ToonTime. Les paiements sont sécurisés par chiffrement SSL."
  },
  {
    id: 3,
    createdAt: "2023-10-03",
    createdByEmail: "admin@toontime.com",
    createdByRole: "Administrateur",
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer: "Oui, vous pouvez annuler votre abonnement dans la section 'Compte' à tout moment. L'accès reste valide jusqu'à la fin de la période payée."
  },
  {
    id: 4,
    createdAt: "2023-10-04",
    createdByEmail: "support@toontime.com",
    createdByRole: "Support",
    question: "Comment changer la qualité de streaming ?",
    answer: "Pendant la lecture, cliquez sur l'icône d'engrenage et sélectionnez la qualité souhaitée dans le menu 'Paramètres de lecture'."
  },
  {
    id: 5,
    createdAt: "2023-10-05",
    createdByEmail: "admin@toontime.com",
    createdByRole: "Administrateur",
    question: "Les dessins animés ont-ils des sous-titres ?",
    answer: "La plupart de notre catalogue propose des sous-titres en français et plusieurs autres langues. Activez-les via le bouton 'Sous-titres' pendant la lecture."
  }
];

export default function FAQ() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simuler le chargement
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  // Gérer l'ajout d'une nouvelle FAQ
  const handleAddFaq = (newFaq) => {
    simulateLoading();
    try {
      const faqToAdd = {
        ...newFaq,
        id: Math.max(...faqs.map(f => f.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0],
        createdByEmail: "admin@toontime.com",
        createdByRole: "Administrateur"
      };
      setFaqs([...faqs, faqToAdd]);
      setShowAddForm(false);
    } catch (err) {
      setError("Erreur lors de l'ajout de la FAQ");
    }
  };

  // Gérer la mise à jour d'une FAQ
  const handleUpdateFaq = (updatedFaq) => {
    simulateLoading();
    try {
      setFaqs(faqs.map(faq => 
        faq.id === updatedFaq.id ? updatedFaq : faq
      ));
      setShowUpdateForm(false);
      setSelectedFaq(null);
    } catch (err) {
      setError("Erreur lors de la mise à jour de la FAQ");
    }
  };

  // Gérer la suppression d'une FAQ
  const handleDelete = (id) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer cette question ?");
    if (!confirm) return;

    simulateLoading();
    try {
      setFaqs(faqs.filter(faq => faq.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la FAQ");
    }
  };

  // Ouvrir le formulaire d'édition
  const handleEdit = (faq) => {
    setSelectedFaq(faq);
    setShowUpdateForm(true);
  };

  // Ouvrir le modal de détails
  const handleViewDetails = (faq) => {
    setSelectedFaq(faq);
    setShowDetailModal(true);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <AdminLayout>
      <section className="px-4 sm:px-6 py-8 bg-gray-900 min-h-screen">
        <div className="mx-auto">
          <Header
            header={{
              prefix: "Gestion des",
              title: "FAQ",
              subtitle: "Répondez aux questions fréquentes de vos utilisateurs.",
            }}
          />

          {/* Bouton Ajouter */}
          <div className="flex justify-end mt-6 mb-4">
            <Button onClick={() => setShowAddForm(true)}>
              + Ajouter une question
            </Button>
          </div>

          {/* Tableau des FAQ */}
          <div className="mx-auto">
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden my-5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Question</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Réponse</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Créé le</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Créé par</th>
                      <th className="px-6 py-4 text-right font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {faqs && faqs.length > 0 ? (
                      faqs.map((faq) => (
                        <tr key={faq.id} className="hover:bg-gray-750 transition-colors duration-150">
                          <td className="px-6 py-4 text-white font-medium max-w-xs">
                            {faq.question}
                          </td>
                          <td className="px-6 py-4 text-gray-300 max-w-md truncate">
                            {faq.answer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {new Date(faq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            <div>
                              <div>{faq.createdByEmail}</div>
                              <span className="text-xs text-gray-400">{faq.createdByRole}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex justify-end gap-2">
                              {/* Icône Voir détails */}
                              <button 
                                className="p-2 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-colors"
                                title="Voir détails"
                                onClick={() => handleViewDetails(faq)}
                              >
                                <FiEye size={18} />
                              </button>

                              {/* Icône Modifier */}
                              <button 
                                className="p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-colors"
                                title="Modifier"
                                onClick={() => handleEdit(faq)}
                              >
                                <FiEdit size={18} />
                              </button>

                              {/* Icône Supprimer */}
                              <button 
                                className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                                title="Supprimer"
                                onClick={() => handleDelete(faq.id)}
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                          Aucune question trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal d'ajout */}
      {showAddForm && (
        <AddFaqForm 
          onClose={() => setShowAddForm(false)} 
          onSave={handleAddFaq}
        />
      )}

      {/* Modal d'édition */}
      {showUpdateForm && selectedFaq && (
        <UpdateFaqForm 
          faq={selectedFaq}
          onClose={() => setShowUpdateForm(false)}
          onSave={handleUpdateFaq}
        />
      )}

      {/* Modal de détails */}
      {showDetailModal && selectedFaq && (
        <FaqDetailModal 
          faq={selectedFaq}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </AdminLayout>
  );
}

// Composant pour le formulaire d'ajout
function AddFaqForm({ onClose, onSave }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    
    onSave({ question, answer });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">Ajouter une question</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Réponse</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Composant pour le formulaire de modification
function UpdateFaqForm({ faq, onClose, onSave }) {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    
    onSave({ ...faq, question, answer });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">Modifier la question</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Réponse</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Composant pour le modal de détails
function FaqDetailModal({ faq, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">Détails de la question</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Question</h3>
              <p className="text-white text-lg">{faq.question}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Réponse</h3>
              <p className="text-white">{faq.answer}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Date de création</h3>
                <p className="text-white">
                  {new Date(faq.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Créé par</h3>
                <p className="text-white">{faq.createdByEmail}</p>
                <span className="text-xs text-gray-400">{faq.createdByRole}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

