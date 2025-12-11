import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { studentService } from "../services/api.js";
import ApplicationForm from "../components/ApplicationForm.jsx";

export default function ApplyPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadOffer() {
            try {
                const response = await studentService.getOfferDetail(id);
                setOffer(response);
            } catch (e) {
                console.error("Erreur:", e);
                navigate("/offers");
            } finally {
                setLoading(false);
            }
        }
        loadOffer();
    }, [id, navigate]);

    if (loading) {
        return <p className="text-center text-lg font-medium mt-10">Chargement...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {offer && (
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {offer.title}
                        </h2>
                        <p className="text-gray-700">
                            {offer.company?.name} - {offer.location}
                        </p>
                    </div>
                </div>
            )}

            <ApplicationForm
                offerId={id}
                onCancel={() => navigate(-1)}
                onSuccess={() => navigate("/offers")}
            />
        </div>
    );
}