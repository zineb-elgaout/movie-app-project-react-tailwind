import React from "react";

function PrivacyPolicy() {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Politique de Confidentialité
        </h1>

        {/* Introduction */}
        <div className="mb-10">
          <p className="text-gray-700 mb-4">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
          <p className="text-gray-700">
            Cette politique explique comment <span className="font-semibold">ToonTime</span> 
            collecte, utilise et protège vos données personnelles conformément au RGPD.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              1. Données collectées
            </h2>
            <p className="text-gray-700">
              Nous pouvons recueillir :
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Informations d'inscription (nom, email)</li>
                <li>Données de navigation (adresse IP, cookies)</li>
                <li>Préférences de contenu (séries consultées)</li>
              </ul>
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              2. Finalités du traitement
            </h2>
            <p className="text-gray-700">
              Vos données sont utilisées pour :
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Fournir un accès personnalisé aux contenus</li>
                <li>Améliorer nos services</li>
                <li>Envoyer des communications légales (pas de spam)</li>
              </ul>
            </p>
          </div>

          {/* Section 3 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              3. Protection des données
            </h2>
            <p className="text-gray-700">
              Nous implémentons des mesures techniques et organisationnelles strictes :
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Chiffrement SSL</li>
                <li>Accès restreint aux données</li>
                <li>Hébergement sécurisé en UE</li>
              </ul>
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              4. Vos droits
            </h2>
            <p className="text-gray-700">
              Conformément au RGPD, vous pouvez :
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Accéder à vos données ou les rectifier</li>
                <li>Demander leur suppression</li>
                <li>Vous opposer à leur traitement</li>
              </ul>
              Contact : <span className="font-medium">privacy@ToonTime.com</span>
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              5. Cookies
            </h2>
            <p className="text-gray-700">
              Nous utilisons des cookies nécessaires au fonctionnement du site. 
              Vous pouvez les désactiver via les paramètres de votre navigateur.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ToonTime. Tous droits réservés.</p>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;