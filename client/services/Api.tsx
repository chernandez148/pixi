import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFeed } from "@/redux/slices/feed";

function Api() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true before starting the fetch
      setError(null); // Reset any previous error

      try {
        const response = await fetch(
          "https://e6cb-149-22-80-61.ngrok-free.app/posts",
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

        const data = await response.json(); // Read the response as JSON

        dispatch(setFeed(data.posts)); // Dispatch the data to Redux store
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchPosts(); // Call the async function
  }, [dispatch]); // Ensure the dispatch function is included in the dependency array

  return null; // You can return null, or a different component based on your app's structure
}

export default Api;
