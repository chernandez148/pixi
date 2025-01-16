package routes

import (
	"pixi/controllers"

	"github.com/gin-gonic/gin"
)

func PostRoutes(router *gin.Engine) {
	postGroup := router.Group("/posts")

	// Add GET routes for retrieving posts
	postGroup.GET("", controllers.GetPost)

	// Add POST route for creating a new post
	postGroup.POST("", controllers.CreatePost)

	// Add PATCH route for updating an existing post
	postGroup.PATCH("/:id", controllers.UpdatePost)

	// Add GET route for retrieving a post by ID
	postGroup.GET("/:id", controllers.GetPost)

	// Add DELETE route for deleting a post by ID
	postGroup.DELETE("/:id", controllers.DeletePost)
}
