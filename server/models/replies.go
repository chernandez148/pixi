package models

import (
	"time"
)

type Replies struct {
	ID          uint      `gorm:"primaryKey"`
	PostID      uint      `gorm:"not null"`
	UserID      uint      `gorm:"not null"`
	ReplyUserID uint      `gorm:"not null"`
	CommentID   uint      `gorm:"not null"`
	Content     string    `gorm:"not null"`
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
