import Home from "@/app/page";
import { render, screen, act } from "@testing-library/react";

it('should render home', async () => {
  // arrange
  render(<Home />);

  // assert
  screen.debug();
});