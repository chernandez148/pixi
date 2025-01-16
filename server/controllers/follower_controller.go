package controllers

import (
	"net/http"
	"pixi/config"
	"pixi/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

// CreateFollower handles the creation of a new follower
func CreateFollower(c *gin.Context) {
	var newFollower models.Follower

	// Bind the request body to newFollower object
	if err := c.ShouldBindJSON(&newFollower); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	// Validate required fields
	if newFollower.FollowerID == 0 || newFollower.FollowingID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Follower ID and Following ID are required"})
		return
	}

	// Check if a user is trying to follow themselves
	if newFollower.FollowerID == newFollower.FollowingID {
		c.JSON(http.StatusBadRequest, gin.H{"error": "A user cannot follow themselves"})
		return
	}

	// Get the DB connection
	db := config.GetDB()

	// Ensure Follower exists
	var follower models.User
	if err := db.First(&follower, newFollower.FollowerID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Follower not found"})
		return
	}

	// Ensure Following exists
	var following models.User
	if err := db.First(&following, newFollower.FollowingID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Following user not found"})
		return
	}

	// Check if the relationship already exists
	var existingFollower models.Follower
	if err := db.Where("follower_id = ? AND following_id = ?", newFollower.FollowerID, newFollower.FollowingID).First(&existingFollower).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Follower relationship already exists"})
		return
	}

	// Save the new follower to the database
	if err := db.Create(&newFollower).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving follower", "details": err.Error()})
		return
	}

	// Respond with the created follower
	c.JSON(http.StatusCreated, gin.H{"message": "Follower created successfully", "follower": newFollower})
}

// DeleteFollower handles the deletion of a follower
func DeleteFollower(c *gin.Context) {
	// Validate follower ID parameter
	followerIDParam := c.Param("id")
	followerID, err := strconv.Atoi(followerIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid follower ID format"})
		return
	}

	// Get the DB connection
	db := config.GetDB()

	// Find the follower by ID
	var follower models.Follower
	if err := db.First(&follower, followerID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Follower not found"})
		return
	}

	// Delete the follower from the database
	if err := db.Delete(&follower).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete follower", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Follower deleted successfully"})
}
