docker build -t neuman-postgres .

docker run -d --name neuman-db -e POSTGRES_DB=neuman  -e POSTGRES_USER=neuman_user -e POSTGRES_PASSWORD=supersecret -p 5432:5432 neuman-postgres

docker exec -it neuman-db psql -U neuman_user -d neuman