import React from 'react';
import styled from 'styled-components';
import angle_down from '../../../assets/icons/icon-angle-down.svg'

const Select = styled.select`
  -webkit-appearance: none;
     -moz-appearance: none;

  font-family: 'Source Sans Pro', sans-serif;
  padding: .25rem 2rem .25rem 1rem;
  line-height: 1.5rem;
  background-color: transparent;
  background: url(${angle_down});
  background-repeat: no-repeat;
  background-position: 95% center;

  &:focus {
    outline: none;
  }

  &:after {
    content: 'aaa'
  }

`;

const Option = styled.option``;

function Sort({ handleSort }) {
  return (
    <Select name="sort" id="sort" onChange={(e) => handleSort(e.target.value)}>
      <Option value='featured'>Featured</Option>
      <Option value='new'>New In</Option>
      <Option value='alphabetical_increasing'>Alphabetical (A-Z)</Option>
      <Option value='alphabetical_decreasing'>Alphabetical (Z-A)</Option>
      <Option value='price_increasing'>Price (Low to High)</Option>
      <Option value='price_decreasing'>Price (High to Low)</Option>
    </Select>
  )
}

export default Sort
