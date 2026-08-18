/*
  Warnings:

  - Added the required column `campanha_id` to the `personagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personagem" ADD COLUMN     "campanha_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "personagem" ADD CONSTRAINT "personagem_campanha_id_fkey" FOREIGN KEY ("campanha_id") REFERENCES "campanha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
