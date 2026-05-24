export function simulateNetworkEarnings(input: { averageFirstBill: number; activePeoplePerLevel: number[]; levels: { level:number; percent:number }[] }) {
  const results = input.levels.map((rule) => { const people = input.activePeoplePerLevel[rule.level - 1] ?? 0; const volume = people * input.averageFirstBill; return { ...rule, people, volume, earning: volume * (rule.percent / 100) }; });
  return { results, totalPeople: results.reduce((a,b)=>a+b.people,0), totalVolume: results.reduce((a,b)=>a+b.volume,0), totalEarnings: results.reduce((a,b)=>a+b.earning,0) };
}
