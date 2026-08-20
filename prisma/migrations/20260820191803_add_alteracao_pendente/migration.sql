-- CreateTable
CREATE TABLE "alteracao_pendente" (
    "id" SERIAL NOT NULL,
    "personagem_id" INTEGER NOT NULL,
    "forca" INTEGER,
    "destreza" INTEGER,
    "vigor" INTEGER,
    "carisma" INTEGER,
    "manipulacao" INTEGER,
    "autocontrole" INTEGER,
    "inteligencia" INTEGER,
    "raciocinio" INTEGER,
    "determinacao" INTEGER,
    "potencia_aura" INTEGER,
    "dominio_nen" INTEGER,
    "xp_livre_gasto" INTEGER NOT NULL DEFAULT 0,
    "xp_nen_gasto" INTEGER NOT NULL DEFAULT 0,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alteracao_pendente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alteracao_pendente" ADD CONSTRAINT "alteracao_pendente_personagem_id_fkey" FOREIGN KEY ("personagem_id") REFERENCES "personagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
