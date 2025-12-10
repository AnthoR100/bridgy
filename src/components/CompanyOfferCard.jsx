import { useNavigate } from "react-router-dom";

export default function CompanyOfferCard({ offer, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 transition-all duration-200 flex flex-col justify-between h-full relative">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{offer.title}</h2>

                <p className="text-gray-600 mt-1">{offer.descriptiongit  }</p>

                <p className="text-sm text-gray-500 mt-2">📍 {offer.location}</p>

                <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full mt-3">
                    {offer.contractType}
                </span>

                <p className="text-xs text-gray-400 mt-3">
                    Publié le : {new Date(offer.createdAt).toLocaleDateString("fr-FR")}
                </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <button
                    onClick={() => navigate(`/company/offers/${offer.id}`)}
                    className="cursor-pointer w-full rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
                >
                    Voir l’offre
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/company/offers/edit/${offer.id}`)}
                        className="cursor-pointer w-1/2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-300"
                    >
                        Éditer
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation();
                            if(window.confirm('Confirmer la suppression ?')) onDelete();
                        }}
                        className="cursor-pointer w-1/2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-300">
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}
