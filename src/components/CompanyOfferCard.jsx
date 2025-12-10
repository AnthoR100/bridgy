import { useNavigate } from "react-router-dom";

export default function CompanyOfferCard({ offer, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between h-full relative">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{offer.title}</h2>
                <p className="text-gray-600 mt-1">{offer.descriptiongit  }</p>
                <p className="text-sm text-gray-500 mt-2">📍 {offer.location}</p>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mt-3">
          {offer.contractType}
        </span>
                <p className="text-xs text-gray-400 mt-3">
                    Publié le : {new Date(offer.createdAt).toLocaleDateString("fr-FR")}
                </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <button
                    onClick={() => navigate(`/company/offers/${offer.id}`)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    Voir l’offre
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/company/offers/edit/${offer.id}`)}
                        className="flex-1 bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600"
                    >
                        Éditer
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if(window.confirm('Confirmer la suppression ?')) onDelete();
                        }}
                        className="flex-1 bg-red-500 text-white px-2 py-2 rounded-lg hover:bg-red-600"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}
