import { useState, useMemo } from "react";
import { useOffers } from "../hooks/useOffers";
import OfferCard from "../components/OfferCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { CONTRACT_TYPES } from "../services/config";

export default function OffersList() {
    const { offers, loading, error } = useOffers();
    const [searchTerm, setSearchTerm] = useState("");
    const [contractType, setContractType] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    const filteredOffers = useMemo(() => {
        if (!Array.isArray(offers)) return [];
        const term = searchTerm.trim().toLowerCase();
        const locationTerm = locationFilter.trim().toLowerCase();
        if (!term && !contractType && !locationTerm) return offers;
        return offers.filter((offer) => {
            const title = offer.title?.toLowerCase() || "";
            const company = offer.companyName?.toLowerCase() || offer.company?.name?.toLowerCase() || "";
            const location = offer.location?.toLowerCase() || "";
            const matchesSearch =
                !term ||
                title.includes(term) ||
                company.includes(term) ||
                location.includes(term);
            const matchesContract =
                !contractType || offer.contractType === contractType;
            const matchesLocation =
                !locationTerm || location.includes(locationTerm);
            return matchesSearch && matchesContract && matchesLocation;
        });
    }, [offers, searchTerm, contractType, locationFilter]);

    if (loading) return <p className="text-center mt-10">Chargement...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h1 className="text-3xl font-semibold">Offres disponibles</h1>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:items-center">
                    <div className="w-full sm:w-64">
                        <SearchBar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Rechercher par titre, entreprise ou lieu..."
                        />
                    </div>
                    <select
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        className="w-full sm:w-44 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    >
                        <option value="">Tous les contrats</option>
                        {Object.values(CONTRACT_TYPES).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <input
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        placeholder="Filtrer par lieu"
                        className="w-full sm:w-48 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 placeholder:text-gray-400"
                    />
                </div>
            </div>

            {Array.isArray(filteredOffers) && filteredOffers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOffers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-6">Aucune offre disponible.</p>
            )}
        </div>
    );
}
