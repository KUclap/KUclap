import { h } from "preact";
import styled from "styled-components";
const Container = styled.div`
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  margin: 2rem 0;
  padding: 1.2rem 1.6rem;
  min-width: 27.6rem;
  overflow: hidden;
`;

const ReviewSkeletonA = () => (
  <Container>
    <svg
      role="img"
      width="95%"
      height="174"
      aria-labelledby="loading-aria"
      viewBox="0 0 318 174"
      preserveAspectRatio="none"
    >
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clip-path="url(#clip-path)"
        style='fill: url("#fill");'
      ></rect>
      <defs>
        <clipPath id="clip-path">
          <rect x="8" y="156" rx="3" ry="3" width="68" height="12" />
          <rect x="8" y="132" rx="3" ry="3" width="88" height="12" />
          <rect x="8" y="106" rx="3" ry="3" width="52" height="12" />
          <rect x="8" y="40" rx="3" ry="3" width="90%" height="12" />
          <rect x="150" y="68" rx="3" ry="3" width="30%" height="12" />
          <rect x="8" y="68" rx="3" ry="3" width="40%" height="12" />
          <rect x="214" y="12" rx="3" ry="3" width="20%" height="12" />
          <rect x="8" y="12" rx="3" ry="3" width="60%" height="12" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="1.59996" stop-color="#ecebeb" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="2.59996" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  </Container>
);

const ReviewSkeletonB = () => (
  <Container>
    <svg
      role="img"
      width="95%"
      height="148"
      aria-labelledby="loading-aria-b"
      viewBox="0 0 318 148"
      preserveAspectRatio="none"
    >
      <title id="loading-aria-b">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clip-path="url(#clip-path-b)"
        style='fill: url("#fill-b");'
      ></rect>
      <defs>
        <clipPath id="clip-path-b">
          <rect x="8" y="130" rx="3" ry="3" width="68" height="12" />
          <rect x="8" y="104" rx="3" ry="3" width="88" height="12" />
          <rect x="8" y="78" rx="3" ry="3" width="52" height="12" />
          <rect x="8" y="40" rx="3" ry="3" width="64%" height="12" />
          <rect x="182" y="12" rx="3" ry="3" width="40%" height="12" />
          <rect x="8" y="12" rx="3" ry="3" width="50%" height="12" />
        </clipPath>
        <linearGradient id="fill-b">
          <stop offset="0.599964" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="1.59996" stop-color="#ecebeb" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="2.59996" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  </Container>
);

export { ReviewSkeletonA, ReviewSkeletonB };
