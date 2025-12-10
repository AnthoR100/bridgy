import {useEffect, useState} from 'react';
import { useAuth } from './useAuth';
import { offersService } from "../services/offersService.jsx";

export function useOffers() {
    const { user } = useAuth();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const load = async () => {
        setLoading(true);

        try {
            const res =
                user.role === 'STUDENT' ? await offersService.getStudentOffers() : await offersService.getCompanyOffers();

            setOffers(res.data.offers || []);
            // eslint-disable-next-line no-unused-vars
        }catch (e) {
            setError("Imposssible de charger les offres");
        }

        setLoading(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (user) load().then(r => console.log(r));
    }, [user])
    return { offers, loading, error, reload: load}
}