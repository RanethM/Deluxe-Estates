// src/pages/properties/PropertyPage.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest"; // Vitest mocking
import PropertyPage from "./PropertyPage";

// Provide a default export mock for the JSON used by the component
vi.mock("../../data/properties.json", () => ({
  default: {
    properties: [
      {
        id: "1",
        type: "House",
        shortdescription: "Lovely House",
        description: "This is a lovely house with 3 bedrooms.",
        bedrooms: 3,
        tenure: "Freehold",
        postalCode: "BR1 2AB",
        price: 250000,
        pictures: ["img1.jpg", "img2.jpg", "fp1.jpg"],
        map: "https://maps.google.com/test-map",
        added: { day: 12, month: "October", year: 2022 }
      }
    ]
  }
}));

describe("PropertyPage - main behaviours", () => {
  const renderAt = (path) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/properties/:id" element={<PropertyPage />} />
        </Routes>
      </MemoryRouter>
    );

  test("renders header, details, description and map for a valid property", () => {
    renderAt("/properties/1");

    // Header shows short description
    expect(screen.getByRole("heading", { level: 1, name: "Lovely House" })).toBeInTheDocument();

    // Description
    expect(screen.getByText("This is a lovely house with 3 bedrooms.")).toBeInTheDocument();

    // Price and meta
    expect(screen.getByText(/£250,000/)).toBeInTheDocument();
    expect(screen.getByText(/3\s*beds/)).toBeInTheDocument();
    expect(screen.getByText(/BR1 2AB/)).toBeInTheDocument();

    // Map iframe (title and src)
    const iframe = screen.getByTitle("Property Map");
    expect(iframe).toHaveAttribute("src", "https://maps.google.com/test-map");
  });

  test("image slider renders images and navigates to next slide", () => {
    renderAt("/properties/1");

    // Main image alt equals property.type
    const mainImg = screen.getByAltText("House");
    expect(mainImg).toBeInTheDocument();
    expect(mainImg.src).toContain("img1.jpg");

    // Thumbnails
    const thumbnails = screen.getAllByAltText(/Thumbnail \d/);
    expect(thumbnails.length).toBeGreaterThanOrEqual(3);

    // Click right arrow and assert main image changes
    const rightArrow = screen.getByText(">");
    fireEvent.click(rightArrow);
    expect(screen.getByAltText("House").src).toContain("img2.jpg");
  });

  test("shows not-found message for invalid id", () => {
    renderAt("/properties/999");
    expect(screen.getByText("Property not found!")).toBeInTheDocument();
  });
});
