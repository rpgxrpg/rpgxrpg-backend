-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('mestre', 'jogador');

-- CreateTable
CREATE TABLE "UsuarioCampanha" (
    "usuario_id" INTEGER NOT NULL,
    "campanha_id" INTEGER NOT NULL,
    "papel" "TipoUsuario" NOT NULL,

    CONSTRAINT "UsuarioCampanha_pkey" PRIMARY KEY ("usuario_id","campanha_id")
);

-- AddForeignKey
ALTER TABLE "UsuarioCampanha" ADD CONSTRAINT "UsuarioCampanha_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioCampanha" ADD CONSTRAINT "UsuarioCampanha_campanha_id_fkey" FOREIGN KEY ("campanha_id") REFERENCES "Campanha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
