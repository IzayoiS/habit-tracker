package controller

import (
	"habit-tracker-be/database"
	model "habit-tracker-be/models"

	"github.com/gofiber/fiber/v2"
)

func CheckUser(c *fiber.Ctx) error {
	userId := c.Locals("userId").(uint)

	var user model.User
	if err := database.DB.First(&user, userId).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status": "error",
			"message": "User not found",
		})
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"data":  user,
	})
}