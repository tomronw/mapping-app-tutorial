package main

import (
	"changeme/pkg"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// UpdatePosition will fetch the ISS api and return the new lat and lon
func (a *App) UpdatePosition() []string {
	latLon, err := pkg.GetISS()
	if err != nil {
		return []string{"0.00", "0.00"}
	}
	return latLon
}
