import { Link, Outlet, useNavigate } from "react-router-dom"
import { Button, Menu, MenuItem } from "semantic-ui-react"

export const NavBar = () => {
    const isLoggedIn = localStorage.getItem("guest_session_id") !== null

    const logout = () => {
        localStorage.removeItem("guest_session_id")
        navigate("/auth")
    }

    const navigate = useNavigate()
    return <>
        <Menu>
            <MenuItem name="Home" to="/" as={Link} style={{ fontSize: "1.2rem" }} />
            <MenuItem name="Ratings" to="/ratings" as={Link} style={{ fontSize: "1.2rem" }} />
            <Menu.Menu position="right">
                {isLoggedIn ? (
                    <MenuItem
                        name="Logout"
                        to="/auth"
                        as={Button}
                        style={{ fontSize: "1.2rem" }}
                        onClick={logout} />
                ) : (
                    <MenuItem
                        name="Auth"
                        to="/auth"
                        as={Link}
                        style={{ fontSize: "1.2rem" }}
                    />
                )}

            </Menu.Menu>
        </Menu>
        <Outlet />
    </>
}