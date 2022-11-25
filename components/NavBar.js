import { Button, View, StyleSheet, Alert } from "react-native"

const NavBar = () => {
  return (
    <View style={styles.container}>
      <Button color='white' title='New bet' onPress={() => Alert.alert('button')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FD841F',
    padding: 5,
    paddingTop: 20
  }
})

export default NavBar