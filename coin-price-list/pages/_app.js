import '../styles/globals.css'
import {
  ApolloClient,
  ApolloProvider, createHttpLink, InMemoryCache,
} from "@apollo/client";

const link = createHttpLink({
  uri: "https://graphql-us-east-1.upstash.io/",
  headers: {
    Authorization: "Bearer YOUR_READ_ONLY_ACCESS_KEY",
  },
});
const client = new ApolloClient({
  uri: "https://graphql-us-east-1.upstash.io/",
  cache: new InMemoryCache(),
  link,
});

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client}><Component {...pageProps} /> </ApolloProvider>
}

export default MyApp
