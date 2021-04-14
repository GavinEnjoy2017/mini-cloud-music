import { axiosInstance } from './config';

export const getBannerRequest = () => axiosInstance.get('/banner');

export const getRecommendListRequest = () => axiosInstance.get('./personalized');

export const getHotSingleListRequest = (count) => axiosInstance.get(`/top/artists?offset=${count}`);

export const getSingleListRequest = (category, alpha, count) => axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);