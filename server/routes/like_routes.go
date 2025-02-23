package routes

import (
	"pixi/controllers"

	"github.com/gin-gonic/gin"
)

// LikeRoutes defines the routes for handeling like-related operations
func LikeRoutes(router *gin.Engine) {
	likeGroup := router.Group("/posts/:postID/likes")

	// Apply authentication middleware to all routes in this group
	// likeGroup.Use(middleware.AuthRequired())

	// POST route to create a new like on a specific post
	likeGroup.POST("", controllers.CreateLike)

	// DELETE route to remove a like by ID
	router.DELETE("/like/:likeID", controllers.DeleteLike)
}
