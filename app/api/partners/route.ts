import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
const schema = z.object({ name:z.string().min(2), type:z.enum(["YNOVA","COMERCIALIZADORA","USINA","COOPERATIVA","MARKETPLACE","WHITE_LABEL","OUTRO"]), states:z.array(z.string()).default([]), averageDiscountPercent:z.number().optional(), firstBillPayoutPercent:z.number().optional(), paysRecurring:z.boolean().default(false), recurringPercent:z.number().optional(), recurringDurationMonths:z.number().optional() });
export async function GET(){ const partners = await prisma.energyPartner.findMany({ where:{ deletedAt:null }}); return NextResponse.json({ success:true, partners }); }
export async function POST(request:Request){ try { const data = schema.parse(await request.json()); const partner = await prisma.energyPartner.create({ data }); await prisma.auditLog.create({ data: { entity:"EnergyPartner", entityId:partner.id, action:"PARTNER_CREATED", after: partner } }); return NextResponse.json({ success:true, partner }); } catch { return NextResponse.json({ success:false }, { status:400 }); } }
