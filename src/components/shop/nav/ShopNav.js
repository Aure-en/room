import React, { useEffect, useState, useRef } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import styled from 'styled-components';
import { formatNavLink } from '../../../utils/utils';
import { Link } from 'react-router-dom';

// Styled components

const colors = {
  primary: 'hsl(0, 0%, 0%)', // Black
  secondary: 'hsl(0, 0%, 27%)', // Grey
  tertiary: 'hsl(0, 0%, 100%)', // White
};

const Container = styled.nav`
  position: relative;
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
  position: absolute;
  z-index: 3;
  background: ${colors.tertiary};
  top: ${(props) => props.margin}px;
  width: 100%;
  box-shadow: 0 0px 4px -3px ${colors.secondary};
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

const Category = styled.span`
  cursor: pointer;
  flex: 1;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  color: ${colors.tertiary};
  padding: 0.75rem 0 calc(0.75rem - 2px) 0;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid ${colors.tertiary};
  }
`;

const Subcategory = styled.span`
  position: relative;
  display: inline-block;
  color: ${colors.primary};
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const Item = styled.span`
  padding: 0.25rem 0;
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
  const navRef = useRef();

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
      <Nav ref={navRef}>
        {/* Sort the categories by order before displaying them */}
        {Object.keys(categories)
          .sort((a, b) => categories[a].order - categories[b].order)
          .map((category, index) => {
            return (
              <Category
                key={category + index}
                onMouseOver={() => {
                  setDropdown(true);
                  setHovered(category);
                }}
              >
                <Link to={`/shop/${encodeURIComponent(category)}`}>
                  {formatNavLink(category)}
                </Link>
              </Category>
            );
          })}
      </Nav>

      {dropdown && Object.keys(categories[hovered].categories).length !== 0 && (
        <DropdownContainer margin={navRef.current.offsetHeight}>
          <Dropdown>
            {/* Sort the subcategories by order before displaying them */}
            {Object.keys(categories[hovered].categories)
              .sort(
                (a, b) =>
                  categories[hovered].categories[a].order -
                  categories[hovered].categories[b].order
              )
              .map((subcategory, index) => {
                return (
                  <Column key={subcategory + index}>
                    <Subcategory>
                      <Link to={`/shop/${encodeURIComponent(subcategory)}`}>
                        {formatNavLink(subcategory)}
                      </Link>
                    </Subcategory>
                    <div>
                      {categories[hovered].categories[
                        subcategory
                      ].categories.map((item, index) => {
                        return (
                          <Item key={item + index}>
                            <Link to={`/shop/${encodeURIComponent(item)}`}>
                              {formatNavLink(item)}
                            </Link>
                          </Item>
                        );
                      })}
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
