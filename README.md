# Vue Admin 中后台管理系统

![Vue](https://img.shields.io/badge/Vue-3.5-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg)
![Arco Design](https://img.shields.io/badge/Arco_Design-2.58-orange.svg)
![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

一个基于 Vue 3 + TypeScript + Vite + Arco Design Vue 构建的现代化中后台管理系统模板。开箱即用，提供完整的企业级前端解决方案。

## ✨ 特性

### 🚀 技术栈
- **Vue 3.5 + TypeScript** - 最新前端框架与类型安全
- **Vite 8** - 极速构建工具（基于 Rolldown 打包）
- **Arco Design Vue 2.58** - 企业级 UI 组件库
- **Pinia 4** - 现代化的状态管理
- **Vue Router 5** - 路由管理
- **ECharts 6** - 数据可视化图表
- **ESLint + TypeScript** - 代码规范与检查

### 📦 内置功能
- ✅ **用户认证系统** - 登录/注册/权限验证
- ✅ **权限控制** - 路由级别权限管理
- ✅ **多级菜单** - 支持无限级嵌套的侧边栏菜单
- ✅ **响应式布局** - 完美适配桌面、平板、手机
- ✅ **主题定制** - 支持深色/浅色主题切换
- ✅ **国际化** - 多语言支持
- ✅ **Mock 数据** - 本地开发完整的数据模拟
- ✅ **组件示例** - 丰富的基础组件示例
- ✅ **图表展示** - 集成 ECharts 可视化图表
- ✅ **环境配置** - 多环境配置支持
- ✅ **GitHub Pages** - 自动部署配置

### 🎨 UI设计
- 现代化简洁的设计风格
- 精心调校的配色方案（品牌色：#0baf4d）
- 深色主题优化支持
- 响应式网格布局系统

## 📁 项目结构

```
vue-admin/
├── src/
│   ├── api/           # 接口请求封装
│   ├── assets/        # 静态资源
│   ├── components/    # 全局组件
│   ├── composables/   # 组合式函数
│   ├── directives/    # 自定义指令
│   ├── enums/         # 枚举类型
│   ├── hooks/         # React 风格 Hooks
│   ├── lang/          # 国际化
│   ├── layout/        # 布局组件
│   ├── router/        # 路由配置
│   │   └── routes/    # 路由模块化配置
│   ├── store/         # Pinia 状态管理
│   ├── styles/        # 全局样式
│   ├── types/         # TypeScript 类型定义
│   ├── utils/         # 工具函数
│   └── views/         # 页面组件
├── public/            # 公共资源
├── mock/              # Mock 数据
└── ...
```

## 🚀 快速开始

### 环境要求
- Node.js ≥ 16.x
- pnpm ≥ 8.x（推荐）或 npm ≥ 8.x 或 yarn

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/52lancn/vue-admin.git
cd vue-admin

# 安装依赖（推荐使用 pnpm）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
# 启动开发服务器（默认端口：5174）
pnpm dev

# 或指定端口
pnpm dev --port=3000
```

### 构建生产版本

```bash
# TypeScript 类型检查 + 构建
pnpm build

# 仅构建（跳过类型检查）
pnpm build-only

# 预览生产构建
pnpm preview
```

## 🔧 配置说明

### 环境变量

项目支持多环境配置，环境变量文件位于项目根目录：

- `.env` - 默认配置
- `.env.development` - 开发环境
- `.env.production` - 生产环境

常用配置项：
```bash
# 基础路径（用于 GitHub Pages 部署）
VITE_BASE_PATH=/
# API 基础地址
VITE_API_BASE_URL=/api
# 应用名称
VITE_APP_TITLE=Vue Admin
```

### 端口配置

默认开发服务器端口为 `5174`（因为 5173 被其他项目占用），可以在 `vite.config.ts` 中修改：

```typescript
// vite.config.ts
server: {
  port: 5174, // 修改为需要的端口
}
```

## 📚 使用指南

### 路由配置

路由采用模块化配置，在 `src/router/routes/modules/` 目录下创建模块文件：

```typescript
// src/router/routes/modules/dashboard.ts
export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: '仪表盘',
    icon: 'dashboard',
    order: 1, // 控制菜单顺序
    requiresAuth: true, // 需要登录
  },
}
```

### 权限控制

路由级别的权限控制通过 `meta.requiresAuth` 控制，可以在路由守卫中进行拦截：

```typescript
// src/router/index.ts
import { createRouter } from '@/router'
// 自动注册所有路由模块
```

### Mock 数据

Mock 数据与视图同目录存储，例如 `src/views/user/mock.ts`，需要在 `src/mock/index.ts` 中注册：

```typescript
// src/views/user/mock.ts
export default {
  'GET /api/user/list': {
    code: 200,
    message: 'success',
    data: {
      list: [...],
      total: 100
    }
  }
}
```

### 组件使用

项目内置了多种常用组件模式：

```vue
<template>
  <a-card title="示例卡片">
    <!-- 使用 Arco Design 组件 -->
    <a-button type="primary">主要按钮</a-button>
    <a-button>默认按钮</a-button>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

// 使用 Pinia 状态管理
const userStore = useUserStore()
</script>
```

## 🎯 开发说明

### 技术栈版本
- **Vue 3.5** + Vue Router 5 + Pinia 4
- **ECharts 6** - 注意：分类轴 `axisLabel.formatter` 的 value 是 string 类型
- **Vite 8** - 使用 Rolldown 打包引擎（无 esbuild）
- **TypeScript 5.9** + vue-tsc 3

### 包管理器
项目使用 **pnpm 12** 并配置了 `nodeLinker: hoisted`（本机 isolated 模式 junction 链接失效，属环境问题，请勿修改）。

### 新增页面流程
新增页面时需要同时创建三个文件：
1. **视图组件** - `src/views/xxx/index.vue`
2. **API 接口** - `src/api/xxx.ts`
3. **Mock 数据** - `src/views/xxx/mock.ts`

确保三者命名与路由路径对应。

## 🌐 部署

### 1. Vercel 部署（推荐）

项目已配置 Vercel 部署文件，支持一键部署到 Vercel 平台：

#### 方法一：通过 Vercel 网页界面（最简单）
1. 将项目推送到 GitHub/GitLab
2. 访问 https://vercel.com
3. 导入你的仓库并点击部署

#### 方法二：通过 Vercel CLI
```bash
# 安装 CLI
npm install -g vercel

# 登录并部署
cd 项目目录
vercel login
vercel --prod
```

配置文件中已包含：
- `vercel.json` - Vercel 部署配置（SPA 路由重写）
- `.vercelignore` - 忽略开发不必要文件
- `.github/workflows/deploy-vercel.yml` - GitHub Actions 工作流

### 2. GitHub Pages 自动部署

项目已配置 GitHub Actions 工作流，推送到 `main` 分支后会自动构建并部署到 GitHub Pages：

```bash
# 推送到远程仓库
git push origin main
```

首次部署前需要在仓库设置中启用 GitHub Pages：
1. 进入仓库 Settings > Pages
2. Build and deployment > Source 选择 **GitHub Actions**
3. 如果工作流报 `Get Pages site failed: Not Found`，通常是 Pages 尚未启用，完成设置后重新运行工作流即可

### 3. 手动构建部署

```bash
# 构建生产版本
pnpm build

# 生成 dist 目录
# 将 dist 目录内容部署到您的服务器
```

### 部署文件说明

- `vercel.json` - Vercel 配置文件
- `.vercelignore` - 部署忽略文件
- `DEPLOY.md` - 部署指南
- `DEPLOY-GUIDE.md` - 详细部署步骤
- `vite.config.ts` - 已配置 `base` 路径支持部署

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

### 代码规范
- 使用 TypeScript 并开启严格模式
- 遵循项目的 ESLint 配置
- 提交前运行 `pnpm type-check` 确保类型正确

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Arco Design](https://arco.design/) - 企业级设计系统
- [Vite](https://vitejs.dev/) - 下一代前端工具链
- [ECharts](https://echarts.apache.org/) - 强大的可视化图表库

## 📞 联系

如有问题或建议，请提交 [Issue](https://github.com/52lancn/vue-admin/issues)。

---

**⭐ 如果这个项目对您有帮助，请给它一颗星！**