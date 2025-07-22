package service

import (
	"errors"
	"habit-tracker-be/database"
	"habit-tracker-be/models"
	"time"
)

func CreateHabit(userId uint, name, description string, startDate time.Time) (*models.Habit, error) {
	habit := &models.Habit{
		UserID:        userId,
		Name:          name,
		Description:   description,
		StartDate:     startDate,
		CurrentStreak: 0,
		LongestStreak: 0,
	}
	err := database.DB.Create(habit).Error
	return habit, err
}

func GetHabits(userId uint) ([]models.Habit, error) {
	var habits []models.Habit
	err := database.DB.Where("user_id = ?", userId).Find(&habits).Error
	return habits, err
}

func GetHabitById(id uint, userId uint) (*models.Habit, error) {
	var habit models.Habit
	err := database.DB.Where("id = ? AND user_id = ?", id, userId).First(&habit).Error
	if err != nil {
		return nil, errors.New("Habit not found or does not belong to user")
	}
	return &habit, nil
}

func UpdateHabitNameDesc(id uint, name, description string, userId uint) error {
	result := database.DB.Model(&models.Habit{}).Where("id = ? AND user_id = ?", id, userId).Updates(
		map[string]interface{}{"name": name, "description": description})
	if result.RowsAffected == 0 {
		return errors.New("Habit not found or does not belong to user")
	}
	return result.Error
}

func DeleteHabit(id uint, userId uint) error {
	result := database.DB.Where("id = ? AND user_id = ?", id,userId).Delete(&models.Habit{})

	if result.RowsAffected == 0 {
		return errors.New("Habit not found or does not belong to user")
	}

	return result.Error
}
