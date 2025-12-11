import { useEffect, useMemo, useState } from 'react';
import MessageErreur from '../components/MessageErreur';
import SpinnerChargement from '../components/SpinnerChargement';
import { useProfile } from '../hooks/useProfile';

/**
 * Page de profil entreprise permettant de visualiser et modifier les informations de l'entreprise
 */
const PageProfilEntreprise = () => {
  const { profile, error, getCompanyProfile, updateCompanyProfile } = useProfile();

  // État du formulaire avec les données du profil
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    email: '',
  });

  // États de gestion de l'interface
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Charge le profil de l'entreprise depuis l'API
   */
  const loadProfile = async () => {
    setIsFetching(true);
    setLocalError('');
    try {
      await getCompanyProfile();
    } catch (err) {
      setLocalError(err?.message || 'Impossible de charger le profil entreprise.');
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
      description: profile.description || '',
      website: profile.website || '',
      location: profile.location || '',
      email: profile.email || '',
    });
  }, [profile]);

  /**
   * Génère les initiales du nom de l'entreprise pour l'avatar
   */
  const initials = useMemo(() => {
    if (!formData.name) return '🏢';
    const parts = formData.name.trim().split(' ');
    const chars = parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('');
    return chars || '🏢';
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
        description: profile.description || '',
        website: profile.website || '',
        location: profile.location || '',
        email: profile.email || '',
      });
    }
    setIsEditing(false);
    setLocalError('');
    setSuccessMessage('');
  };

  /**
   * Soumet le formulaire et met à jour le profil entreprise
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setLocalError('');
    setSuccessMessage('');

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      website: formData.website.trim(),
      location: formData.location.trim(),
    };

    try {
      await updateCompanyProfile(payload);
      await loadProfile();
      setSuccessMessage('Profil entreprise mis à jour avec succès.');
      setIsEditing(false);
    } catch (err) {
      setLocalError(err?.message || 'Impossible de mettre à jour le profil entreprise.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Classes CSS pour les champs de formulaire
  const disabledInputClass = 'bg-gray-50 text-gray-500 cursor-not-allowed';
  const baseInputClass = 'mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100';
  const editableInputClass = isEditing ? 'bg-white' : disabledInputClass;

  return (
    <div className='space-y-6 p-6'>
      {/* En-tête avec titre et boutons d'action */}
      <div className="mx-auto flex w-full items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Espace entreprise</p>
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
                form="company-profile-form"
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
            <p className="text-sm text-gray-500">Profil entreprise</p>
            <h2 className="text-lg font-semibold text-gray-900">{formData.name || "Nom de l'entreprise"}</h2>
            <p className="text-xs text-gray-500">{formData.email || 'Email non renseigné'}</p>
          </div>
        </div>

        {/* Formulaire ou spinner de chargement */}
        {isFetching && !profile ? (
          <SpinnerChargement message="Chargement du profil entreprise..." />
        ) : (
          <form
            id="company-profile-form"
            onSubmit={handleSubmit}
            className="space-y-4 px-4 py-4"
          >
            {/* Messages d'erreur et de succès */}
            <MessageErreur message={localError} error={error} />
            {successMessage && (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {successMessage}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {/* Champ Nom de l'entreprise */}
              <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="name">
                  Nom de l'entreprise
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange('name')}
                  disabled={!isEditing || isSubmitting}
                  className={`${baseInputClass} ${editableInputClass}`}
                  placeholder="Votre entreprise"
                />
              </div>

              {/* Champ Description */}
              <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="description">
                  Description
                </label>
                {isEditing ? (
                  <>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={handleChange('description')}
                      disabled={!isEditing || isSubmitting}
                      className={`${baseInputClass} min-h-[110px] ${editableInputClass}`}
                      placeholder="Présentez votre entreprise en quelques lignes"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Partagez vos activités, votre mission, vos valeurs.
                    </p>
                  </>
                ) : (
                  <div className="mt-2 space-y-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3">
                    {formData.description ? (
                      <p className="text-sm text-gray-700">{formData.description}</p>
                    ) : (
                      <p className="text-sm text-gray-400">Aucune description renseignée.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Champ Localisation */}
              <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="location">
                  Localisation
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange('location')}
                  disabled={!isEditing || isSubmitting}
                  className={`${baseInputClass} ${editableInputClass}`}
                  placeholder="Ville, pays"
                />
              </div>

              {/* Champ Site web */}
              <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="website">
                  Site web
                </label>
                <input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange('website')}
                  disabled={!isEditing || isSubmitting}
                  className={`${baseInputClass} ${editableInputClass}`}
                  placeholder="https://..."
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
          {/* Lien Site web */}
          <a
            href={formData.website || undefined}
            target="_blank"
            rel="noreferrer"
            className={`flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition ${!formData.website ? 'cursor-not-allowed opacity-50' : ''
              }`}
          >
            <span>Voir le site</span>
            <span className="text-xs text-gray-500">Site officiel</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default PageProfilEntreprise;
