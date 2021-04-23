import { h } from "preact";
import styled, { withTheme } from "styled-components";

const Container = styled.div`
  border-radius: 1rem;
  min-width: 27.6rem;
  overflow: hidden;
`;

const AnswerSkeletonA = withTheme(({ theme }) => (
    <Container>
        <svg
            role="img"
            width="100%"
            height="70"
            aria-labelledby="loading-aria-answer-a"
            viewBox="0 0 400 70"
            preserveAspectRatio="none"
        >
            <title id="loading-aria-answer-a">Loading...</title>
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                clip-path="url(#clip-path-answer-a)"
                style='fill: url("#fill-answer-a");'
            />
            <defs>
                <clipPath id="clip-path-answer-a">
                    <rect x="0" y="4" rx="3" ry="3" width="90%" height="12" />
                    <rect x="0" y="30" rx="3" ry="3" width="40%" height="12" />
                    <rect x="270" y="56" rx="3" ry="3" width="121" height="12" />
                </clipPath>
                <linearGradient id="fill-answer-a">
                    <stop
                        offset="0.599964"
                        stop-color={theme.skeleton[0]}
                        stop-opacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop
                        offset="1.59996"
                        stop-color={theme.skeleton[1]}
                        stop-opacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop
                        offset="2.59996"
                        stop-color={theme.skeleton[0]}
                        stop-opacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="0; 0; 3"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </stop>
                </linearGradient>
            </defs>
        </svg>
    </Container>
));

const AnswerSkeletonB = withTheme(({ theme }) => (
    <Container>
        <svg
            role="img"
            width="100%"
            height="50"
            aria-labelledby="loading-aria-answer-b"
            viewBox="0 0 400 50"
            preserveAspectRatio="none"
        >
            <title id="loading-aria-answer-b">Loading...</title>
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                clip-path="url(#clip-path-answer-b)"
                style='fill: url("#fill-answer-b");'
            />
            <defs>
                <clipPath id="clip-path-answer-b">
                    <rect x="0" y="4" rx="3" ry="3" width="60%" height="12" />
                    <rect x="280" y="30" rx="3" ry="3" width="111" height="12" />
                </clipPath>
                <linearGradient id="fill-answer-b">
                    <stop
                        offset="0.599964"
                        stop-color={theme.skeleton[0]}
                        stop-opacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop
                        offset="1.59996"
                        stop-color={theme.skeleton[1]}
                        stop-opacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop
                        offset="2.59996"
                        stop-color={theme.skeleton[0]}
                        stop-opacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="0; 0; 3"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </stop>
                </linearGradient>
            </defs>
        </svg>
    </Container>
));


export { AnswerSkeletonA, AnswerSkeletonB };
