import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import styled from 'styled-components/native';
import { H3 } from 'es5-html-elements';

const StyledText = styled(Text)`
  color: blue;
`;

export default () => (
  <View style={tailwind('w-full flex')}>
    <View style={tailwind('border border-gray-400 bg-white rounded p-4')}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/440px-React-icon.svg.png" />
      <H3 style={tailwind('text-gray-900 font-bold text-xl mb-2 mt-2')}>React</H3>
      <StyledText>Hello World!</StyledText>
    </View>
  </View>
);
