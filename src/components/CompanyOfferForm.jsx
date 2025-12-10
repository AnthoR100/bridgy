import React from "react";

export default function CompanyOfferForm({ form, setForm, onSubmit, isEditing }) {
    if (!form) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={onSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
                <label className="block mb-2 font-medium">Titre du poste</label>
                <input
                    name="title"
                    value={form.title || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    placeholder="Ex: Développeur React"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                    name="description"
                    value={form.description || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    placeholder="Détails de l'offre..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block mb-2 font-medium">Type de contrat</label>
                    <select
                        name="contractType"
                        value={form.contractType || "CDI"}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="STAGE">Stage</option>
                        <option value="ALTERNANCE">Alternance</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Localisation</label>
                    <input
                        name="location"
                        value={form.location || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                        placeholder="Ex: Paris, Télétravail"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-medium">Mots-clés (séparés par virgules)</label>
                <input
                    name="keywords"
                    value={form.keywords || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ex: React, Node.js, API"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
                {isEditing ? "Mettre à jour l'offre" : "Publier l'offre"}
            </button>
        </form>
    );
}