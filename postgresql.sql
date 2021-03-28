CREATE TABLE "account" (
  "accountnumber" int NOT NULL,
  "name" text NOT NULL,
  "cpf" text NOT NULL,
  "birth" text NOT NULL
);

CREATE TABLE "wallet" (
  "id_account" int NOT NULL,
  "saldo" numeric DEFAULT '0'
);

CREATE TABLE "historic" (
  "id" serial PRIMARY KEY,
  "id_wallet" int NOT NULL,
  "operation" int NOT NULL,
  "create_at" int NOT NULL
);