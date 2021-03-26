import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useShop from "../../../hooks/useShop";
import { formatNavLink } from "../../../utils/utils";

// Icons
import { ReactComponent as Hamburger } from "../../../assets/icons/icon-hamburger.svg";

function SideNav({ nav }) {
  const { getShopCategories } = useShop();
  const [categories, setCategories] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [height, setHeight] = useState(0);
  const ref = useRef();

  useEffect(() => {
    (async () => {
      const categories = await getShopCategories();
      setCategories(categories);
    })();
  }, []);

  useEffect(() => {
    setHeight(nav.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (!isNavOpen) return;
    const closeNavListener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener("click", closeNavListener);
    return () => {
      document.removeEventListener("click", closeNavListener);
    };
  }, [isNavOpen, ref]);

  return (
    <>
      <Icon
        onClick={() => {
          setIsNavOpen(!isNavOpen);
          isNavOpen && setIsDropdownOpen(false);
        }}
      >
        <Hamburger />
      </Icon>

      <Container
        ref={ref}
        top={height}
        isNavOpen={isNavOpen}
        isDropdownOpen={isDropdownOpen}
      >
        <Nav>
          {/* Sort the categories by order before displaying them */}
          {Object.keys(categories).length !== 0 &&
            Object.keys(categories)
              .sort((a, b) => categories[a].order - categories[b].order)
              .map((category) => {
                if (Object.keys(categories[category].categories).length === 0) {
                  return (
                    <CategoryLink
                      key={category}
                      selected={activeCategory === category}
                      to={`/shop/${encodeURIComponent(category)}`}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsNavOpen(false);
                        setActiveCategory(category);
                      }}
                    >
                      {formatNavLink(category)}
                    </CategoryLink>
                  );
                }
                return (
                  <Category
                    key={category}
                    selected={activeCategory === category}
                    onClick={() => {
                      setIsDropdownOpen(true);
                      setActiveCategory(category);
                    }}
                  >
                    {formatNavLink(category)}
                  </Category>
                );
              })}
        </Nav>

        {isDropdownOpen &&
          Object.keys(categories[activeCategory].categories).length !== 0 &&
          isNavOpen && (
            <DropdownContainer>
              <Dropdown>
                {/* Sort the subcategories by order before displaying them */}
                {Object.keys(categories[activeCategory].categories)
                  .sort(
                    (a, b) =>
                      categories[activeCategory].categories[a].order -
                      categories[activeCategory].categories[b].order
                  )
                  .map((subcategory) => {
                    return (
                      <Column key={subcategory}>
                        <Subcategory
                          to={`/shop/${encodeURIComponent(subcategory)}`}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setIsNavOpen(false);
                          }}
                        >
                          {formatNavLink(subcategory)}
                        </Subcategory>
                        <div>
                          {categories[activeCategory].categories[
                            subcategory
                          ].categories.map((item) => {
                            return (
                              <Item
                                key={item}
                                to={`/shop/${encodeURIComponent(item)}`}
                                onClick={() => {
                                  setIsDropdownOpen(false);
                                  setIsNavOpen(false);
                                }}
                              >
                                {formatNavLink(item)}
                              </Item>
                            );
                          })}
                        </div>
                      </Column>
                    );
                  })}
                <SeeAll>
                  <Item
                    to={`/shop/${encodeURIComponent(activeCategory)}`}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsNavOpen(false);
                    }}
                  >
                    See all {formatNavLink(activeCategory)}
                  </Item>
                </SeeAll>
              </Dropdown>
            </DropdownContainer>
          )}
      </Container>
    </>
  );
}

SideNav.propTypes = {
  nav: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element)}),
  ]).isRequired,
};

export default SideNav;


// Styled Components
const colors = {
  primary: "hsl(0, 0%, 0%)", // Black
  secondary: "hsl(0, 0%, 27%)", // Grey,
  tertiary: "hsl(0, 0%, 100%)", // White
  background: "hsl(0, 0%, 100%)",
};

const Icon = styled.button`
  color: ${colors.secondary};
  margin: 0.5rem;
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
  }
`;

const Container = styled.nav`
  display: flex;
  position: absolute;
  left: 0;
  top: ${(props) => props.top}px;
  height: calc(100% - ${(props) => props.top}px);
  border-top: 1px solid ${colors.secondary};
  background: ${colors.secondary};
  font-size: 0.825rem;
  font-family: "Source Sans Pro", sans-serif;
  transition: all 0.15s linear;
  transform: translateX(${(props) => (props.isNavOpen ? "0" : "-100")}%);

  @media all and (max-width: 600px) {
    width: ${(props) => (props.isDropdownOpen ? "100vw" : "initial")};
    max-width: ${(props) => (props.isDropdownOpen ? "100%" : "initial")};
  }

  @media all and (max-width: 500px) {
    height: 100%;
  }
`;

const Nav = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0;
`;

const category = `
  position: relative;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  color: ${colors.tertiary};
  padding: 0.75rem 2rem calc(0.75rem - 2px) 2rem;
  transition: all 0.3s ease;
  width: 100%;
  text-align: start;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: '';
    display: block;
    width: 2px;
    left: 1rem;
    position: absolute;
    background: #fff;
    transition: height 0.3s ease 0s, top 0.3s ease 0s;
  }
`;

const Category = styled.div`
  ${category}

  &:hover {
    transform: translateX(${(props) => (props.selected ? "0" : "3")}%);
  }

  &:after {
    height: ${(props) => (props.selected ? "90%" : "0")};
    top: ${(props) => (props.selected ? "5%" : "50%")};
  }
`;

const CategoryLink = styled(Link)`
  ${category}

  &:hover {
    transform: translateX(${(props) => (props.selected ? "0" : "3")}%);
  }

  &:after {
    height: ${(props) => (props.selected ? "90%" : "0")};
    top: ${(props) => (props.selected ? "5%" : "50%")};
  }
`;

const DropdownContainer = styled.div`
  background: ${colors.tertiary};
  width: 100%;
  box-shadow: 0 5px 5px ${colors.secondary};
`;

const Dropdown = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: row;
  grid-gap: 3rem 1rem;
  justify-content: center;
  padding: 1.5rem;
  background: ${colors.tertiary};
  font-size: 0.825rem;

  @media all and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  margin: 0 1rem;
`;

const Subcategory = styled(Link)`
  position: relative;
  display: block;
  color: ${colors.primary};
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-weight: 600;
  transition: all 0.15s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const Item = styled(Link)`
  padding: 0.25rem 0;
  cursor: pointer;
  display: block;
  color: ${colors.secondary};
  border-bottom: 1px solid transparent;
  transition: all 0.15s ease;

  &:hover {
    color: ${colors.primary};
    text-decoration: underline;
  }
`;

const SeeAll = styled.div`
  grid-column: 1 / -1;
  justify-self: center;
`;
