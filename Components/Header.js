import { Text, View } from "react-native"
const customHeader = () => {
  return (
    <View style={{flexDirection:'row', margin:15 }}>
      <Text style={{fontWeight:'bold', fontSize:30, color:'white'}}>
        {props.name}
      </Text>
        
    </View>
  )
}
export default customHeader