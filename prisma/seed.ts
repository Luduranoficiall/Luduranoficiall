import { PrismaClient, PartnerType, CommissionBase } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const ynova = await prisma.energyPartner.upsert({ where: { id: "ynova-default" }, update: {}, create: { id: "ynova-default", name: "Ynova", type: PartnerType.YNOVA, description: "Parceiro inicial da ENERGI.A.", states: ["SP","RJ","MG","PR","SC","RS","GO","BA","PE"], averageDiscountPercent: 15, firstBillPayoutPercent: 58, paysRecurring: false, approvalAverageDays: 7, migrationAverageDays: 45, active: true } });
  await prisma.compensationPlan.create({ data: { name: "Plano ENERGI.A. / Ynova - 14 níveis", energyPartnerId: ynova.id, active: true, levels: { create: Array.from({length:14},(_,i)=>({ level:i+1, percent:i===0?40:i===1?10:i===2?5:i===3?3:i===4?2:1, base: CommissionBase.PRIMEIRA_FATURA })) } } });
}
main().finally(()=>prisma.$disconnect());
