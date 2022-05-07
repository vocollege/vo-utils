import { gql } from "@apollo/client";

export const GET_BOOK_FIELDS = gql`
  fragment BookFields on Book {
    id
    title
    body
    status
    access
    editUrl
    author {
      ... on User {
        id
        name
        type
      }
    }
    parent {
      ... on Book {
        id
        title
        type
      }
    }
    created_at
    updated_at
    tags {
      id
      label
    }
    attachments {
      id
      title
      filename
      filesize
      filetype
      url
      type
    }
    roles {
      id
      name
      label
      type
    }
  }
`;

export const GET_BOOKS_FIELDS = gql`
  fragment BooksFields on Book {
    id
    title
    status
    access
    parent {
      ... on Book {
        id
        title
        type
      }
    }
    roles {
      id
      name
      label
      type
    }
    created_at
    updated_at
  }
`;

export const GET_BOOK = gql`
  query Book($id: ID!) {
    book(id: $id) {
      ...BookFields
    }
  }
  ${GET_BOOK_FIELDS}
`;

export const GET_BOOKS = gql`
  query Books(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetBooksOrderByClause]
  ) {
    books(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        ...BooksFields
      }
    }
  }
  ${GET_BOOKS_FIELDS}
`;
