-- AlterTable
ALTER TABLE "personagem" ADD COLUMN     "personagem_pai_id" INTEGER;

-- AddForeignKey
ALTER TABLE "personagem" ADD CONSTRAINT "personagem_personagem_pai_id_fkey" FOREIGN KEY ("personagem_pai_id") REFERENCES "personagem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
