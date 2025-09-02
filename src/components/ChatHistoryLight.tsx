import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Icon1.svg dosyası mevcut olmadığı için MaterialIcons ile yedek ikon kullanıldı.

const ChatHistoryLight = () => {
  return (
    <SafeAreaView style={styles.chatHistoryLight}>
      <View style={styles.view}>
        <View style={styles.textareaFieldParent}>
          <View style={[styles.textareaField, styles.parentPosition]}>
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
        <View style={[styles.loremIpsumWrapper, styles.loremShadowBox]}>
          <Text style={styles.loremIpsum}>Lorem ipsum</Text>
        </View>
        <View style={[styles.loremIpsumContainer, styles.loremShadowBox]}>
          <Text style={styles.loremIpsum}>Lorem ipsum</Text>
        </View>
        <View style={[styles.frameParent, styles.parentPosition]}>
          <View
            style={[
              styles.yaplanLemRnek1Wrapper,
              styles.yaplanWrapperShadowBox,
            ]}
          >
            <Text style={[styles.yaplanLemRnek, styles.yaplanLemRnekTypo]}>
              Yapılan İşlem Örnek 1
            </Text>
          </View>
          <View
            style={[
              styles.yaplanLemRnek2Wrapper,
              styles.yaplanWrapperShadowBox,
            ]}
          >
            <Text style={[styles.yaplanLemRnek, styles.yaplanLemRnekTypo]}>
              Yapılan İşlem Örnek 2
            </Text>
          </View>
          <View
            style={[
              styles.yaplanLemRnek3Wrapper,
              styles.yaplanWrapperShadowBox,
            ]}
          >
            <Text style={[styles.yaplanLemRnek, styles.yaplanLemRnekTypo]}>
              Yapılan İşlem Örnek 3
            </Text>
          </View>
          <View
            style={[
              styles.yaplanLemRnek4Wrapper,
              styles.yaplanWrapperShadowBox,
            ]}
          >
            <Text style={[styles.yaplanLemRnek, styles.yaplanLemRnekTypo]}>
              Yapılan İşlem Örnek 4
            </Text>
          </View>
          <View
            style={[
              styles.yaplanLemRnek5Wrapper,
              styles.yaplanWrapperShadowBox,
            ]}
          >
            <Text style={[styles.yaplanLemRnek, styles.yaplanLemRnekTypo]}>
              Yapılan İşlem Örnek 5
            </Text>
          </View>
        </View>
        <View style={[styles.gemiKonumalarParent, styles.parentPosition]}>
          <Text style={[styles.gemiKonumalar, styles.yaplanLemRnekTypo]}>
            Geçmiş Konuşmalar
          </Text>
          <Pressable style={styles.list} onPress={() => {}}>
            <MaterialIcons name="list" size={32} color="#030852" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatHistoryLight: { flex: 1 },
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
    borderColor: "#061178",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 4,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(0,0,0,0.4)",
    position: "absolute",
  },
  yaplanWrapperShadowBox: {
    paddingVertical: 24,
    paddingHorizontal: 48,
    justifyContent: "center",
    alignItems: "center",
    width: 650,
    borderColor: "#030852",
    left: 115,
    backgroundColor: "#f0f5ff",
    borderRadius: 20,
    borderWidth: 4,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    overflow: "hidden",
  },
  yaplanLemRnekTypo: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 48,
  },
  view: { width: "100%", height: 1912, overflow: "hidden", flex: 1 },
  textareaFieldParent: {
    marginLeft: -442,
    top: 1428,
    left: "50%",
    width: 884,
    height: 486,
    borderWidth: 4,
    borderColor: "#f0f5ff",
    borderStyle: "solid",
    backgroundColor: "rgba(133,165,255,0.5)",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(0,0,0,0.4)",
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
    alignSelf: "stretch",
    borderWidth: 4,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(0,0,0,0.4)",
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
    backgroundColor: "#f0f5ff",
    height: 322,
    width: 568,
    borderColor: "#061178",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  loremIpsum: {
    top: 29,
    left: 35,
    textAlign: "center",
    fontSize: 48,
    color: "#030852",
    fontFamily: "Inter-Regular",
    position: "absolute",
  },
  loremIpsumContainer: {
    top: 618,
    left: 247,
    borderBottomLeftRadius: 20,
    backgroundColor: "#d6e4ff",
    height: 322,
    width: 568,
    borderColor: "#061178",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  frameParent: {
    top: 150,
    backgroundColor: "#85a5ff",
    height: 1762,
    overflow: "hidden",
  },
  yaplanLemRnek1Wrapper: { top: 89 },
  yaplanLemRnek: {
    width: 642,
    color: "#030852",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  yaplanLemRnek2Wrapper: { top: 260 },
  yaplanLemRnek3Wrapper: { top: 431 },
  yaplanLemRnek4Wrapper: { top: 602 },
  yaplanLemRnek5Wrapper: { top: 773 },
  gemiKonumalarParent: {
    top: 0,
    borderBottomWidth: 4,
    height: 152,
    borderColor: "#f0f5ff",
    borderStyle: "solid",
    backgroundColor: "rgba(133,165,255,0.5)",
    shadowOpacity: 1,
    elevation: 22.4,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(0,0,0,0.4)",
    left: 0,
    overflow: "hidden",
  },
  gemiKonumalar: {
    left: 222,
    color: "#000",
    textShadowColor: "rgba(255,255,255,0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 22.4,
    top: 46,
    position: "absolute",
  },
  list: {
    top: 51,
    left: 24,
    width: 48,
    height: 48,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatHistoryLight;
