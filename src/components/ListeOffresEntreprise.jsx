import React, { useState, useEffect } from "react";
import { useCompanyOffers } from "../hooks/useCompanyOffers.js";
import CarteOffreEntreprise from "./CarteOffreEntreprise.jsx";
import FormulaireOffreEntreprise from "./FormulaireOffreEntreprise.jsx";
import { offersService } from "../services/offersService.js";
import SpinnerChargement from "./SpinnerChargement.jsx";
import MessageErreur from "./MessageErreur.jsx";

export default function ListeOffresEntreprise() {
    const { offers, loading, error, deleteOffer, loadOffers } = useCompanyOffers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingOfferId, setEditingOfferId] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    
    const [form, setForm] = useState({
        title: "",
        description: "",
        contractType: "CDI",
        location: "",
        keywords: ""
    });

    const openCreateModal = () => {
        setIsEditMode(false);
        setEditingOfferId(null);
        setForm({
            title: "",
            description: "",
            contractType: "CDI",
            location: "",
            keywords: ""
        });
        setFormError(null);
        setIsModalOpen(true);
    };

    const openEditModal = async (offerId) => {
        setIsEditMode(true);
        setEditingOfferId(offerId);
        setFormLoading(true);
        setFormError(null);
        
        try {
            const response = await offersService.getCompanyOfferDetail(offerId);
            const offerData = response.data?.offer || response.data?.data || response.data;

            if (offerData) {
                setForm({
                    title: offerData.title || "",
                    description: offerData.description || "",
                    contractType: offerData.contractType || "CDI",
                    location: offerData.location || "",
                    keywords: Array.isArray(offerData.skills ?? offerData.keywords)
                        ? (offerData.skills ?? offerData.keywords).join(", ")
                        : (offerData.skills ?? offerData.keywords ?? "")
                });
            }
            setIsModalOpen(true);
        } catch (err) {
            console.error("Erreur chargement offre:", err);
            setFormError("Impossible de charger l'offre.");
        } finally {
            setFormLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormError(null);
        setFormLoading(false);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isModalOpen]);

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        setFormLoading(true);
        setFormError(null);

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

        try {
            if (isEditMode && editingOfferId) {
                await offersService.updateOffer(editingOfferId, dataToSend);
            } else {
                await offersService.createOffer(dataToSend);
            }
            await loadOffers();
            closeModal();
        } catch (err) {
            console.error("Erreur API:", err);
            const msg = err.response?.data?.message || "Une erreur est survenue";
            setFormError(Array.isArray(msg) ? msg.join(', ') : msg);
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-10">Chargement...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">Espace étudiant</p>
                    <h1 className="text-lg font-semibold text-gray-900">Offres publiées</h1>
                </div>
                <button
                    onClick={openCreateModal}
                    className="cursor-pointer rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
                >
                    Créer une offre
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers && offers.length > 0 ? (
                    offers.map((offer) => (
                        <CarteOffreEntreprise
                            key={offer.id}
                            offer={offer}
                            onDelete={() => deleteOffer(offer.id)}
                            onEdit={() => openEditModal(offer.id)}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">Aucune offre trouvée.</div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div 
                        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">Espace entreprise</p>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {isEditMode ? "Modifier l'offre" : "Créer une nouvelle offre"}
                                </h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition"
                                aria-label="Fermer"
                            >
                                ×
                            </button>
                        </div>
                        <div className="p-6">
                            {formError && <MessageErreur message={formError} />}
                            {formLoading && isEditMode && !form.title ? (
                                <div className="flex justify-center py-10">
                                    <SpinnerChargement />
                                </div>
                            ) : (
                                <FormulaireOffreEntreprise
                                    form={form}
                                    setForm={setForm}
                                    onSubmit={handleSubmit}
                                    isEditing={isEditMode}
                                    isLoading={formLoading}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

