import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '40px', fontFamily: 'monospace', color: '#6f0e13', background: '#fff', minHeight: '100vh' }}>
          <h2 style={{ marginBottom: 12 }}>Runtime error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#b00020' }}>
            {String(this.state.error && this.state.error.stack || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
