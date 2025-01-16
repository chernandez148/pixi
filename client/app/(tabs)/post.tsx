import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useNavigation } from "expo-router"; // Importing the correct hook for navigation
import { Image, Text, View, StyleSheet } from "react-native";

// Define the navigation types for your app
type RootTabParamList = {
  navigate(arg0: string): unknown;
  index: undefined; // For the 'index' screen (Home)
  explore: undefined;
  post: undefined;
  videos: undefined;
  profile: undefined;
  new_post: undefined;
};

export default function Post() {
  const navigation = useNavigation<RootTabParamList>(); // Use explicit typing for navigation
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    setLoading(true); // Show loading indicator while picking an image

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update the image state with the selected image URI
      console.log("Image");
    }

    setLoading(false); // Hide loading indicator after the picker is closed
    // Navigate to the 'index' tab after closing the image picker
    if (!image) {
      navigation.navigate("index"); // Ensure "index" matches your tab name
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!image) {
        pickImage(); // Trigger image picker when Post screen is focused
      }
    }, [image]) // Only run the image picker if image is not selected
  );

  console.log(image);

  return (
    <View>
      {image && (
        <View style={styles.postContainer}>
          <Image style={styles.postImage} source={{ uri: image }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    width: 300,
    height: 300,
    margin: "auto",
    paddingTop: 50,
  },
  postImage: {
    borderRadius: 8,
    flex: 1,
    resizeMode: "cover",
  },
});
