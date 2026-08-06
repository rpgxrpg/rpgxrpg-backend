-- CreateEnum
CREATE TYPE "StatusConvite" AS ENUM ('aceito', 'recusado', 'pendente');

-- CreateTable
CREATE TABLE "convite" (
    "id" SERIAL NOT NULL,
    "status" "StatusConvite" NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "campanha_id" INTEGER NOT NULL,

    CONSTRAINT "convite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "convite" ADD CONSTRAINT "convite_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "convite" ADD CONSTRAINT "convite_campanha_id_fkey" FOREIGN KEY ("campanha_id") REFERENCES "campanha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
