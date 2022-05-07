import { gql } from "@apollo/client";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id
      disk
      name
      disk
      title
      description
      created_at
      updated_at
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetPortfoliosOrderByClause]
  ) {
    portfolios(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      # paginatorInfo {
      #   total
      #   currentPage
      #   hasMorePages
      # }
      data {
        id
        disk
        name
        disk
        title
        description
        created_at
        updated_at
      }
    }
  }
`;

export const GET_FOLDER_ELEMENTS = gql`
  query FolderElements(
    $portfolio_id: ID
    $folder_id: ID
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetFolderElementsOrderByClause]
    $filetypes: [String]
  ) {
    folderElements(
      portfolio_id: $portfolio_id
      folder_id: $folder_id
      search: $search
      page: $page
      limit: $limit
      orderBy: $orderBy
      filetypes: $filetypes
    ) {
      # paginatorInfo {
      #   total
      #   currentPage
      #   hasMorePages
      # }
      portfolio {
        id
        name
        disk
        title
        description
        created_at
        updated_at
      }
      folder {
        id
        portfolio_id
        folder_id
        title
        description
        created_at
        updated_at
        fullPath {
          id
          title
        }
      }
      data {
        ... on Folder {
          id
          portfolio_id
          folder_id
          title
          description
          created_at
          updated_at
        }
        ... on File {
          id
          portfolio_id
          folder_id
          title
          description
          status
          filename
          filesize
          filetype
          created_at
          updated_at
          url
          previewUrl
        }
      }
    }
  }
`;
