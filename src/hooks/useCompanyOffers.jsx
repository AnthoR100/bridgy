import { useState, useEffect } from "react";
import { offersService } from "../services/offersService.js";

export function useCompanyOffers() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadOffers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await offersService.getCompanyOffers();
            setOffers(response.data.offers || []);
        } catch (err) {
            setError(err.message || "Erreur lors du chargement des offres");
        } finally {
            setLoading(false);
        }
    };

    const createOffer = async (data) => {
        await offersService.createOffer(data);
        await loadOffers();
    };

    const updateOffer = async (id, data) => {
        await offersService.updateOffer(id, data);
        await loadOffers();
    };

    const deleteOffer = async (id) => {
        await offersService.deleteOffer(id);
        await loadOffers();
    };

    useEffect(() => {
        loadOffers();
    }, []);

    return {
        offers,
        loading,
        error,
        loadOffers,
        createOffer,
        updateOffer,
        deleteOffer,
    };
}