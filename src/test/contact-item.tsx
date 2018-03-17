import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

export default class ContactItem extends Component<any, any>{
  render() {
    const { avatar, name, time, msg, onPress } = this.props;
    return (<TouchableOpacity onPress={() => { onPress() }} style={styles.contactItem}>
      <Avatar />
      <View style={styles.cMiddle}>
        <Text>{name}</Text>
        <Text style={{ color: '#999', fontSize: 12, lineHeight: 18 }}>{msg}</Text>
      </View>
      <Text style={{ color: '#999' }}>{time}</Text>
    </TouchableOpacity>)
  }
}

const Avatar = () => {
  return (
    <Image
      source={
        require('../img/avatar1.png')
      }
      style={styles.avatar}
    />
  );
};

const styles = StyleSheet.create({
  contactItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderBottomWidth: 0.5
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  cMiddle: {
    flex: 1,
    paddingHorizontal: 10,
  }
})