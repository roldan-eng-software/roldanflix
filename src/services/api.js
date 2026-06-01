// Base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/now_playing?api_key=bed02c24cbee0d266218494a6f7486fe&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});
export default api;