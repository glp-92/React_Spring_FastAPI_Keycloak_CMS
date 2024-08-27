import React from 'react'
import MainPostCard from './MainPostCard';
import PostList from './PostList'

import { Stack, Typography, Box } from '@mui/material';

const LandingPage = ({ posts }) => {
    return (
        <Box>
            {posts.length ? (
                <Stack spacing={3}>
                    <MainPostCard postData={posts[0]} />
                    {posts.length > 1 && (<Typography variant="h4" sx={{ textAlign: 'left' }} gutterBottom>Entradas recientes</Typography>)}
                    <PostList postArr={posts.slice(1)} />
                </Stack>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography borderRadius={1} padding={1} bgcolor='lightgray' variant="h1">ERROR</Typography>
                    <Typography marginTop={4} variant="caption">Pagina en mantenimiento</Typography>
                </Box>
            )}
        </Box>
    )
}

export default LandingPage