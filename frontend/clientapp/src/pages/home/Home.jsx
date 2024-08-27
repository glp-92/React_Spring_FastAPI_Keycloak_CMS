import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import PostList from './components/PostList';
import { GetPostList } from '../../util/requests/Posts';
import Loading from '../../components/loading/Loading';
import LandingPage from './components/LandingPage';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const postsPerPage = 5;

const Home = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageOnLanding = parseInt(queryParams.get('page') || '1', 10) - 1; // Base 10

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(pageOnLanding);
  const [npages, setNPages] = useState(0);

  const handlePageChange = (event, value) => {
    const pageToGo = value - 1;
    setPage(pageToGo);
    pageToGo > 0 ? navigate(`/?page=${value}`) : navigate("/");
  };

  useEffect(() => {
    const pageFromUrl = parseInt(queryParams.get('page') || '1', 10) - 1;
    if (page !== pageFromUrl) {
      setPage(pageFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPosts = async (page) => {
      setIsLoading(true);
      const posts = await GetPostList(page, `&perpage=${postsPerPage}`);
      if (posts != null) {
        setPosts(posts["content"]);
        setNPages(posts["totalPages"]);
      } else {
        setPosts([]);
        setNPages(0);
      }
      setIsLoading(false);
    };
    fetchPosts(page);
  }, [page, location.search]);

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: 3, marginTop: 3 }}>
      {isLoading ? (
        <Loading height={300} />
      ) : (
        page === 0 ? (
          <LandingPage posts={posts} />
        ) :
          (
            <PostList postArr={posts} />
          )
      )
      }
      {
        npages > 1 &&
        <Pagination sx={{
          marginTop: 5,
          alignSelf: 'center',
        }} size='small' count={npages} shape="rounded" page={page + 1} onChange={handlePageChange} />
      }
    </Box>
  )
}

export default Home;