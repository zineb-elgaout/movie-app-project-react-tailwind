import AdminLayout from "../../Layouts/admin/AdminLayout";
import { useState } from 'react';
import { FiShield, FiBell, FiMoon, FiChevronRight } from 'react-icons/fi';
import Header from "../../components/ui/Header";
import axios from "axios";

const SettingsPage = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('security');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showTwoFactorCodeInput, setShowTwoFactorCodeInput] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Envoi du code pour activer la 2FA
  const requestTwoFactorActivation = async () => {
    try {
      setShowTwoFactorCodeInput(true);
      await axios.post("/api/2fa/send-activation-code");
    } catch (error) {
      console.error("Erreur envoi code 2FA:", error);
    }
  };

  // Vérification du code
  const verifyTwoFactorCode = async () => {
    try {
      await axios.post("/api/2fa/verify-activation-code", { code: twoFactorCode });
      setTwoFactorAuth(true);
      setShowTwoFactorCodeInput(false);
      setTwoFactorCode("");
    } catch (error) {
      console.error("Code invalide :", error);
      alert("Code invalide ou expiré !");
    }
  };

  // Désactivation de la 2FA
  const disableTwoFactor = async () => {
    try {
      await axios.post("/api/2fa/disable");
      setTwoFactorAuth(false);
    } catch (error) {
      console.error("Erreur désactivation 2FA:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Ici tu appelleras ton backend pour changer le mot de passe
    console.log('Password change submitted', passwordForm);
    setShowPasswordForm(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <AdminLayout>
      <div className=" bg-gray-900 text-gray-100">
        <div className=" px-4 py-8">
          <div className=" mx-auto">
            <Header
              header={{
                prefix: 'Gestion des',
                title: 'Paramètres',
                subtitle: 'Configurez les préférences de sécurité, notifications et apparence de votre compte'
              }}
            />
          </div>

          {/* Navigation horizontale */}
          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveSection('security')}
              className={`px-4 py-2 rounded-full flex items-center ${activeSection === 'security' ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <FiShield className="mr-2" />
              Sécurité
              {activeSection === 'security' && <FiChevronRight className="ml-2" />}
            </button>
            <button
              onClick={() => setActiveSection('notifications')}
              className={`px-4 py-2 rounded-full flex items-center ${activeSection === 'notifications' ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <FiBell className="mr-2" />
              Notifications
              {activeSection === 'notifications' && <FiChevronRight className="ml-2" />}
            </button>
            <button
              onClick={() => setActiveSection('appearance')}
              className={`px-4 py-2 rounded-full flex items-center ${activeSection === 'appearance' ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <FiMoon className="mr-2" />
              Apparence
              {activeSection === 'appearance' && <FiChevronRight className="ml-2" />}
            </button>
          </div>

          {/* Contenu des sections */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            {/* Section Sécurité */}
            {activeSection === 'security' && (
              <div>
                <div className="flex items-center mb-6">
                  <FiShield className="text-xl mr-2 text-white" />
                  <h2 className="text-xl font-semibold">Sécurité</h2>
                </div>

                <div className="space-y-6">
                  {/* Double authentification */}
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="font-medium">Double authentification</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {twoFactorAuth
                            ? "Activée - Un code sera requis à chaque connexion"
                            : "Désactivée - Moins sécurisé"}
                        </p>
                      </div>
                      {twoFactorAuth ? (
                        <button
                          onClick={disableTwoFactor}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-medium transition-colors"
                        >
                          Désactiver
                        </button>
                      ) : (
                        <button
                          onClick={requestTwoFactorActivation}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-sm font-medium transition-colors"
                        >
                          Activer
                        </button>
                      )}
                    </div>

                    {/* Champ pour entrer le code reçu par email */}
                    {showTwoFactorCodeInput && (
                      <div className="mt-4 flex space-x-2">
                        <input
                          type="text"
                          placeholder="Code reçu par email"
                          value={twoFactorCode}
                          onChange={(e) => setTwoFactorCode(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        
                        <button
                           onClick={() => setShowTwoFactorCodeInput(false)}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-full"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={verifyTwoFactorCode}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full"
                        >
                          Vérifier
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Mot de passe */}
                  {!showPasswordForm ? (
                    <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium">Mot de passe</h3>
                      </div>
                      <button
                        onClick={() => setShowPasswordForm(true)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-sm font-medium transition-colors"
                      >
                        Modifier
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h3 className="font-medium mb-4">Changer le mot de passe</h3>
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Mot de passe actuel
                            </label>
                            <input
                              type="password"
                              name="currentPassword"
                              value={passwordForm.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Nouveau mot de passe
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              value={passwordForm.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Confirmer le nouveau mot de passe
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={passwordForm.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            />
                          </div>
                          <div className="flex justify-end space-x-3 pt-2">
                            <button
                              type="button"
                              onClick={() => setShowPasswordForm(false)}
                              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-full text-sm font-medium transition-colors"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-sm font-medium transition-colors"
                            >
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section Notifications */}
            {activeSection === 'notifications' && (
              <div>
                <div className="flex items-center mb-6">
                  <FiBell className="text-xl mr-2 text-white" />
                  <h2 className="text-xl font-semibold">Notifications</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium">Notifications par email</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Recevoir des notifications importantes par email
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${notifications ? 'bg-indigo-600' : 'bg-gray-600'}`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${notifications ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Section Apparence */}
            {activeSection === 'appearance' && (
              <div>
                <div className="flex items-center mb-6">
                  <FiMoon className="text-xl mr-2 text-white" />
                  <h2 className="text-xl font-semibold">Apparence</h2>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium">Mode sombre</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {darkMode ? "Activé" : "Désactivé"}
                    </p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-gray-600'}`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
