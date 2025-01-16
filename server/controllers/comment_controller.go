package controllers

import (
	"net/http"
	"pixi/config"
	"pixi/models"

	"github.com/gin-gonic/gin"
)

// CreateComment handles the creation of a new comment
func CreateComment(c *gin.Context) {
	var newComment models.Comment

	// Bind the request body to newComment object
	if err := c.ShouldBindJSON(&newComment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	// Validate required fields
	if newComment.UserID == 0 || newComment.PostID == 0 || newComment.Author == "" || newComment.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID, Post ID, and Content are required"})
		return
	}

	// Get the DB connection
	db := config.GetDB()

	// Ensure the post exists before creating a comment
	var post models.Post
	if err := db.First(&post, newComment.PostID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	// Save the new comment to the database
	if err := db.Create(&newComment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving comment", "details": err.Error()})
		return
	}

	// Respond with the created comment
	c.JSON(http.StatusCreated, gin.H{"message": "Comment created successfully", "comment": newComment})
}

// UpdateComment updates an existing comment
func UpdateComment(c *gin.Context) {
	db := config.GetDB()
	commentID := c.Param("id")

	// Bind the input JSON data to a map to handle specific fields
	var input struct {
		Author  *string `json:"Author"` // Nullable Author
		Content string  `json:"Content"`
	}

	// Bind incoming JSON request data
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	// Find the comment by ID
	var existingComment models.Comment
	if err := db.First(&existingComment, commentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		return
	}

	// Update the fields if they are provided in the request
	if input.Content != "" {
		existingComment.Content = input.Content
	}

	// If an Author is provided, update it; otherwise, leave it as it is
	if input.Author != nil {
		existingComment.Author = *input.Author
	}

	// Save the updated comment to the database
	if err := db.Save(&existingComment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating comment", "details": err.Error()})
		return
	}

	// Respond with the updated comment
	c.JSON(http.StatusOK, gin.H{
		"message": "Comment updated successfully",
		"comment": existingComment,
	})
}

// DeleteComment deletes a comment by ID
func DeleteComment(c *gin.Context) {
	db := config.GetDB()
	var comment models.Comment
	commentID := c.Param("id")

	// Find the comment by ID
	if err := db.First(&comment, commentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		return
	}

	// Delete the comment
	if err := db.Delete(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting comment", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Comment deleted successfully"})
}
