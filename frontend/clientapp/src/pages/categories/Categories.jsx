import React, { useState, useEffect } from 'react'
import { GetCategoriesPageable } from '../../util/requests/Categories';
import { useNavigate } from 'react-router-dom';

import { List, ListItem, ListItemButton, ListItemText, Box, Typography, Pagination } from '@mui/material';

const Categories = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [npages, setNPages] = useState(0);

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    }

    const handleSelectedCategory = (category) => {
        navigate(`/search?category=${category.name}`);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await GetCategoriesPageable(page);
            const fetchedCategories = await response.json();
            setCategories(fetchedCategories.content);
            setNPages(fetchedCategories.totalPages);
        }
        fetchCategories();
    }, [page])

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 3 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Categorías
            </Typography>
            <List
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {categories.map((category) => (
                    <ListItem key={category.id} sx={{ width: '50%' }} disablePadding>
                        <ListItemButton onClick={() => handleSelectedCategory(category)} sx={{ justifyContent: 'center' }}>
                            <ListItemText primary={category.name} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
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

export default Categories