import { useState, useEffect } from 'react'
import { GetCategoriesPageable, CreateCategory, DeleteCategory, UpdateCategory } from '../../../util/requests/Categories';

const categoriesPerPage = 4;

const useCategory = () => {

  const [categories, setCategories] = useState([]);
  const [inputCategory, setInputCategory] = useState('');
  const [categoryPage, setCategoryPage] = useState(0);
  const [nCategoryPages, setNCategoryPages] = useState(0);

  const handleCreateCategory = async () => {
    const newCategoryName = inputCategory.toLowerCase();
    try {
      const response = await CreateCategory(newCategoryName);
      if (!response.ok) {
        throw new Error(`CreateCategoryError`);
      }
      setInputCategory('');
      fetchCategories(categoryPage);
    } catch (error) {
      console.error(`${error}`);
    }
  }

  const handleUpdateCategory = async (index) => {
    const category = categories[index];
    try {
      let response = await UpdateCategory(category);
      if (!response.ok) {
        throw new Error(`UpdateCategoryError`);
      }
    } catch (error) {
      console.error(`${error}`);
    }
  }

  const handleEditCategoryLabel = (newName, index) => {
    const newCategories = [...categories];
    newCategories[index]["name"] = newName;
    newCategories[index]["slug"] = newName;
    setCategories(newCategories);
  }

  const handleDeleteCategory = async (id, index) => {
    if (confirm('Esta accion borrara la Categoria de la base de datos, continuar?')) {
      try {
        let response = await DeleteCategory(id);
        if (!response.ok) {
          throw new Error(`DeleteCategoryError`);
        }
        categories.length == 1 ? setCategoryPage(0) : fetchCategories(categoryPage);
      } catch (error) {
        console.error(`${error}`);
      }
    }
  }

  const fetchCategories = async (page) => {
    try {
      const response = await GetCategoriesPageable(page, categoriesPerPage);
      if (!response.ok) {
        throw new Error(`Error fetching categories`);
      }
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories.content);
      setNCategoryPages(fetchedCategories.totalPages)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories(categoryPage);
  }, [categoryPage])

  return {
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
  };
}

export default useCategory;