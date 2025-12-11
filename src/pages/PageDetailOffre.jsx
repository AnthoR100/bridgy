import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { offersService } from "../services/offersService.js";

import OfferDetailsCard from "../components/OfferDetailsCard.jsx";

export default function OfferDetailsPage() {
    const { id } = useParams(); // <- doit correspondre au :id de la route
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadOffer() {
            try {
                console.log("Fetching offer with ID:", id);
                const response = await offersService.getStudentOfferDetail(id);
                console.log("Offer data:", response.data);
                setOffer(response.data.offer);
            } catch (e) {
                console.error("Erreur lors du chargement de l'offre :", e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadOffer();
    }, [id]);

    if (loading)
        return <p className="text-center text-lg font-medium mt-10">Chargement de l’offre…</p>;

    if (error || !offer)
        return <p className="text-center text-red-600 text-lg mt-10">Impossible de charger l’offre.</p>;

    return (
        <div className="p-6">
            <OfferDetailsCard offer={offer} />
        </div>
    );
}
