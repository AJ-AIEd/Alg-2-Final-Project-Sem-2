export const sharedOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      ticks: { font: { size: 11 }, maxRotation: 30 },
      grid: { color: "rgba(0,0,0,0.05)" },
    },
    y: {
      min: 0,
      ticks: { callback: (value) => `${value}%`, font: { size: 11 } },
      grid: { color: "rgba(0,0,0,0.05)" },
    },
  },
};
