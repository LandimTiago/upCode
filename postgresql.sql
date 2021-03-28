CREATE TABLE "account" (
  "accountnumber" int NOT NULL,
  "name" text NOT NULL,
  "cpf" text NOT NULL,
  "birth" text NOT NULL
);

CREATE TABLE "wallet" (
  "id_account" text NOT NULL,
  "saldo" numeric DEFAULT '0'
);

CREATE TABLE "historic" (
  "id" serial PRIMARY KEY,
  "id_wallet" text NOT NULL,
  "operation" text NOT NULL,
  "value" text NOT NULL,
  "created_at" text NOT NULL
);