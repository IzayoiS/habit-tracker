package main

import (
	"habit-tracker-be/config"
	"habit-tracker-be/database"
	"habit-tracker-be/routes"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	config.LoadEnv()
	database.Connect()
	app := fiber.New()
	app.Use(cors.New(cors.Config{
        AllowOrigins: "http://localhost:3000", 
        AllowHeaders: "Origin, Content-Type, Accept, Authorization",
    }))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")

	app.Listen(":" + port)
}