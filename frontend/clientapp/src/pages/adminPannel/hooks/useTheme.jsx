import { useState, useEffect } from 'react'
import { CreateTheme, DeleteTheme, GetThemesPageable, UpdateTheme } from '../../../util/requests/Themes';

const themesPerPage = 2;

const useTheme = () => {

  const [themes, setThemes] = useState([]);
  const [themePage, setThemePage] = useState(0);
  const [nThemePages, setNThemePages] = useState(0);

  const fetchThemes = async (page) => {
    try {
      const response = await GetThemesPageable(page, themesPerPage);
      if (!response.ok) {
        throw new Error(`Error fetching themes`);
      }
      const fetchedThemes = await response.json();
      setThemes(fetchedThemes.content);
      setNThemePages(fetchedThemes.totalPages);
    } catch (error) {
      console.error(`${error}`);
    }
  }

  const handleCreateTheme = async (e) => {
    e.preventDefault();
    const themeForm = new FormData(e.currentTarget);
    const slug = themeForm.get('name').toLowerCase().replace(/\s+/g, '-');
    let themeData = {};
    themeForm.forEach((value, key) => themeData[key] = value);
    themeData.slug = slug;
    try {
      const response = await CreateTheme(themeData);
      if (!response.ok) {
        throw new Error(`CreateThemeError`);
      }
      const createdTheme = await response.json()
      document.getElementById("createThemeForm").reset();
      fetchThemes(themePage);
    } catch (error) {
      console.error(`${error}`);
    }
  }

  const handleUpdateTheme = async (e) => {
    e.preventDefault();
    const themeForm = new FormData(e.currentTarget);
    const slug = themeForm.get('name').toLowerCase().replace(/\s+/g, '-');
    let themeData = {};
    themeForm.forEach((value, key) => themeData[key] = value);
    themeData.slug = slug;
    try {
      const response = await UpdateTheme(themeData);
      if (!response.ok) {
        throw new Error(`UpdateThemeError`);
      }
    } catch (error) {
      console.error(`${error}`);
    }
  }

  const handleDeleteTheme = async (id, index) => {
    if (confirm('Esta accion borrara la Categoria de la base de datos, continuar?')) {
      try {
        const response = await DeleteTheme(id);
        if (!response.ok) {
          throw new Error(`DeleteThemeError`);
        }
        themes.length == 1 ? setThemePage(0) : fetchThemes(themePage);
      } catch (error) {
        console.error(`${error}`);
      }
    }
  }

  useEffect(() => {
    fetchThemes(themePage);
  }, [themePage])

  return {
    themes,
    setThemes,
    themePage,
    setThemePage,
    nThemePages,
    handleCreateTheme,
    handleUpdateTheme,
    handleDeleteTheme,
  };
}

export default useTheme;