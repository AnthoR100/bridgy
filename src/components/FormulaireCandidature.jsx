import React, { useState } from "react";

export default function FormulaireCandidature({ offerId, onCancel, onSuccess }) {
    const [coverLetter, setCoverLetter] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleCoverLetterChange = (e) => {
        setCoverLetter(e.target.value);
        if (errors.coverLetter) {
            setErrors(prev => ({ ...prev, coverLetter: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!coverLetter.trim()) {
            newErrors.coverLetter = "La lettre de motivation est requise.";
        } else if (coverLetter.trim().length < 50) {
            newErrors.coverLetter = "La lettre doit contenir au moins 50 caractères.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Import dynamique du service
            const { studentService } = await import('../services/api.js');

            // Appel API simplifié - seulement offerId et coverLetter
            await studentService.applyToOffer(offerId, coverLetter);

            setSubmitSuccess(true);

            setTimeout(() => {
                if (onSuccess) onSuccess();
            }, 2000);

        } catch (error) {
            console.error("Erreur lors de l'envoi:", error);
            setErrors({
                submit: error.message || "Une erreur est survenue. Veuillez réessayer."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h2 className="text-2xl font-bold text-green-800 mb-2">
                        Candidature envoyée avec succès !
                    </h2>
                    <p className="text-green-700">
                        Votre candidature a été transmise à l'entreprise.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Postuler à l'offre
                </h1>
                <p className="text-gray-600 mb-6">
                    Rédigez votre lettre de motivation pour envoyer votre candidature.
                </p>

                <div className="space-y-6">
                    {/* Informations automatiques */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800 flex items-start">
                            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>
                                Vos informations personnelles (nom, email, téléphone) seront automatiquement transmises depuis votre profil.
                            </span>
                        </p>
                    </div>

                    {/* Lettre de motivation */}
                    <div>
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                            Lettre de motivation <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="coverLetter"
                            name="coverLetter"
                            value={coverLetter}
                            onChange={handleCoverLetterChange}
                            rows={10}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                                errors.coverLetter ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Madame, Monsieur,

Je me permets de vous adresser ma candidature pour le poste de...

Expliquez pourquoi vous êtes intéressé par cette offre et en quoi votre profil correspond aux attentes de l'entreprise..."
                        />
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-500">
                                {coverLetter.length} caractères (minimum 50)
                            </p>
                            {coverLetter.length >= 50 && (
                                <p className="text-sm text-green-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Longueur valide
                                </p>
                            )}
                        </div>
                        {errors.coverLetter && (
                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.coverLetter}
                            </p>
                        )}
                    </div>

                    {/* Conseils */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Conseils pour votre lettre
                        </h3>
                        <ul className="text-sm text-gray-700 space-y-1 ml-7">
                            <li>• Présentez vos motivations pour ce poste</li>
                            <li>• Mettez en avant vos compétences et expériences</li>
                            <li>• Expliquez ce que vous pouvez apporter à l'entreprise</li>
                            <li>• Restez professionnel et soignez votre orthographe</li>
                        </ul>
                    </div>

                    {/* Erreur générale */}
                    {errors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700 flex items-center">
                                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.submit}
                            </p>
                        </div>
                    )}

                    {/* Boutons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`flex-1 px-6 py-3 font-semibold rounded-lg text-white transition ${
                                isSubmitting
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Envoi en cours...
                                </span>
                            ) : (
                                "Envoyer ma candidature"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}