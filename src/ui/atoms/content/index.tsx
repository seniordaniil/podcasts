import styled from 'styled-components';

const Content = styled.div<{ bottom: string }>`
  padding-bottom: calc(
    ${({ bottom }) => bottom} + var(--safe-area-inset-bottom)
  );
`;

export default Content;
