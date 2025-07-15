import React, { useState } from "react";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import CategoryList from "../../components/admin/categories/CategorieList";
import AddCategory from "../../components/admin/categories/AddCategory";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import useCategories from "../../hooks/useCategories";

export default function Categories() {
  // ===== ÉTATS LOCAUX =====
  const [showAddForm, setShowAddForm] = useState(false);

  //  UTILISATION DU HOOK
  const { categories, loading, error, fetchCategories } = useCategories();

  // Lorsqu'on ferme le formulaire après ajout réussi
  const handleAfterAdd = () => {
    setShowAddForm(false);
    fetchCategories(); // Recharge les catégories
  };

  // ===== RENDU CONDITIONNEL =====
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <AdminLayout>
      <section className="relative px-6 py-8">
        <div className="max-w-7xl mx-auto">

          <Header
            header={{
              prefix: 'Gestion des',
              title: 'Catégories',
              subtitle: "Organisez vos contenus par univers et studios d'animation."
            }}
          />

          {/* Liste des catégories */}
          <CategoryList categories={categories} />

          {/* Bouton pour afficher le formulaire */}
          <div className="flex justify-start mt-6">
            <Button onClick={() => setShowAddForm(true)}>
              + Ajouter une catégorie
            </Button>
          </div>

          {/* Formulaire d'ajout */}
          {showAddForm && (
            <AddCategory onClose={handleAfterAdd} />
          )}
        </div>
      </section>
    </AdminLayout>
  );
}
