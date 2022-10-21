-- CreateTable
CREATE TABLE "applications" (
    "app_id" SERIAL NOT NULL,
    "app_name" TEXT NOT NULL,
    "app_token" TEXT NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("app_id")
);
