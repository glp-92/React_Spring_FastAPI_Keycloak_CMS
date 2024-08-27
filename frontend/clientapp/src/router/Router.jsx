import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Logout from "../pages/logout/Logout";
import Search from "../pages/search/Search";
import Post from "../pages/post/Post";
import NotFound from "../pages/notfound/NotFound";
import Writer from "../pages/writer/Writer";
import AdminPannel from "../pages/adminPannel/AdminPannel";
import Categories from "../pages/categories/Categories.jsx";
import Themes from "../pages/themes/Themes.jsx";
import PrivacyPolicy from "../pages/privacyPolicy/privacyPolicy.jsx";
import Footer from '../components/footer/Footer.jsx'
import NavBar from '../components/navbar/Navbar.jsx'
import DependsLogged from "../components/dependslogged/DependsLogged.jsx";

import Container from '@mui/material/Container';




export const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Container maxWidth="md" sx={{ flex:1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/post/:postSlug" element={<Post />} />
                    <Route exact path="/categories" element={<Categories />} />
                    <Route exact path="/themes" element={<Themes />} />
                    <Route exact path="/notfound" element={<NotFound />} />
                    <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route element={<DependsLogged />}>
                        <Route exact path="/logout" element={<Logout />} />
                    </Route>
                    <Route element={<DependsLogged />}>
                        <Route exact path="/wpannel" element={<AdminPannel />} />
                    </Route>
                    <Route element={<DependsLogged />}>
                        <Route path="/wpannel/writer" element={<Writer />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/notfound" />} />
                </Routes>
            </Container>
            <Container maxWidth="md"  >
                <Footer sx={{  }} />
            </Container>
        </BrowserRouter>
    )
}