include .env


dev:
	npm install
	nodemon index.js

start:
	nodemon

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

build:
	docker-compose build

db-up:
	docker-compose up database -d

opne-db-terminal:
	docker exec -it artisian_bakery_db psql -U postgres -d artisian_bakery