import React from "react";
import { useNavigate } from "react-router-dom";

export default function OfferCard({ offer }) {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200
                 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between h-full"
        >
            <div>
                <h2 className="text-xl font-bold text-gray-800">{offer.title}</h2>
                <p className="text-gray-600 mt-1">
                    {offer.company.name}
                </p>
                <p className="text-sm text-gray-500 mt-2">📍 {offer.location}</p>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mt-3">
          {offer.contractType}
        </span>
                <p className="text-xs text-gray-400 mt-3">
                    Publié le : {new Date(offer.createdAt).toLocaleDateString("fr-FR")}
                </p>
            </div>

            <button
                onClick={() => navigate(`/offers/${offer.id}`)}
                className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
                Voir l’offre
            </button>
        </div>
    );
}