import React from 'react';
import AsyncStorage from '@callstack/async-storage';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
// import { H3 } from "es5-html-elements";

import { MotionScene, SharedElement, MotionScreen } from 'react-motion-layout';
import { NewsInterface, nFormatter, StyledText, Tag, InfoTag } from '../Cards/CardUtil';

interface Props {
  match?: { params: { companyName: string } };
  data: NewsInterface;
  onClick?: () => {};
}
export default (props: Props) => {
  const { companyName } = props.match ? props.match.params : props.data;
  const [data, setData] = React.useState<any>(props.data || { companyName: '' });

  React.useEffect(() => {
    const loadLS = async () => {
      const newsStr = await AsyncStorage.getItem('news');
      try {
        const newsArr = JSON.parse(newsStr);
        const storedData = newsArr.find((item: NewsInterface) => item.companyName === companyName);
        if (storedData) {
          setData(storedData);
        }
      } catch (err) {
        // console.log('ERROR: ', err);
      }
    };
    loadLS();
  }, []);

  return (
    <MotionScreen>
      <MotionScene
        name={`message-${data.companyName}`}
        // easing="cubic-bezier(0.22, 1, 0.36, 1)"
      >
        <View style={tailwind('w-full flex')}>
          <View style={tailwind('border border-gray-400 bg-white rounded p-4')}>
            <View style={tailwind('flex flex-row justify-between items-baseline')}>
              <SharedElement.Image alt="" style={tailwind('w-40 h-10')} src={data.logoUrl} animationKey="avatar" />
              <View style={tailwind('flex flex-col text-right mb-2')}>
                <Text style={tailwind('text-gray-900 font-bold text-xl mb-2 capitalize')}>{data.companyName}</Text>
              </View>
            </View>
            <View style={tailwind('flex flex-row justify-between items-baseline')}>
              {/* <Text style={tailwind('')}>2019-12 $10 M, founded {data.founded}</Text> */}
              <Text style={tailwind('')}>Founded {data.founded}</Text>
              <Text style={tailwind('')}>
                {data.employeeCount && <InfoTag>Size: {nFormatter(data.employeeCount)}</InfoTag>}
                {data.lastRound && <Tag>{data.lastRound}</Tag>}
                {data.totalFunding && <Tag>{nFormatter(data.totalFunding)}</Tag>}
              </Text>
            </View>
            {data.leaderName && (
              <StyledText>
                {data.leaderLinkedIn ? (
                  <a href={data.leaderLinkedIn}>
                    {data.leaderTitle}: {data.leaderName}
                  </a>
                ) : (
                  <>
                    {data.leaderTitle}: {data.leaderName}
                  </>
                )}
              </StyledText>
            )}
            <StyledText>&nbsp;</StyledText>
            <StyledText>{data.title}</StyledText>
          </View>
        </View>
      </MotionScene>
    </MotionScreen>
  );
};
