package models

import "time"

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"unique" json:"name"`
	Password string `json:"-"`
	Email    string `gorm:"unique" json:"email"`

	Habits []Habit `json:"habits,omitempty"`

	CreatedAt time.Time
	UpdatedAt time.Time
}