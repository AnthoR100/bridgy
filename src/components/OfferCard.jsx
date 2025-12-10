import { useNavigate } from "react-router-dom";

export default function OfferCard({ offer }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 transition-all duration-200 flex flex-col justify-between items-start h-full gap-4">
            <h2 className="text-xl font-bold text-gray-800">{offer.title}</h2>

            <p className="text-gray-600">
                {offer.company.name}
            </p>

            <p className="text-sm text-gray-500">📍 {offer.location}</p>

            <p className="flex bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
                {offer.contractType}
            </p>

            <p className="text-xs text-gray-400">
                Publié le : {new Date(offer.createdAt).toLocaleDateString("fr-FR")}
            </p>

            <button onClick={() => navigate(`/offers/${offer.id}`)} className="cursor-pointer w-full rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60">
                Voir l’offre
            </button>
        </div>
    );
}