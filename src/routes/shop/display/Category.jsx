import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFavorite } from "../../../contexts/FavoriteContext";
import useShop from "../../../hooks/useShop";
import useWindowSize from "../../../hooks/useWindowSize";
import SideFilters from "../../../components/shop/display/SideFilters";
import Filters from "../../../components/shop/display/Filters";
import Sort from "../../../components/shop/display/Sort";
import ShopItemPreview from "../../../components/shop/display/ShopItemPreview";

const ShopList = styled.ul`
  display: grid;
  grid-gap: 3vw;

  @media all and (min-width: 576px) {
    grid-template-columns: repeat(2, auto);
  }

  @media all and (min-width: 1350px) {
    grid-template-columns: repeat(3, auto);
  }
`;

const Content = styled.div`
  justify-self: stretch;
`;

const Shop = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  padding: 5rem 0;
  justify-items: center;

  @media all and (min-width: 768px) {
    grid-template-columns: auto 1fr;
  }

  @media all and (min-width: 992px) {
    width: 80%;
  }
`;

const Buttons = styled.div`
  display: grid;
  justify-items: stretch;
  grid-gap: 2rem;
  margin-bottom: 1rem;

  @media all and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media all and (min-width: 830px) {
    display: flex;
    justify-content: flex-end;
  }
`;

function Category({ match }) {
  const [items, setItems] = useState([]); // All items that belong in the category
  const [unsortedItems, setUnsortedItems] = useState([]); // Items when "sorted" by "featured".
  const [sort, setSort] = useState("featured");
  const [filters, setFilters] = useState({
    colors: [],
    materials: [],
    price: Infinity,
    dimensions: {
      width: Infinity,
      height: Infinity,
      depth: Infinity,
    },
    seats: [],
  });
  const [displayedItems, setDisplayedItems] = useState([]); // Items displayed after filters are applied
  const { getCategoryItems } = useShop();
  const { favorites } = useFavorite();
  const { windowSize } = useWindowSize();

  // Loads all category items and sets up filters
  useEffect(() => {
    (async () => {
      const itemsList = await getCategoryItems(
        decodeURIComponent(match.params.category)
      );
      setItems(itemsList);
      setUnsortedItems(itemsList);
    })();
  }, [match]);

  // Modify filters
  const handleFilters = (field, value) => {
    setFilters((filters) => {
      return { ...filters, [field]: value };
    });
  };

  // Sorting items
  const handleSort = (sort) => {
    setSort(sort);
  };

  // Update displayed items depending on which filters are applied.
  useEffect(() => {
    let displayedItems = [...items];

    // Colors filter
    if (filters.colors.length > 0) {
      displayedItems = displayedItems.filter((item) =>
        item.queries.colors.some((color) => filters.colors.includes(color))
      );
    }

    // Materials filter
    if (filters.materials.length > 0) {
      displayedItems = displayedItems.filter((item) =>
        item.queries.materials.some((material) =>
          filters.materials.includes(material)
        )
      );
    }

    // Price filter
    displayedItems = displayedItems.filter(
      (item) => item.queries.price.min <= filters.price
    );

    // Dimensions filter
    displayedItems = displayedItems.filter(
      (item) =>
        item.queries.dimensions.width.min <= filters.dimensions.width &&
        item.queries.dimensions.height.min <= filters.dimensions.height &&
        item.queries.dimensions.depth.min <= filters.dimensions.depth
    );

    // Seats filter
    if (filters.seats.length > 0) {
      displayedItems = displayedItems.filter(
        (item) =>
          item.queries.seats &&
          item.queries.seats.some((number) => filters.seats.includes(number))
      );
    }
    setDisplayedItems(displayedItems);
    setUnsortedItems(displayedItems);
  }, [items, filters]);

  // Update displayed items depending on the sorting filter the user chooses.
  useEffect(() => {
    switch (sort) {
      case "featured":
        setItems(unsortedItems);
        break;
      case "new":
        setDisplayedItems([...displayedItems].sort((a, b) => a.date - b.date));
        break;
      case "alphabetical_increasing":
        setDisplayedItems(
          [...displayedItems].sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "alphabetical_decreasing":
        setDisplayedItems(
          [...displayedItems].sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      case "price_increasing":
        setDisplayedItems(
          [...displayedItems].sort((a, b) => a.price - b.price)
        );
        break;
      case "price_decreasing":
        setDisplayedItems(
          [...displayedItems].sort((a, b) => b.price - a.price)
        );
        break;
      default:
    }
  }, [sort]);

  return (
    <Shop>
      {windowSize.width > 830 && (
        <SideFilters items={items} handleFilters={handleFilters} />
      )}
      <Content>
        <Buttons>
          <Sort handleSort={handleSort} />
          {windowSize.width <= 830 && (
            <Filters items={items} handleFilters={handleFilters} />
          )}
        </Buttons>
        <ShopList>
          {displayedItems.map((item) => {
            return (
              <li key={item.id}>
                <ShopItemPreview
                  name={item.name}
                  images={item.images}
                  price={item.price}
                  id={item.id}
                  isFavorite={favorites.includes(item.id)}
                  isNew={item.new}
                />
              </li>
            );
          })}
        </ShopList>
      </Content>
    </Shop>
  );
}

export default Category;
