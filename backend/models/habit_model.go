package models

import "time"

type Habit struct {
	ID            uint      `gorm:"primaryKey"`
	UserID        uint      `json:"user_id"`             
	Name          string    `json:"name"`                
	Description   string    `json:"description"`
	StartDate     time.Time `json:"start_date"`
	CurrentStreak int       `json:"current_streak"`
	LongestStreak int       `json:"longest_streak"`

	CreatedAt time.Time
	UpdatedAt time.Time
}