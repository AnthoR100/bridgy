import { useOffers } from "../hooks/useOffers.js";
import CarteOffre from "./CarteOffre.jsx";

export default function ListeOffres() {
    const { offers, loading, error } = useOffers();

    if (loading) return <p className="text-center mt-10">Chargement...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <div className="mx-auto w-full">
                <p className="text-xs uppercase tracking-wide text-gray-500">Espace étudiant</p>
                <h1 className="text-lg font-semibold text-gray-900">Offres disponible</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(offers) && offers.length > 0 ? (
                    offers.map((offer) => <CarteOffre key={offer.id} offer={offer} />)
                ) : (
                    <p>Aucune offre disponible</p>
                )}
            </div>
        </div>
    );
}

