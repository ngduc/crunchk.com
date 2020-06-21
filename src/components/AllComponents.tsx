import React from 'react';
import { Text, View, TouchableHighlight, TouchableHighlightProps } from 'react-native';
import styled from 'styled-components/native';

import Home from '../Home';
import Hello from './Hello/Hello';
import CompanyCard from './Cards/CompanyCard';
import CardList from './Cards/CardList';
import UI from './UI/UI';
const allComponents = [
  { name: 'UI', render: () => <UI /> },
  {
    name: 'CardList',
    render: () => (
      <CardList
        data={[{ companyName: 'Twitter' }, { companyName: 'Uber' }, { companyName: 'Uber' }]}
        renderItem={(item) => <CompanyCard data={item} />}
      />
    )
  },
  { name: 'CompanyCard', render: () => <CompanyCard data={{ companyName: 'Uber' }} /> },
  { name: 'Hello', render: () => <Hello /> },
  { name: 'Home', render: () => <Home /> }
];

interface TouchableTextProps extends TouchableHighlightProps {
  children?: string | React.ReactElement;
}
const TouchableText = (props: TouchableTextProps) => (
  <TouchableHighlight {...props}>
    <Text style={{ color: 'darkblue' }}>{props.children}</Text>
  </TouchableHighlight>
);

const Container = styled(View)`
  display: flex;
  flex-direction: row;
`;

const SideBar = styled(View)`
  height: 100vh;
  width: 15%;
  background-color: #eee;
  padding: 5px;
`;
const SideItem = styled(TouchableText)`
  margin: 10px;
`;

const Content = styled(View)`
  margin: 5px;
  flex: 1;
`;

interface Props {
  match: any
}
export default ({ match }: Props) => {
  const { componentName = '' } = match.params;
  let loadComp = allComponents[0].render;
  if (componentName) {
    const component = allComponents.find((item) => item.name === componentName);
    if (component) {
      loadComp = component.render;
    }
  }

  const [comp, setComp] = React.useState(loadComp);
  return (
    <Container>
      <SideBar>
        {allComponents.map((item) => (
          <SideItem key={item.name} onPress={() => setComp(item.render)}>
            {item.name}
          </SideItem>
        ))}
      </SideBar>
      <Content>{comp}</Content>
    </Container>
  );
};
