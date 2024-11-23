// ErrorBoundary.tsx
import React, { Component, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // Optionally log the error to an error tracking service here
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try refreshing the page.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
