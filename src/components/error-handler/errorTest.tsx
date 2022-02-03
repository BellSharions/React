import { Component, memo, ReactNode } from "react";

class ErrorCase extends Component {
  constructor(props: string) {
    super(props);
    throw new Error("Oops! there is an Error");
  }

  render(): ReactNode {
    return (
      <>
        <p>Error</p>
      </>
    );
  }
}
export default memo(ErrorCase);
