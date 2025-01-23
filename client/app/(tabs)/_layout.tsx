import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types"; // Import RootState from your types file
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Auth from "../auth";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      {user ? (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,

            tabBarStyle: Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: "absolute",
              },
              default: {},
            }),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }: { color: string }) => (
                <Ionicons name="home-sharp" size={20} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color }: { color: string }) => (
                <AntDesign name="find" size={20} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="post"
            options={{
              title: "Post",
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="add-a-photo" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="videos"
            options={{
              title: "Videos",
              tabBarIcon: ({ color }: { color: string }) => (
                <Foundation name="video" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }: { color: string }) => (
                <FontAwesome name="user-circle-o" size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      ) : (
        <Auth />
      )}
    </>
  );
}
