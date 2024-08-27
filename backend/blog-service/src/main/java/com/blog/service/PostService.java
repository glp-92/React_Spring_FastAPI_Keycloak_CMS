package com.blog.service;

import java.util.Map;

import com.blog.model.pojo.Post;
import com.blog.model.dto.post.PostCreate;
import com.blog.model.dto.post.PostEdit;

public interface PostService {
	Map<String, Object> getPostsFiltered(String keyword, String category, String theme, int page, boolean reverse, Integer perpage);
	Post getPostByUri(String postSlug);
	Post createPost(PostCreate request, String subject); //Al devolver directamente el contenido del post te puede redirigir a la pagina
	//List<String> uploadImages(List<MultipartFile> imageList, List<String> imagenameList) throws IllegalStateException, IOException;
	Post editPost(PostEdit request);
	boolean deletePost(String postId);
}
