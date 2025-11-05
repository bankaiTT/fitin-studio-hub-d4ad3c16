// Environment variable validation and defaults
const getEnvVar = (key: string, fallback: string): string => {
  if (typeof window !== 'undefined') {
    // Runtime access
    return (window as any).__ENV__?.[key] || fallback;
  }
  // Build time access
  return fallback;
};

export const ENV = {
  SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL', 'https://tlfrhwqtqunrpztcszwi.supabase.co'),
  SUPABASE_PUBLISHABLE_KEY: getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZnJod3F0cXVucnB6dGNzendpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NzMxNDEsImV4cCI6MjA3NzA0OTE0MX0.JI7x_WbsXe1o18gL_3Lsiqj8GfgiDeiovv81ON0YTLM'),
  SUPABASE_PROJECT_ID: getEnvVar('VITE_SUPABASE_PROJECT_ID', 'tlfrhwqtqunrpztcszwi'),
};
