import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SavePost } from '../../util/requests/Posts';
import { GetCategories } from "../../util/requests/Categories";
import { GetThemes } from "../../util/requests/Themes";
import { ValidateToken } from '../../util/requests/Auth';
import RichTextEditor from "./components/RichTextEditor";

import { Box, Select, TextField, MenuItem, Button, InputLabel } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const Writer = () => {
  const navigate = useNavigate();
  const postToEdit = useLocation().state;

  const [content, setContent] = useState(postToEdit ? postToEdit.content : '');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const handleSendPost = async (e) => {
    /*
      Send the post to the backend, it's divided on 2 requests
      1. Send the post content to the backend including path of images to store
        1.1. If editing, is not needed to send the slug or the authorId
        1.2. If new post, is needed to send the slug and the authorId
    */
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    /*for (const value of data.values()) {
      console.log(value);
    }*/
    try {
      const tokenValid = await ValidateToken();
      if (!tokenValid) throw new Error(`LoginError`);
      const slug = postToEdit ? postToEdit.slug : data.get("slug")
      const commonData = {
        "title": data.get("title"),
        "slug": slug,
        "excerpt": data.get("excerpt"),
        "content": content,
        "featuredImage": data.get("featuredImage"),
        "date": null,
        "featuredPost": false,
        "categoryIds": selectedCategories,
        "themeIds": selectedThemes
      }
      const body = postToEdit ? { ...commonData, ...{ "postId": postToEdit.id } } : { ...commonData, ...{ "slug": data.get("slug") } };
      const method = postToEdit ? 'PUT' : 'POST';
      const response = await SavePost(
        method,
        body
      );
      if (!response.ok) {
        throw new Error(`SavePostError`);
      }
      navigate(`/post/${slug}`);
    } catch (error) {
      console.error(`${error}`);
    }
  }

  useEffect(() => {
    /*
      Get categories from backend, if is editing mode, sets category id on combobox
    */
    const fetchCategories = async () => {
      const response = await GetCategories();
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);

      if (postToEdit && postToEdit.categories.length > 0) {
        let postCategoryNames = [];
        postToEdit.categories.forEach(element => {
          postCategoryNames.push(element.id);
        });
        setSelectedCategories(postCategoryNames);
      }
      else {
        if (fetchedCategories != null) setSelectedCategories([]);
      }
    }

    const fetchThemes = async () => {
      const response = await GetThemes();
      const fetchedThemes = await response.json();
      setThemes(fetchedThemes);

      if (postToEdit && postToEdit.themes.length > 0) {
        let postThemeNames = [];
        postToEdit.themes.forEach(element => {
          postThemeNames.push(element.id);
        });
        setSelectedThemes(postThemeNames);
      }
      else {
        if (fetchedThemes != null) setSelectedThemes([]);
      }
    }
    fetchCategories();
    fetchThemes();
  }, [])

  return (
    <>
      <Button component={Link} to="/wpannel" variant="contained" color="primary" startIcon={<KeyboardReturnIcon />}>
        Volver a Panel
      </Button>
      <Box component="form" onSubmit={handleSendPost} noValidate sx={{ mt: 1 }}>
        <TextField margin="normal" required fullWidth id="title" label="Titulo" name="title" defaultValue={postToEdit ? postToEdit.title : null} />
        <TextField margin="normal" required fullWidth id="slug" label="Link" disabled={postToEdit ? true : false} name="slug" defaultValue={postToEdit ? postToEdit.slug : null} />
        <TextField margin="normal" required fullWidth id="excerpt" label="Resumen" name="excerpt" defaultValue={postToEdit ? postToEdit.excerpt : null} />
        <RichTextEditor value={content} setValue={setContent} placeholder="Contenido" />
        <TextField margin="normal" required fullWidth id="featuredImage" label="URL Imagen Portada" name="featuredImage" defaultValue={postToEdit ? postToEdit.featuredImage : null} />
        <Box mt={1}>
          <InputLabel id="select-category-label">Categorias</InputLabel>
          <Select
            id="select-category"
            multiple
            value={selectedCategories != [] ? selectedCategories : ""}
            onChange={(e) => { setSelectedCategories(e.target.value) }}
            sx={{ width: 300 }}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box mt={1}>
          <InputLabel id="select-theme-label">Temas</InputLabel>
          <Select
            id="select-theme"
            multiple
            value={selectedThemes != [] ? selectedThemes : ""}
            onChange={(e) => { setSelectedThemes(e.target.value) }}
            sx={{ width: 300 }}
          >
            {themes.map((theme, index) => (
              <MenuItem key={index} value={theme.id}>
                {theme.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2, width: 300 }}
        >
          Enviar
        </Button>
      </Box>
    </>
  )
}

export default Writer;