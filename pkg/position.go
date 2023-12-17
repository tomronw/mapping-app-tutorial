package pkg

import (
	"encoding/json"
	"io"
	"net/http"
)

// IssResponse is the response struct from the api
type IssResponse struct {
	Timestamp   int         `json:"timestamp"`
	Message     string      `json:"message"`
	IssPosition IssPosition `json:"iss_position"`
}
type IssPosition struct {
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
}

// GetISS will return the lat and lon of the ISS
func GetISS() (latLon []string, err error) {
	// iss api endpoint
	url := "http://api.open-notify.org/iss-now.json"
	// create req obj
	req, _ := http.NewRequest("GET", url, nil)
	// make request
	res, err := http.DefaultClient.Do(req)
	// if response code isnt 200, return err
	if res.StatusCode != 200 {
		return nil, err
	} else {
		// defer after confirmed 200 response
		defer res.Body.Close()
		// read in response
		body, _ := io.ReadAll(res.Body)
		// create response struct obj
		var issResponse IssResponse
		// load json in
		err := json.Unmarshal(body, &issResponse)
		// error loading body into struct
		if err != nil {
			return nil, err
		}
		// return valid lat lon
		return []string{issResponse.IssPosition.Latitude, issResponse.IssPosition.Longitude}, nil
	}
}
