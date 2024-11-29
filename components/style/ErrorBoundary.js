import React from "react";
import Layout from "components/style/Layout";
import { Box, Typography, Button } from "@mui/material";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.error({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Layout>
          <Box>
            <Typography variant="h2">Oops, there is an error!</Typography>
            <Button
              type="button"
              onClick={() => this.setState({ hasError: false })}>
              Try again?
            </Button>
          </Box>
        </Layout>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
