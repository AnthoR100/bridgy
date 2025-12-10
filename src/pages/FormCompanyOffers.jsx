import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { offersService } from "../services/offersService.js";
import CompanyOfferForm from "../components/CompanyOfferForm.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function FormCompanyOffers() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initial state matching the API expectations
    const [form, setForm] = useState({
        title: "",
        description: "",
        contractType: "CDI", // Valeur par défaut sûre
        location: "",
        keywords: "" // Sera transformé en tableau à l'envoi
    });

    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            loadOffer();
        }
    }, [id]);

    const loadOffer = async () => {
        setLoading(true);
        try {
            const response = await offersService.getCompanyOfferDetail(id);
            // On gère les différents formats possibles de réponse
            const offerData = response.data?.offer || response.data?.data || response.data;

            if (offerData) {
                setForm({
                    title: offerData.title || "",
                    description: offerData.description || "",
                    contractType: offerData.contractType || "CDI",
                    location: offerData.location || "",
                    // Si c'est un tableau, on le transforme en string pour l'input
                    keywords: Array.isArray(offerData.keywords)
                        ? offerData.keywords.join(", ")
                        : (offerData.keywords || "")
                });
            }
        } catch (err) {
            console.error("Erreur chargement offre:", err);
            setError("Impossible de charger l'offre.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        setLoading(true);
        setError(null);

        let keywordsArray = [];
        if (typeof form.keywords === 'string') {
            if (form.keywords.trim() === "") {
                keywordsArray = [];
            } else {
                keywordsArray = form.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
            }
        } else if (Array.isArray(form.keywords)) {
            keywordsArray = form.keywords;
        }

        const dataToSend = {
            title: form.title,
            description: form.description,
            contractType: form.contractType,
            location: form.location,
            keywords: keywordsArray
        };

        console.log("Envoi données (Clean):", dataToSend);

        try {
            if (isEditMode) {
                await offersService.updateOffer(id, dataToSend);
            } else {
                // On essaie la création avec les MÊMES données que l'update
                // Si ça plante, c'est qu'il manque un champ ou que la validation diffère
                await offersService.createOffer(dataToSend);
            }
            navigate("/company/offers");
        } catch (err) {
            console.error("Erreur API:", err);
            const msg = err.response?.data?.message || "Une erreur est survenue";
            setError(Array.isArray(msg) ? msg.join(', ') : msg);
        } finally {
            setLoading(false);
        }
    };
    if (loading && isEditMode && !form.title) {
        return (
            <div className="flex justify-center mt-10">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">
                {isEditMode ? "Modifier l'offre" : "Créer une nouvelle offre"}
            </h1>

            {error && <ErrorMessage message={error} />}

            <CompanyOfferForm
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                isEditing={isEditMode}
            />
        </div>
    );
}