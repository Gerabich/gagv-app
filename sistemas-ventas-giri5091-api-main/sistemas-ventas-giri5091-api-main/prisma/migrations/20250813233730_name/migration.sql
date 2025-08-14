/*
  Warnings:

  - A unique constraint covering the columns `[numero_control]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_numero_control_key` ON `Usuario`(`numero_control`);
