import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "./ErrorBoundary.jsx";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML =
    "<p style=\"font-family:system-ui;padding:2rem;\">Missing #root in index.html.</p>";
} else {
  createRoot(rootEl).render(
    <ErrorBoundary>
      <StrictMode>
        <App />
      </StrictMode>
    </ErrorBoundary>
  );
}
