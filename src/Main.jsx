import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner"

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* wrap the App component with the QueryClientProvider which provides the query client to all child components */}
    <QueryClientProvider client={queryClient}>
      <Toaster closeButton richColors position="top-right" />  
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
