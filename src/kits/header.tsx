'use strict';

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native';
import Theme from '../kits/theme';
import Icon from '../kits/icon';
const emptyFn = () => {};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * header模块
 * Usage
 *
 * [LeftArrow LeftTilte brandName title home search shoppingCart rightTitle rightArrow]
 */
export default class Header extends Component<any, any> {
  state = {
    isEdit: false
  };

  static defaultProps = {
    group: false,
    add: false,
    home: false,
    search: false,
    customize: false,
    shoppingCart: false,
    showSettingBtn: false,
    edit: false,
    showEdit: false,
    leftIcon: '',
    brandName: '',
    leftTitle: '',
    onGroupPress: emptyFn,
    onLeftMenuPress: emptyFn,
    onSearchPress: emptyFn,
    onAddPress: emptyFn,
    onCustomizePress: emptyFn,
    onHomePress: emptyFn,
    onShoppingCartPress: emptyFn,
    onEditPress: emptyFn,
    onShowSettingPress: emptyFn
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          activeOpacity={0.8}
          accessible={true}
          accessibilityLabel={`qm-header:back-btn`}
          hitSlop={{ top: 0, bottom: 0, left: 0, right: 20 }}
          style={styles.leftBack}
          onPress={this.props.onLeftMenuPress}
        >
          <Icon
            name={this.props.leftIcon || 'arrow-o-left'}
            size={20}
            color={Theme.colors.textSecondary}
          />
        </TouchableOpacity>
        <View style={styles.leftMenu}>
          <Text
            numberOfLines={1}
            style={[
              styles.leftTitle,
              { width: SCREEN_WIDTH - 60, textAlign: 'center' }
            ]}
          >
            {this.props.brandName}
          </Text>
        </View>
        <View style={styles.rightContainer} />
      </View>
    );
  }
}

/*是不是Android*/
var isAndroid = Platform.OS === 'android';

var styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingTop: isAndroid ? 10 : 20,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.fillBase,
    borderBottomWidth: Theme.border.widthSm,
    borderColor: Theme.border.split
  },
  leftBack: {
    position: 'absolute',
    top: isAndroid ? 10 : 20,
    left: 0,
    justifyContent: 'center',
    paddingLeft: 10,
    height: 45,
    width: 30
  },
  leftMenu: {
    flex: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  leftTitle: {
    width: SCREEN_WIDTH - 60,
    textAlign: 'center',
    color: Theme.colors.textSecondary,
    fontSize: 18
  },
  rightContainer: {
    position: 'absolute',
    top: isAndroid ? 10 : 20,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 45
  },
  right: {
    height: 45,
    justifyContent: 'center'
  }
});
