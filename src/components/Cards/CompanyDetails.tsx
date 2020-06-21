import React from 'react';
import CompanyCard from './CompanyCard';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import AsyncStorage from '@callstack/async-storage';
import { NewsInterface } from './CardUtil';

interface Props {
  match: any
  companyName: string
}
export default ({ match, companyName }: Props) => {
  const [data, setData] = React.useState<any>({ companyName: '' });
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

  const twitterId = data && data.twitterUrl ? data.twitterUrl.split('/').splice(-1).toString() : ''

  return (
    <div>
      <CompanyCard match={match} data={{ companyName, title: '' }} />

      {twitterId && (
        <TwitterTimelineEmbed sourceType="profile" screenName={twitterId} options={{ width: '50%' }} />
      )}
    </div>
  );
};
