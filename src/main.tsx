import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
  // Surface a clear error in dev/preview to avoid blank screens
  // eslint-disable-next-line no-console
  console.error("Missing Supabase env vars", {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  });
}

createRoot(document.getElementById("root")!).render(<App />);
