import { routesMap } from "@/constants/constants";
import { Component, ErrorInfo, ReactElement, ReactNode } from "react";

interface ErrorBoundaryProps {
  children?: ReactElement[];
}
interface ErrorBoundaryState {
  errorState: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      errorState: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    alert("It seems you've caused an error! Click OK to redirect to home page.");
    console.error(errorInfo);
    console.error(error);
    window.location.replace(routesMap.HOME);
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { errorState: true };
  }

  render(): ReactNode {
    if (this.state.errorState) {
      return <h1>This UI shows if you have caused an error!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
