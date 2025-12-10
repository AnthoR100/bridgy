import { useOffers } from "../hooks/useOffers";
import OfferCard from "../components/OfferCard.jsx";

export default function OffersList() {
    const { offers, loading, error } = useOffers();

    if (loading) return <p className="text-center mt-10">Chargement...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Offres disponibles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(offers) && offers.length > 0 ? (
                    offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)
                ) : (
                    <p>Aucune offre disponible</p>
                )}
            </div>
        </div>
    );
}