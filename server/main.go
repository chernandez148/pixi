package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"pixi/config" // Adjusted to match the module name
	"pixi/models" // Import the models package
	"pixi/routes" // Import the routes package where the routes are defined
	"pixi/utils"  // Import the utils package where GetEnv is defined
	"syscall"

	"github.com/gin-contrib/cors" // Correct import for cors
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load() // This loads the .env file from the current directory
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to the database
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}
	log.Println("Successfully connected to the database.")

	// Perform AutoMigrate for all models
	err = db.AutoMigrate(
		&models.User{},
		&models.Post{},
		&models.Comment{},
		&models.Like{},
		&models.Follower{},
	) // Add any additional models here
	if err != nil {
		log.Fatal("Failed to run AutoMigrate:", err)
	}
	log.Println("Database migration completed successfully.")

	// Initialize Gin router
	r := gin.Default()

	// Apply CORS middleware globally using the gin-contrib/cors package
	corsOptions := cors.New(cors.Config{
		AllowOrigins:     []string{utils.GetEnv("FRONTEND_URL", "https://er8ooes-anonymous-8081.exp.direct")}, // Allow specific origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},                                 // Allow common methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Apply the CORS middleware globally
	r.Use(corsOptions)

	// Set the db instance in the Gin context
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})

	// Register routes
	routes.UserRoutes(r)
	routes.PostRoutes(r)
	routes.CommentRoutes(r)
	routes.LikeRoutes(r)
	routes.FollowerRoutes(r)

	// Setup server and graceful shutdown
	srv := &http.Server{
		Addr:    ":" + utils.GetEnv("SERVER_PORT", "8080"), // Use utils.GetEnv for server port
		Handler: r,
	}

	// Start the server in a goroutine
	go func() {
		log.Println("Server running on http://localhost:" + utils.GetEnv("SERVER_PORT", "8080"))
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Server failed to start:", err)
		}
	}()

	// Graceful shutdown on SIGINT or SIGTERM
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	// Wait for server to finish any in-progress requests
	if err := srv.Shutdown(context.Background()); err != nil {
		log.Fatal("Server shutdown failed:", err)
	}

	log.Println("Server stopped")
}
