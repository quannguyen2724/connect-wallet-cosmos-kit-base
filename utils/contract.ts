export const formatAddress = (addr: string): string =>
  addr.substring(0, 12) + '...' + addr.substring(addr.length - 12, addr.length);
