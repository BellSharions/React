import { Component } from "react";

class ErrorCase extends Component {
  constructor(props: string) {
    super(props);
    throw new Error("Oops! there is an Error");
  }

  render() {
    return (
      <>
        <p>Error</p>
      </>
    );
  }
}
export default ErrorCase;
