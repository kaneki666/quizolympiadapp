import {gql} from '@apollo/client';

export const SEND_GAMEID = gql`
  query($username: String!, $gameID: String!, $challenger: String!) {
    sendGameId(username: $username, gameID: $gameID, challenger: $challenger) {
      username
      gameID
      challenger
    }
  }
`;

export const GET_GAMEID = gql`
  query($username: String!) {
    getGameId(username: $username) {
      gameID
      challenger
    }
  }
`;

export const DECLINE_CHALLENGE = gql`
  query($username: String!, $declined: Boolean!) {
    decline(username: $username, declined: $declined) {
      username
      declined
    }
  }
`;

export const NOTIFICATION_DECLINED = gql`
  query($username: String!) {
    notificationDeclined(username: $username) {
      declined
      username
    }
  }
`;
