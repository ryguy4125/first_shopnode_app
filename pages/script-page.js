import React from "react";
import {gql, useMutation, useQuery } from "@apollo/client";
import { Button, Card, Layout, Page, ResourceItem, ResourceList, Stack } from "@shopify/polaris";
// import gql from "graphql-tag";


const CREATE_SCRIPT_TAG = gql`
    mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
            scriptTag {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`;

const QUERY_SCRIPT_TAG = gql`
query {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const DELETE_SCRIPT_TAG = gql`
mutation deleteScriptTag($id: ID!){
    scriptTagDelete(id: $id){
      deletedScriptTagId
      userErrors{
        field
        message
      }
    }
  }
`;



function ScriptPage() {

    const {loading, error, data} = useQuery(QUERY_SCRIPT_TAG);
    const [createScriptTag] = useMutation(CREATE_SCRIPT_TAG);
    const [deleteScriptTag] = useMutation(DELETE_SCRIPT_TAG);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>
    console.log("data: ",data);

    return (
        <Page>
          <Layout>
          <Layout.Section>
          <Card>
          <h1>Create Script Tags</h1>
          <h1>These are the script tags:</h1>
          </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card>
          <Button 
            primary
            size="slim"
            type="submit"
            onClick={() => {
            createScriptTag(
              {variables: {
                input: {
                  src: 'https://e275-76-91-68-224.ngrok.io/test-script.js',
                  displayScope: 'ALL',
                },},
              }
            )
          }}>Create</Button>
          </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
            <ResourceList 
              showHeader
              resourceName={{ singular: 'Script', plural: 'Scripts' }}
              items={data.scriptTags.edges}
              renderItem={item => {
                return (
                  <ResourceItem id={item.id} >
                    <Stack>
                      <Stack.Item>
                        <p>
                          {item.node.id}
                        </p>
                      </Stack.Item>
                      <Stack.Item>
                        <Button type='submit' onClick={() => {
                          deleteScriptTag({
                            variables: {
                              id: item.node.id
                            },
                            refetchQueries: [{ query: QUERY_SCRIPT_TAG }]
                          })
                        }}>
                          Delete Script Tag
                        </Button>
                      </Stack.Item>
                    </Stack>
                  </ResourceItem>
                )
              }
              }
              />
              </Card>
              </Layout.Section>
        </Layout>
        </Page>
    )
}

export default ScriptPage
