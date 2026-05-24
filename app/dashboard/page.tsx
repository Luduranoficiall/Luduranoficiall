import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default async function DashboardPage() {
  const [totalClients, activeClients, pendingClients, totalPartners, totalCommissions] = await Promise.all([
    prisma.energyClient.count(), prisma.energyClient.count({ where: { status: "ATIVO" } }), prisma.energyClient.count({ where: { status: { in: ["LEAD_NOVO", "DOCUMENTACAO_PENDENTE", "EM_ANALISE"] } } }), prisma.energyPartner.count({ where: { active: true } }), prisma.commission.aggregate({ _sum: { amount: true } })
  ]);
  const cards = [{title:"Clientes cadastrados",value:totalClients},{title:"Clientes ativos",value:activeClients},{title:"Clientes pendentes",value:pendingClients},{title:"Parceiros de energia",value:totalPartners},{title:"Comissões calculadas",value:`R$ ${Number(totalCommissions._sum.amount ?? 0).toFixed(2)}`}];
  return <main className="p-6 space-y-6"><h1 className="text-3xl font-bold">ENERGI.A.</h1><section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{cards.map(card=><Card key={card.title}><CardHeader><CardTitle className="text-sm">{card.title}</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{card.value}</p></CardContent></Card>)}</section></main>;
}
