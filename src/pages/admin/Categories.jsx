import  { useState } from "react";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import CategoryList from "../../components/admin/categories/CategorieList";
import AddCategory from "../../components/admin/categories/AddCategory";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import useCategories from "../../hooks/useCategories";

export default function Categories() {
  // État local pour afficher/masquer le formulaire
  const [showAddForm, setShowAddForm] = useState(false);

  // Hook perso pour gérer les catégories
  const { categories, loading, error, fetchCategories } = useCategories();

  // Quand une catégorie est ajoutée avec succès
  const handleAfterAdd = () => {
    setShowAddForm(false);
    fetchCategories(); // recharge la liste
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <AdminLayout>
      <section className="relative px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <Header
            header={{
              prefix: "Gestion des",
              title: "Catégories",
              subtitle:
                "Organisez vos contenus par univers et studios d'animation.",
            }}
          />

          {/* Liste des catégories */}
          {categories && categories.length > 0 ? (
            <CategoryList categories={categories} />
          ) : (
            <p className="text-gray-500 mt-4">Aucune catégorie pour le moment.</p>
          )}

          {/* Bouton pour afficher le formulaire */}
          <div className="flex justify-start mt-6">
            <Button onClick={() => setShowAddForm(true)}>
              + Ajouter une catégorie
            </Button>
          </div>

          {/* Formulaire d'ajout */}
          {showAddForm && <AddCategory onClose={handleAfterAdd} />}
        </div>
      </section>
    </AdminLayout>
  );
}
