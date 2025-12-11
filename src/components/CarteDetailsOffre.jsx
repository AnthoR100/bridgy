import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function CardDetailOffer({ offer, isApplied }) {
    const navigate = useNavigate();
    const { isAuthenticated, isStudent } = useAuth();

    if (!offer) return null;

    const contractType = offer.contractType ?? "Non renseigné";
    const location = offer.location ?? "Non renseignée";
    const companyName = offer.company?.name ?? offer.companyName ?? "Entreprise non renseignée";
    // Essaye plusieurs champs potentiels renvoyés par l'API pour marquer une candidature existante
    const alreadyApplied = Boolean(
        isApplied ??
        offer?.hasApplied ??
        offer?.applied ??
        offer?.alreadyApplied ??
        offer?.applicationStatus ??      // certaines API renvoient un statut de candidature
        offer?.applicationId            // ou un id de candidature
    );

    const handleApplyClick = () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (!isStudent) {
            alert("Seuls les étudiants peuvent postuler à cette offre.");
            return;
        }

        if (alreadyApplied) return;
        navigate(`/apply/${offer.id}`);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5 bg-gray-50">
                <p className="text-xs uppercase tracking-wide text-gray-500">Offre d'emploi</p>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">
                    {offer.title ?? "Titre non disponible"}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{companyName}</span>
                    <span className="text-gray-400">•</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                        {contractType}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>{location}</span>
                    {offer.createdAt && (
                        <>
                            <span className="text-gray-400">•</span>
                            <span>Publié le {new Date(offer.createdAt).toLocaleDateString("fr-FR")}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-6">
                {/* Description */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4">
                        <p className="text-gray-700 whitespace-pre-line">
                            {offer.description ?? "Aucune description fournie."}
                        </p>
                    </div>
                </section>

                {/* Mots-clés */}
                {offer.keywords && offer.keywords.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Mots-clés</h2>
                        <div className="flex flex-wrap gap-2">
                            {offer.keywords.map((kw, i) => (
                                <span
                                    key={i}
                                    className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
                                >
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <div className="pt-4 border-t border-gray-200">
                    <button
                        className={`cursor-pointer rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition ${
                            alreadyApplied
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-emerald-500 hover:bg-emerald-600"
                        }`}
                        onClick={handleApplyClick}
                        disabled={alreadyApplied}
                    >
                        {alreadyApplied ? "déjà postulé" : "Postuler"}
                    </button>
                </div>
            </div>
        </div>
    );
}