import { CommissionBase } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
export async function calculateCommissions(input: { clientId: string; consultantId: string; compensationPlanId: string; baseAmount: number; base: CommissionBase }) {
  const plan = await prisma.compensationPlan.findUnique({ where: { id: input.compensationPlanId }, include: { levels: { where: { active: true, base: input.base }, orderBy: { level: "asc" } } } });
  if (!plan) throw new Error("Compensation plan not found");
  const rows = []; let current = await prisma.user.findUnique({ where: { id: input.consultantId } });
  for (const levelRule of plan.levels) { if (!current) break; const amount = input.baseAmount * Number(levelRule.percent) / 100; const snap = { planId: plan.id, level: levelRule.level, percent: Number(levelRule.percent), baseAmount: input.baseAmount }; rows.push({ clientId: input.clientId, userId: current.id, level: levelRule.level, base: input.base, baseAmount: input.baseAmount, percent: levelRule.percent, amount, ruleSnapshot: snap, calculationHash: crypto.createHash("sha256").update(JSON.stringify(snap)).digest("hex") }); current = current.sponsorId ? await prisma.user.findUnique({ where: { id: current.sponsorId } }) : null; }
  return prisma.$transaction(async tx => Promise.all(rows.map(async data => { const c = await tx.commission.create({ data }); await tx.auditLog.create({ data: { entity: "Commission", entityId: c.id, action: "COMMISSION_CALCULATED", after: data } }); return c; })));
}
