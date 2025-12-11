import { api } from "./api.js";


    export const offersService = {
        getStudentOffers:  () => api.get("/students/offers"),
        getCompanyOffers:  () => api.get("/companies/offers"),
        getStudentOfferDetail: (offerId) => api.get(`/students/offers/${offerId}`),
        getCompanyOfferDetail: (offerId) => api.get(`/companies/offers/${offerId}`),
        createOffer: (data) => api.post("/companies/offers", data),
        updateOffer: (offerId, data) => api.put(`/companies/offers/${offerId}`, data),
        deleteOffer: (offerId) => api.delete(`/companies/offers/${offerId}`),

    };
