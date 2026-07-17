/*
  Warnings:

  - You are about to drop the `Campanha` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioCampanha` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campanha" DROP CONSTRAINT "Campanha_criado_por_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioCampanha" DROP CONSTRAINT "UsuarioCampanha_campanha_id_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioCampanha" DROP CONSTRAINT "UsuarioCampanha_usuario_id_fkey";

-- DropTable
DROP TABLE "Campanha";

-- DropTable
DROP TABLE "UsuarioCampanha";

-- CreateTable
CREATE TABLE "campanha" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "criado_por" INTEGER NOT NULL,
    "status" "StatusCampanha" NOT NULL,

    CONSTRAINT "campanha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_campanha" (
    "usuario_id" INTEGER NOT NULL,
    "campanha_id" INTEGER NOT NULL,
    "papel" "TipoUsuario" NOT NULL,

    CONSTRAINT "usuario_campanha_pkey" PRIMARY KEY ("usuario_id","campanha_id")
);

-- AddForeignKey
ALTER TABLE "campanha" ADD CONSTRAINT "campanha_criado_por_fkey" FOREIGN KEY ("criado_por") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_campanha" ADD CONSTRAINT "usuario_campanha_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_campanha" ADD CONSTRAINT "usuario_campanha_campanha_id_fkey" FOREIGN KEY ("campanha_id") REFERENCES "campanha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
