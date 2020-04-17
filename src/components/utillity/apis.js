import axios from "axios";

const URL_API = "https://kuclap-api.herokuapp.com";

export const apis = {
  getLastReviews: async (offset, next) => {
    try {
      const res = await axios.get(`${URL_API}/reviews/last?offset=${offset}`);
      next(res);
    } catch (err) {
      console.log(err);
    }
  },
  getAllClasses: async (next) => {
    try {
      const res = axios.get(`${URL_API}/classes`);
      next(res);
    } catch (err) {
      console.log(err);
    }
  },
};
