import { unmountComponentAtNode } from "react-dom";
import renderer from "react-test-renderer";
import BuyModalBody from "../components/modal/buyModalBody";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
});

describe("Buy modal", () => {
  test("Snapshot test should be the same with previous version", () => {
    const mockConfirmHandler = jest.fn();
    const mockCloseHandler = jest.fn();
    const component = renderer.create(
      <BuyModalBody
        userName="test"
        cartGames={[]}
        amount={0}
        closeHandler={mockCloseHandler}
        confirmHandler={mockConfirmHandler}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
