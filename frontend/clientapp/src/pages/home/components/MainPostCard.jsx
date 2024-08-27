import React from 'react'
import { Link } from 'react-router-dom';
import { DateFormatToEs } from '../../../util/date/DateFormatToEs';
import { TruncateText } from '../../../util/formatting/TruncateText';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const MainPostCard = ({ postData }) => {

    const categories = postData["categories"].map((category) => <Box sx={{ margin: 1 }} key={category["id"]}><Chip sx={{ bgcolor: 'icons.light' }} size='small' key={category["id"]} label={<Typography variant="caption">{category["name"]}</Typography>} /></Box>);

    return (
        <Link to={`/post/${postData["slug"]}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, ":hover": { opacity: 0.8 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {postData.featuredImage && <Box bgcolor={'#f5f5f5'} display={'flex'} justifyContent={'center'}>
                        <CardMedia
                            component="img"
                            alt={"alt"}
                            sx={{ maxHeight: '300px', width: 'auto', height: 'auto', objectFit: "contain" }}
                            image={`${postData["featuredImage"]}`}
                            title={`${postData["slug"]}Image`}
                        />
                    </Box>}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography gutterBottom variant="h1" component="div">
                                {postData["title"]}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {TruncateText(postData["excerpt"], 150)}
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
                <Divider sx={{ flex: 2 }} />
                <Stack direction="row-reverse" sx={{ margin: 1 }} spacing={1} justifyContent="space-between">
                    <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <EditCalendarIcon sx={{ ml: 'auto', mr: 1, color: 'icons.medium' }} />
                        <Typography sx={{ ml: 'auto', mr: 1, color: '#555454' }} variant="subtitle1">
                            {DateFormatToEs(postData["date"])}
                        </Typography >
                    </Box>
                    <Box sx={{ flex: 3 }} display={'flex'} flexWrap="wrap">
                        {categories}
                    </Box>
                </Stack>
            </Card>
        </Link>
    )
}

export default MainPostCard