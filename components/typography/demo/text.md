---
order: 2
title:
  zh-CN: 文本组件
  en-US: Text Component
---

## zh-CN

内置不同样式的文本。

## en-US

Provides multiple types of text.

```jsx
import { Typography } from 'antd';

const { Text } = Typography;

ReactDOM.render(
  <div>
    <Text>Daji Design</Text>
    <br />
    <Text type="secondary">Daji Design</Text>
    <br />
    <Text type="warning">Daji Design</Text>
    <br />
    <Text type="danger">Daji Design</Text>
    <br />
    <Text disabled>Daji Design</Text>
    <br />
    <Text mark>Daji Design</Text>
    <br />
    <Text code>Daji Design</Text>
    <br />
    <Text underline>Daji Design</Text>
    <br />
    <Text delete>Daji Design</Text>
    <br />
    <Text strong>Daji Design</Text>
  </div>,
  mountNode,
);
```
