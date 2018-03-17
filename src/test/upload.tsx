import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from '../kits/icon';

export default class UploadPage extends Component<any, any> {
  static navigationOptions = {
    title: 'Upload'
  };
  state = {
    img: []
  };
  render() {
    const { img } = this.state;
    return (
      <View style={{ padding: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
        {img.map((item, index) => (
          <View style={styles.upload} key={`index-${index}`}>
            <Image
              source={{
                uri: item
              }}
              style={styles.img}
            />
            <View style={styles.close}>
              <Icon name="close" size={9} color="#333" />
            </View>
          </View>
        ))}

        <UploadItem
          setImg={() => {
            let imgNew = img;
            imgNew.push('https://pic.qianmi.com/astore/d2c-wx/images/pro2.png');
            this.setState({
              img: imgNew
            });
          }}
        />
      </View>
    );
  }
}

const UploadItem = ({ setImg }) => {
  return (
    <View style={styles.upload}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          // console.log('--------------');
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            setImg();
          });
        }}
      >
        <View style={styles.addWrap}>
          <Text style={[styles.addText, { fontSize: 18 }]}>+</Text>
          <Text style={styles.addText}>添加</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  upload: {
    width: 80,
    height: 80,
    margin: 10,
    backgroundColor: '#f3f5f9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  close: {
    position: 'absolute',
    left: -5,
    top: -5,
    width: 20,
    height: 20,
    backgroundColor: '#f9dc65',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 3
  },
  addWrap: {
    padding: 20
  },
  addText: {
    fontSize: 12,
    color: '#908f8f',
    textAlign: 'center'
  },
  img: {
    width: 80,
    height: 80
  }
});
