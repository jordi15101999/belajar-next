import AboutPage from "@/pages/about";
import { render } from "@testing-library/react";

describe("About Page", () => {
  it("render About Page", () => {
    const page = render(<AboutPage />);
    expect(page).toMatchSnapshot();
  });
});
