package config

import (
    "gorm.io/gorm"
    "gorm.io/driver/sqlite" // or other database driver
)

// Global DB variable
var DB *gorm.DB

// ConnectDB initializes and returns a DB connection
func ConnectDB() (*gorm.DB, error) {
    var err error
    DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{}) // Use your database here
    if err != nil {
        return nil, err
    }
    return DB, nil
}

// GetDB returns the database connection
func GetDB() *gorm.DB {
    return DB
}
