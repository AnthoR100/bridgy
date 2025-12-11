import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { offersService } from "../services/offersService.js";
import { studentService } from "../services/api.js";

import CarteDetailsOffre from "../components/CarteDetailsOffre.jsx";

export default function PageDetailOffre() {
    const { id } = useParams(); // <- doit correspondre au :id de la route
    const [offer, setOffer] = useState(null);
    const [alreadyApplied, setAlreadyApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadOffer() {
            try {
                const [offerRes, applications] = await Promise.all([
                    offersService.getStudentOfferDetail(id),
                    studentService.getApplications(),
                ]);

                const fetchedOffer = offerRes?.data?.offer ?? offerRes?.offer ?? offerRes;
                setOffer(fetchedOffer);

                const hasApplied = applications.some(
                    (app) =>
                        String(app.offer?.id ?? app.offerId ?? app.offer_id) === String(id)
                );
                setAlreadyApplied(hasApplied);
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
            <CarteDetailsOffre offer={offer} isApplied={alreadyApplied} />
        </div>
    );
}
