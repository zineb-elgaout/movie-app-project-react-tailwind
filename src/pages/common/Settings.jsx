import { useState, useEffect } from 'react';
import { FiShield, FiBell, FiMoon, FiChevronRight, FiMail, FiArrowLeft, FiArrowDown, FiCheck, FiLock } from 'react-icons/fi';
import Header from "../../components/ui/Header";
import { getVerifiedEmails, requestVerificationCode, verifyCode } from "../../../services/emailVerificationService";
import { getUserProfile, enableTwoFactor, confirmTwoFactor ,disableTwoFactor} from "../../../services/userService"; // Import ajouté

const Settings = () => {
  const [activeSection, setActiveSection] = useState('security');

  // États pour la 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorStep, setTwoFactorStep] = useState('disabled'); // 'disabled', 'request', 'code', 'success'
  const [twoFactorEmail, setTwoFactorEmail] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);

  const [verificationStep, setVerificationStep] = useState('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [verifiedEmails, setVerifiedEmails] = useState([]);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  useEffect(() => {
    fetchVerifiedEmails();
    checkTwoFactorStatus();
  }, []);

  // Vérifier le statut 2FA de l'utilisateur
  const checkTwoFactorStatus = async () => {
    try {
      const profile = getUserProfile();
      // Vérifiez si la propriété existe dans votre token JWT
      setTwoFactorEnabled(profile?.twoFactorEnabled || false);
    } catch (error) {
      console.error("Erreur lors de la vérification du statut 2FA:", error);
    }
  };

  const fetchVerifiedEmails = async () => {
    try {
      const profile = getUserProfile();
      if (!profile?.id) {
        showMessage("Utilisateur non connecté", "error");
        return;
      }
      const emails = await getVerifiedEmails(profile.id);
      setVerifiedEmails(emails);
    } catch (error) {
      console.error("Erreur lors de la récupération des emails vérifiés :", error);
      setVerifiedEmails([]);
    }
  };

  // Demander l'activation de la 2FA - CORRIGÉ
  const handleTwoFactorRequest = async () => {
    if (!twoFactorEmail) {
      showMessage("Veuillez sélectionner un email pour la 2FA", "error");
      return;
    }

    setTwoFactorLoading(true);
    try {
      const profile = getUserProfile();
      if (!profile?.id) {
        showMessage("Utilisateur non connecté", "error");
        return;
      }

      // Appel API corrigé - passage du userId ET de l'email
      await enableTwoFactor(profile.id, twoFactorEmail);
      setTwoFactorStep('code');
      showMessage("Code de vérification 2FA envoyé à votre email", "success");
    } catch (error) {
      console.error("Erreur lors de la demande 2FA:", error);
      const errorMessage = error.response?.data?.message || "Erreur lors de l'envoi du code 2FA";
      showMessage(errorMessage, "error");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Confirmer le code 2FA - CORRIGÉ
  const handleTwoFactorConfirm = async (e) => {
    e.preventDefault();
    
    if (!twoFactorCode) {
      showMessage("Veuillez entrer le code de vérification", "error");
      return;
    }

    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(twoFactorCode)) {
      showMessage("Le code doit contenir 6 chiffres", "error");
      return;
    }

    setTwoFactorLoading(true);
    try {
      // Appel API corrigé
      await confirmTwoFactor(twoFactorEmail, twoFactorCode);
      
      setTwoFactorStep('success');
      setTwoFactorEnabled(true);
      showMessage("2FA activée avec succès!", "success");
      
      // Réinitialiser après succès
      setTimeout(() => {
        resetTwoFactorProcess();
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la confirmation 2FA:", error);
      const errorMessage = error.response?.data?.message || "Code incorrect ou expiré";
      showMessage(errorMessage, "error");
    } finally {
      setTwoFactorLoading(false);
    }
  };

    // Désactiver le 2FA
  const handleTwoFactorDisable = async () => {
    if (!twoFactorEnabled) return;

    setTwoFactorLoading(true);
    try {
      const profile = getUserProfile();
      if (!profile?.id) {
        showMessage("Utilisateur non connecté", "error");
        return;
      }

      const result = await disableTwoFactor(profile.id);
      if (result?.success) {
        setTwoFactorEnabled(false);
        setTwoFactorStep('disabled');
        showMessage(result.message || "2FA désactivé avec succès", "success");
        window.location.href = "/logout";
      } else {
        showMessage(result.message || "Impossible de désactiver le 2FA", "error");
      }
    } catch (error) {
      console.error("Erreur lors de la désactivation 2FA :", error);
      showMessage("Erreur lors de la désactivation 2FA", "error");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Réinitialiser le processus 2FA
  const resetTwoFactorProcess = () => {
    setTwoFactorStep('disabled');
    setTwoFactorEmail('');
    setTwoFactorCode('');
  };

  // Annuler l'activation 2FA
  const cancelTwoFactor = () => {
    setTwoFactorStep('disabled');
    setTwoFactorEmail('');
    setTwoFactorCode('');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showMessage("Veuillez entrer une adresse email", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Veuillez entrer une adresse email valide", "error");
      return;
    }

    setLoading(true);
    try {
      const profile = getUserProfile();
      if (!profile?.id) {
        showMessage("Utilisateur non connecté", "error");
        return;
      }

      await requestVerificationCode({ email, userId: profile.id });
      
      setVerificationStep('code');
      showMessage("Code de vérification envoyé à votre adresse email", "success");
    } catch (error) {
      console.error("Erreur lors de l'envoi du code:", error);
      const errorMessage = error.response?.data || "Erreur lors de l'envoi du code de vérification";
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

    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(verificationCode)) {
      showMessage("Le code doit contenir 6 chiffres", "error");
      return;
    }

    setLoading(true);
    try {
      await verifyCode(email, verificationCode);
      
      setVerificationStep('success');
      showMessage("Email vérifié avec succès!", "success");
      fetchVerifiedEmails(); // Rafraîchir la liste des emails
      
      // Réinitialiser après succès
      setTimeout(() => {
        resetVerificationProcess();
      }, 3000);
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


  return (
    <>
      <div className="bg-gray-900 text-gray-100">
        <div className="px-4 py-8">
          <div className="mx-auto">
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

          {/* Message de notification */}
          {message.text && (
            <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
              {message.text}
            </div>
          )}

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

                  {/* Authentification à deux facteurs (2FA) */}
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <FiLock className="text-lg mr-2 text-blue-400" />
                        <div>
                          <h3 className="font-medium">Authentification à deux facteurs</h3>
                          <p className="text-sm text-gray-400">
                            {twoFactorEnabled 
                              ? "2FA est activée sur votre compte" 
                              : "Ajoutez une couche de sécurité supplémentaire"}
                          </p>
                        </div>
                      </div>

                      {/* Toggle 2FA */}
                      <button
                        onClick={async () => {
                          if (!twoFactorEnabled) {
                            setTwoFactorStep('request'); // Début du processus 2FA
                          } else {
                            // Désactivation 2FA
                            setTwoFactorLoading(true);
                            try {
                              const profile = getUserProfile();
                              if (!profile?.id) {
                                showMessage("Utilisateur non connecté", "error");
                                return;
                              }
                              const result = await disableTwoFactor(profile.id);
                              if (result?.success) {
                                setTwoFactorEnabled(false);
                                setTwoFactorStep('disabled');
                                showMessage(result.message || "2FA désactivée avec succès", "success");
                              } else {
                                showMessage(result.message || "Impossible de désactiver le 2FA", "error");
                              }
                            } catch (error) {
                              console.error("Erreur lors de la désactivation 2FA :", error);
                              showMessage("Erreur lors de la désactivation 2FA", "error");
                            } finally {
                              setTwoFactorLoading(false);
                            }
                          }
                        }}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                          twoFactorEnabled ? 'bg-green-600 hover:bg-green-600 cursor-pointer' : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        disabled={twoFactorLoading}
                      >
                        <span
                          className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${
                            twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>


                    {/* Étape 1: Demande d'activation 2FA */}
                    {twoFactorStep === 'request' && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-md">
                        <h4 className="font-medium mb-3">Activer l'authentification à deux facteurs</h4>
                        <p className="text-sm text-gray-300 mb-4">
                          Sélectionnez un email vérifié pour recevoir les codes de sécurité.
                        </p>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email pour la 2FA
                          </label>
                          <select
                            value={twoFactorEmail}
                            onChange={(e) => setTwoFactorEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Sélectionnez un email vérifié</option>
                            {verifiedEmails
                              .filter(e => e.isVerified)
                              .map((emailItem, index) => (
                                <option key={index} value={emailItem.email}>
                                  {emailItem.email}
                                </option>
                              ))
                            }
                          </select>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={cancelTwoFactor}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-full text-sm font-medium transition-colors"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={handleTwoFactorRequest}
                            disabled={twoFactorLoading || !twoFactorEmail}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${twoFactorLoading || !twoFactorEmail ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                          >
                            {twoFactorLoading ? 'Envoi en cours...' : 'Activer la 2FA'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Étape 2: Saisie du code 2FA */}
                    {twoFactorStep === 'code' && (
                      <form onSubmit={handleTwoFactorConfirm} className="mt-4 p-4 bg-gray-800 rounded-md">
                        <h4 className="font-medium mb-3">Vérification du code 2FA</h4>
                        <p className="text-sm text-gray-300 mb-4">
                          Entrez le code à 6 chiffres envoyé à <strong>{twoFactorEmail}</strong>
                        </p>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Code de vérification
                          </label>
                          <input
                            type="text"
                            value={twoFactorCode}
                            onChange={(e) => setTwoFactorCode(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="123456"
                            required
                          />
                        </div>

                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => setTwoFactorStep('request')}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-full text-sm font-medium transition-colors"
                          >
                            <FiArrowLeft className="inline mr-1" /> Changer d'email
                          </button>
                          <button
                            type="submit"
                            disabled={twoFactorLoading}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${twoFactorLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                          >
                            {twoFactorLoading ? 'Vérification...' : 'Activer la 2FA'}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Étape 3: Succès 2FA */}
                    {twoFactorStep === 'success' && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-md">
                        <div className="flex items-center justify-center text-green-400 mb-3">
                          <FiCheck className="text-2xl mr-2" />
                          <span className="text-lg font-medium">2FA activée avec succès!</span>
                        </div>
                        <p className="text-sm text-gray-300 text-center">
                          L'authentification à deux facteurs est maintenant activée sur votre compte.
                          Vous recevrez un code de sécurité à chaque connexion.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Liste des emails vérifiés */}
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="font-medium mb-2">Emails vérifiés</h3>
                    <ul className="space-y-2">
                      {verifiedEmails
                        .filter(e => e.isVerified)
                        .map((emailItem, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <FiCheck className="mr-2 text-green-400" /> 
                            {emailItem.email}
                            {twoFactorEnabled && twoFactorEmail === emailItem.email && (
                              <span className="ml-2 px-2 py-1 bg-blue-600 text-xs rounded-full">2FA</span>
                            )}
                          </li>
                        ))
                      }
                    </ul>
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
                  <div className="p-6 bg-gray-700 rounded-lg text-center">
                    <FiBell className="text-4xl mx-auto text-gray-400 mb-3" />
                    <h3 className="font-medium text-lg mb-2">Fonctionnalité à venir</h3>
                    <p className="text-gray-400">
                      La gestion avancée des notifications sera disponible prochainement.
                    </p>
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
                <div className="p-6 bg-gray-700 rounded-lg text-center">
                  <FiMoon className="text-4xl mx-auto text-gray-400 mb-3" />
                  <h3 className="font-medium text-lg mb-2">Fonctionnalité à venir</h3>
                  <p className="text-gray-400">
                    Les paramètres d'apparence personnalisés arrivent bientôt.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;