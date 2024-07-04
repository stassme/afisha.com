import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Grid, Header, Loader, Segment, Image, List, Card, Accordion } from "semantic-ui-react";
import { fetchTvShowDetails } from "./query";

export const TvShows = () => {
    const { id } = useParams<string>();

    if (!id) {
        return <div>Invalid id</div>;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["tvShow", id], // Add id to queryKey to make it specific to the tv show
        queryFn: () => fetchTvShowDetails(id),
    });

    if (isLoading) {
        return <Loader active />;
    }

    const seasonsPanels = data.seasons.map((season: any) => ({
        key: season.id,
        title: `Season ${season.season_number}`, // Ensure correct access to season number
        content: {
            content: (
                <Card
                    style={{ height: "70px" }}
                    meta={season.air_date}
                    description={`${season.episode_count} episodes`}
                />
            ),
        },
    }));

    return (
        <div style={{ marginTop: 50 }}>
            <Segment>
                <Header>{data.name}</Header>
                <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                }}
                            >
                                <Image
                                    size="medium"
                                    src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                                    centered
                                />
                            </div>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <List>
                                <List.Item>
                                    <List.Header>Age limit?</List.Header>
                                    {data.adult ? "Yes" : "No"}
                                </List.Item>

                                <List.Item>
                                    <List.Header>Episode run time:</List.Header>
                                    {data.episode_run_time.join(", ")}
                                </List.Item>

                                <List.Item>
                                    <List.Header>Networks:</List.Header>
                                    {data.networks.map((network: any) => (
                                        <Image
                                            key={network.id}
                                            src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                                            size="small"
                                            style={{ marginRight: 10 }}
                                        />
                                    ))}
                                </List.Item>

                                <List.Item>
                                    <List.Header>Popularity:</List.Header>
                                    {data.popularity}
                                </List.Item>

                                <List.Item>
                                    <List.Header>Number of episodes:</List.Header>
                                    {data.number_of_episodes}
                                </List.Item>

                                <List.Item>
                                    <List.Header>Number of Seasons:</List.Header>
                                    {data.number_of_seasons}
                                </List.Item>

                                <List.Item>
                                    <List.Header>First Air Date:</List.Header>
                                    {data.first_air_date}
                                </List.Item>

                                <List.Item>
                                    <List.Header>Vote Average:</List.Header>
                                    {data.vote_average}
                                </List.Item>

                                <List.Item>
                                    <List.Header>Seasons:</List.Header>
                                    <List.Description style={{height: "200px", overflow:"scroll"}}>
                                        <Accordion defaultActiveIndex={0} panels={seasonsPanels} styled />
                                    </List.Description>
                                </List.Item>

                                <List.Item>
                                    <List.Header>Language:</List.Header>
                                    {data.original_language}
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};
