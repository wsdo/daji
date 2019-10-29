---
order: 0
title: 富文本编辑器
---

基本用法

```jsx
import { Editor } from '@kkb/daji';

class App extends React.Component {
  state = {
    content: '',
    initialContent: '',
    uploadUrl: 'https://apitool.kaikeba.com/v1/helper/upload/web',
  };

  render() {
    const { initialContent, uploadUrl } = this.state;
    const editorProps = {
      initialContent, // 初始值html
      autoSaveInterval: 3000, // 自动保存间隔, 默认3000毫秒
      uploadUrl, // 上传地址
      onChange: content => {
        this.setState({ content });
      },
    };

    return <Editor {...editorProps} />;
  }
}

ReactDOM.render(<App />, mountNode);
```
