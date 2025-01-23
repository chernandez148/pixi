import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, RootStackParamList } from "@/redux/types";
import { setSelectedImage } from "@/redux/slices/seletecImage";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import uploadImage from "../../utils/uploadImage";
import PostForm from "@/components/PostForm";

type NavigationProp = BottomTabNavigationProp<RootStackParamList, "index">;

export default function Post() {
  const [loading, setLoading] = useState(false);
  const selectedImage = useSelector((state: RootState) => state.selectedImage.selectedImage)
  const fileName = useSelector((state: RootState) => state.fileName?.fileName);
  const navigation = useNavigation<NavigationProp>();

  const dispatch = useDispatch()

  // Get user from Redux
  const user = useSelector((state: RootState) => state.user.user); // Ensure state.user exists and has an ID

  // Access phone gallery to upload image
  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required.");
      return;
    }

    // Launch image picker
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // If user selects an image
    if (!response.canceled && response.assets?.length) {
      const imageURI = response.assets[0].uri;

      // Validate user ID and imageURI before proceeding
      if (!user?.ID) {
        alert("User ID is missing.");
        return;
      }

      try {
        setLoading(true);
        dispatch(setSelectedImage(imageURI));
        uploadImage(imageURI, `user-${user.ID}`, dispatch);
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image.");
      } finally {
        setLoading(false);
      }
    } else {
      navigation.navigate("index");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!selectedImage) {
        pickImage(); // Trigger image picker when Post screen is focused
      }
    }, [selectedImage]) // Only run the image picker if image is not selected
  );

  return (
    <View style={styles.container}>
      {/* Show loading spinner if image is being uploaded */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* Display the selected image */}
          {fileName && selectedImage && (
            <>
              <Image source={{ uri: selectedImage }} style={styles.postImage} />
              <PostForm />
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0e1111",
  },
  postImage: {
    width: 300,
    height: 250,
    borderRadius: 8,
  },
});
