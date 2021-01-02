import React, { useEffect, useState } from 'react';
import { useFirestore } from '../../contexts/FirestoreContext';
import styled from 'styled-components';
import { formatNavLink } from '../../utils/utils';

// Styled components

const colors = {
  primary: 'hsl(0, 0%, 0%)', // Black
  secondary: 'hsl(0, 0%, 27%)', // Grey
  secondaryBright: 'hsl(0, 0%, 40%)', // Brighter grey
  tertiary: 'hsl(0, 0%, 100%)' // White
};

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.secondary};
`;

const Nav = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
`;

const DropdownContainer = styled.div`
  background: ${colors.tertiary};
  width: 100%;
`;

const Dropdown = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  padding: 1.5rem;
  background: ${colors.tertiary};
  font-size: 0.825rem;
`;

const Column = styled.div`
  margin: 0 1rem;
`;

const Category = styled.a`
  cursor: pointer;
  flex: 1;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  color: ${colors.tertiary};
  padding: .75rem 0;
  
  &:hover {
    border-bottom: 2px solid ${colors.tertiary};
  }
`;

const Subcategory = styled.a`
  position: relative;
  display: inline-block;
  color: ${colors.primary};
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: .5rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const Item = styled.a`
  padding: .25rem 0;
  cursor: pointer;
  display: block;
  color: ${colors.secondary};
  border-bottom: 1px solid transparent;

  &:hover {
    color: ${colors.primary};
    text-decoration: underline;
  }
`;

// Displays shopping categories (types of furnitures...)
function ShopNav() {
  const { getShopCategories } = useFirestore();
  const [categories, setCategories] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [hovered, setHovered] = useState('');

  useEffect(() => {
    (async () => {
      const categories = await getShopCategories();
      setCategories(categories);
    })();
  }, []);

  return (
    <Container
      onMouseLeave={() => {
        setDropdown(false);
      }}
    >
      <Nav>
        {/* Sort the categories by order before displaying them */}
        {Object.keys(categories)
          .sort((a, b) => categories[a].order - categories[b].order)
          .map((category) => {
            return (
              <Category
                onMouseOver={() => {
                  setDropdown(true);
                  setHovered(category);
                }}
              >
                {formatNavLink(category)}
              </Category>
            );
          })}
      </Nav>

      {dropdown && Object.keys(categories[hovered].categories).length !== 0 && (
        <DropdownContainer>
          <Dropdown>
            {/* Sort the subcategories by order before displaying them */}
            {Object.keys(categories[hovered].categories)
              .sort(
                (a, b) =>
                  categories[hovered].categories[a].order -
                  categories[hovered].categories[b].order
              )
              .map((subcategory) => {
                return (
                  <Column>
                    <Subcategory>{formatNavLink(subcategory)}</Subcategory>
                    <div>
                      {categories[hovered].categories[subcategory].categories.map(
                        (item) => {
                          return <Item>{formatNavLink(item)}</Item>;
                        }
                      )}
                    </div>
                  </Column>
                );
              })}
          </Dropdown>
        </DropdownContainer>
      )}
    </Container>
  );
}

export default ShopNav;
