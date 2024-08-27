import React from 'react'
import { DateFormatToEs } from '../../../util/date/DateFormatToEs';
import { Link as RouterLink } from "react-router-dom";
import MarkdownContent from './MarkdownContent';
// import Comments from '../comments/Comments';

import { Avatar, Typography, Box, Chip, Card, CardMedia, CardContent, Divider } from '@mui/material';

const PostContent = ({ postData }) => {

    const categories = postData["categories"].map((category) => <RouterLink to={`/search?category=${category.name}`} key={category["id"]}><Chip sx={{ bgcolor:'icons.light', marginRight: 1, marginBottom: 1 }} size='small' key={category["id"]} label={<Typography variant="caption">{category["name"]}</Typography>} /></RouterLink>);
    
    const themes = postData["themes"].map((theme) => <RouterLink to={`/search?theme=${theme.name}`} key={theme["id"]}><Chip sx={{ bgcolor:'icons.light', marginRight: 1, marginBottom: 1 }} size='small' key={theme["id"]} label={<Typography variant="caption">{theme["name"]}</Typography>} /></RouterLink>);
    
    return (
        <Card sx={{ marginTop: 2, borderRadius: 2 }}>
            <Box bgcolor="#f5f5f5" padding={2}>
                <Box>
                    <Typography variant="h1">{postData.title}</Typography>
                    <Box sx={{ marginTop: 1, marginBottom: 1, alignItems: 'center' }} display={'flex'}>
                        <Avatar sx={{ bgcolor:'icons.medium', marginRight: 1 }} src={postData.users.picture && postData.users.picture}>{postData.users.username[0].toUpperCase()}</Avatar>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Typography variant="caption">{postData.users.username}</Typography>
                            <Typography variant="caption">{DateFormatToEs(postData.date)}</Typography>
                        </Box>
                    </Box>
                    {categories.length > 0 &&
                    <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ width: '100%' }}>
                        <Typography variant="caption" sx={{ marginRight: 1, marginBottom: 1 }}>Categorias:</Typography>
                        <Box display={'flex'} flexWrap="wrap">
                            {categories}
                        </Box>
                    </Box>}
                    {themes.length > 0 &&
                    <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ width: '100%' }}>
                        <Typography variant="caption" sx={{ marginRight: 1, marginBottom: 1 }}>Incluido en temas:</Typography>
                        <Box display={'flex'} flexWrap="wrap">
                            {themes}
                        </Box>
                    </Box>}
                </Box>
                {postData.featuredImage && <Box display="flex" justifyContent="center" sx={{ marginTop: 1, backgroundColor: 'transparent' }}>
                    <CardMedia
                        component="img"
                        alt={"alt"}
                        sx={{ maxHeight: '300px', width: 'auto', height: 'auto', objectFit: "contain" }}
                        image={`${postData["featuredImage"]}`}
                        title={`${postData["slug"]}Image`}
                    />
                </Box>}
            </Box>
            <Divider />
            <CardContent sx={{ml: 2, mr: 2}}>
                <MarkdownContent content={postData.content} />
            </CardContent>
            {/* 
            <Divider />
            <Comments postData={postData}/>
            */}
        </Card>
    )
}

export default PostContent