import { Button, View, StyleSheet, Alert } from "react-native"

const NavBar = (props) => {
  return (
    <View style={styles.container}>
      <Button color='white' title='New bet' onPress={props.openModal}/>
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