package models

import (
	"time"
)

type Follower struct {
	ID             uint      `gorm:"primaryKey"`
	FollowerID     uint      `gorm:"not null"`
	FollowingID    uint      `gorm:"not null"`
	FollowerUsers  *User     `gorm:"foreignKey:FollowerID"`
	FollowingUsers *User     `gorm:"foreignKey:FollowingID"`
	CreatedAt      time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt      time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
