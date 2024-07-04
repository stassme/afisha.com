
import { useMutation } from "react-query"
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react"
import { mutationLogin } from "./mutation"
import { useNavigate } from "react-router-dom"

export const Auth = () => {
    const { mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: mutationLogin,
        onSuccess: (data) => {
            localStorage.setItem("guest_session_id", data.guest_session_id);
            navigate("/");
        },
    });

    const navigate = useNavigate();

    const handleLogin = () => {
        mutate();
    };

    return <>
        <Grid textAlign="center" verticalAlign="middle" style={{ height: "80vh" }}>
            <Grid.Column style={{ maxWidth: 400 }}>
                <Header as="h2" textAlign="center">
                    Welcome!
                    <br /><br />
                    <Form size="large">
                        <Segment stacked>
                            <Button color="pink" size="large" fluid onClick={handleLogin}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                </Header>
            </Grid.Column>
        </Grid>
    </>
}