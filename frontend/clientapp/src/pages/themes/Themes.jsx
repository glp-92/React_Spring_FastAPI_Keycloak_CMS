import React, { useState, useEffect } from 'react'
import { GetThemesPageable } from '../../util/requests/Themes';
import ThemeCard from './components/ThemeCard';

import { List, ListItem, Box, Typography, Pagination } from '@mui/material';

const Themes = () => {

    const [themes, setThemes] = useState([]);
    const [page, setPage] = useState(0);
    const [npages, setNPages] = useState(0);

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    }

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await GetThemesPageable(page);
            const fetchedThemes = await response.json();
            setThemes(fetchedThemes.content);
            setNPages(fetchedThemes.totalPages);
        }
        fetchThemes();
    }, [page])

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 3 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Temas
            </Typography>
            <List
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {themes.map((theme) => (
                    <ListItem key={theme.id} sx={{ p: 1, width: '50%' }} disablePadding>
                        <ThemeCard themeData={theme} />
                    </ListItem>
                ))}
            </List>
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

export default Themes