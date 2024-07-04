import { Grid, Header } from "semantic-ui-react"

export const NotFound = () => {
    return <Grid textAlign="center" verticalAlign="middle" style={{ height: "80vh" }}>
        <Grid.Column style={{ maxWidth: 400 }}>
            <Header as="h2" textAlign="center">
                Not Found 
            </Header>
        </Grid.Column>
    </Grid>
}