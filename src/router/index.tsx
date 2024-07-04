import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Auth } from "../pages/auth";
import { Home } from "../pages/home";
import "../index.css"
import { Movie } from "../pages/movie";
import { TvShows } from "../pages/tvShows";
import { Rated } from "../pages/rated";
import { NotFound } from "../pages/NotFound";


export const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<NavBar />} id="root">
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/ratings" element={<Rated/>} />
        <Route path="/movies/:id" element={<Movie/>} />
        <Route path="/tvshows/:id" element={<TvShows/>} />
        <Route path="/*" element={<NotFound/>} />
    </Route>
))