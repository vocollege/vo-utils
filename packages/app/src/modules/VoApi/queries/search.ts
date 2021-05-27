import { gql } from "@apollo/client";

export const SEARCH_CONTENT = gql`
  query SearchContent(
    $search: String!
    $types: [String]
    $primaryField: String
  ) {
    searchContent(search: $search, types: $types, primaryField: $primaryField) {
      id
      title
      type
      urlAlias {
        id
        usage_id
        usage_type
        alias
      }
    }
  }
`;
