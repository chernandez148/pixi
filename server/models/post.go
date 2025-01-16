package models

import (
	"time"
)

type Post struct {
	ID        uint      `gorm:"primaryKey"`
	Caption   string    `gorm:"default:''"`
	ImageURL  string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UserID    uint      `gorm:"not null"`
	User      *User     `gorm:"foreignKey:UserID"`
	Comments  []Comment `gorm:"foreignKey:PostID"`
	Likes     []Like    `gorm:"foreignKey:PostID"`
}
