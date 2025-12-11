import { useAuth } from "../hooks/useAuth";
import ListeOffres from "../components/ListeOffres.jsx";
import ListeOffresEntreprise from "../components/ListeOffresEntreprise.jsx";

const PageAccueil = () => {
  const { isStudent, isCompany } = useAuth();

  if (isStudent) return <ListeOffres />;
  if (isCompany) return <ListeOffresEntreprise />;

  return (
    <div className="p-6">
      <p className="text-center text-gray-600">Bienvenue sur Bridgy.</p>
    </div>
  );
};

export default PageAccueil;