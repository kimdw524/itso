export const getIP = (ip: string[]): string | undefined => {
  if (ip.length === 1) {
    return ip[0];
  }

  if (ip.length >= 2 && ip.at(-1) === process.env.SERVER_IP) {
    return ip.at(-2);
  }

  return undefined;
};
