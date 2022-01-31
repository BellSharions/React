import { debounce } from "lodash";
import { unmountComponentAtNode } from "react-dom";
import renderer from "react-test-renderer";
import SearchBar from "../components/searchBar/searchBar";

let container: Element;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
});

describe("Search bar", () => {
  test("Snapshot test should be the same with previous version", () => {
    const mockOnChangeFunction = jest.fn();
    const debouncedOnChange = debounce(mockOnChangeFunction, 300);
    const component = renderer.create(<SearchBar list={[]} debouncedOnChange={debouncedOnChange} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
