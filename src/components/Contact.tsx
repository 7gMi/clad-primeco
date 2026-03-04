import React, { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Contact = () => {
  // State pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State pour stocker le jeton hCaptcha une fois vérifié
  const [token, setToken] = useState<string | null>(null);
  
  // Référence au composant hCaptcha pour pouvoir le réinitialiser
  const captchaRef = useRef<HCaptcha>(null);

  // Gère les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Veuillez compléter le captcha avant d'envoyer le message.");
      return;
    }

    // Affiche les données qui seraient envoyées au backend
    console.log('Données du formulaire à envoyer:', formData);
    console.log('Jeton Captcha:', token);
    
    // Ici, vous ajouteriez la logique pour envoyer les données
    // (formData) et le jeton (token) à votre fonction Supabase/backend.
    
    alert('Formulaire prêt à être envoyé ! Vérifiez la console pour les données.');

    // Réinitialisation après soumission
    setFormData({ name: '', email: '', message: '' });
    setToken(null);
    captchaRef.current?.resetCaptcha();
  };

  return (
    <section id="contact">
      <h2>Contactez-nous</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        {/* --- Début de l'intégration hCaptcha --- */}
        <HCaptcha
          sitekey="9daadec6-1c00-40e8-b8a6-2070206ae248" // Votre clé de site
          onVerify={(token) => setToken(token)}
          ref={captchaRef}
        />
        {/* --- Fin de l'intégration hCaptcha --- */}

        <button type="submit" disabled={!token}>
          Envoyer
        </button>
      </form>
    </section>
  );
};

export default Contact;