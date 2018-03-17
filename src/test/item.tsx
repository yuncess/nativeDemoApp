import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class IMItem extends Component<any, any> {
  render() {
    const { type, message } = this.props;
    if (type === 'send') {
      return (
        <View
          style={[
            styles.imItem,
            type === 'send' && { justifyContent: 'flex-end' }
          ]}
        >
          {message.type === 'text' && (
            <MsgBox type="send" text={message.text} />
          )}
          {message.type === 'image' && <ImgBox src={message.src} />}
          <Avatar type="send" />
        </View>
      );
    } else {
      return (
        <View style={styles.imItem}>
          <Avatar type="receive" />
          {message.type === 'text' && (
            <MsgBox type="receive" text={message.text} />
          )}
        </View>
      );
    }
  }
}

const MsgBox = ({ type, text }) => {
  return (
    <View
      style={[
        styles.msgBox,
        type === 'send' && { marginRight: 10, backgroundColor: '#96ce4f' }
      ]}
    >
      <View style={type === 'send' ? styles.arrowRight : styles.arrowLeft} />
      <Text style={[styles.msgText]}>{text}</Text>
    </View>
  );
};

const ImgBox = ({ src }) => {
  return (
    <View>
      <Image
        source={{
          uri: src
        }}
        style={styles.imgBox}
      />
    </View>
  );
};

const Avatar = ({ type }) => {
  return (
    <Image
      source={
        type === 'send'
          ? require('../img/avatar2.png')
          : require('../img/avatar1.png')
      }
      style={styles.avatar}
    />
  );
};

const styles = StyleSheet.create({
  imItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8
  },
  msgBox: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginLeft: 10,
    maxWidth: '60%'
  },
  msgText: {
    color: '#333',
    lineHeight: 20
  },
  arrowLeft: {
    position: 'absolute',
    left: -15,
    top: 12,
    width: 0,
    height: 0,
    borderWidth: 8,
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderRightColor: '#fff',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent'
  },
  arrowRight: {
    position: 'absolute',
    right: -15,
    top: 12,
    width: 0,
    height: 0,
    borderWidth: 8,
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderLeftColor: '#96ce4f',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent'
  },
  imgBox: { width: 100, height: 150, marginRight: 10, borderRadius: 8 }
});
