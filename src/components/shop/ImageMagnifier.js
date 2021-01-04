import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 70vh;
  cursor: zoom-in;
`;

const Zoom = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid blue;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.image});
  z-index: ${(props) => (props.isZooming ? '2' : '-1')};
  background-repeat: no-repeat;
  transition: all ease-in;
`;

const Image = styled.img`
  max-height: 100%;
`;

function ImageMagnifier({ image }) {
  const [isZooming, setIsZooming] = useState(false);
  const zoomRef = useRef();

  const moveZoom = (e) => {
    zoomRef.current.style.backgroundPosition = `${
      ((e.clientX - zoomRef.current.getBoundingClientRect().left) /
        zoomRef.current.offsetWidth) *
      100
    }% ${
      ((e.clientY - zoomRef.current.getBoundingClientRect().top) /
        zoomRef.current.offsetHeight) *
      100
    }%`;
  };

  return (
    <div>
      <Container>
        <ImageContainer>
          <Zoom
            image={image}
            isZooming={isZooming}
            ref={zoomRef}
            onClick={() => {
              setIsZooming(false);
            }}
            onMouseMove={moveZoom}
          />

          <Image
            src={image}
            onClick={(e) => {
              setIsZooming(true);
              moveZoom(e);
            }}
          />
        </ImageContainer>
      </Container>
    </div>
  );
}

export default ImageMagnifier;
