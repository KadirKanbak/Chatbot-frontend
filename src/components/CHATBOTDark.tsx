import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
// Icon1.svg yok; MaterialIcons fallback.

const CHATBOTDark: React.FC = () => {
  return (
    <SafeAreaView style={styles.chatbotDark}>
      <View style={styles.view}>
        {/* Header */}
        <View style={styles.finpalParent}>
          <Text style={styles.finpal}>FinPal</Text>
          <View style={styles.list}>
            <MaterialIcons
              name="chat"
              size={40}
              color="#fff"
              style={styles.icon}
            />
          </View>
        </View>

        {/* Alt Panel (textarea alanı + dekor kutular) */}
        <View style={styles.textareaFieldParent}>
          <View style={styles.textareaField}>
            <Text style={[styles.text, styles.textTypo]} />
            <Text style={[styles.description, styles.textTypo]}>
              Description
            </Text>
            <View style={styles.textarea}>
              <Text style={[styles.value, styles.textTypo]}>Value</Text>
            </View>
            <Text style={[styles.description, styles.textTypo]}>Hint</Text>
          </View>
          <View style={[styles.frameChild, styles.frameLayout]} />
          <View style={[styles.frameItem, styles.frameLayout]} />
          <View style={[styles.frameInner, styles.frameLayout]} />
        </View>

        {/* Örnek iki sohbet kutusu */}
        <View style={[styles.loremIpsumWrapper, styles.loremShadowBox]}>
          <Text style={[styles.loremIpsum, styles.loremTypo]}>Lorem ipsum</Text>
        </View>
        <View style={[styles.loremIpsumContainer, styles.loremShadowBox]}>
          <Text style={[styles.chatbotDarkLoremIpsum, styles.loremTypo]}>
            Lorem ipsum
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatbotDark: { flex: 1 },
  parentPosition: { width: 880, left: 0, position: "absolute" },
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 4,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    position: "absolute",
  },
  loremTypo: {
    textAlign: "center",
    fontSize: 48,
    left: 35,
    top: 29,
    fontFamily: "Inter-Regular",
    position: "absolute",
  },
  // Eski işlem kutuları kaldırıldı
  view: { width: "100%", height: 1912, overflow: "hidden", flex: 1 },
  textareaFieldParent: {
    marginLeft: -442,
    top: 1428,
    left: "50%",
    backgroundColor: "rgba(29, 57, 196, 0.5)",
    width: 884,
    height: 486,
    borderWidth: 4,
    borderColor: "#030852",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(255, 255, 255, 0.4)",
    position: "absolute",
    overflow: "hidden",
  },
  textareaField: { height: 436, gap: 20, top: 46 },
  text: {
    color: "#1e1e1e",
    textAlign: "left",
    lineHeight: 56,
    fontSize: 40,
    fontFamily: "Inter-Regular",
    alignSelf: "stretch",
  },
  description: {
    width: 600,
    color: "#757575",
    display: "none",
    fontFamily: "Inter-Regular",
    textAlign: "left",
    lineHeight: 56,
    fontSize: 40,
  },
  textarea: {
    backgroundColor: "#fff",
    borderColor: "#85a5ff",
    height: 360,
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 30,
    minWidth: 600,
    minHeight: 200,
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    alignSelf: "stretch",
    borderWidth: 4,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    overflow: "hidden",
  },
  value: {
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#1e1e1e",
    textAlign: "left",
    lineHeight: 56,
    fontSize: 40,
    flex: 1,
  },
  frameChild: { left: 47 },
  frameItem: { left: 152 },
  frameInner: { left: 257 },
  loremIpsumWrapper: {
    top: 196,
    left: 65,
    borderBottomRightRadius: 20,
    borderColor: "#f0f5ff",
    backgroundColor: "#030852",
    height: 322,
    width: 568,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  loremIpsum: { color: "#f0f5ff" },
  loremIpsumContainer: {
    top: 618,
    left: 247,
    borderBottomLeftRadius: 20,
    backgroundColor: "#d6e4ff",
    borderColor: "#061178",
    height: 322,
    width: 568,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  chatbotDarkLoremIpsum: { color: "#030852" },
  // kaldırılan kutu stilleri
  finpalParent: {
    top: 0,
    backgroundColor: "rgba(3, 8, 82, 0.5)",
    borderBottomWidth: 4,
    height: 152,
    width: 880,
    borderColor: "#030852",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(255, 255, 255, 0.4)",
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  finpal: {
    left: 382,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fff",
    textAlign: "center",
    fontSize: 48,
    top: 46,
    position: "absolute",
  },
  list: { top: 51, left: 24, width: 48, height: 48, position: "absolute" },
  icon: { position: "absolute", left: 4, top: 4 },
});

export default CHATBOTDark;
