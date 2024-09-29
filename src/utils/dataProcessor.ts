

export function processData(data: any): string {
  try {
    return data;
  } catch (error) {
    console.error('Error processing data:', error);
    return JSON.stringify({ error: 'Failed to process data' });
  }
}