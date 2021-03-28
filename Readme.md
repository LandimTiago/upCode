# API REST de um sistema bancário genérico

## Docker

### Create container

```sh
docker container run --name pgdb -p 5432:5432 -e POSTGRES_PASSWORD=112233 -d postgres:11
```

### Comandos

- para verificar quais containers estão instalados

  ```sh
  docker container ls -a
  ```

- para inicializar o container
  ``'sh
  docker container pgdb start

  ```

  ```

- para desligar o container

  ```sh
  docker container pgdb stop
  ```

- para remover o container
  ```sh
  docker container pgdb rm
  ```

## SQL

- [database.sql](./postgresql.sql)

## Dependencies

- [Express](https://expressjs.com)
- [Postgres](https://node-postgres.com)

## Dev dependencies

- [Nodemon](https://nodemon.io)

## TODO

- [x] RF001 - Incluir conta bancária
- [x] RF002 - Listar as contas bancárias
- [x] RF003 - Realizar depósito
- [x] RF004 - Realizar saque
- [x] RF005 - Consultar saldo
- [x] RF006 - Consultar extrato
