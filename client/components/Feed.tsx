import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootStackParamList, RootState } from "@/redux/types";
import { setPostID } from "@/redux/slices/postID";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // Import StackNavigationProp
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import PostData from "@/data/PostData";

// Update the type to use StackNavigationProp
type NavigationProp = StackNavigationProp<RootStackParamList, "index">;

export default function Feed() {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const user = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch()

  const handleComments = (ID: number) => {
    console.log("Navigating to Comments screen", ID);
    dispatch(setPostID(ID))
    navigation.navigate("Comments");
  };

  return (
    <View>
      <PostData />
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          const isLiked = user && Array.isArray(post.Likes) && post.Likes.some((like) => like.UserID === user.ID);

          return (
            <View key={post.ID} style={styles.post}>
              <Image
                style={styles.postImage}
                source={{ uri: post.ImageURL }} // External images
              />
              <View style={styles.postActions}>
                <TouchableOpacity style={{ marginEnd: 8, flexDirection: "row" }}>
                  <FontAwesome name={isLiked ? "heart" : "heart-o"} size={20} color={isLiked ? "red" : "white"} />
                  {Array.isArray(post.Likes) && post.Likes.length > 0 && (
                    <Text style={{ marginStart: 5, color: "#fff" }}>
                      {post.Likes.length}
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginEnd: 8 }}
                  onPress={() => handleComments(post.ID)}
                >
                  <FontAwesome name="comment-o" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="share" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.postInfo}>
                <Text style={styles.username}>{post?.User?.Username}</Text>
                <Text style={styles.caption}>{post?.Caption}</Text>
              </View>
            </View>
          );
        })
      ) : (
        <Text>No posts available</Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  post: {
    backgroundColor: "#1B1B1B",
  },
  postImage: {
    width: "100%",
    height: 400,
    objectFit: "cover",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  username: {
    fontSize: 12,
    marginEnd: 5,
    fontWeight: "bold",
    color: "#fff",
  },
  caption: {
    fontSize: 12,
    color: "#f2f2f2",
    paddingBottom: 20,
  },
});
