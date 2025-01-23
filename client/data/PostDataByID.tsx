import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostByID } from "@/redux/slices/postByID";
import { RootState } from "@/redux/types";

export default function PostDataByID() {
  const postID = useSelector((state: RootState) => state.postID.postID);
  const postByID = useSelector((state: RootState) => state.postByID?.postByID);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchPostsByID = async () => {
    if (!postID) {
      console.warn("Post ID is undefined");
      return;
    }

    setLoading(true);
    try {
      console.log("Fetching post with ID: ", postID);
      const response = await fetch(
        `https://2261-162-233-243-193.ngrok-free.app/post/${postID}`,
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
      dispatch(setPostByID(data));
      console.log("Fetched Data: ", data);
    } catch (error: any) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postID) {
      fetchPostsByID();
    }
  }, [postID]);

  useEffect(() => {
    console.log("Updated PostByID: ", postByID);
  }, [postByID]);

  return null;
}
