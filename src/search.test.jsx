// src/search.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Search from "./search";

// Main test suite for the Search component
describe("Search Component", () => {

  // Group of tests for rendering the UI
  describe("Rendering", () => {
    it("should render search form and property gallery", () => {
      // Render the Search component inside a router (MemoryRouter)
      render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      );

      // Check that the search form title is present
      expect(screen.getByText("Search Properties")).toBeInTheDocument();

      // Check that the property gallery title is present
      expect(screen.getByText("Our Properties")).toBeInTheDocument();
    });
  });

  // Group of tests for the filtering functionality
  describe("Filtering", () => {
    it("should filter properties by type 'House'", () => {
      render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      );

      // Select 'House' from the property type dropdown
      const typeSelect = screen.getAllByRole("combobox")[0];
      fireEvent.change(typeSelect, { target: { value: "House" } });

      // Click the Search button to apply the filter
      fireEvent.click(screen.getByText("Search"));

      // Check that all displayed properties have type 'House'
      const propertyTitles = screen.getAllByRole("heading", { level: 3 });
      propertyTitles.forEach(title => {
        expect(title.textContent).toBe("House");
      });
    });
  });

  // Group of tests for the favourites functionality
  describe("Favourites", () => {
    it("should add and remove a property from favourites", () => {
      render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      );

      // Click the first heart icon to add a property to favourites
      fireEvent.click(screen.getAllByText("Add to Favourites")[0]);

      // Expect the heart to show "Added!" after clicking
      expect(screen.getAllByText("Added!")[0]).toBeInTheDocument();

      // Click the Remove button to remove the property from favourites
      fireEvent.click(screen.getByText("Remove"));

      // The placeholder text should appear again when favourites is empty
      expect(screen.getByText("Drag properties here or click ❤️")).toBeInTheDocument();
    });
  });

});
