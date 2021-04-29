import { gql } from '@apollo/client';

export const UPDATE_SETTINGS = gql`
  mutation UpdateQueue($settings: [UpdateSettingInput]!) {
    updateSettings(settings: $settings) {
      name
      category
      value
    }
  }
`;