import { Button, View, StyleSheet, Alert, Text } from "react-native"

const NavBar = (props) => {
  return (
    <View style={styles.container}>
      <Button color='white' title='New bet' onPress={props.openModal}/>
      <i class="fa-solid fa-bars"></i>
      <Text style={styles.title}>BETBOOK</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FD841F',
    padding: 5,
    paddingTop: 20
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default NavBar