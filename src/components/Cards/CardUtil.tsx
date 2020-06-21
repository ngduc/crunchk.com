import styled from 'styled-components/native';
import { Text } from 'react-native';

export interface NewsInterface {
  companyName: string;
  title?: string;
  logoUrl?: string;
  employeeCount?: number;
  lastRound?: string;
  totalFunding?: number;
}

export function nFormatter(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

export const StyledText = styled(Text)`
  margin-bottom: 3px;
`;
export const Tag = styled(Text)`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 3px 6px;
  font-size: 0.7em;
  background-color: #eee;
  color: #777;
  font-family: Verdana;
  letter-spacing: 0.5;
  margin: 0 4px;
`;
export const InfoTag = styled(Tag)`
  border: 1px solid #fff;
  background-color: #fff;
`;
