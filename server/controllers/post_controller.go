package controllers

import (
	"net/http"
	"net/url"
	"pixi/config"
	"pixi/models"

	"github.com/gin-gonic/gin"
)

// GetPost handles the retrieval of all posts
func GetPost(c *gin.Context) {
	// Declare a slice to hold posts
	var posts []models.Post

	// Retrieve all posts from the database
	result := config.DB.Preload("User").Preload("Likes").Find(&posts)

	// Check for errors
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// Respond with the retrieved posts
	c.JSON(http.StatusOK, gin.H{"posts": posts})
}

// CreatePost handles the creation of a new post
func CreatePost(c *gin.Context) {
	var newPost models.Post

	// Get userID from the context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID not found"})
		return
	}

	// Assign the UserID from the context to the new post
	newPost.UserID = userID.(uint)

	// Bind the request to the newPost object
	if err := c.ShouldBindJSON(&newPost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	// Validate required fields (example: ensure caption and image URL are not empty)
	if newPost.Caption == "" || newPost.ImageURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Caption and Image URL are required"})
		return
	}

	// Optionally, validate the image URL format
	if _, err := url.ParseRequestURI(newPost.ImageURL); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Image URL format"})
		return
	}

	// Get the DB connection
	db := config.GetDB()

	// Save the new post to the database
	if err := db.Create(&newPost).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving post", "details": err.Error()})
		return
	}

	// Retrieve the saved post with preloading
	var createdPost models.Post
	if err := db.Preload("User").Preload("Likes").First(&createdPost, newPost.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving post with associations", "details": err.Error()})
		return
	}

	// Respond with the created post including preloaded associations
	c.JSON(http.StatusCreated, gin.H{"message": "Post created successfully", "post": createdPost})
}

// UpdatePost updates an existing post
func UpdatePost(c *gin.Context) {
	db := config.GetDB()
	var post models.Post
	postID := c.Param("id")

	// Bind the input JSON data
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	// Find the post by ID and preload the User relationship
	var existingPost models.Post
	if err := db.Preload("User").First(&existingPost, postID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	// Update the fields (caption, image URL, etc.) if they are provided
	if post.Caption != "" {
		existingPost.Caption = post.Caption
	}
	if post.ImageURL != "" {
		existingPost.ImageURL = post.ImageURL
	}
	if post.UserID != 0 { // Check if UserID is valid (not zero)
		// Validate if the user exists
		var user models.User
		if err := db.First(&user, post.UserID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		existingPost.UserID = post.UserID // Direct assignment, no need for indirection
	}

	// Update the post in the database
	if err := db.Save(&existingPost).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating post", "details": err.Error()})
		return
	}

	// Respond with the updated post
	c.JSON(http.StatusOK, gin.H{"message": "Post updated successfully", "post": existingPost})
}

// GetPost retrieves the post by ID
func GetPostByID(c *gin.Context) {
	db := config.GetDB() // Get DB connection
	var post models.Post
	postID := c.Param("id") //Get the post ID from the URL params

	if err := db.First(&post, postID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	c.JSON(http.StatusOK, post)
}

// DeletePost deletes a post by ID
func DeletePost(c *gin.Context) {
	db := config.GetDB() // Get DB connection
	var post models.Post
	postID := c.Param("id") // Get the post ID from the URL params

	if err := db.First(&post, postID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	if err := db.Delete(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting post", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Post deleted successfully"})
}
