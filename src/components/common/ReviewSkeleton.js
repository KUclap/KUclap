import styled from "styled-components";
const Container = styled.div`
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;
  margin: 2rem 0;
  padding: 1.2rem 1.6rem;
  min-width: 27.6rem;
  overflow: hidden;
`;

const ReviewSkeleton = () => (
  <Container>
    <svg
      role="img"
      width="55%"
      height="131"
      aria-labelledby="loading-aria"
      viewBox="0 0 318 131"
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
          <rect x="0" y="0" rx="7" ry="7" width="318" height="15" />
          <rect x="0" y="21" rx="7" ry="7" width="171" height="15" />
          <rect x="0" y="42" rx="7" ry="7" width="211" height="15" />
          <rect x="0" y="83" rx="7" ry="7" width="75" height="11" />
          <rect x="0" y="101" rx="7" ry="7" width="109" height="11" />
          <rect x="1" y="119" rx="7" ry="7" width="60" height="11" />
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

export default ReviewSkeleton;
