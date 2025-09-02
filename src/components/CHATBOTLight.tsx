import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Icon1.svg mevcut değil; yerine MaterialIcons kullanıldı.

const CHATBOTLight: React.FC = () => {
  return (
    <SafeAreaView style={styles.chatbotLight}>
      <View style={styles.view}>
        <View style={[styles.finpalParent, styles.finpalParentPosition]}>
          <Text style={[styles.finpal, styles.finpalTypo]}>FinPal</Text>
          <Pressable
            style={[styles.list, styles.listPosition]}
            onPress={() => {}}
          >
            <MaterialIcons
              name="chat"
              size={40}
              color="#030852"
              style={styles.iconReplacement}
            />
          </Pressable>
        </View>
        <View style={[styles.textareaFieldParent, styles.textareaShadowBox]}>
          <View style={[styles.textareaField, styles.finpalParentPosition]}>
            <Text style={[styles.text, styles.textTypo]} />
            <Text style={[styles.description, styles.textTypo]}>
              Description
            </Text>
            <View style={[styles.textarea, styles.textareaShadowBox]}>
              <Text style={[styles.value, styles.textTypo]}>Value</Text>
            </View>
            <Text style={[styles.description, styles.textTypo]}>Hint</Text>
          </View>
          <View style={[styles.frameChild, styles.frameLayout]} />
          <View style={[styles.frameItem, styles.frameLayout]} />
          <View style={[styles.frameInner, styles.frameLayout]} />
        </View>
        <View style={[styles.loremIpsumWrapper, styles.loremShadowBox]}>
          <Text style={[styles.loremIpsum, styles.finpalTypo]}>
            Lorem ipsum
          </Text>
        </View>
        <View style={[styles.loremIpsumContainer, styles.loremShadowBox]}>
          <Text style={[styles.loremIpsum, styles.finpalTypo]}>
            Lorem ipsum
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatbotLight: { flex: 1 },
  finpalParentPosition: { width: 880, left: 0, position: "absolute" },
  finpalTypo: { textAlign: "center", fontSize: 48, position: "absolute" },
  listPosition: { position: "absolute", overflow: "hidden" },
  textareaShadowBox: {
    borderWidth: 4,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(0, 0, 0, 0.4)",
    overflow: "hidden",
  },
  textTypo: { textAlign: "left", lineHeight: 56, fontSize: 40 },
  frameLayout: {
    height: 50,
    width: 50,
    backgroundColor: "#d9d9d9",
    top: 30,
    position: "absolute",
  },
  loremShadowBox: {
    height: 322,
    width: 568,
    borderColor: "#061178",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 4,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
  },
  view: { width: "100%", height: 1912, overflow: "hidden", flex: 1 },
  finpalParent: {
    top: 0,
    borderBottomWidth: 4,
    height: 152,
    borderColor: "#f0f5ff",
    backgroundColor: "rgba(133, 165, 255, 0.5)",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(0, 0, 0, 0.4)",
    width: 880,
    left: 0,
    overflow: "hidden",
  },
  finpal: {
    left: 382,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#000",
    textShadowColor: "rgba(255, 255, 255, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 22.4,
    top: 46,
  },
  list: { top: 51, left: 24, width: 48, height: 48 },
  iconReplacement: { position: "absolute", left: 4, top: 4 },
  textareaFieldParent: {
    marginLeft: -442,
    top: 1428,
    left: "50%",
    width: 884,
    height: 486,
    borderColor: "#f0f5ff",
    backgroundColor: "rgba(133, 165, 255, 0.5)",
    borderWidth: 4,
    position: "absolute",
  },
  textareaField: { height: 436, gap: 20, top: 46, width: 880, left: 0 },
  text: { color: "#1e1e1e", fontFamily: "Inter-Regular", alignSelf: "stretch" },
  description: {
    width: 600,
    color: "#757575",
    display: "none",
    fontFamily: "Inter-Regular",
  },
  textarea: {
    borderRadius: 20,
    backgroundColor: "#fff",
    borderColor: "#85a5ff",
    height: 360,
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 30,
    minWidth: 600,
    minHeight: 200,
    alignSelf: "stretch",
  },
  value: {
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#1e1e1e",
    flex: 1,
  },
  frameChild: { left: 47 },
  frameItem: { left: 152 },
  frameInner: { left: 257 },
  loremIpsumWrapper: {
    top: 196,
    left: 65,
    borderBottomRightRadius: 20,
    backgroundColor: "#f0f5ff",
  },
  loremIpsum: {
    top: 29,
    left: 35,
    color: "#030852",
    fontFamily: "Inter-Regular",
  },
  loremIpsumContainer: {
    top: 618,
    left: 247,
    borderBottomLeftRadius: 20,
    backgroundColor: "#d6e4ff",
  },
});

export default CHATBOTLight;
