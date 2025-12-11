import { Search } from 'lucide-react';

/**
 * Barre de recherche stylée avec Tailwind, alignée sur le design du site.
 */
export default function BarreRecherche({
  value,
  onChange,
  placeholder = 'Rechercher une offre...',
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Rechercher une offre"
        className="w-full rounded-full border border-gray-200 bg-white px-10 py-2.5 text-sm text-gray-700 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 placeholder:text-gray-400"
      />
    </div>
  );
}