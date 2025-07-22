package models

import "time"

type HabitCheckIn struct {
	ID          uint `gorm:"primaryKey"`
	HabitID     uint `json:"habit_id"`
	CheckInDate time.Time
}