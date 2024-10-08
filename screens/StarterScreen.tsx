import { Link } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

const StarterScreen = () => {
    return (
        <View style={styles.container}>
            <Text> Your welcome</Text>
            <Button
                title="Back"
            />

        </View>
    )
}

export default StarterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  