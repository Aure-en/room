import React, { useState, useEffect } from 'react';
import ShopItemPreview from '../../components/shop/items/ShopItemPreview';
import { useFirestore } from '../../hooks/useFirestore';
import { useFavorite } from '../../contexts/FavoriteContext';
import styled from 'styled-components';
import Filter from '../../components/shop/display/Filters';

const ShopList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 80%;
  grid-gap: 3vw;
`;

const Shop = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 5rem 0;
  max-width: 80%;
`;

function Category({ match }) {
  const [items, setItems] = useState([]); // All items that belong in the category
  const [filters, setFilters] = useState({
    colors: [],
    materials: [],
    price: Infinity,
    dimensions: {
      width: Infinity,
      height: Infinity,
      depth: Infinity,
    }
  });
  const [displayedItems, setDisplayedItems] = useState([]); // Items displayed after filters are applied
  const { getCategoryItems } = useFirestore();
  const { favorites } = useFavorite();

  // Loads all category items and sets up filters
  useEffect(() => {
    (async () => {
      const itemsList = await getCategoryItems(
        decodeURIComponent(match.params.category)
      );
      setItems(itemsList);
    })();
  }, [match]);

  // Modify filters
  const handleFilters = (field, value) => {
    setFilters((filters) => {
      return { ...filters, [field]: value }});
  };

  // Update displayed items depending on which filters are applied.
  useEffect(() => {
    setDisplayedItems(() => {
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
      return displayedItems;
    });
  }, [items, filters]);

  return (
    <Shop>
      <Filter items={items} handleFilters={handleFilters} />
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
    </Shop>
  );
}

export default Category;
