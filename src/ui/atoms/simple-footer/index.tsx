import styled from 'styled-components';
import { Footer } from '@vkontakte/vkui';

const SimpleFooter = styled(Footer)<{ top?: string }>`
  text-align: left;
  margin-top: ${({ top }) => (top ? top : `0px`)};
`;

export default SimpleFooter;
