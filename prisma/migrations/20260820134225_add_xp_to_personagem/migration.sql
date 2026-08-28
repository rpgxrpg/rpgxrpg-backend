-- AlterTable
ALTER TABLE "personagem" ADD COLUMN     "xp_livre_gasto" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "xp_livre_total" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "xp_nen_gasto" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "xp_nen_total" INTEGER NOT NULL DEFAULT 0;
