/*
package com.blog.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.blog.data.CommentRepository;
import com.blog.data.PostRepository;
import com.blog.model.pojo.Comment;
import com.blog.model.pojo.Post;

import com.blog.model.dto.comment.CommentCreate;
import com.blog.model.dto.comment.CommentEdit;

@Service
public class CommentServiceImpl implements CommentService{
	
	@Autowired
	private CommentRepository commentRepo;
	
	@Autowired
	private PostRepository postRepo;
	
	@Override
	public List<Comment> getAllComments() {
		return commentRepo.findAll();
	}
	
	@Value("${max-comments-per-hour}")
	private int maxCommentsPerHour;
	
	@Value("${max-comments-per-post}")
	private int maxCommentsPerPost;
	
	@Override
	public List<Comment> getCommentsFromPost(String postId) {
		Optional<Post> post = postRepo.findById(Long.valueOf(postId));
		Set<Comment> comments = post.get().getComments();
		return new ArrayList<>(comments);
	}
	
	@Override
	public Comment createComment(CommentCreate request) {
		Optional<Post> post = postRepo.findById(request.getPostId());
		if (maxCommentsPerPost <= post.get().getComments().size()) {
			throw new RuntimeException("Se ha superado el límite de comentarios en el post");
		}
		Date date = new Date(System.currentTimeMillis());
		if (countCommentsInLastHour(date) > maxCommentsPerHour) {
			throw new RuntimeException("Se ha superado el límite de comentarios por hora");
		}
        Comment comment = Comment.builder()
                .name(request.getName())
                .email(request.getEmail())
                .date(date)
                .comment(request.getComment())
                .post(post.get()) // Utiliza post_.get() para obtener el Post del Optional
                .build();
        return commentRepo.save(comment);
	}

	@Override
	public Comment editComment(CommentEdit request) {
		Optional<Comment> comment_opt = commentRepo.findById(Long.valueOf(request.getCommentId()));
		if (comment_opt.isEmpty()) {
            return null;
        }
		Comment comment = comment_opt.get();
		if (request.getComment() != null) {
			comment.setComment(request.getComment());
		}
		return commentRepo.save(comment);
	}

	@Override
	public boolean deleteComment(String commentId) {
		if (commentRepo.existsById(Long.valueOf(commentId))) {
			commentRepo.deleteById(Long.valueOf(commentId));
			return !commentRepo.existsById(Long.valueOf(commentId));
		} else {
			return false;
		}
	}
	
	private long countCommentsInLastHour(Date currentDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.HOUR_OF_DAY, -1); // Restar una hora a la fecha actual

        return commentRepo.countByDateGreaterThan(calendar.getTime());
    }

}
*/