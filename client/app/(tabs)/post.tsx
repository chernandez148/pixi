import React from "react";
import AWS from "aws-sdk/dist/aws-sdk-react-native"; // Use this version for React Native
import { useState } from "react";
import { useFocusEffect } from "expo-router";
import { useSelector } from "react-redux";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as FileSystem from "expo-file-system"; // Use expo-file-system instead of react-native-fs
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

// Set up AWS credentials and region

const s3 = new AWS.S3();

interface RootState {
  user: {
    user: User;
  };
}

interface User {
  ID: number;
}

export default function Post() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);

  const uploadImage = async (imageUri: string, userId: string) => {
    setLoading(true);

    try {
      // Read the image file as base64
      const fileData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Decode the base64 string to binary data using atob
      const binary = atob(fileData);

      // Convert binary string to Uint8Array
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i); // Convert each character to its byte equivalent
      }

      // Create the file object
      const file = {
        uri: imageUri,
        name: imageUri.split("/").pop(),
        type: "image/jpeg", // Adjust based on the image type
      };

      // Set S3 upload parameters
      const key = `users/${userId}/media/${file.name}`; // Folder structure in S3
      const params = {
        Bucket: "pixil-media",
        Key: key,
        Body: bytes, // Pass the Uint8Array as the file data
        ContentType: "image/jpeg", // Set the correct content type
      };

      // Upload to S3
      const data = await s3.upload(params).promise();
      console.log("Image uploaded successfully:", data);
      setImageURL(data.key); // Set the image URL in state
      console.log("ImageURL:" + imageURL);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed.");
    }

    setLoading(false);
  };

  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch image picker
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    // If user selects an image
    if (!response.canceled && response.assets) {
      const imageUri = response.assets[0].uri;
      console.log("Selected Image URI:", imageUri);
      setImage(imageUri);
      uploadImage(imageUri, `user-${user.ID}`);
    } else {
      console.log("Image picker canceled or failed");
    }
  };

  const validationSchema = Yup.object().shape({
    caption: Yup.string().required("Caption is required"),
    imageURL: Yup.string().required("Image URL is required"),
    uerID: Yup.number().required(),
  });

  const initialValues = {
    caption: "",
    imageURL: `https://d11ykvxgoxy1to.cloudfront.net/${imageURL}`,
    userID: user.ID,
  };

  const handleSubmit = (values: any, { resetForm }: FormikHelpers<any>) => {
    // Handle form submission
    console.log("Form submitted:", values);
    resetForm(); // Reset form values after submission
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!image) {
        pickImage(); // Trigger image picker when Post screen is focused
      }
    }, [image]) // Only run the image picker if image is not selected
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {image && !loading && (
        <>
          <Image style={styles.postImage} source={{ uri: image }} />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                {/* Caption Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Write a caption..."
                  value={values.caption}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                />
                {/* Error message for caption */}
                {touched.caption && errors.caption && (
                  <Text style={styles.errorText}>{errors.caption}</Text>
                )}
                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>{" "}
              </View>
            )}
          </Formik>
        </>
      )}
      {loading && <Text>Uploading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  postImage: {
    borderRadius: 8,
    width: 250,
    height: 250,
    resizeMode: "cover",
  },
  form: {
    width: "100%", // Makes the form take 100% width of the screen
  },
  input: {
    marginTop: 25,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 5,
  },
  button: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
