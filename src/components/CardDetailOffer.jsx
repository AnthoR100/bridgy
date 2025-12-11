import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function CardDetailOffer({ offer }) {
    const navigate = useNavigate();
    const { isAuthenticated, isStudent } = useAuth();

    if (!offer) return null;

    const handleApplyClick = () => {
        if (!isAuthenticated) {
            // Redirige vers login si pas connecté
            navigate("/login");
            return;
        }

        if (!isStudent) {
            alert("Seuls les étudiants peuvent postuler à cette offre.");
            return;
        }

        // Redirige vers la page de candidature pour cette offre
        navigate(`/apply/${offer.id}`);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            {/* Titre */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {offer.title ?? "Titre non disponible"}
            </h1>

            {/* Infos principales */}
            <div className="space-y-2 mb-6">
                <p className="text-gray-700">
                    <span className="font-semibold">Entreprise :</span>{" "}
                    {offer.company?.name ?? "Non renseignée"}
                </p>

                <p className="text-gray-700">
                    <span className="font-semibold">Localisation :</span>{" "}
                    {offer.location ?? "Non renseignée"}
                </p>

                <p className="text-gray-700">
                    <span className="font-semibold">Type :</span>{" "}
                    {offer.contractType ?? "Non renseigné"}
                </p>
            </div>

            {/* Description */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Description
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                    {offer.description ?? "Aucune description fournie."}
                </p>
            </div>

            {/* Mots-clés / compétences */}
            {offer.keywords && offer.keywords.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Mots-clés
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700">
                        {offer.keywords.map((kw, i) => (
                            <li key={i}>{kw}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Bouton Postuler */}
            <div className="mt-6">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
                    onClick={handleApplyClick}
                >
                    Postuler
                </button>
            </div>
        </div>
    );
}
