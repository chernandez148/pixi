import { PostState } from "./slices/posts";
import { PostByIDState } from "./slices/postByID";
import { UserState } from "./slices/user";
import { FileNameState } from "./slices/fileName";
import { AccessTokenState } from "./slices/accessToken";
import { SelectedImageState } from "./slices/seletecImage";
import { ToggleCommentsState } from "./slices/toggleComment";
import { PostIDState } from "./slices/postID";
import store from "./store";

export interface User {
  ID: number;
  FullName: string;
  Username: string;
  Email: string;
  FollowingID: number[];
}

export interface Like {
  ID: number;
  UserID: number;
  PostID: number;
}

export interface Post {
  Likes: Like[];
  User: User;
  ID: number;
  UserID: number;
  Caption: string;
  ImageURL: string;
}

export interface PostByID {
  Likes: Like[];
  Comments: Comment[];
  User: User;
  ID: number;
  UserID: number;
  Caption: string;
  ImageURL: string;
}

export interface Comment {
  Author: string;
  Content: string;
}

export type Token = string;

export type FileName = string;

export type SelectedImage = string;

export type ToggleComments = boolean;

export type PostID = number;

export interface RootState {
  user: UserState;
  posts: PostState;
  postByID: PostByIDState;
  fileName: FileNameState;
  selectedImage: SelectedImageState;
  accessToken: AccessTokenState;
  toggleComments: ToggleCommentsState;
  postID: PostIDState
}

export type RootStackParamList = {
  index: undefined;
  explore: undefined;
  post: undefined;
  videos: undefined;
  profile: undefined;
  Comments: undefined;
};

export type AppDispatch = typeof store.dispatch;
