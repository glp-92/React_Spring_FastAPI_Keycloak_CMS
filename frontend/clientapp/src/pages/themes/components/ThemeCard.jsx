import React from 'react'
import { Link } from 'react-router-dom';
import { TruncateText } from '../../../util/formatting/TruncateText';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ThemeCard = ({ themeData }) => {

    return (
        <Link to={`/search?theme=${themeData.name}`} style={{ flex:1,  textDecoration: 'none' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, ":hover": { opacity: 0.8 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {themeData.featuredImage && <Box bgcolor={'#f5f5f5'}>
                        <CardMedia
                            component="img"
                            height="150"
                            alt={"alt"}
                            sx={{ objectFit: "contain" }}
                            image={`${themeData["featuredImage"]}`}
                        />
                    </Box>}
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h2" component="div">
                            {themeData.name} ({themeData.postCount} {themeData.postCount > 1 ? "posts": "post"})
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {TruncateText(themeData.excerpt, 150)}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Link>
    )
}

export default ThemeCard