import { unmountComponentAtNode } from "react-dom";
import { act, create } from "react-test-renderer";
import Button from "../elements/button";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
});

describe("Button", () => {
  test("onClick prop should be called", () => {
    const mockOnClickFunction = jest.fn();
    const component = create(<Button action={mockOnClickFunction} text={{ label: "text", icon: "" }} />);
    const instance = component.root;

    const element = instance.findByType("button");

    expect(element.props.className.includes("btn")).toBeTruthy();

    act(() => {
      element.props.onClick();
    });
    expect(mockOnClickFunction.mock.calls.length).toBe(1);
  });
});
