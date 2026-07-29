import { Component } from "react";

// Catches any render error so the whole app can't white-screen. Shows a small
// recovery card instead. (In dev, Fast Refresh can trip this transiently.)
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high text-outline">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">
              error
            </span>
          </div>
          <h1 className="text-headline-md text-primary">Something went wrong</h1>
          <p className="max-w-sm text-body-md text-on-surface-variant">
            An unexpected error occurred. Reloading usually fixes it — your saved
            progress is kept.
          </p>
          <button
            onClick={() => {
              this.setState({ error: null });
              window.location.reload();
            }}
            className="bg-primary px-6 py-3 text-label-md text-on-primary"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
