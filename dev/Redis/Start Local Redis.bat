@echo off

docker-compose up -d

echo Redis Endpoint: http://localhost:6379

docker-compose ps

pause
