/*
package com.blog.model.pojo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "comments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column
	@NotBlank(message = "field name cannot be empty!")
	private String name;
	
	@Column
	@JsonIgnore
	@NotBlank(message = "field email cannot be empty!")
	private String email;
	
	@Column
	@NotBlank(message = "field comment cannot be empty!")
	private String comment;
	
	@Column
	@NotNull(message = "field date cannot be empty!") //NotBlank no se aplica en campo date
	private Date date;
	
	@ManyToOne
    @JoinColumn(name = "posts_id") // Nombre de la columna que contiene la clave foránea
	@JsonBackReference
	@ToString.Exclude
	private Post post;
	
}
*/