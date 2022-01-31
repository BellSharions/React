import { unmountComponentAtNode } from "react-dom";
import { act, create } from "react-test-renderer";
import RadioButtons from "../components/products/options/radioButtons";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container?.remove();
});

describe("Radio button", () => {
  test("onChange prop should be called", () => {
    const mockOnChangeFunction = jest.fn();
    const component = create(<RadioButtons setSelect={mockOnChangeFunction} array={["test"]} filter="testFilter" />);
    const instance = component.root;
    const event = {
      target: { value: "the-value" },
    } as React.ChangeEvent<HTMLInputElement>;
    const element = instance.findByType("input");

    expect(element.props.className.includes("selector__input_radioButton")).toBeTruthy();
    act(() => {
      element.props.onChange(event);
    });
    expect(mockOnChangeFunction.mock.calls.length).toBe(1);
  });
});
