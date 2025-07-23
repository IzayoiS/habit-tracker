package models

import "time"

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"unique"`
	Password string `json:"-"`
	Email    string `gorm:"unique"`

	Habits []Habit `json:"habits,omitempty"`

	CreatedAt time.Time
	UpdatedAt time.Time
}