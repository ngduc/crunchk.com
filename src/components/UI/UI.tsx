import React from 'react';
import AsyncStorage from '@callstack/async-storage';
import { useHistory } from 'react-router-dom';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import styled from 'styled-components/native';

import CardList from '../Cards/CardList';
// import CompanyCard from '../Cards/CompanyCard';
import { NewsInterface } from '../Cards/CardUtil';

import { MotionScene, MotionScreen, SharedElement, useMotion } from 'react-motion-layout';

import useSWR from 'swr';
import fetch from 'unfetch';
const fetcher = (url: string) => fetch(url).then((r) => r.json());

const API_GET_NEWS = 'http://localhost:3007/get-news'

const StyledText = styled(Text)`
  margin-bottom: 3px;
`;

function ItemComponent({ data, id }: { data: NewsInterface; id: number }) {
  const history = useHistory();
  const withTransition = useMotion(`message-${data.companyName}`);
  const callback = React.useCallback(() => history.push(`/company/${data.companyName}`), [history, id]);

  return (
    <MotionScene
      easing="cubic-bezier(0.22, 1, 0.36, 1)"
      name={`message-${data.companyName}`}
      onClick={withTransition(callback)}
    >
      <View
        style={{
          ...tailwind('border border-gray-400 bg-white rounded p-4'),
          minHeight: 180
        }}
        data-name="list-card"
      >
        <View style={tailwind('flex flex-row justify-between items-baseline')}>
          <SharedElement.Image alt="" style={tailwind('w-32')} src={data.logoUrl} animationKey="avatar" />
          {/* <View style={tailwind('flex flex-col text-right mb-2')}>
            <Text style={tailwind('text-gray-900 font-bold text-xl mb-2 capitalize')}>{data.companyName}</Text>
          </View> */}
        </View>
        {/* <View style={tailwind('flex flex-row justify-between items-baseline')}>
          <Text style={tailwind('')}>2019-12 $10 M, founded 2014</Text>
          <Text style={tailwind('')}>S-A - Emp: 100-500</Text>
        </View> */}
        {/* <StyledText>{data.leaderTitle}: {data.leaderName}</StyledText> */}
        <StyledText>&nbsp;</StyledText>
        <StyledText>{data.title}</StyledText>
      </View>
      {/* <CompanyCard data={data} /> */}
    </MotionScene>
  );
}

interface Props {
  match?: any;
}
export default (props: Props) => {
  const { data, error } = useSWR(API_GET_NEWS, fetcher);
  AsyncStorage.setItem('news', JSON.stringify(data));

  const filtered = (data || []).filter((item: NewsInterface) => item.logoUrl);
  return (
    <MotionScreen>
      <CardList data={filtered} renderItem={(item, idx) => <ItemComponent data={item} id={idx} key={idx} />} />
      {/* {(data || []).map((item, id) => (
          <ItemComponent data={item} id={id} key={id} />
        ))} */}
    </MotionScreen>
  );
};
