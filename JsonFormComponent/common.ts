export function convertToJson<T>(value: string | null) {
  try {
    return JSON.parse(value || '') as T;
  } catch {
    return {} as T;
  }
}
export const generateRandomID = () => { return Math.random().toString(36).substring(2, 15) }