import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal, message, Icon } from 'antd';
import { Link } from 'bisheng/router';
import RcFooter from 'rc-footer';
import { presetPalettes } from '@ant-design/colors';
import { isLocalStorageNameSupported, loadScript, getLocalizedPathname } from '../utils';
import ColorPicker from '../Color/ColorPicker';

class Footer extends React.Component {
  lessLoaded = false;

  state = {
    color: presetPalettes.blue.primary,
  };

  componentDidMount() {
    // for some iOS
    // http://stackoverflow.com/a/14555361
    if (!isLocalStorageNameSupported()) {
      return;
    }
    // 大版本发布后全局弹窗提示
    //   1. 点击『知道了』之后不再提示
    //   2. 超过截止日期后不再提示
    if (
      localStorage.getItem('antd@3.0.0-notification-sent') !== 'true' &&
      Date.now() < new Date('2017/12/20').getTime()
    ) {
      this.infoNewVersion();
    }
  }

  getColumns() {
    const { intl = {} } = this.props;
    const isZhCN = intl.locale === 'zh-CN';
    return [
      {
        title: <FormattedMessage id="app.footer.resources" />,
        items: [
          {
            title: 'Daji Design Pro',
            url: 'https://fedoc.kaikeba.com',
            openExternal: true,
          }
        ],
      },
      {
        title: <FormattedMessage id="app.footer.community" />,
        items: [
          {
            icon: <Icon type="ant-design" />,
            title: <FormattedMessage id="app.footer.awesome" />,
            url: 'https://github.com/websemantics/awesome-ant-design',
            openExternal: true,
          },
        ],
      },
    ];
  }

  handleColorChange = color => {
    const changeColor = () => {
      const {
        intl: { messages },
      } = this.props;
      const hide = message.loading(messages['app.footer.primary-color-changing']);
      window.less
        .modifyVars({
          '@primary-color': color,
        })
        .then(() => {
          hide();
          Icon.setTwoToneColor({ primaryColor: color });
          message.success(messages['app.footer.primary-color-changed']);
          this.setState({ color });
        });
    };

    const lessUrl = 'https://gw.alipayobjects.com/os/lib/less/3.10.3/dist/less.min.js';

    if (this.lessLoaded) {
      changeColor();
    } else {
      window.less = {
        async: true,
        javascriptEnabled: true,
      };
      loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  };

  infoNewVersion() {
    const {
      intl: { messages },
    } = this.props;
    Modal.info({
      title: messages['app.publish.title'],
      content: (
        <div>
          <img
            src="https://s.shudong.wang/logo.png"
            alt="Daji Design"
          />
          <p>
            {messages['app.publish.greeting']}
            <a target="_blank" rel="noopener noreferrer" href="/changelog">
              antd@3.0.0
            </a>
            {messages['app.publish.intro']}
            {messages['app.publish.old-version-guide']}
            <a target="_blank" rel="noopener noreferrer" href="http://2x.ant.design">
              2x.ant.design
            </a>
            {messages['app.publish.old-version-tips']}
          </p>
        </div>
      ),
      okText: 'OK',
      onOk: () => localStorage.setItem('antd@3.0.0-notification-sent', 'true'),
      className: 'new-version-info-modal',
      width: 470,
    });
  }

  renderThemeChanger() {
    const { color } = this.state;
    const colors = Object.keys(presetPalettes).filter(item => item !== 'grey');
    return (
      <ColorPicker
        type="sketch"
        small
        color={color}
        position="top"
        presetColors={[
          ...colors.map(c => presetPalettes[c][5]),
          ...colors.map(c => presetPalettes[c][4]),
          ...colors.map(c => presetPalettes[c][6]),
        ]}
        onChangeComplete={this.handleColorChange}
      />
    );
  }

  render() {
    return (
      <RcFooter
        columns={this.getColumns()}
        bottom={
          <>
            Made with <span style={{ color: '#fff' }}>❤</span> by
            {/* eslint-disable-next-line react/jsx-curly-brace-presence */}{' '}
            {/* <a target="_blank" rel="noopener noreferrer" href="https://shudong.wang"> */}
              <FormattedMessage id="app.footer.company" />
            {/* </a> */}
          </>
        }
      />
    );
  }
}

export default injectIntl(Footer);
