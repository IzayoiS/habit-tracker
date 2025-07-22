package main

import (
	"habit-tracker-be/config"
	"os"

	"github.com/gofiber/fiber/v2"
)

func main() {
	config.LoadEnv()
	app := fiber.New()

	app.Use("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	port := os.Getenv("PORT")

	app.Listen(":" + port)
}