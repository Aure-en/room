import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import angleDown from "../../../assets/icons/icon-angle-down.svg";

function Sort({ handleSort }) {
  return (
    <Select name="sort" id="sort" onChange={(e) => handleSort(e.target.value)}>
      <option value="featured">Featured</option>
      <option value="new">New In</option>
      <option value="alphabetical_increasing">Alphabetical (A-Z)</option>
      <option value="alphabetical_decreasing">Alphabetical (Z-A)</option>
      <option value="price_increasing">Price (Low to High)</option>
      <option value="price_decreasing">Price (High to Low)</option>
    </Select>
  );
}

Sort.propTypes = {
  handleSort: PropTypes.func,
};

Sort.defaultProps = {
  handleSort: () => {},
};

export default Sort;

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;

  font-family: "Source Sans Pro", sans-serif;
  padding: 0.25rem 2rem 0.25rem 1rem;
  line-height: 1.5rem;
  background-color: transparent;
  background: url(${angleDown});
  background-repeat: no-repeat;
  background-position: 95% center;

  &:focus {
    outline: none;
  }

  &:after {
    content: "aaa";
  }
`;