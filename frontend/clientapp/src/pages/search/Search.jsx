import React, { useState, useEffect } from 'react'
import { GetPostList } from '../../util/requests/Posts';
import PostList from './components/PostList'
import Loading from '../../components/loading/Loading';
import { useLocation } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Search = () => {
  const location = useLocation();

  const queryparams = location.search.replace('?', '&');
  const searchParams = new URLSearchParams(location.search);

  let label;
  if (queryparams.includes('&theme=')) {
    const theme = searchParams.get('theme');
    label = <>Entradas para tema <strong><em>{theme}</em></strong></>
  } else if (queryparams.includes('&category=')) {
    const category = searchParams.get('category');
    label = <>Entradas para categoria <strong><em>{category}</em></strong></>
  } else {
    const keyword = searchParams.get('keyword');
    label = <>Resultados de búsqueda para palabras clave <strong><em>{keyword}</em></strong></>
  }
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [npages, setNPages] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  }

  useEffect(() => {
    const fetchPosts = async (page) => {
      setIsLoading(true);
      const posts = await GetPostList(page, queryparams);
      if (posts != null) {
        setPosts(posts["content"]);
        setNPages(posts["totalPages"])
      }
      else {
        setPosts([]);
      }
      setIsLoading(false);
    }
    fetchPosts(page);
  }, [page, queryparams])

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }} gutterBottom>{label}</Typography>
      {isLoading ? (
        <Loading height={200} />
      ) : (
        posts.length ? (
          <PostList postArr={posts} />
        ) : (
          <Box sx={{ height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography borderRadius={1} padding={1} bgcolor='lightgray' variant="h2">SIN RESULTADOS</Typography>
          </Box>
        )
      )}
      {
        npages > 1 && <Pagination sx={{ marginTop: 5, alignSelf: 'center' }} size='small' count={npages} shape="rounded" page={page + 1} onChange={handlePageChange} />
      }
    </Box>
  )
}

export default Search;