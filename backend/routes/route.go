package routes

import (
	controller "habit-tracker-be/controllers"
	"habit-tracker-be/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	auth := api.Group("/auth")

	auth.Post("/login", controller.Login)
	auth.Post("/register", controller.Register)
	auth.Get("/check", middleware.Protected, controller.CheckUser)
}