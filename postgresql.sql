CREATE TABLE "account" (
  "id" serial PRIMARY KEY,
  "accountnumber" int NOT NULL,
  "name" text NOT NULL,
  "cpf" text NOT NULL,
  "birth" text NOT NULL
);

CREATE TABLE "wallet" (
  "id_account" int PRIMARY KEY NOT NULL,
  "value" numeric
);

CREATE TABLE "Log" (
  "id" int PRIMARY KEY,
  "accountId" int NOT NULL,
  "data" text,
  "op" int,
  "valor" text,
  "saldo" text
);
