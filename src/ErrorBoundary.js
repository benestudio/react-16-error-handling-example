import React, { Component } from 'react';
import SomeErrorReportingTool from './SomeErrorReportingTool';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      info: '',
      error: '',
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, info, error });
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log(`Error: ${error}`);
      console.log(`ErrorInfo: ${JSON.stringify(info)}`);
    }
    else {
      SomeErrorReportingTool.report(error, info);
    }
  }

  render() {
    return this.state.hasError ? <p>Something bad happened. :( </p> : this.props.children;
  }
}

export default ErrorBoundary;
