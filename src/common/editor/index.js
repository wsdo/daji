import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import axios from 'axios';
import './index.css';

class Editor extends Component {
  state = {
    content: '',
  };

  timer = null;

  componentDidMount() {
    this.initEdit();
    this.editor.on('text-change', this.onChange);
    this.autoSave();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    localStorage.removeItem('quill-content');
  }

  autoSave = () => {
    clearInterval(this.timer);
    const { autoSaveInterval } = this.props;
    this.timer = setInterval(this.saveContent, autoSaveInterval || 3000);
  };

  saveContent = () => {
    const { content } = this.state;
    localStorage.setItem('quill-content', content);
  };

  onChange = (delta, oldDelta, source) => {
    const content = this.editor.root.innerHTML;
    this.setState({ content });
    const { onChange } = this.props;
    if (onChange) {
      onChange(content);
    }
  };

  initEdit = () => {
    this.editor = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar',
      },
      theme: 'snow',
    });

    const { initialContent } = this.props;
    const content = localStorage.getItem('quill-content');
    this.editor.root.innerHTML = content || initialContent;
  };

  handleImage = e => {
    e.preventDefault();
    this.upload.click();
  };

  handleUpload = async e => {
    const { uploadUrl } = this.props;
    const form = new FormData();
    form.append('file', e.target.files[0]);
    const res = await axios.post(uploadUrl, form);
    if (res && res.data) {
      const { url } = res.data.data;
      const addImageRange = this.editor.getSelection();
      const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0);
      this.editor.insertEmbed(newRange, 'image', url);
      this.editor.setSelection(1 + newRange);
    } else {
      console.log('图片上传失败');
    }
  };

  render() {
    return (
      <div className="quillEditor">
        <div id="toolbar">
          <span className="ql-formats">
            <select className="ql-font"></select>
            <select className="ql-size"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
          </span>
          <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
          </span>
          <span className="ql-formats">
            <select className="ql-header"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
            <button className="ql-indent" value="-1"></button>
            <button className="ql-indent" value="+1"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-direction" value="rtl"></button>
            <select className="ql-align"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-link"></button>
            <button onClick={this.handleImage}>
              <svg viewBox="0 0 18 18">
                {' '}
                <rect className="ql-stroke" height="10" width="12" x="3" y="4"></rect>{' '}
                <circle className="ql-fill" cx="6" cy="7" r="1"></circle>{' '}
                <polyline
                  className="ql-even ql-fill"
                  points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                ></polyline>{' '}
              </svg>
            </button>
            <button className="ql-video"></button>
            <button className="ql-formula"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-clean"></button>
          </span>
        </div>
        <div id="editor" className="editor"></div>
        <input
          ref={upload => (this.upload = upload)}
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={this.handleUpload}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  initialContent: PropTypes.string,
  autoSaveInterval: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  uploadUrl: PropTypes.string,
};

export default Editor;
