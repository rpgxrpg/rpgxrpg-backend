-- CreateEnum
CREATE TYPE "FamiliaArma" AS ENUM ('laminas_curtas', 'laminas_longas', 'contundentes_curtas', 'contundentes_longas', 'lancas', 'machados', 'pistolas', 'escopetas', 'submetralhadoras', 'fuzis_assalto', 'fuzis_precisao', 'metralhadoras_pesadas', 'lanca_chamas', 'lanca_granadas', 'lanca_foguetes', 'outros_propulsao', 'outros_flexiveis', 'outros_exoticas');

-- CreateEnum
CREATE TYPE "AlcanceArma" AS ENUM ('corpo_corpo', 'curto', 'medio', 'longo');

-- CreateTable
CREATE TABLE "arma" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "familia" "FamiliaArma" NOT NULL,
    "campanha_id" INTEGER,
    "custo" INTEGER NOT NULL,
    "pa" INTEGER NOT NULL,
    "dano" TEXT NOT NULL,
    "precisao_min" "AlcanceArma",
    "precisao_max" "AlcanceArma",
    "maximo_min" "AlcanceArma",
    "maximo_max" "AlcanceArma",

    CONSTRAINT "arma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propriedade_arma" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "propriedade_arma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arma_propriedade" (
    "arma_id" INTEGER NOT NULL,
    "propriedade_arma_id" INTEGER NOT NULL,

    CONSTRAINT "arma_propriedade_pkey" PRIMARY KEY ("arma_id","propriedade_arma_id")
);

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_campanha_id_fkey" FOREIGN KEY ("campanha_id") REFERENCES "campanha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arma_propriedade" ADD CONSTRAINT "arma_propriedade_arma_id_fkey" FOREIGN KEY ("arma_id") REFERENCES "arma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arma_propriedade" ADD CONSTRAINT "arma_propriedade_propriedade_arma_id_fkey" FOREIGN KEY ("propriedade_arma_id") REFERENCES "propriedade_arma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
