# NestJS Blog API with MongoDB, Elasticsearch, Redis and Docker

This is a simple blog API built with NestJS, MongoDB, Elasticsearch, Redis, and Docker. The API allows users to create, read, update, and delete articles, like/dislike articles, comment on articles, search articles, and more.

## Requirements

- Node.js (v14 or higher)
- Docker
- Docker Compose

## Getting Started

1. Clone this repository:
git clone https://github.com/<username>/nest-blog-api.git

2. Navigate to the project directory:
cd nest-blog-api

3. Install dependencies:
npm install

4. Copy `.env.example` to `.env` and update environment variables:
cp .env.example .env


5. Start the Docker containers:
docker-compose up

6. Open a new terminal window and run the database migration:
npm run migration:run

7. Open another terminal window and start the application:
npm run start:dev


The API is now running on `http://localhost:3000`.

## API Endpoints

### GET /articles

Get all articles.

### POST /articles

Create a new article.

### GET /articles/:id

Get a single article by ID.

### PUT /articles/:id

Update an existing article by ID.

### DELETE /articles/:id

Delete an article by ID.

### POST /articles/:id/like

Like an article by ID.

### POST /articles/:id/dislike

Dislike an article by ID.

### POST /articles/:id/comments

Create a comment on an article by ID.

### GET /users/:username/articles/liked

Get all articles liked by a user by username.

### GET /articles/search

Search articles by tags or category.

## Testing

Run the tests:

npm run test


## Contributing

Contributions are welcome. Please make sure to update tests as appropriate.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


