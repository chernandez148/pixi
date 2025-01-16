package models

import (
	"time"
)

type Comment struct {
	ID        uint      `gorm:"primaryKey"`
	Author    string    `gorm:"not null"`
	Content   string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	PostID    uint      `gorm:"not null"`
	UserID    uint      `gorm:"not null"`
}
