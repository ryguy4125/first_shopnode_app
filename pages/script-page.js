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
query getScriptTags {
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
    return (
        <div>
            <h1>Hello!</h1>
        </div>
    )
}

export default ScriptPage
