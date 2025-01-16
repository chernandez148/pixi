import Api from "@/services/Api";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { useSelector } from "react-redux";

// Define actual types for `User` and `Feed` data structures
interface User {
  ID: number;
  FollowingID: number[];
}

interface Like {
  ID: number;
  UserID: number;
  PostID: number;
}

interface UserDetail {
  ID: number;
  FullName: string;
}

interface Feed {
  Likes: Like[];
  User: UserDetail;
  ID: number;
  UserID: number;
  Caption: string;
  ImageURL: string;
}

interface RootState {
  user: {
    user: User;
  };
  feed: {
    feed: Feed[]; // Feed should be an array
  };
}

export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.user.user);
  const userFeed = useSelector((state: RootState) => state.feed.feed) || []; // Default to empty array if undefined

  // Filter feed by user and following (if necessary)
  // const feedByUserAndFollowing = userFeed.filter(
  //   (feed) => feed.UserID === user.ID
  // );

  console.log(user);
  console.log(userFeed);

  return (
    <View style={styles.container}>
      <Api />
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/pixi_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.stories}></View>
      <View style={styles.feed}>
        {userFeed.length > 0 ? (
          userFeed.map((feed) => (
            <View key={feed.ID} style={styles.postItem}>
              <Image
                source={require("../../assets/images/placeholder.jpg")}
                style={styles.postImage}
                resizeMode="cover"
              />
              <View style={styles.postEvents}>
                <TouchableOpacity
                  style={{ marginEnd: 8, flexDirection: "row" }}
                >
                  {/* Check if the current user has liked this post */}
                  {feed.Likes.some((like) => like.UserID === user.ID) ? (
                    <FontAwesome name="heart" size={20} color="red" />
                  ) : (
                    <FontAwesome name="heart-o" size={20} color="black" />
                  )}
                  <Text style={{ marginStart: 5 }}>{feed.Likes.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginEnd: 8 }}>
                  <FontAwesome name="comment-o" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="share" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.postInfo}>
                <Text style={{ fontWeight: "bold" }}>{feed.User.FullName}</Text>{" "}
                {feed.Caption}
              </Text>
            </View>
          ))
        ) : (
          <Text>No posts available</Text> // Add fallback message if no posts exist
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 10,
  },
  header: {},
  logo: {
    width: 75,
    height: 75,
  },
  stories: {},
  feed: {},
  postItem: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  postEvents: {
    paddingTop: 10,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  postInfo: {
    padding: 10,
    fontSize: 12,
  },
});
