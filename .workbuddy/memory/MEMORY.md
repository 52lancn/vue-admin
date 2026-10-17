# vue-admin 项目长期备忘

## 环境约定
- pnpm 12 + Node 22。包管理器配置在 `pnpm-workspace.yaml`（pnpm 12 不再读 .npmrc 的 node-linker）。
- 项目固定使用 `nodeLinker: hoisted`（本机 isolated 模式 junction 链接失效，属环境问题，勿改回）。
- dev server 端口 5174（5173 被其他项目占用）。

## 升级后版本基线（2026-10-15）
- vue 3.5 / vite 8（rolldown 打包，无 esbuild）/ vue-router 5 / pinia 4 / echarts 6 + vue-echarts 8 / TS 5.9 + vue-tsc 3。
- echarts 6 注意：分类轴 axisLabel.formatter 的 value 是 string；graphic 等从 'echarts/core' 导入。
- vite 8 构建慢点主要在 arco less 插件 transform，属正常。

## 结构约定
- 路由模块放 src/router/routes/modules/*.ts，glob 自动注册，meta.order 控制菜单顺序。
- mock 与视图同目录（如 src/views/xxx/mock.ts），需在 src/mock/index.ts 注册。
- 新增页面需同时建 view + api + mock，三者命名与路由对应。
