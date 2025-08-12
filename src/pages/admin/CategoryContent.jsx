// pages/admin/CategoryContent.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import CreateCartoon from "../../components/admin/cartoons/CreateCartoon";
import UpdateCartoon from "../../components/admin/cartoons/UpdateCartoon";
import Header from "../../components/ui/Header";
import { getCategoryById } from "../../../services/categoryService";
import Button from "../../components/ui/Button";
import { getAllCartoons, deleteCartoon } from "../../../services/cartoonService";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { FiEdit, FiTrash2, FiArrowLeft, FiPlus, FiStar } from "react-icons/fi";

export default function CategoryContent() {
  const { id } = useParams();
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [cartoonToEdit, setCartoonToEdit] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");

  const fetchCartoons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllCartoons();
      const filtered = response.data.filter(
        (cartoon) => cartoon.categorieId?.toString() === id
      );
      setCartoons(filtered);
    } catch (err) {
      setError("Erreur lors du chargement des cartoons");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchCategoryTitle = useCallback(async () => {
    try {
      const res = await getCategoryById(id);
      setCategoryTitle(res.data.title);
    } catch {
      setCategoryTitle("");
    }
  }, [id]);

  useEffect(() => {
    fetchCartoons();
    fetchCategoryTitle();
  }, [fetchCartoons, fetchCategoryTitle]);

  const handleDelete = async (cartoonId) => {
    if (window.confirm("Supprimer ce cartoon ?")) {
      try {
        await deleteCartoon(cartoonId);
        fetchCartoons();
      } catch {
        setError("Erreur lors de la suppression");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <AdminLayout>
      <section className="px-6 py-8 bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Header
            header={{
              prefix: "Gestion des",
              title: "Cartoons",
              subtitle: `Catégorie : ${categoryTitle || ""}`,
            }}
          />

          <div className="flex justify-between mb-6">
            <Link to="/categories" className="flex items-center text-indigo-300">
              <FiArrowLeft className="mr-2" /> Retour aux catégories
            </Link>
            <Button onClick={() => setShowCreate(true)}>
              <FiPlus className="mr-2" /> Ajouter un cartoon
            </Button>
          </div>

          {cartoons.length === 0 ? (
            <p className="text-gray-400">Aucun cartoon trouvé.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cartoons.map((cartoon) => (
                <div
                  key={cartoon.id}
                  className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600"
                >
                  <img
                    src={cartoon.image_url || "/placeholder-image.jpg"}
                    alt={cartoon.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {cartoon.title}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {cartoon.description || "Pas de description"}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 p-4">
                    <button
                      onClick={() => {
                        setCartoonToEdit(cartoon);
                        setShowUpdate(true);
                      }}
                      className="p-2 bg-white rounded-full"
                    >
                      <FiEdit className="text-indigo-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(cartoon.id)}
                      className="p-2 bg-white rounded-full"
                    >
                      <FiTrash2 className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modals */}
        {showCreate && (
          <CreateCartoon
            categoryId={id}
            onClose={() => {
              setShowCreate(false);
              fetchCartoons();
            }}
          />
        )}
        {showUpdate && cartoonToEdit && (
          <UpdateCartoon
            cartoon={cartoonToEdit}
            onClose={() => {
              setShowUpdate(false);
              setCartoonToEdit(null);
              fetchCartoons();
            }}
          />
        )}
      </section>
    </AdminLayout>
  );
}
