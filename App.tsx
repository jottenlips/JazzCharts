/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { AsyncStorage } from 'react-native';

const cache = new InMemoryCache();

const createClient = async () => {
  await persistCache({
    cache,
      // @ts-ignore
    storage: AsyncStorage,
  });


  const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache
  });
  return client;
}
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

const App: React.FC = () => {
  const [client, setClient] = useState(undefined as any);

  useEffect(() => {
    createClient().then(apollo => setClient(apollo));
    return () => {};
  }, []);
  if (client === undefined) return <Text>Loading...</Text>;
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
