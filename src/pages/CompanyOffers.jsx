import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyOffers } from "../hooks/useCompanyOffers.jsx";
import CompanyOfferCard from "../components/CompanyOfferCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { CONTRACT_TYPES } from "../services/config";


export default function CompanyOffers() {
    const navigate = useNavigate();
    const { offers, loading, error, deleteOffer } = useCompanyOffers();
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
            const location = offer.location?.toLowerCase() || "";
            const matchesSearch =
                !term || title.includes(term) || location.includes(term);
            const matchesContract =
                !contractType || offer.contractType === contractType;
            const matchesLocation =
                !locationTerm || location.includes(locationTerm);
            return matchesSearch && matchesContract && matchesLocation;
        });
    }, [offers, searchTerm, contractType, locationFilter]);

    if (loading) return <div className="text-center mt-10">Chargement...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-3xl font-semibold">Mes Offres publiées</h1>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:items-center">
                    <div className="w-full sm:w-64">
                        <SearchBar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Rechercher par titre ou lieu..."
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
                <button
                    onClick={() => navigate("/company/offers/create")}
                    className="cursor-pointer rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
                >
                    Créer une offre
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffers && filteredOffers.length > 0 ? (
                    filteredOffers.map((offer) => (
                        <CompanyOfferCard
                            key={offer.id }
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