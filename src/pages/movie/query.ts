export const fetchMovieDetails = async (movieId: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2FhNDgwMTg4MTY0YzQ0MTgzZWE1NmE5NTc5OTc3NyIsIm5iZiI6MTcyMDA4ODUxOC44OTkyMjUsInN1YiI6IjY2ODY2MDI0ZjhkYTZmODRjOWMxYTU4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T1c9m999ZhAhsBEtFFVEszCy7U8kW9PPvICuju_pPks'
            }
        }
    )
    return res.json()
}
