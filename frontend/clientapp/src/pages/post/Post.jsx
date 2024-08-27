import React, { useState, useEffect } from 'react'
import PostContent from './components/PostContent'
import { Navigate } from "react-router-dom";
import Loading from '../../components/loading/Loading';
import { getPost } from '../../util/requests/Posts';

import Box from '@mui/material/Box';

const Post = () => {
  const slug = window.location.pathname.replace(`/post/`, ""); // Se elimina el /post para la constante slug ya que en BBDD se introduce el slug tal cual
  const [postData, setPostData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  //const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      const postData = await getPost(slug);
      if (postData != null) {
        setPostData(postData);
      } else {
        setPostData(null);
      }
      setIsLoading(false);
    }
    fetchPostData();
  }, [slug])

  // Mientras carga se muestra un layout, una vez ha hecho la consulta, si postData es null, se mostrara un notFound, en caso contrario, se renderizara el post
  return (
    <Box sx={{ width: '100%', marginBottom: 3 }}>
      {isLoading ? (
        <Loading height={'70vh'}/>
      ) : (
        postData ? (
          <PostContent postData={postData} />
        ) : (
          <Navigate to="/not-found" replace={true} />
        )
      )}
    </Box>
  )
}

export default Post;