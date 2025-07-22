package controller

import (
	service "habit-tracker-be/services"

	"github.com/gofiber/fiber/v2"
)

func Register(c *fiber.Ctx) error {
	var body struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "error",
			"message": "Invalid input"})
	}
	
	user, err := service.RegisterUser(body.Name, body.Email, body.Password)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "error",
			"message": err.Error()})
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"message": "User registered successfully",
		"data": fiber.Map{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		},
	})
}
