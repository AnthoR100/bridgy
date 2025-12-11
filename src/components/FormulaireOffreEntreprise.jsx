import React from "react";

export default function FormulaireOffreEntreprise({ form, setForm, onSubmit, isEditing, isLoading = false }) {
    if (!form) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const baseInputClass = "mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100";

    return (
        <form onSubmit={onSubmit} className="w-full space-y-4">
            <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="title">
                    Titre du poste
                </label>
                <input
                    id="title"
                    name="title"
                    value={form.title || ""}
                    onChange={handleChange}
                    className={baseInputClass}
                    required
                    placeholder="Ex: Développeur React"
                    disabled={isLoading}
                />
            </div>

            <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description || ""}
                    onChange={handleChange}
                    className={`${baseInputClass} min-h-[110px]`}
                    required
                    placeholder="Détails de l'offre..."
                    disabled={isLoading}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-medium text-gray-600" htmlFor="contractType">
                        Type de contrat
                    </label>
                    <select
                        id="contractType"
                        name="contractType"
                        value={form.contractType || "CDI"}
                        onChange={handleChange}
                        className={baseInputClass}
                        disabled={isLoading}
                    >
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="INTERNSHIP">Stage</option>
                        <option value="APPRENTICESHIP">Alternance</option>
                        <option value="FREELANCE">Freelance</option>
                    </select>
                </div>

                <div>
                    <label className="text-xs font-medium text-gray-600" htmlFor="location">
                        Localisation
                    </label>
                    <input
                        id="location"
                        name="location"
                        value={form.location || ""}
                        onChange={handleChange}
                        className={baseInputClass}
                        required
                        placeholder="Ex: Paris, Télétravail"
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div>
                <label className="text-xs font-medium text-gray-600" htmlFor="keywords">
                    Mots-clés / Compétences (séparés par virgules)
                </label>
                <input
                    id="keywords"
                    name="keywords"
                    value={form.keywords || ""}
                    onChange={handleChange}
                    className={baseInputClass}
                    placeholder="Ex: React, Node.js, API"
                    disabled={isLoading}
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
            >
                {isLoading ? "Chargement..." : (isEditing ? "Mettre à jour l'offre" : "Publier l'offre")}
            </button>
        </form>
    );
}