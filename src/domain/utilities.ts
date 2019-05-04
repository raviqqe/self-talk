export async function sleep(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export function getUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000); // in seconds
}
