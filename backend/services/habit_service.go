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
    if err != nil {
        return nil, err
    }
	
	err = database.DB.Preload("User").First(habit, habit.ID).Error
	return habit, err
}

func GetHabits(userId uint) ([]models.Habit, error) {
	var habits []models.Habit
	err := database.DB.Preload("User").Where("user_id = ?", userId).Find(&habits).Error
	return habits, err
}

func GetHabitById(id uint, userId uint) (*models.Habit, error) {
	var habit models.Habit
	err := database.DB.Preload("User").Where("id = ? AND user_id = ?", id, userId).First(&habit).Error
	if err != nil {
		return nil, errors.New("Habit not found or does not belong to user")
	}
	return &habit, nil
}

func UpdateHabit(id uint, name, description string, userId uint) error {
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

func CheckInHabit(habitId uint) (*models.Habit, error) {
	var habit models.Habit
	err := database.DB.First(&habit, habitId).Error
	if err != nil {
		return nil, errors.New("habit not found")
	}

	checkin := models.HabitCheckIn{
		HabitID:     habitId,
		CheckInDate: time.Now(),
	}
	database.DB.Create(&checkin)

	habit.CurrentStreak += 1
	if habit.CurrentStreak > habit.LongestStreak {
		habit.LongestStreak = habit.CurrentStreak
	}
	database.DB.Save(&habit)

	return &habit, nil
}