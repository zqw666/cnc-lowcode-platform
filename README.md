# 工控低代码平台 · 调研与原型

面向 CNC / MES 场景的低代码平台选型调研，以及基于 [amis](https://github.com/baidu/amis) 的可视化编辑器本地原型。

## 目录结构

```
.
├── 工控低代码方案调研报告.html      # 调研报告（可直接浏览器打开）
├── 低代码平台选型与实施建议.docx     # 同内容 Word 版
├── amis演示_产线操作台.html         # amis schema 渲染的产线操作台 demo
├── apps/
│   └── 产线总览看板.html            # 产线总览看板 demo
├── amis_sdk/                        # amis SDK 离线包（sdk.js / sdk.css / iconfont）
├── amis-editor-demo/                # amis 可视化编辑器（Vite + React）
│   ├── src/App.jsx                  # 编辑器入口，含 CNC 产线操作台 starter schema
│   ├── dist/                        # 已构建产物
│   └── package.json
└── output/                          # 报告生成流水线中间产物（md / html / yaml）
```

## 快速查看

纯静态页面，浏览器直接打开即可（无需服务器）：

- `工控低代码方案调研报告.html` — 三方案对比、选型结论、实施路径
- `amis演示_产线操作台.html` — amis schema 渲染效果
- `apps/产线总览看板.html` — 看板布局 demo

> 上述页面依赖 `amis_sdk/` 目录，请勿单独移动 HTML 文件。

## 运行可视化编辑器

```bash
cd amis-editor-demo
npm install
npx vite
```

打开终端提示的地址（默认 http://localhost:5173），左侧组件库拖入画布，右侧改属性，左上角切「预览」看运行效果，顶栏「导出 JSON」得到 amis schema。

编辑器内置的 starter schema 演示了一个 CNC 产线操作台：机床列表 CRUD + 下料操作按钮。接口地址为内网占位（`http://192.168.125.x:8888/api/...`），替换成实际后端地址即可联调。

## 技术栈

- **amis 6.13** — 百度开源的低代码前端框架，JSON schema 驱动渲染
- **amis-editor 6.13** — 配套可视化编辑器
- **Vite 5 + React 18** — 开发/构建环境

## 选型背景

甲方内部 MES 场景（Web 前端 + Node 中间层 + C# 后端 + SQL Server）中，需要一套让工艺/设备人员自行搭建操作台、看板、点检表单的方案，同时保留给后端工程师接管复杂逻辑的余地。报告中对 amis、Appsmith、简道云等方案做了能力矩阵对比，结论是 amis 这类 schema 驱动、可私有化部署、可嵌入现有前端的框架最贴合工控现场。
