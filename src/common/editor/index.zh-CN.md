---
category: Components
type: 通用
title: Editor
subtitle: 富文本编辑器
---

基于 quill 封装的 React 适用的富文本编辑器

## API

| 属性             | 说明         | 类型     | 默认值                    |
| ---------------- | ------------ | -------- | ------------------------- |
| autoSaveInterval | 自动保存间隔 | ms       | 3000                      |
| initialContent   | 初始值       | string   | html                      |
| onChange         | 内容变化回调 | function | `onChange: content => {}` |
| uploadUrl        | 图片上传地址 | url      |                           |
