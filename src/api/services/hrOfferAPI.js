import axiosClient from "../client/axios";

const hrOfferAPI = {
  // Tạo và gửi Offer
  // POST /hr/offers
  createOffer: (data) => {
    const url = '/hr/offers';
    return axiosClient.post(url, data);
  }
};

export default hrOfferAPI;