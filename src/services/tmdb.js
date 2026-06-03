import api from "./api";

const DEFAULT_LANGUAGE = "pt-BR";
const DEFAULT_PAGE = 1;

export async function getNowPlayingMovies({ limit = 10 } = {}) {
  const response = await api.get("movie/now_playing", {
    params: {
      language: DEFAULT_LANGUAGE,
      page: DEFAULT_PAGE,
    },
  });

  return response.data.results.slice(0, limit);
}

export async function getMovieDetails(id) {
  const response = await api.get(`movie/${id}`, {
    params: {
      language: DEFAULT_LANGUAGE,
      page: DEFAULT_PAGE,
    },
  });

  return response.data;
}
