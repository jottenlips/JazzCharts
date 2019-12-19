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

const DataComponent = (_props: any) => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return data.rates.map((rate: any) => (
      <Text>{rate.rate}</Text>
  ))
}

const App = () => {
  return (
    <ApolloProvider client={client}>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <DataComponent/>
      </ScrollView>
    </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
