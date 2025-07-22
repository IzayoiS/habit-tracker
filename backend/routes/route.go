package routes

import (
	controller "habit-tracker-be/controllers"
	"habit-tracker-be/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	// Auth routes
	auth := api.Group("/auth")
	auth.Post("/login", controller.Login)
	auth.Post("/register", controller.Register)
	auth.Get("/check", middleware.Protected, controller.CheckUser)

	// Habit routes
	habits := api.Group("/habits", middleware.Protected)
	habits.Post("/", controller.CreateHabit)
	habits.Get("/", controller.GetHabits)
	habits.Get("/:id", controller.GetHabitById)
	habits.Patch("/:id",controller.UpdateHabit)
	habits.Delete("/:id",controller.DeleteHabit)
	habits.Post("/:id/checkin", controller.CheckInHabit)
}