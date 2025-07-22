package service

import (
	"errors"
	"habit-tracker-be/database"
	model "habit-tracker-be/models"

	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(name, email, password string) (*model.User, error) {
	var existing model.User
	err := database.DB.Where("email = ?", email).First(&existing).Error
	if err == nil {
		return nil, errors.New("email already registered")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	newUser := &model.User{
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
	}

	if err := database.DB.Create(newUser).Error; err != nil {
		return nil, err
	}

	return newUser, nil
}
