package controller

import (
	service "habit-tracker-be/services"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)


func CreateHabit(c *fiber.Ctx) error {
	userId := c.Locals("userId").(uint)
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status": "error",
			"message": "cannot parse JSON"})
	}

	if data["name"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"status": "error",
			"message": "Name is required"})
	}

	var startDate time.Time
	var err error
	if data["start_date"] == "" {
		startDate = time.Now()
	} else {
		startDate, err = time.Parse("2006-01-02", data["start_date"])
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"status": "error",
				"message": "Invalid start_date format. Use YYYY-MM-DD"})
		}
	}

	habit, err := service.CreateHabit(userId, data["name"], data["description"], startDate)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Habit created successfully",
		"data":   habit,
	})
}

func GetHabits(c *fiber.Ctx) error {
	userId := c.Locals("userId").(uint)
	habits, err := service.GetHabits(userId)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": err.Error()})
	}
	return c.JSON(fiber.Map{
		"status": "success",
		"data":   habits,
	})
}

func GetHabitById(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status": "error",
			"message": "Invalid habit ID"})
	}

	userId := c.Locals("userId").(uint)
	habit, err := service.GetHabitById(uint(id), userId)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": err.Error()})
	}
	return c.JSON(fiber.Map{
		"status": "success",
		"data":   habit,
	})
}

func UpdateHabit(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var data map[string]string
	c.BodyParser(&data)
	userId := c.Locals("userId").(uint)

	err := service.UpdateHabitNameDesc(uint(id), data["name"], data["description"], userId)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status":  "success",	
		"message": "Habit updated successfully",
	})
}

func DeleteHabit(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"status": "error",
			"message": "Invalid habit ID"})
	}

    userId := c.Locals("userId").(uint)
	
	err = service.DeleteHabit(uint(id),userId)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Habit deleted successfully",
	})
}
