import { useState, useEffect } from "react";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { FiEye, FiEdit, FiTrash2, FiExternalLink } from "react-icons/fi";
import { getFaqs, createFaq, updateFaq, deleteFaq } from "../../../services/faqService";
import { getUserProfile } from "../../../services/userService";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les FAQ depuis le backend
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch (err) {
        setError("Erreur lors du chargement des FAQ");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Gérer l'ajout d'une nouvelle FAQ
  const handleAddFaq = async (newFaq) => {
    setLoading(true);
    try {
      const addedFaq = await createFaq({
        question: newFaq.question,
        answer: newFaq.answer,
        createdByEmail: getUserProfile().email, 
        createdByRole: getUserProfile().role   
      }); 
      setFaqs([...faqs, addedFaq]);
      setShowAddForm(false);
    } catch (err) {
      setError("Erreur lors de l'ajout de la FAQ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Gérer la mise à jour d'une FAQ
  const handleUpdateFaq = async (updatedFaq) => {
    setLoading(true);
    try {
      // Vérifiez la structure de données attendue par l'API
      const savedFaq = await updateFaq(updatedFaq.id, {
        id: updatedFaq.id,
        question: updatedFaq.question,
        answer: updatedFaq.answer
      });
      
      setFaqs(faqs.map((faq) => (faq.id === savedFaq.id ? savedFaq : faq)));
      setShowUpdateForm(false);
      setSelectedFaq(null);
    } catch (err) {
      setError("Erreur lors de la mise à jour de la FAQ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Gérer la suppression d'une FAQ
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette question ?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await deleteFaq(id);
      setFaqs(faqs.filter((faq) => faq.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la FAQ");
    } finally {
      setLoading(false);
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

