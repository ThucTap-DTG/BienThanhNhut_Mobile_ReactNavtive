import React from "react";
import { View, ActivityIndicator, Modal, StyleSheet } from "react-native";

const Loading = ({ isLoading }: any) => (
  <Modal
    transparent={true}
    animationType={"none"}
    visible={isLoading}
    onRequestClose={() => {}}
  >
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator animating={isLoading} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicatorWrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loading;
