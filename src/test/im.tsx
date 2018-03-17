import React, { Component } from 'react';
import WebIM from '../App/Lib/WebIM.js';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';

import IMItem from './item';

export default class PageIM extends Component<any, any> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
  });
  state = {
    text: '',
    messageList: this.props.navigation.state.params.messageList
  };
  render() {
    var _scrollView;
    PageIM.navigationOptions = this.props.navigation.state.params.name;
    return (
      <View style={styles.page}>
        {/* <Header brandName="B.Duck旗舰店" /> */}
        <ScrollView
          onContentSizeChange={() => {
            _scrollView.scrollToEnd({ animated: true });
          }}
          style={styles.mainWarp}
          ref={scrollView => {
            _scrollView = scrollView;
          }}
        >
          <View style={{ paddingVertical: 15 }}>
            {this.state.messageList.map((item, index) => (
              <IMItem
                type={item.type}
                message={item.message}
                key={`im-item-${index}`}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.replyBox}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              let messageListNew = this.state.messageList;
              messageListNew.push({
                type: 'send',
                message: { type: 'text', text: this.state.text }
              });
              // WebIM.message;
              // 单聊发送文本消息
              let conn = WebIM.conn;
              let sendPrivateText = function (textContent, toUser) {
                let id = conn.getUniqueId(); // 生成本地消息id
                let msg = new WebIM.message('txt', id); // 创建文本消息
                msg.set({
                  msg: textContent, // 消息内容
                  to: toUser, // 接收消息对象（用户id）
                  roomType: false,
                  success: function (id, serverMsgId) {
                    console.log('send private text Success');
                  },
                  fail: function (e) {
                    console.log('Send private text error');
                  }
                });
                msg.body.chatType = 'singleChat';
                conn.send(msg.body);
              };
              sendPrivateText(this.state.text, '15250986642');
              this.setState({
                messageList: messageListNew,
                text: ''
              });
            }}
          >
            <Text style={styles.send}>发送</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f3f3'
  },
  mainWarp: {
    flex: 1,
    paddingHorizontal: 15
  },
  replyBox: {
    flexDirection: 'row',
    height: 56,
    paddingVertical: 13,
    paddingLeft: 15,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    height: 30,
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  send: { lineHeight: 28, paddingHorizontal: 15, fontSize: 16 }
});
