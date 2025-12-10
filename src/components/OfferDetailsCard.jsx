import React from "react";


export default function CardDetailOffer({ offer }) {
    if (!offer) return null;

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
                    onClick={() => alert("Candidature envoyée (à implémenter)")}
                >
                    Postuler
                </button>
            </div>
        </div>
    );
}
