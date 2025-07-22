package controller

import (
	service "habit-tracker-be/services"
	"habit-tracker-be/utils"

	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
	type Request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var body Request
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "error",
			"message": "Invalid request"})
	}

	user, err := service.LoginUser(body.Email, body.Password)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status": "error",
			"message": "Invalid credentials"})
	}

	token, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "error",
			"message": "Token generation failed"})
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"token": token,
		"data":  user,
	})
}