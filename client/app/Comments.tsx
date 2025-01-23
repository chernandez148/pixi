import React from "react";
import PostDataByID from "@/data/PostDataByID";
import { RootState } from "@/redux/types";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function Comments() {
  const postByID = useSelector((state: RootState) => state.postByID?.postByID);

  console.log("PostIDp:", postByID);

  if (!postByID) {
    return (
      <>
        <PostDataByID />
        <Text style={{ color: "#fff" }}>Loading comments...</Text>
      </>
    );
  }

  return (
    <View style={styles.Comments}>
      <PostDataByID />
      {postByID.Comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.commentAuthor}>{comment.Author}</Text>
          <Text style={styles.commentContent}>{comment.Content}</Text>
          <TouchableOpacity>
            <Text style={styles.commentReply}>Reply</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  Comments: {
    padding: 16,
    backgroundColor: "#1B1B1B", // Example background color
    flex: 1,
  },
  commentContainer: {
    marginBottom: 12,
  },
  commentAuthor: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12
  },
  commentContent: {
    color: "#ccc",
    marginVertical: 5,
    fontSize: 12
  },
  commentReply: {
    color: "#888888",
    fontSize: 12
  }
});
