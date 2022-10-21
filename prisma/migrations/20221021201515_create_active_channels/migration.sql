-- CreateTable
CREATE TABLE "active_channels" (
    "id" SERIAL NOT NULL,
    "webpush" BOOLEAN DEFAULT false,
    "email" BOOLEAN DEFAULT false,
    "sms" BOOLEAN DEFAULT false,
    "application_id" INTEGER NOT NULL,

    CONSTRAINT "active_channels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "active_channels_application_id_key" ON "active_channels"("application_id");

-- AddForeignKey
ALTER TABLE "active_channels" ADD CONSTRAINT "active_channels_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("app_id") ON DELETE RESTRICT ON UPDATE CASCADE;
