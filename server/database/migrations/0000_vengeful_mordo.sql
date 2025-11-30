CREATE TABLE "model" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid () NOT NULL,
    "data" jsonb NOT NULL,
    "title" varchar,
    "emails" TYPE varchar[] NOT NULL,
    "client_key" varchar(12) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "model_client_key_unique" UNIQUE ("client_key")
);