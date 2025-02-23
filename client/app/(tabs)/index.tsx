import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Feed from "@/components/Feed";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.homeScreen}>
          <View style={styles.homeScreenHeader}>
            <Image
              source={require("../../assets/images/pixi_logo_white.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.stories}></View>
          <View style={styles.feed}>
            <Feed />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: "#1B1B1B",
  },
  homeScreenHeader: {
    paddingTop: 20,
    paddingStart: 5,
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 20,
  },
  stories: {},
  feed: {},
});
