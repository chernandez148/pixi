package routes

import (
	"pixi/controllers"

	"github.com/gin-gonic/gin"
)

// CommentRoutes defines the routes for handling comment-related operations.
func CommentRoutes(router *gin.Engine) {
	commentGroup := router.Group("/posts/:postID/comments")

	// Apply authentication middleware to all routes in this group
	// commentGroup.Use(middleware.AuthRequired())

	// POST route to create a new comment on a specific post
	commentGroup.POST("", controllers.CreateComment)

	// PATCH route to update an existing comment by ID
	router.PATCH("/comment/:commentID", controllers.UpdateComment)

	// DELETE route to remove a comment by ID
	router.DELETE("/comment/:commentID", controllers.UpdateComment)
}
