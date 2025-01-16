package routes

import (
	"pixi/controllers"

	"github.com/gin-gonic/gin"
)

// FollowerRoutes registers the routes for followers
func FollowerRoutes(r *gin.Engine) {
	// Group routes for followers
	followerGroup := r.Group("/followers")

	// Use the authentication middleware for routes that require user authentication
	// followerGroup.Use(middleware.AuthRequired())

	// Route to create a new follower
	followerGroup.POST("/", controllers.CreateFollower)

	// Route to delete a follower by ID
	followerGroup.DELETE("/:id", controllers.DeleteFollower)
}
