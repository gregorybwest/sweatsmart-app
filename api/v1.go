package handler

import (
  "fmt"
  "net/http"
  
	. "github.com/tbxark/g4vercel"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	server := New()
	server.Use(Recovery(func(err interface{}, c *Context) {
		if httpError, ok := err.(HttpError); ok {
			c.JSON(httpError.Status, H{
				"message": httpError.Error(),
			})
		} else {
			message := fmt.Sprintf("%s", err)
			c.JSON(500, H{
				"message": message,
			})
		}
	}))
	server.GET("/", func(context *Context) {
		context.JSON(200, H{
			"message": "OK",
		})
	})
	server.GET("/hello", func(context *Context) {
		name := context.Query("name")
		if name == "" {
			context.JSON(400, H{
				"message": "name not found",
			})
		} else {
			context.JSON(200, H{
				"data": fmt.Sprintf("Hello %s!", name),
			})
		}
	})
	server.GET("/user/:id", func(context *Context) {
		context.JSON(400, H{
			"data": H{
				"id": context.Param("id"),
			},
		})
	})
	server.GET("/long/long/long/path/*test", func(context *Context) {
		context.JSON(200, H{
			"data": H{
				"url": context.Path,
			},
		})
	})
	server.Handle(w, r)
}
 
// func Handler(w http.ResponseWriter, r *http.Request) {
//   log.Println("Received a request", r.URL.Path)
//   log.Println("Request method", r)
//   w.Header().Set("Content-Type", "application/json")
//   if(r.URL.Path == "/api/v1/user/") {
//     fmt.Fprintf(w, `{"message": "Hello from Go - user!"}`)
//   } else {
//     fmt.Fprintf(w, `{"message": "Hello from Go!"}`)
//   }
// }

func main() {
  http.HandleFunc("/api/v1/", Handler)
  http.ListenAndServe(":8080", nil)
}