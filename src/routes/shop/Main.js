import React from 'react'
import ImageCarousel from '../../components/ImageCarousel';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function Main() {
  return (
    <Container>
      <ImageCarousel />

      <div>test</div>
    </Container>
  )
}

export default Main
