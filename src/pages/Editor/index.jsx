import React, { useState } from 'react';
import highLight from 'highlight.js';
import marked from 'marked';
import { Form, Input } from 'antd';

import 'highlight.js/styles/monokai-sublime.css';
import Style from './index.module.scss';

function Editor(props) {

  const [content, setContent] = useState('');

  // marked配置
  marked.setOptions({
    //renderer: new marked.Renderer(),
    gfm: true, // GitHub标准markdown书写格式
    tables: true, // 允许表格语法
    breaks: false, // 允许回车换行
    pedantic: false, // 兼容性
    sanitize: false, // 过滤html标签
    smartLists: true, // 新型列表
    smartypants: true, // 新型标点
    highlight: function (code) {
      return highLight.highlightAuto(code).value;
    }
  });

  // 文章预览实时更新
  const contentChange = (e) => {
    setContent(marked(e.target.value));
  };

    return (
      <div>
        <Form
          layout={'vertical'}
          scrollToFirstError
          name="controrl-ref"
        >
          <Form.Item name="content" label="文章内容" rules={[{required: true, message: '请输入文章内容'}]}>
            <Input.TextArea
              autoSize={{ minRows: 20 }}
              onChange={contentChange}
            />
          </Form.Item>
          <div>
            <div>预览</div>
            <div id={'preview'} className={Style.preview} dangerouslySetInnerHTML={{__html: content}}></div>
          </div>
        </Form>
      </div>
    )
}

export default Editor;
