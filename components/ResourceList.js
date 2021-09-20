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