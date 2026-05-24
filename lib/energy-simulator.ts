export function simulateEnergySavings(input: { averageBillValue: number; discountPercent: number }) {
  const monthlySavings = input.averageBillValue * (input.discountPercent / 100);
  return { ...input, monthlySavings, annualSavings: monthlySavings * 12, netBillAfterDiscount: input.averageBillValue - monthlySavings };
}
