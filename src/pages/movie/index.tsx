import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Grid, Header, Loader, Segment, Image, List } from "semantic-ui-react"
import { fetchMovieDetails } from "./query"

export const Movie = () => {
    const { id } = useParams<string>()

    if (!id) {
        return <div>Invalid id</div>
    }

    const { data, isLoading } = useQuery({
        queryKey: ["movie"],
        queryFn: () => fetchMovieDetails(id)
    })

    if (isLoading) {
        return <Loader active />
    }

    return <div style={{ marginTop: 50 }}>
        <Segment>
            <Header>
                {data.title}
            </Header>
            <Grid columns={2}
                divided
                textAlign="left"
                style={{ marginTop: 20 }}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%"
                        }}>
                            <Image size="medium"
                                src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                                centered />
                        </div>
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <List>
                            <List.Item>
                                <List.Header>
                                    Age limit?
                                </List.Header>
                                {data.adult ? "Yes" : "No"}
                            </List.Item>

                            <List.Item>
                                <List.Header>
                                    Budget:
                                </List.Header>
                                {data.budget}$
                            </List.Item>

                            <List.Item>
                                <List.Header>
                                    Popularity:
                                </List.Header>
                                {data.popularity}
                            </List.Item>

                            <List.Item>
                                <List.Header>
                                    Release Date:
                                </List.Header>
                                {data.release_date}
                            </List.Item>

                            <List.Item>
                                <List.Header>
                                    Revenue:
                                </List.Header>
                                {data.revenue}$
                            </List.Item>

                            <List.Item>
                                <List.Header>
                                    Runtime:
                                </List.Header>
                                {data.runtime} min
                            </List.Item>

                            <List.Item>
                                <List.Header>
                                    Vote Average:
                                </List.Header>
                                {data.vote_average}
                            </List.Item>

                            <List.Item>
                                <List.Header>
                                    Language:
                                </List.Header>
                                {data.original_language}
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>
}