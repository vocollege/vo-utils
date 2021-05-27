import { gql } from "@apollo/client";

export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($settings: [UpdateSettingInput]!) {
    updateSettings(settings: $settings) {
      name
      category
      value
      file {
        id
        title
        filename
        filesize
        filetype
        url
      }
    }
  }
`;
