import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Rechercher une offre..." }) {
    return (
        <div className="search-bar">
            <Search className="search-bar__icon" size={20} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-bar__input"
                aria-label="Rechercher une offre"
            />
        </div>
    );
}