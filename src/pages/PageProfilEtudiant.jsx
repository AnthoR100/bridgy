import { useEffect, useMemo, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProfile } from '../hooks/useProfile';
import { studentService } from '../services/api';

/**
 * Page de profil étudiant permettant de visualiser et modifier les informations personnelles
 */
const ProfilePage = () => {
  const { profile, error, getStudentProfile } = useProfile();

  // État du formulaire avec les données du profil
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    cvLink: '',
    githubLink: '',
    portfolioLink: '',
  });

  // États de gestion de l'interface
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Charge le profil de l'étudiant depuis l'API
   */
  const loadProfile = async () => {
    setIsFetching(true);
    setLocalError('');

    try {
      await getStudentProfile();
    } catch (err) {
      setLocalError(err?.message || 'Impossible de charger le profil.');
    } finally {
      setIsFetching(false);
    }
  };

  // Charge le profil au montage du composant
  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Met à jour le formulaire lorsque le profil est chargé
  useEffect(() => {
    if (!profile) return;

    setFormData({
      name: profile.name || '',
      email: profile.email || '',
      skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || '',
      cvLink: profile.cvLink || '',
      githubLink: profile.githubLink || '',
      portfolioLink: profile.portfolioLink || '',
    });
  }, [profile]);

  /**
   * Génère les initiales du nom pour l'avatar
   */
  const initials = useMemo(() => {
    if (!formData.name) return '👤';
    const parts = formData.name.trim().split(' ');
    const chars = parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('');
    return chars || '👤';
  }, [formData.name]);

  /**
   * Gère les changements dans les champs du formulaire
   */
  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Annule l'édition et restaure les valeurs originales
   */
  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || '',
        cvLink: profile.cvLink || '',
        githubLink: profile.githubLink || '',
        portfolioLink: profile.portfolioLink || '',
      });
    }
    setIsEditing(false);
    setLocalError('');
    setSuccessMessage('');
  };

  /**
   * Soumet le formulaire et met à jour le profil
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setLocalError('');
    setSuccessMessage('');

    // Transforme les compétences en tableau (séparées par virgules, points-virgules ou retours à la ligne)
    const payload = {
      name: formData.name.trim(),
      skills: formData.skills
        .split(/[\n,;]+/)
        .map((skill) => skill.trim())
        .filter(Boolean),
      cvLink: formData.cvLink.trim(),
      githubLink: formData.githubLink.trim(),
      portfolioLink: formData.portfolioLink.trim(),
    };

    try {
      await studentService.updateProfile(payload);
      await loadProfile();
      setSuccessMessage('Profil mis à jour avec succès.');
      setIsEditing(false);
    } catch (err) {
      setLocalError(err?.message || 'Impossible de mettre à jour le profil.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Classes CSS pour les champs de formulaire
  const disabledInputClass = 'bg-gray-50 text-gray-500 cursor-not-allowed';
  const baseInputClass = 'mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100';
  const editableInputClass = isEditing ? 'bg-white' : disabledInputClass;

  // Parse les compétences en tableau pour l'affichage
  const skillsArray = useMemo(
    () =>
      formData.skills
        .split(/[\n,;]+/)
        .map((skill) => skill.trim())
        .filter(Boolean),
    [formData.skills]
  );

  return (
    <div className="space-y-6 p-6">
      {/* En-tête avec titre et boutons d'action */}
      <div className="mx-auto flex w-full items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Espace étudiant</p>
          <h1 className="text-lg font-semibold text-gray-900">Mon profil</h1>
        </div>

        {/* Boutons Modifier / Annuler / Enregistrer */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                form="profile-form"
                disabled={isSubmitting}
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
              >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
            >
              Modifier
            </button>
          )}
        </div>
      </div>

      {/* Section principale : Formulaire de profil */}
      <section className="max-w-3xl mx-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* En-tête avec avatar et informations de base */}
        <div className="flex items-center gap-4 border-b border-gray-100 px-4 py-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-lg font-semibold text-emerald-700">
            {initials}
          </div>
          <div>
            <p className="text-sm text-gray-500">Profil étudiant</p>
            <h2 className="text-lg font-semibold text-gray-900">{formData.name || 'Votre nom'}</h2>
            <p className="text-xs text-gray-500">{formData.email || 'Email non renseigné'}</p>
          </div>
        </div>

        {/* Formulaire ou spinner de chargement */}
        {isFetching && !profile ? (
          <LoadingSpinner message="Chargement du profil..." />
        ) : (
          <form id="profile-form" onSubmit={handleSubmit} className="space-y-4 px-4 py-4">
            {/* Messages d'erreur et de succès */}
            <ErrorMessage message={localError} error={error} />
            {successMessage && (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {successMessage}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {/* Champ Nom complet */}
              <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="name">
                  Nom complet
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange('name')}
                  disabled={!isEditing || isSubmitting}
                  className={`${baseInputClass} ${editableInputClass}`}
                  placeholder="Votre nom"
                />
              </div>

              {/* Champ Compétences */}
              <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="skills">
                  Compétences
                </label>
                {isEditing ? (
                  <>
                    <textarea
                      id="skills"
                      value={formData.skills}
                      onChange={handleChange('skills')}
                      disabled={!isEditing || isSubmitting}
                      className={`${baseInputClass} ${editableInputClass}`}
                      placeholder="React, Node.js, MongoDB"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Séparez vos compétences par des virgules ou des retours à la ligne.
                    </p>
                  </>
                ) : (
                  <div className="mt-2 space-y-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3">
                    {skillsArray.length > 0 ? (
                      skillsArray.map((skill, index) => (
                        <div
                          key={`${skill}-${index}`}
                          className="border-b border-emerald-200 pb-2 text-sm text-gray-700 last:border-b-0 last:pb-0"
                        >
                          {skill}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">Aucune compétence renseignée.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Champs CV et Portfolio (côte à côte sur grand écran) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-gray-600" htmlFor="cvLink">
                    Lien CV
                  </label>
                  <input
                    id="cvLink"
                    type="url"
                    value={formData.cvLink}
                    onChange={handleChange('cvLink')}
                    disabled={!isEditing || isSubmitting}
                    className={`${baseInputClass} ${editableInputClass}`}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600" htmlFor="portfolioLink">
                    Lien Portfolio
                  </label>
                  <input
                    id="portfolioLink"
                    type="url"
                    value={formData.portfolioLink}
                    onChange={handleChange('portfolioLink')}
                    disabled={!isEditing || isSubmitting}
                    className={`${baseInputClass} ${editableInputClass}`}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Champ GitHub */}
              <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="githubLink">
                  Lien GitHub
                </label>
                <input
                  id="githubLink"
                  type="url"
                  value={formData.githubLink}
                  onChange={handleChange('githubLink')}
                  disabled={!isEditing || isSubmitting}
                  className={`${baseInputClass} ${editableInputClass}`}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
          </form>
        )}
      </section>

      {/* Section des liens rapides vers les ressources */}
      <section className="max-w-3xl mx-auto space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Ressources</p>
          <h3 className="text-base font-semibold text-gray-900">Liens importants</h3>
        </div>

        <div className="space-y-3">
          {/* Lien CV */}
          <a
            href={formData.cvLink || undefined}
            target="_blank"
            rel="noreferrer"
            className={`flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition ${!formData.cvLink ? 'cursor-not-allowed opacity-50' : ''
              }`}
          >
            <span>Voir le CV</span>
            <span className="text-xs text-gray-500">PDF / Drive</span>
          </a>

          {/* Lien Portfolio */}
          <a
            href={formData.portfolioLink || undefined}
            target="_blank"
            rel="noreferrer"
            className={`flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition ${!formData.portfolioLink ? 'cursor-not-allowed opacity-50' : ''
              }`}
          >
            <span>Voir le Portfolio</span>
            <span className="text-xs text-gray-500">Site perso</span>
          </a>

          {/* Lien GitHub */}
          <a
            href={formData.githubLink || undefined}
            target="_blank"
            rel="noreferrer"
            className={`flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition ${!formData.githubLink ? 'cursor-not-allowed opacity-50' : ''
              }`}
          >
            <span>Voir le GitHub</span>
            <span className="text-xs text-gray-500">Repos publics</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;

