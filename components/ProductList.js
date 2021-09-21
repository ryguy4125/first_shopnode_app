import React from "react";
import gql from "graphql-tag";
import store from 'store-js';
import { useQuery } from "@apollo/react-hooks";
import { Card, ResourceList, Stack, TextStyle, Thumbnail } from "@shopify/polaris";
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from "@shopify/app-bridge-react";

const GET_PRODUCTS_BY_ID = gql`
query getProducts($ids: [ID!]!){
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        images(first:1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first:3){
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`

function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID,
    { variables: { ids: store.get('ids') } });

    if (loading) return <div>Loading...</div>
    // if (error) return <div>Errors: { error.message }</div>

    // if (data) return console.log("data:", data);

  return (
    <div>
      <h1>Product List</h1>

      {
        data.nodes.map(item => {
          return (
            <p key={item.id} >{item.title}</p>
          )
          })
      }
    </div>
  );
}

export default ProductList;
