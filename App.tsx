/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

interface Rate {
  currency: string;
  rate: string;
}

const DataComponent = (_props: any) => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return data.rates.map(({rate, currency}: Rate) => (
      <Text>{`${rate} ${currency}`}</Text>
  ))
}

const App = () => {
  return (
    <ApolloProvider client={client}>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <DataComponent/>
      </ScrollView>
    </SafeAreaView>
    </ApolloProvider>
  );
};


export default App;
