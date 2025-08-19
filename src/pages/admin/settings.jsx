import AdminLayout from "../../Layouts/admin/AdminLayout";
import { useState } from 'react';
import { FiShield, FiBell, FiMoon, FiChevronRight , FiMail , FiArrowLeft , FiArrowDown , FiCheck } from 'react-icons/fi';
import Header from "../../components/ui/Header";
import axios from "axios";
import {getVerifiedEmails, requestVerificationCode ,verifyCode } from "../../../services/emailVerificationService";
import { getUserProfile } from "../../../services/userService";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('security');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [verificationStep, setVerificationStep] = useState('email'); // 'email', 'code', 'success'
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [verifiedEmails, setVerifiedEmails] = useState([]);
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };


    // Récupérer la liste des emails vérifiés
  const fetchVerifiedEmails = async () => {
    try {
      const userId = getUserProfile().id ; 
      console.log(getUserProfile().id)// Remplace par l'ID réel de l'utilisateur connecté
      const response = await getVerifiedEmails();
      setVerifiedEmails(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des emails vérifiés :", error);
    }
  };


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showMessage("Veuillez entrer une adresse email", "error");
      return;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Veuillez entrer une adresse email valide", "error");
      return;
    }

    setLoading(true);
    try {
      // Utiliser le service fourni pour demander le code de vérification
      await requestVerificationCode(email);
      
      setVerificationStep('code');
      showMessage("Code de vérification envoyé à votre adresse email", "success");
    } catch (error) {
      console.error("Erreur lors de l'envoi du code:", error);
      const errorMessage = typeof error === 'string' ? error : "Erreur lors de l'envoi du code de vérification";
      showMessage(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    
    if (!verificationCode) {
      showMessage("Veuillez entrer le code de vérification", "error");
      return;
    }

    // Validation du code (6 chiffres)
    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(verificationCode)) {
      showMessage("Le code doit contenir 6 chiffres", "error");
      return;
    }

    setLoading(true);
    try {
      // Utiliser le service fourni pour vérifier le code
      await verifyCode(email, verificationCode);
      
      setVerificationStep('success');
      showMessage("Email vérifié avec succès!", "success");
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      const errorMessage = typeof error === 'string' ? error : "Code de vérification invalide ou expiré";
      showMessage(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const resetVerificationProcess = () => {
    setVerificationStep('email');
    setEmail('');
    setVerificationCode('');
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

                  {/* Liste des emails vérifiés */}
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="font-medium mb-2">Emails vérifiés</h3>
                    {verifiedEmails.length === 0 ? (
                      <p className="text-sm text-gray-400">Aucun email vérifié pour le moment.</p>
                    ) : (
                      <ul className="list-disc list-inside text-sm text-gray-200">
                        {verifiedEmails.map((emailItem, index) => (
                          <li key={index} className="flex items-center">
                            <FiCheck className="mr-2 text-green-400" /> {emailItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Vérification d'email */}
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-3">
                      <FiMail className="text-lg mr-2 text-yellow-400" />
                      <div>
                        <h3 className="font-medium">Vérification d'email</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {verificationStep === 'email' 
                            ? "Entrez votre adresse email pour recevoir un code de vérification"
                            : verificationStep === 'code'
                            ? "Entrez le code reçu par email"
                            : "Votre email a été vérifié avec succès!"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Étape 1: Saisie de l'email */}
                    {verificationStep === 'email' && (
                      <form onSubmit={handleEmailSubmit} className="mt-4">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Adresse email
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="votre@email.com"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'}`}
                        >
                          {loading ? 'Envoi en cours...' : 'Recevoir le code de vérification'}
                        </button>
                      </form>
                    )}
                    
                    {/* Étape 2: Saisie du code */}
                    {verificationStep === 'code' && (
                      <form onSubmit={handleCodeSubmit} className="mt-4">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Code de vérification
                          </label>
                          <p className="text-sm text-gray-400 mb-2">
                            Entrez le code à 6 chiffres envoyé à <strong>{email}</strong>
                          </p>
                          <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="123456"
                            required
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => setVerificationStep('email')}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-full text-sm font-medium transition-colors"
                          >
                            <FiArrowLeft className="inline mr-1" /> Changer d'email
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                          >
                            {loading ? 'Vérification...' : 'Vérifier le code'}
                          </button>
                        </div>
                      </form>
                    )}
                    
                    {/* Étape 3: Succès */}
                    {verificationStep === 'success' && (
                      <div className="mt-4">
                        <div className="flex items-center justify-center text-green-400 mb-4">
                          <FiCheck className="text-2xl mr-2" />
                          <span className="text-lg font-medium">Email vérifié avec succès!</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-4 text-center">
                          Votre adresse email <strong>{email}</strong> a été vérifiée.
                          Vous pouvez maintenant utiliser toutes les fonctionnalités de sécurité.
                        </p>
                        <div className="flex justify-center">
                          <button
                            onClick={resetVerificationProcess}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-sm font-medium transition-colors"
                          >
                            Vérifier une autre adresse
                          </button>
                        </div>
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
