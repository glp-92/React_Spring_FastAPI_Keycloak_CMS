import React from 'react'
import Pagination from '@mui/material/Pagination';

import useCategory from './hooks/useCategory';
import useTheme from './hooks/useTheme';
import usePost from './hooks/usePost';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AdminPannel = () => {

    const {
        categories,
        inputCategory,
        setInputCategory,
        categoryPage,
        setCategoryPage,
        nCategoryPages,
        handleCreateCategory,
        handleEditCategoryLabel,
        handleUpdateCategory,
        handleDeleteCategory
    } = useCategory();

    const {
        themes,
        themePage,
        setThemePage,
        nThemePages,
        handleCreateTheme,
        handleUpdateTheme,
        handleDeleteTheme
    } = useTheme();

    const {
        posts,
        postPage,
        setPostPage,
        nPostPages,
        handleCreatePost,
        handleEditPost,
        handleDeletePost
    } = usePost();

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 2 }}>
            <Typography align='center' variant="h1">
                Panel de Administracion
            </Typography>
            <Box sx={{ flex: 1, mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h2">
                    Posts
                </Typography>
                <Button
                    onClick={handleCreatePost}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                >
                    Crear Post
                </Button>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {posts.map(item => (
                        <Box
                            key={item["id"]}
                            display="flex"
                            alignItems="center"
                        >
                            <Typography variant="body1" flexGrow={1} sx={{ wordBreak: 'break-all' }} >
                                {`${item["title"]} | ${item["date"].slice(0, 16)}`}
                            </Typography>
                            <IconButton
                                size="large"
                                edge="start"
                                color="primary"
                                aria-label="menu"
                                onClick={() => handleEditPost(item)}
                                sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                            >
                                <UpdateIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                color="secondary"
                                aria-label="menu"
                                onClick={() => handleDeletePost(item["id"])}
                                sx={{ fontSize: '1.5rem' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Stack>
                <Pagination sx={{ pt:1, marginTop: 'auto', alignSelf: 'center', }} size='small' count={nPostPages} shape="rounded" page={postPage + 1} onChange={(e, value) => setPostPage(value - 1)} />
            </Box>
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h2">
                    Categorias
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 0, width: '100%' }}>
                    <TextField type="text" margin="normal" fullWidth id="title" label="Nombre de categoria" name="newCategory" value={inputCategory} onChange={(e) => { setInputCategory(e.target.value) }} />
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        onClick={handleCreateCategory}
                        sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
                <List dense sx={{ width: '100%' }}>
                    {categories.map((category, index) => (
                        <ListItem key={index} alignItems="center" sx={{ mt: 0, mb: 0 }}>
                            <TextField type="text" fullWidth margin="normal" value={category["name"]} onChange={(e) => handleEditCategoryLabel(e.target.value, index)} />
                            <IconButton
                                size="large"
                                edge="start"
                                color="primary"
                                aria-label="menu"
                                onClick={() => handleUpdateCategory(index)}
                                sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                            >
                                <UpdateIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                color="secondary"
                                aria-label="menu"
                                onClick={() => handleDeleteCategory(category.id, index)}
                                sx={{ fontSize: '1.5rem' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                {
                    nCategoryPages > 1 &&
                    <Pagination sx={{ marginBottom: 1, marginTop: 'auto', alignSelf: 'center', }} size='small' count={nCategoryPages} shape="rounded" page={categoryPage + 1} onChange={(e, value) => setCategoryPage(value - 1)} />
                }
            </Box>
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h2">
                    Temas
                </Typography>
                <Box component="form" id="createThemeForm" onSubmit={handleCreateTheme} sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 0, width: '100%' }}>
                    <Box flex={1} display={'flex'} flexDirection={'column'} >
                        <Box mb={1} display={'flex'}>
                            <TextField sx={{ flex: 1 }} type="text" fullWidth id="themeTitle" label="Nombre de tema" name="name" />
                            <TextField sx={{ ml: 1, flex: 2 }} type="text" fullWidth id="themeImage" label="Ruta de imagen del tema" name="featuredImage" />
                        </Box>
                        <TextField type="text" fullWidth id="themeExcerpt" label="Resumen del tema" name="excerpt" />
                    </Box>
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        type="submit"
                        sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
                <List dense sx={{ width: '100%' }}>
                    {themes.map((theme, index) => (
                        <ListItem key={index} alignItems="center" sx={{ mt: 0, mb: 0 }}>
                            <Box component="form" id="editThemeForm" onSubmit={handleUpdateTheme} sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 0, width: '100%' }}>
                                <Box flex={1} display={'flex'} flexDirection={'column'} >
                                    <Box mb={1} display={'flex'}>
                                        <TextField sx={{ flex: 1 }} type="text" defaultValue={theme["name"]} name="name"/>
                                        <TextField sx={{ ml: 1, flex: 2 }} type="text" defaultValue={theme["featuredImage"]} name="featuredImage" />
                                    </Box>
                                    <TextField type="text" fullWidth defaultValue={theme["excerpt"]} name="excerpt" />
                                </Box>
                                <input type="hidden" name="id" value={theme.id} />
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="primary"
                                    aria-label="menu"
                                    type="submit"
                                    sx={{ ml: 1, mr: 1, fontSize: '1.5rem' }}
                                >
                                    <UpdateIcon />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="secondary"
                                    aria-label="menu"
                                    onClick={() => handleDeleteTheme(theme.id, index)}
                                    sx={{ fontSize: '1.5rem' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                {
                    nThemePages > 1 &&
                    <Pagination sx={{ marginBottom: 1, marginTop: 'auto', alignSelf: 'center', }} size='small' count={nThemePages} shape="rounded" page={themePage + 1} onChange={(e, value) => setThemePage(value - 1)} />
                }
            </Box>
        </Box>
    )


}

export default AdminPannel