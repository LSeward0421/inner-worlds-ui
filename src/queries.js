import { gql } from "@apollo/client";

export const GET_USER = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      email
      dreams {
        id
        title
        description
        lucidity
        dreamDate
        emotions {
          id
          name
        }
        tags {
          id
          name
        }
      }
    }
  }
`;

export const GET_USER_DREAMS = gql`
  query ($id: ID!) {
    user(id: $id) {
      dreams {
        id
        title
        description
        lucidity
        dreamDate
        emotions {
          id
          name
        }
        tags {
          id
          name
        }
      }
    }
  }
`;


export const CREATE_DREAM = gql`
  mutation CreateDream($input: CreateDreamInput!) {
    createDream(input: $input) {
      id
      dreamDate
      title
      description
      emotions {
        id
        name
      }
      tags {
        id
        name
      }
      lucidity
    }
  }
`;

export const DELETE_DREAM = gql`
  mutation ($id: ID!) {
    deleteDream(input: {
      id: $id
    }) {
      id
      title
    }
  }
`;

export const UPDATE_DREAM = gql`
  mutation UpdateDream($id: ID!, $dreamDate: String, $title: String, $description: String, $lucidity: Int) {
    updateDream(input: {id: $id, dreamDate: $dreamDate, title: $title, description: $description, lucidity: $lucidity}) {
      id
      dreamDate
      title
      description
      lucidity
    }
  }
`;