import { gql } from "@apollo/client";

import { GET_BOOK_FIELDS } from "./books";

export const GET_HELP = gql`
  query Help($name: String, $parent: ID) {
    help(name: $name, parent: $parent) {
      ...BookFields
    }
  }
  ${GET_BOOK_FIELDS}
`;
