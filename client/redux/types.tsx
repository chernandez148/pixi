import { PostState } from "./slices/posts";
import { UserState } from "./slices/user";
import { FileNameState } from "./slices/fileName";  
import { AccessTokenState } from "./slices/accessToken";
import { SelectedImageState } from "./slices/seletecImage";
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

export type Token = string;

export type FileName = string;

export type SelectedImage = string;

export interface RootState {
  user: UserState;
  posts: PostState;
  fileName: FileNameState;
  selectedImage: SelectedImageState;
  accessToken: AccessTokenState;
}

export type RootStackParamList = {
  index: undefined;
  explore: undefined;
  post: undefined;
  videos: undefined;
  profile: undefined;
};

export type AppDispatch = typeof store.dispatch;
