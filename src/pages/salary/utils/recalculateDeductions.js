const recalculateDeductions = (payments) => {
  if (!payments) return {};

  const baseSalary = payments?.baseSalary || 0;
  const overtimePay = payments?.overtimePay || 0;

  return {
    pension: Math.floor((baseSalary + overtimePay) * 0.045),
    healthInsurance: Math.floor((baseSalary + overtimePay) * 0.0345),
    employmentInsurance: Math.floor((baseSalary + overtimePay) * 0.008),
    incomeTax: Math.floor((baseSalary + overtimePay) * 0.07),
    localIncomeTax: Math.floor((baseSalary + overtimePay) * 0.01),
  };
};

export default recalculateDeductions;
