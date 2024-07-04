import { useState } from "react"
import { Button } from "semantic-ui-react"
import { ColumnDisplay } from "./ColumnDisplay"
import { useQuery } from "react-query"
import { fetchMovies, fetchTvShows } from "./query"
import { Navigate } from "react-router-dom"

export enum DisplayType {
    Movies = "movies",
    TvShows = "tvshows"
}

export const Home = () => {
    const [displayType, setDisplayType] = useState<DisplayType>
        (DisplayType.Movies)

    const { data: moviesData, isLoading: isLoadingMovie } = useQuery({ queryKey: ["movies"], queryFn: fetchMovies })


    const { data: tvShowData, isLoading: isLoadingTvShow } = useQuery({ queryKey: ["tvshows"], queryFn: fetchTvShows })

    if(localStorage.getItem("guest_session_id") === null){
        return <Navigate to="/auth"/>
    }

    return <div style={{ marginTop: 50, height: "auto" }}>
        <Button.Group>
            <Button color={displayType === DisplayType.Movies ? "pink" : undefined}
                onClick={() => setDisplayType(DisplayType.Movies)}>
                Movies
            </Button>
            <Button color={displayType === DisplayType.TvShows ? "pink" : undefined}
                onClick={() => {
                    setDisplayType(DisplayType.TvShows)
                    console.log(`Set for Tv`);
                    
                }}>
                Tv Shows
            </Button>
        </Button.Group>

        {isLoadingMovie || isLoadingTvShow ? (<p>Loading...</p>)
            : (<div style={{ marginTop: 20 }}>
                {displayType === DisplayType.Movies ?
                    <ColumnDisplay data={moviesData.results} displayType={DisplayType.Movies} />
                    : <ColumnDisplay data={tvShowData.results} displayType={DisplayType.TvShows} />}

            </div>)}


    </div>
}