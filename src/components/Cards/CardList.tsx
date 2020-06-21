import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import styled from 'styled-components/native';

import { NewsInterface } from './CardUtil'

interface Props {
  data: NewsInterface[]
  renderItem: (item: NewsInterface, idx: number) => React.ReactElement
}
export default ({ data, renderItem }: Props) => (
  <View style={tailwind('max-w-full flex flex-row flex-wrap')} data-name="main-list">
    {(data || []).map((item, idx) => {
      return (
        <View key={idx} style={tailwind('w-1/3 p-3')} data-name="main-list-item">
          {renderItem(item, idx)}
        </View>
      )
    })}
  </View>
)
