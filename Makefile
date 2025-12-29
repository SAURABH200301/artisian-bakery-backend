include .env


dev:
	npm install
	nodemon index.js

start:
	node index.js

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
