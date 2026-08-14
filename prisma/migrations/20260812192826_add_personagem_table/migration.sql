-- CreateEnum
CREATE TYPE "StatusAprovacao" AS ENUM ('pendente', 'aprovada', 'rejeitada');

-- CreateEnum
CREATE TYPE "NivelHunter" AS ENUM ('iniciante', 'veterano', 'uma_estrela', 'duas_estrelas', 'tres_estrelas');

-- CreateEnum
CREATE TYPE "TipoAura" AS ENUM ('reforco', 'transmutacao', 'emissao', 'manipulacao', 'materializacao', 'especializacao');

-- CreateEnum
CREATE TYPE "TipoFicha" AS ENUM ('personagem', 'invocacao', 'npc');

-- CreateTable
CREATE TABLE "personagem" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuario_id" INTEGER,
    "tipo_ficha" "TipoFicha" NOT NULL,
    "status_aprovacao" "StatusAprovacao" NOT NULL,
    "nivel_hunter" "NivelHunter" NOT NULL,
    "afinidade_aura" "TipoAura" NOT NULL,
    "potencia_aura" INTEGER NOT NULL,
    "dominio_nen" INTEGER NOT NULL,
    "recuperacao_aura" INTEGER NOT NULL,
    "recuperacao_zetsu" INTEGER NOT NULL,
    "forca" INTEGER NOT NULL,
    "destreza" INTEGER NOT NULL,
    "vigor" INTEGER NOT NULL,
    "carisma" INTEGER NOT NULL,
    "manipulacao" INTEGER NOT NULL,
    "autocontrole" INTEGER NOT NULL,
    "inteligencia" INTEGER NOT NULL,
    "raciocinio" INTEGER NOT NULL,
    "determinacao" INTEGER NOT NULL,

    CONSTRAINT "personagem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "personagem" ADD CONSTRAINT "personagem_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
