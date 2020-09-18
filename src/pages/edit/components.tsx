import React from 'react';
import styled from 'styled-components';
import { Card } from '@vkontakte/vkui';

export const Player = styled(Card)`
  overflow: hidden;
  & timeline {
    border-bottom: 1px solid #d7d8d9;
    background-color: #f2f3f5;
  }
`;

export const Controls = styled.div`
  padding: 8px;
  & .Button--sz-m {
    padding: 0px;
    width: 44px;
  }
  display: flex;
  justify-content: space-around;
  & > div {
    display: flex;
    & > * {
      margin-right: 4px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
`;

export function Scissors(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
        stroke="#3F8AE0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BarChart1(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 20V10M18 20V4M6 20v-4"
        stroke="#3F8AE0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BarChart2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 20V10M6 20V4M18 20v-4"
        stroke="#3F8AE0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
