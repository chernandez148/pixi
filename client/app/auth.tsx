import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user";
import { setAccessToken } from "@/redux/slices/accessToken";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const dispatch = useDispatch();

  // Initial values
  const initialValues = {
    username: "janedoe",
    password: "Extra004!",
  };
  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch(
        "https://11cb-162-233-243-193.ngrok-free.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(setUser(data.user));
        dispatch(setAccessToken(data.token));
      } else {
        Alert.alert(
          "Login failed",
          data.message || "Invalid username or password."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
            <>
              <Image
                source={require("../assets/images/pixi_logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                autoCapitalize="none"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.text}>Don't have an account?</Text>
                <TouchableOpacity>
                  <Text style={styles.link}> Sign up</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "white",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#600FB7",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  link: {
    color: "#600FB7",
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 5,
  },
});

export default LoginForm;
