import { gql } from "@apollo/client";

export const GET_ARTICLES_FIELDS = gql`
  fragment ArticlesFields on Article {
    id
    title
    status
    author {
      ... on User {
        id
        name
        type
      }
    }
    date
    created_at
    updated_at
  }
`;
export const GET_ARTICLE = gql`
  query Article($id: ID!) {
    article(id: $id) {
      id
      title
      body
      status
      url
      editUrl
      author {
        ... on User {
          id
          name
          type
        }
      }
      date
      tags {
        id
        label
      }
      images {
        id
        title
        filename
        filesize
        filetype
        url
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
      created_at
      updated_at
    }
    # setting(name: "frontFilesPortfolio") {
    #   name
    #   category
    #   value
    # }

    #   portfolio(id: "02a2f313-8a89-48dc-a242-f8c5177c0561") {
    #     id
    #     disk
    #     name
    #     disk
    #     title
    #     description
    #     created_at
    #     updated_at
    #   }
  }
`;

export const GET_ARTICLES = gql`
  query Articles(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetArticlesOrderByClause]
    $filters: [GetArticlesFilter]
  ) {
    articles(
      search: $search
      page: $page
      limit: $limit
      orderBy: $orderBy
      filters: $filters
    ) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        ...ArticlesFields
      }
    }
  }
  ${GET_ARTICLES_FIELDS}
`;
