import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "utils/constant/fonts";

const DrawerContent: React.FC<any> =(props) =>{
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.container}>
        <Text style={styles.title}>Welcome,</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      padding: 20
    },
    title: {
      fontSize: 20,
      fontFamily: fonts.medium,
      opacity: 0.8

    }
  })


  export default DrawerContent