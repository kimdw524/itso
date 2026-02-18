export const pickRandomFromSet = <T>(set: Set<T>, count: number): T[] => {
  if (count <= 0 || set.size === 0) {
    return [];
  }

  const items = Array.from(set);

  for (let i = items.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const current = items[i]!;
    const next = items[randomIndex]!;

    items[i] = next;
    items[randomIndex] = current;
  }

  return items.slice(0, Math.min(count, items.length));
};
