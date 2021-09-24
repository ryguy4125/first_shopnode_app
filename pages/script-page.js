import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";


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

    console.log(data);
    return (
        <div>
          <h1>Create Script Tags</h1>
          <button onClick={() => {
            createScriptTag(
              {variables: {
                input: {
                  src: 'https://7e46-76-91-68-224.ngrok.io/test-script.js',
                  displayScope: 'ALL',
                },},
              }
            )
          }}>Create</button>
            <h1>These are the script tags:</h1>
            {
                data.scriptTags.edges.map(item => {
                    return (
                        <div key={item.node.id}>
                            <p>{item.node.id}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ScriptPage
