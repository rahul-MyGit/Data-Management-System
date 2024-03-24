package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Citizen represents the structure of a citizen
type Citizen struct {
	ID        string `json:"id,omitempty" bson:"_id,omitempty"`
	FirstName string `json:"firstName,omitempty" bson:"firstName,omitempty"`
	LastName  string `json:"lastName,omitempty" bson:"lastName,omitempty"`
	DOB       string `json:"dob,omitempty" bson:"dob,omitempty"`
	Gender    string `json:"gender,omitempty" bson:"gender,omitempty"`
	Address   string `json:"address,omitempty" bson:"address,omitempty"`
	City      string `json:"city,omitempty" bson:"city,omitempty"`
	State     string `json:"state,omitempty" bson:"state,omitempty"`
	Pincode   string `json:"pincode,omitempty" bson:"pincode,omitempty"`
}

var collection *mongo.Collection

// func corsMiddleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		// Allow requests from any origin
// 		w.Header().Set("Access-Control-Allow-Origin", "*")

// 		// Allow certain headers
// 		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

// 		// Allow certain methods
// 		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

// 		// Continue handling the request
// 		next.ServeHTTP(w, r)
// 	})
// }

func main() {

	// Set up MongoDB client
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017/")

	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	collection = client.Database("citizensDB").Collection("citizens")
	corsOptions := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Allow all origins
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})
	router := mux.NewRouter()

	router.HandleFunc("/citizens", GetCitizens).Methods("GET")
	router.HandleFunc("/citizens", AddCitizen).Methods("POST")
	router.HandleFunc("/citizens/{id}", GetCitizen).Methods("GET")
	router.HandleFunc("/citizens/{id}", UpdateCitizen).Methods("PUT")
	router.HandleFunc("/citizens/{id}", DeleteCitizen).Methods("DELETE")

	// Start the server
	handler := corsOptions.Handler(router)
	log.Println("Server started on port 8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}

// GetCitizens returns a list of all citizens
func GetCitizens(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var citizens []Citizen

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var citizen Citizen
		err := cursor.Decode(&citizen)
		if err != nil {
			log.Fatal(err)
		}
		citizens = append(citizens, citizen)
	}

	json.NewEncoder(w).Encode(citizens)
}

// GetCitizen returns a single citizen by ID
func GetCitizen(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id := params["id"]

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	filter := bson.M{"_id": objID}

	var citizen Citizen
	err = collection.FindOne(context.Background(), filter).Decode(&citizen)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(citizen)
}

// AddCitizen adds a new citizen
func AddCitizen(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var citizen Citizen
	json.NewDecoder(r.Body).Decode(&citizen)

	result, err := collection.InsertOne(context.Background(), citizen)
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(result)
}

// UpdateCitizen updates an existing citizen
func UpdateCitizen(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Extract the id from the URL path using mux.Vars(r)
	params := mux.Vars(r)
	id := params["id"]
	log.Println(id)

	var updatedCitizen Citizen
	err := json.NewDecoder(r.Body).Decode(&updatedCitizen)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Construct the filter using the id
	objID, err := primitive.ObjectIDFromHex(id)
	log.Println(objID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	filter := bson.M{"_id": objID}

	// Perform the update operation
	result, err := collection.ReplaceOne(context.Background(), filter, updatedCitizen)
	log.Println(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

// DeleteCitizen deletes a citizen by ID
func DeleteCitizen(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Extract the id from the URL path using mux.Vars(r)
	params := mux.Vars(r)
	id := params["id"]

	// Convert the id string to ObjectId if it's stored as ObjectId in MongoDB
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Perform the delete operation
	result, err := collection.DeleteOne(context.Background(), bson.M{"_id": objID})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Check if a document was deleted
	if result.DeletedCount == 0 {
		http.Error(w, "No document found to delete", http.StatusNotFound)
		return
	}

	// Document deleted successfully
	response := map[string]interface{}{
		"message": fmt.Sprintf("Document with ID %s deleted successfully", id),
	}
	json.NewEncoder(w).Encode(response)
}
