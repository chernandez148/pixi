import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "@/redux/slices/posts"
import { setSelectedImage } from "@/redux/slices/seletecImage";
import { setFileName } from "@/redux/slices/fileName";
import { RootState, RootStackParamList } from "@/redux/types";
import { Formik, FormikHelpers } from "formik";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as Yup from "yup";

type NavigationProp = BottomTabNavigationProp<RootStackParamList, "index">;

function PostForm() {
  const fileName = useSelector((state: RootState) => state.fileName.fileName);
  const accessToken = useSelector(
    (state: RootState) => state.accessToken.accessToken
  );
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch()

  const imageURL = fileName
    ? `https://d11ykvxgoxy1to.cloudfront.net/${fileName}`
    : "";

  const validationSchema = Yup.object().shape({
    caption: Yup.string().required("Caption is required"),
    imageURL: Yup.string().required("Image URL is required"),
  });

  const initialValues = {
    caption: "",
    imageURL: imageURL,
  };

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const response = await fetch(
        "https://742a-162-233-243-193.ngrok-free.app/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Post successfully created!");
        dispatch(addPost(data.post))
        dispatch(setSelectedImage(""))
        dispatch(setFileName(""))
      } else {
        Alert.alert("Post submission failed", data.message || "Unknown error");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      resetForm();
      navigation.navigate("index");
    }
  };

  return (
    <View style={styles.formContainer}>
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
            <View>
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
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%", // Makes the form take 100% width of the screen
  },
  form: {
    justifyContent: "space-between",
    flexDirection: "column",
    height: 250,
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

export default PostForm;
