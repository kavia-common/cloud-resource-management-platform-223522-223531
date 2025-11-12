import React from 'react';

/**
 * Error boundary to catch and render fallback UI for runtime errors.
 * PUBLIC_INTERFACE
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // eslint-disable-next-line react/no-deprecated
  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught error:', error);
    this.setState({ hasError: true, error });
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      return (
        <div role="alert" style={{ padding: 16, color: '#991b1b', background: '#fee2e2', borderRadius: 8 }}>
          <strong>Something went wrong.</strong>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error?.message || error)}</pre>
        </div>
      );
    }
    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}
