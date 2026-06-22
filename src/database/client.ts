// Server/web fallback. React Native resolves client.native.ts instead.
export async function getDatabase() { return null; }
export async function migrateDatabase() { return; }
