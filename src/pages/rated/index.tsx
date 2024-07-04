import { Container, Header, Menu, Segment } from "semantic-ui-react";
import { DisplayType } from "../home";
import { useState } from "react";
import { useQuery } from 'react-query';
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import { ColumnDisplay } from "../home/ColumnDisplay";
import { Navigate } from "react-router-dom";

export const Rated = () => {
  const [activeTabs, setActiveTabs] = useState<DisplayType>(DisplayType.Movies);

  const {
    data: ratedMovies,
    isLoading: isLoadingRatedMovies,
    error: errorRatedMovies,
  } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: fetchRatedMovies,
  });

  const {
    data: ratedTvShows,
    isLoading: isLoadingRatedTvShows,
    error: errorRatedTvShows,
  } = useQuery({
    queryKey: ["ratedTvShows"],
    queryFn: fetchRatedTvShows,
  });

  if(localStorage.getItem("guest_session_id") === null){
    return <Navigate to="/auth"/>
}

  return (
    <Container style={{ marginTop: 50 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="Movies"
          active={activeTabs === DisplayType.Movies}
          onClick={() => setActiveTabs(DisplayType.Movies)}
        />
        <Menu.Item
          name="Tv Shows"
          active={activeTabs === DisplayType.TvShows}
          onClick={() => setActiveTabs(DisplayType.TvShows)}
        />
      </Menu>

      <Segment>
        {activeTabs === DisplayType.Movies ? (
          <div>
            <Header as="h2">Rated Movies</Header>
            {isLoadingRatedMovies ? (
              <div>Loading...</div>
            ) : errorRatedMovies ? (
              <div>Error loading rated movies.</div>
            ) : (
              <ColumnDisplay
                data={ratedMovies?.results || []}
                displayType={DisplayType.Movies}
                isRated
              />
            )}
          </div>
        ) : (
          <div>
            <Header as="h2">Rated TV shows</Header>
            {isLoadingRatedTvShows ? (
              <div>Loading...</div>
            ) : errorRatedTvShows ? (
              <div>Error loading rated TV shows.</div>
            ) : (
              <ColumnDisplay
                data={ratedTvShows?.results || []}
                displayType={DisplayType.TvShows}
                isRated
              />
            )}
          </div>
        )}
      </Segment>
    </Container>
  );
};
