import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import PostData from "@/data/PostData";

export default function Feed() {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <View>
      <PostData />
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <View key={post.ID} style={styles.post}>
            <Image
              style={styles.postImage}
              source={{ uri: post.ImageURL }} // Use 'uri' for external images
            />
            <View style={styles.postActions}>
              <TouchableOpacity style={{ marginEnd: 8, flexDirection: "row" }}>
                {/* Check if the current user has liked this post */}
                {user &&
                Array.isArray(post.Likes) &&
                post.Likes.some((like) => like.UserID === user.ID) ? (
                  <FontAwesome name="heart" size={20} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={20} color="white" />
                )}
                {Array.isArray(post.Likes) && post.Likes.length > 0 && (
                  <Text style={{ marginStart: 5 }}>{post.Likes.length}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={{ marginEnd: 8 }}>
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
        ))
      ) : (
        <Text>No posts available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: "#0e1111",
  },
  postImage: {
    width: "100%",
    height: 300,
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
    color: "#fff"

  },
  caption: {
    fontSize: 12,
    color: "#f2f2f2",
    paddingBottom: 20
  },
});
