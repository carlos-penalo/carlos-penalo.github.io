import { Component } from "react";

/**
 * Surfaces runtime errors instead of a blank screen (common when a deploy or asset path fails).
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const msg = this.state.error?.message ?? String(this.state.error);
      return (
        <div className="error-boundary">
          <h1 className="error-boundary__title">Something went wrong</h1>
          <p className="error-boundary__lead">
            Algo falló al cargar la web. Abre las herramientas de desarrollador (F12) → pestaña{" "}
            <strong>Consola</strong> o <strong>Red / Network</strong> y comprueba si el archivo{" "}
            <code>assets/index-*.js</code> devuelve error (por ejemplo 404).
          </p>
          <pre className="error-boundary__pre">{msg}</pre>
          <p className="error-boundary__hint">
            En GitHub: <strong>Settings → Pages</strong> debe usar <strong>GitHub Actions</strong>, y la acción{" "}
            <strong>Deploy to GitHub Pages</strong> debe haber terminado correctamente.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
