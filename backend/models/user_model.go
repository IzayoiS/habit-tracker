package models

import "time"

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"unique"`
	Password string `json:"-"`
	Email    string `gorm:"unique"`

	CreatedAt time.Time
	UpdatedAt time.Time
}