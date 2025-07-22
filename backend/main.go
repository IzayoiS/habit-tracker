package main

import (
	"habit-tracker-be/config"
	"habit-tracker-be/database"
	"habit-tracker-be/routes"
	"os"

	"github.com/gofiber/fiber/v2"
)

func main() {
	config.LoadEnv()
	database.Connect()
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")

	app.Listen(":" + port)
}