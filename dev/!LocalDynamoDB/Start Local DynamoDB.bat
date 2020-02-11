@echo off

docker-compose up -d

echo DynamoDB Shell: http://localhost:8000/shell
echo DynamoDB Admin: http://localhost:8001

docker-compose ps

pause
