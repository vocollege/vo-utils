import { gql } from "@apollo/client";

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio($input: UpdatePortfolioInput!) {
    createPortfolio(input: $input) {
      id
      disk
      status
      name
      disk
      title
      description
      created_at
      updated_at
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID!, $input: UpdatePortfolioInput!) {
    updatePortfolio(id: $id, input: $input) {
      id
      disk
      status
      name
      disk
      title
      description
      created_at
      updated_at
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID!) {
    deletePortfolio(id: $id) {
      id
    }
  }
`;

export const CREATE_FOLDER = gql`
  mutation CreateFolder($input: UpdateFolderInput!) {
    createFolder(input: $input) {
      id
      portfolio_id
      folder_id
      title
      description
      created_at
      updated_at
    }
  }
`;

export const UPDATE_FOLDER = gql`
  mutation UpdateFolder($id: ID!, $input: UpdateFolderInput!) {
    updateFolder(id: $id, input: $input) {
      id
      portfolio_id
      folder_id
      title
      description
      created_at
      updated_at
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation DeleteFolder($id: ID!) {
    deleteFolder(id: $id) {
      id
    }
  }
`;

export const CREATE_FILE = gql`
  mutation CreateFile($file: Upload, $input: UpdateFileInput!) {
    createFile(file: $file, input: $input) {
      id
      portfolio_id
      folder_id
      title
      description
      status
      path
      filename
      filesize
      filetype
      url
      created_at
      updated_at
    }
  }
`;

export const UPDATE_FILE = gql`
  mutation UpdateFile($file: Upload, $id: ID!, $input: UpdateFileInput!) {
    updateFile(file: $file, id: $id, input: $input) {
      id
      portfolio_id
      folder_id
      title
      description
      status
      path
      filename
      filesize
      filetype
      url
      created_at
      updated_at
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($id: ID!) {
    deleteFile(id: $id) {
      id
    }
  }
`;
