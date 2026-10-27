# REFERENCE

## 0. Installation Verification

```
git --version
node --version
npm --version
docker --version
docker compose version
elixir --version
mix --version
```

## 1. Starting the services
```
cd infra
docker compose up -d
docker compose ps
```

## 2. Initialize MongoDB replica

```
docker exec vp-mongodb mongosh --quiet --eval "try { rs.status().ok } catch (e) { rs.initiate({_id:'rs0',members:[{_id:0,host:'localhost:27017'}]}) }"
```
Then verifiy using:
```
docker exec vp-mongodb mongosh --quiet --eval "rs.status().myState"
```



