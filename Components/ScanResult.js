import React from "react";
import { View, Pressable, Text } from "react-native";
import { useTheme } from "./Color";
import Success from "react-native-vector-icons/Feather"
import Error from "react-native-vector-icons/MaterialIcons"
const ScannedResult = ({route}) =>{
    const {value} =route.params
    const colors = useTheme()
    return(
        <View>
            {value==="Scanned Successfully" ? 
                            <View style={styles.result}>
                                <Success name="check-circle" size={100} color={colors.success}/>
                                <Text style={[styles.resultText, {color:colors.success}]}> {value}</Text>
                                <Pressable style={[styles.resultBtn, {borderColor : colors.success}]} onPress={() =>navigation.goBack()}>
                                    <Text style={[styles.resultBtnText, {color:colors.success}]}>Ok</Text>
                                </Pressable>
                            </View> : 
                            <View style={styles.result}>
                                <Error name="error-outline" size={100} color={colors.error}/> 
                                <Text style={[styles.resultText, {color:colors.error}]}>{value}</Text>
                                <Pressable style={[styles.resultBtn, {borderColor :colors.error}]} onPress={()=>setIsScanned(true)}>
                                    <Text style={[styles.resultBtnText, {color:colors.error}]}>Scan Again</Text>
                                </Pressable>
                            </View>}
        </View>
    )
}

export default ScannedResult