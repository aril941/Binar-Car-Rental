<h1 align="center">FSW Challenge 5 Car Management Dashboard API</h1>
  
Car Management Dashboard API is an api used to manage car rental data. this is challenge 5 in full stack web javascript Synergy Academy Batch 6

> Base url of this service is: http://localhost:8081

## Entity Relationship Diagram

https://dbdiagram.io/d/Car-Management-Dashboard-6547df397d8bbd6465866f33


## API Documentation

- **Cars**

  |          Endpoint              | Method |              Description               |
  | :----------------------------: | :----: | :------------------------------------: |
  |        /api/cars               |  GET   |            HTTP GET REQUEST            |
  |        /api/cars/{id}          |  GET   |            HTTP GET REQUEST by Id      |
  |        /api/cars               |  POST  | HTTP POST REQUEST to add car data      |
  |        /api/cars/{id}          |  PUT   | HTTP PUT REQUEST to edit car data      |
  |        /api/cars/{id}          | DELETE | HTTP DELETE to delete car data         |

#### Getting All Cars Data
- **Request url**
  <pre>GET /api/cars</pre>

- **Response body**
  <pre>
    {
      "data": [
          {
              "id": 1,
              "name": "Pajero",
              "price": 320000,
              "photo": "http://res.cloudinary.com/dhwwzz0u2/image/upload/v1699611041/cars/gzy4fi7hgvls5v3lp9m0.jpg",
              "start_rent": "2023-11-13T00:00:00.000Z",
              "finish_rent": "2023-11-16T00:00:00.000Z",
              "created_at": "2023-11-10T10:08:42.052Z",
              "updated_at": "2023-11-10T10:10:41.785Z"
          },
          {
              "id": 2,
              "name": "Avanza",
              "price": 250000,
              "photo": "http://res.cloudinary.com/dhwwzz0u2/image/upload/v1699612235/cars/fr0g1dprstbuxbmqkoj9.jpg",
              "start_rent": "2023-11-10T00:00:00.000Z",
              "finish_rent": "2023-11-12T00:00:00.000Z",
              "created_at": "2023-11-10T10:30:33.654Z",
              "updated_at": "2023-11-10T10:30:33.654Z"
          }
        ]
    }
  </pre>


#### Getting Car Data by Id
- **Request url**
  <pre>GET /api/cars/{id}</pre>

- **Response body**
  <pre>
    {
      "status": true,
      "message": "Get data success!",
      "data": {
          "id": 1,
          "name": "Pajero",
          "price": 320000,
          "photo": "http://res.cloudinary.com/dhwwzz0u2/image/upload/v1699611041/cars/gzy4fi7hgvls5v3lp9m0.jpg",
          "start_rent": "2023-11-13T00:00:00.000Z",
          "finish_rent": "2023-11-16T00:00:00.000Z",
          "created_at": "2023-11-10T10:08:42.052Z",
          "updated_at": "2023-11-10T10:10:41.785Z"
        }
    }
  </pre>

#### Adding Car Data
- **Request url**
  <pre>POST /api/cars</pre>

- **Request body**
  <pre>
    {
      name: "Avanza",
      price: 250000,
      photo: "{select file image}",
      start_rent: "2023-11-10",
      finish_rent: "2023-11-12"      
    }  
  </pre>
  
- **Response body**
  <pre>
    {
      "status": true,
      "message": "Create success!",
      "data": {
          "name": "Avanza",
          "price": "250000",
          "start_rent": "2023-11-10T00:00:00.000Z",
          "finish_rent": "2023-11-12T00:00:00.000Z",
          "photo": "http://res.cloudinary.com/dhwwzz0u2/image/upload/v1699612267/cars/cgx62qntmvrews7tbh2s.jpg",
          "created_at": "2023-11-10T10:31:05.816Z",
          "updated_at": "2023-11-10T10:31:05.816Z"
        }
    }
  </pre>

#### Update Car Data
- **Request url**
  <pre>PUT /api/cars/{id}</pre>

- **Request body**
  <pre>
    {
      name: "Brio",
      price: 200000,
      photo: "{select file image}",
      start_rent: "2023-11-13",
      finish_rent: "2023-11-15"      
    }  
  </pre>
  
- **Response body**
  <pre>
    {
      "status": true,
      "message": "Update success!",
      "updateData": {
          "name": "Brio",
          "price": "200000",
          "start_rent": "2023-11-14T00:00:00.000Z",
          "finish_rent": "2023-11-18T00:00:00.000Z",
          "photo": "http://res.cloudinary.com/dhwwzz0u2/image/upload/v1699612267/cars/cgx62qntmvrews7tbh2s.jpg",
          "updated_at": "2023-11-10T10:38:15.816Z"
        }
    }
  </pre>

#### Delete Car Data
- **Request url**
  <pre>DELETE /api/cars/{id}</pre>
  
- **Response body**
  <pre>
    {
      "status": true,
      "message": "Delete success!"
    }
  </pre>
