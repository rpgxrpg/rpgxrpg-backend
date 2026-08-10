-- CreateEnum
CREATE TYPE "StatusCampanha" AS ENUM ('ativa', 'suspensa', 'encerrada');

-- CreateTable
CREATE TABLE "Campanha" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "criado_por" INTEGER NOT NULL,
    "status" "StatusCampanha" NOT NULL,

    CONSTRAINT "Campanha_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Campanha" ADD CONSTRAINT "Campanha_criado_por_fkey" FOREIGN KEY ("criado_por") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
