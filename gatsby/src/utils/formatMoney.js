const formatter = Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "MYR",
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
