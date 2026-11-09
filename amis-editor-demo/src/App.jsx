import React from 'react';
import { Editor } from 'amis-editor';

const starter = {
  type: 'page',
  title: 'CNC 产线操作台',
  remarks: '左侧组件库里拖任意组件进画布试试',
  body: [
    {
      type: 'crud',
      name: 'machines',
      api: 'http://localhost:8888/api/machines',
      columns: [
        { name: 'id', label: '机床' },
        { name: 'brand', label: '品牌' },
        { name: 'statusLabel', label: '状态' }
      ]
    },
    {
      type: 'button',
      label: '下料',
      level: 'danger',
      actionType: 'ajax',
      api: { method: 'post', url: 'http://localhost:8888/api/unload_machine' },
      confirmText: '确认对本机床执行下料？'
    }
  ]
};

export default function App() {
  const [schema, setSchema] = React.useState(starter);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '6px 12px', background: '#1e1e1e', color: '#fff', fontSize: 13 }}>
        amis 可视化编辑器（本地版）—— 左侧拖组件进画布，右侧改属性；左上角可切"预览"看运行效果
        <button
          style={{ marginLeft: 16, cursor: 'pointer' }}
          onClick={() => {
            const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'page-schema.json';
            a.click();
          }}
        >
          导出 JSON
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Editor
          theme="cxd"
          value={schema}
          onChange={setSchema}
          preview={false}
          isMobile={false}
        />
      </div>
    </div>
  );
}
