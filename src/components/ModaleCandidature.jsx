import { useState, useEffect } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import ModaleGenerique from './ModaleGenerique';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import SpinnerChargement from './SpinnerChargement';

const ModaleCandidature = ({ isOpen, onClose, offer, onSubmit }) => {
  const { user } = useAuth();
  const { profile, loading: profileLoading, getStudentProfile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cvLink: '',
    coverLetter: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pré-remplir le formulaire avec le profil
  useEffect(() => {
    if (isOpen && !profile) {
      getStudentProfile();
    }
  }, [isOpen, profile, getStudentProfile]);

  useEffect(() => {
    if (isOpen && profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        cvLink: profile.cvLink || profile.cvUrl || '',
        coverLetter: '',
      });
      setError(null);
    }
  }, [isOpen, profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation CV
    if (!formData.cvLink || formData.cvLink.trim() === '') {
      setError('Veuillez ajouter un CV dans votre profil avant de postuler.');
      return;
    }

    // Validation lettre de motivation
    if (!formData.coverLetter || formData.coverLetter.trim().length < 50) {
      setError(
        'La lettre de motivation doit contenir au moins 50 caractères.'
      );
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        offerId: offer.id,
        coverLetter: formData.coverLetter,
      });

      // Réinitialiser et fermer
      setFormData((prev) => ({ ...prev, coverLetter: '' }));
      setError(null);
      onClose();
    } catch (err) {
      setError(err?.message || 'Une erreur est survenue lors de la candidature.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData((prev) => ({ ...prev, coverLetter: '' }));
    setError(null);
    onClose();
  };

  // Afficher le spinner si le profil est en cours de chargement
  if (profileLoading && !profile) {
    return (
      <ModaleGenerique isOpen={isOpen} onClose={handleClose} title="">
        <div className="flex justify-center py-8">
          <SpinnerChargement message="Chargement de votre profil..." />
        </div>
      </ModaleGenerique>
    );
  }

  return (
    <ModaleGenerique isOpen={isOpen} onClose={handleClose} title="">
      {/* Header custom */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">
          {offer?.companyName || 'Entreprise'}
        </p>
        <h2 className="text-lg font-semibold text-gray-900">
          {offer?.title || 'Offre d\'emploi'}
        </h2>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Input Nom */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Votre nom</label>
          <input
            type="text"
            value={formData.name}
            disabled
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
          />
        </div>

        {/* Input Email */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Votre email
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
          />
        </div>

        {/* Lien CV */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Votre CV</label>
          {formData.cvLink && formData.cvLink.trim() !== '' ? (
            <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg bg-green-50">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700 font-medium">
                ✓ CV importé
              </span>
              <a
                href={formData.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-sm text-blue-600 hover:underline"
              >
                Voir le CV
              </a>
            </div>
          ) : (
            <div className="px-3 py-2.5 border border-red-300 rounded-lg bg-red-50">
              <p className="text-sm text-red-700">
                ⚠️ Ajoutez un CV dans votre profil pour pouvoir postuler
              </p>
            </div>
          )}
        </div>

        {/* Textarea Lettre de motivation */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Pourquoi postuler à cette offre
          </label>
          <textarea
            rows="8"
            value={formData.coverLetter}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, coverLetter: e.target.value }))
            }
            placeholder="Madame, Monsieur,

Actuellement étudiant(e) en troisième année de licence professionnelle en développement web et mobile à [Nom de l'école], je suis à la recherche d'une alternance à partir de septembre 2026 afin de mettre en pratique mes compétences techniques acquises au cours de ma formation.

Votre offre de [Type de poste] m'intéresse particulièrement car elle correspond parfaitement à mes compétences en [Compétences pertinentes] et à mes aspirations professionnelles. Je suis convaincu(e) que cette expérience me permettrait de développer mes compétences tout en contribuant aux projets de votre entreprise.

Je serais ravi(e) de pouvoir discuter de ma candidature lors d'un entretien.

Cordialement,"
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.coverLetter.length} caractères (minimum 50)
          </p>
        </div>

        {/* Bouton Soumettre */}
        <button
          type="submit"
          disabled={loading || !formData.cvLink || formData.cvLink.trim() === ''}
          className="w-full py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
              {loading ? (
            <>
              <SpinnerChargement message="Envoi en cours..." />
            </>
          ) : (
            'Envoyer ma candidature'
          )}
        </button>
      </form>
    </ModaleGenerique>
  );
};

export default ModaleCandidature;

