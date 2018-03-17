import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Button, Text, StyleSheet } from 'react-native';
import PageIM from './im';
import UploadPage from './upload';
import WebIM from '../App/Lib/WebIM.js';
import ContactItem from './contact-item';

let self = null;

//登录
var options = {
  apiUrl: WebIM.config.apiURL,
  user: '15250986650',
  pwd: 'Zqy1007',
  appKey: WebIM.config.appkey
};

if (WebIM.conn.isOpened()) {
  WebIM.conn.close('logout')
}
WebIM.conn.open(options);



class Home extends Component<any, any> {
  static navigationOptions = {
    title: 'Home'
  };
  state = {
    roster: [],
  }
  componentDidMount() {
    //监听
    WebIM.conn.listen({
      onOpened() {
        //获取好友列表
        WebIM.conn.getRoster({
          success: function (roster) {
            roster.map((item, index) => {
              roster[index]['newCount'] = 0;
              roster[index]['messageList'] = [
                {
                  type: 'receive',
                  message: {
                    type: 'text', text: '你好，在吗？',
                    time: ''
                  }
                },
                {
                  type: 'send',
                  message: {
                    type: 'text', text: '在的，请问有什么可以帮助您的？',
                    time: ''
                  }
                },
                {
                  type: 'receive',
                  message: {
                    type: 'text',
                    text: '我想问一下，你们iphone8有256G的吗？',
                    time: ''
                  }
                },
                {
                  type: 'send',
                  message: {
                    type: 'text', text: '有的',
                    time: ''
                  }
                },
                {
                  type: 'send',
                  message: {
                    type: 'image',
                    src: 'https://pic.qianmi.com/astore/d2c-wx/images/pro2.png',
                    time: ''
                  }
                },
                {
                  type: 'receive',
                  message: {
                    type: 'text', text: '好的，我待会去下个单。谢谢',
                    time: ''
                  }
                },
                {
                  type: 'send',
                  message: {
                    type: 'text', text: '不客气',
                    time: ''
                  }
                }
              ];
            });
            if (self) {
              self.setState({
                roster: roster
              });
            }
          },
          error: (error) => {
            console.log(">>>>>>>>>>>>>" + error);
          }
        });
      },
      onTextMessage: function onTextMessage(message) {
        const { from, data } = message;
        const { roster } = self.state;
        let targetIndex = 0;
        roster.map((item, index) => {
          if (item.name == from) {
            targetIndex = index;
          }
        });
        let rosterNew = roster;
        rosterNew[targetIndex].newCount = roster[targetIndex].newCount + 1;
        rosterNew[targetIndex].messageList.push({
          type: 'receive',
          message: {
            type: 'text',
            text: data,
            time: new Date().toTimeString()
          }
        });
        if (targetIndex != 0) {
          const rosterLast = rosterNew.pop();
          rosterNew.unshift(rosterLast);
        }
        self.setState({ roster: rosterNew });
      },
      onError: function (message) {
        //error
      },
    });
  }
  render() {
    self = this;
    const { navigate } = this.props.navigation;
    const { roster } = this.state;
    let newCountAll = 0;
    roster.map((item) => {
      newCountAll += item.newCount;
    });
    return (
      <View>
        <View style={styles.countAll}><View style={styles.countAllChd}><Text style={{ color: '#fff' }}>{newCountAll}</Text></View></View>
        {roster.map((item, index) => {
          return <ContactItem
            key={index}
            name={`${item.name} (${item.newCount})`}
            time={item.messageList[item.messageList.length - 1].message.time.substr(0, 8)}
            msg={item.messageList[item.messageList.length - 1].message.text}
            onPress={() => navigate('IM', {
              messageList: item.messageList,
              name: item.name
            })} />
        })}
        {/* <Button
          onPress={() => navigate('UPLOAD')}
          title="page upload"
          accessibilityLabel="Learn more about this purple button"
        /> */}
      </View>
    );
  }
}

const App = StackNavigator({
  HOME: { screen: Home },
  IM: { screen: PageIM },
  UPLOAD: {
    screen: UploadPage
  }
});

const styles = StyleSheet.create({
  countAll: {
    paddingBottom: 5,
    marginBottom: 10,
    height: 800,
    marginTop: -770,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    shadowColor: '#ddd',
    shadowOpacity: .9,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
  },
  countAllChd: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#ea6e59'
  },
});

export default App;
