import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "@/redux/slices/posts";
import { Text, View } from "react-native";

export default function PostData() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://742a-162-233-243-193.ngrok-free.app/posts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setPosts(data.posts));
    } catch (error: any) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View>
      {loading ? <Text>Loading</Text> : null}
    </View>
  );
}
