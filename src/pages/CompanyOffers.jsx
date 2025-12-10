import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyOffers } from "../hooks/useCompanyOffers.jsx";
import CompanyOfferCard from "../components/CompanyOfferCard.jsx";


export default function CompanyOffers() {
    const navigate = useNavigate();
    const { offers, loading, error, deleteOffer } = useCompanyOffers();

    // Remplacement des <p> par des <div> pour éviter les problèmes d'imbrication si erreur contient du HTML ou si LoadingSpinner est un bloc
    if (loading) return <div className="text-center mt-10">Chargement...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Mes Offres</h1>
                <button
                    onClick={() => navigate("/company/offers/create")}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                    Créer une offre
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers && offers.length > 0 ? (
                    offers.map((offer) => (
                        <CompanyOfferCard
                            key={offer.id } // Sécurité si id manquant temporairement
                            offer={offer}
                            onDelete={() => deleteOffer(offer.id)}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">Aucune offre trouvée.</div>
                )}
            </div>
        </div>
    );
}