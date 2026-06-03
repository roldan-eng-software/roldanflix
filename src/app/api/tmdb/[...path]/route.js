const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "TMDB_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const { path = [] } = await params;
  const requestUrl = new URL(request.url);
  const tmdbPath = path.map((segment) => encodeURIComponent(segment)).join("/");
  const tmdbUrl = new URL(`${TMDB_BASE_URL}/${tmdbPath}`);

  requestUrl.searchParams.forEach((value, key) => {
    if (key !== "api_key") {
      tmdbUrl.searchParams.append(key, value);
    }
  });

  tmdbUrl.searchParams.set("api_key", apiKey);

  try {
    const response = await fetch(tmdbUrl, {
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });

    return new Response(await response.text(), {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return Response.json(
      { error: "Failed to fetch data from TMDB" },
      { status: 502 }
    );
  }
}
