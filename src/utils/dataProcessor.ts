export function processData(data: any): string {
  try {
    return data;
  } catch (error) {
    return JSON.stringify({ error: 'Failed to process data' });
  }
}