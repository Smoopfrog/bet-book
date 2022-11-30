import { StyleSheet, Text, View } from "react-native";

const FooterBar = () => {
  return (
    <View style={styles.container}>
      <Text>
        Footer Bar
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    height: 0,
    position: 'fixed',
  }
})

export default FooterBar;