import { useAuth } from "../hooks/useAuth";
import OffersList from "../components/OffersList.jsx";
import CompanyOffers from "../components/CompanyOffers.jsx";

const Home = () => {
  const { isStudent, isCompany } = useAuth();

  if (isStudent) return <OffersList />;
  if (isCompany) return <CompanyOffers />;

  return (
    <div className="p-6">
      <p className="text-center text-gray-600">Bienvenue sur Bridgy.</p>
    </div>
  );
};

export default Home;