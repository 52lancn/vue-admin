# Vercel 部署指南

这是一个 Vue 3 + Vite + TypeScript + Arco Design Vue 的管理系统项目，已配置好 Vercel 部署。

## 部署步骤

### 方法一：通过 Vercel 网页界面部署

1. **准备项目**
   - 确保已提交 `vercel.json` 和 `.vercelignore` 文件到 Git
   - 将项目推送到 GitHub、GitLab 或 Bitbucket 仓库

2. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub/GitLab 账号登录

3. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你的仓库
   - 保持默认配置（Vercel 会自动识别为 Vite 项目）
   - 点击 "Deploy"

4. **等待部署完成**
   - 部署完成后会获得一个 `vercel.app` 域名的链接
   - 可以点击 "Visit" 访问网站

### 方法二：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   # 在项目根目录执行
   vercel
   
   # 或直接部署到生产环境
   vercel --prod
   ```

## 部署配置详解

### 关键配置文件

1. **vercel.json** - Vercel 部署配置
   - 使用 Vite 框架检测
   - 配置 SPA 路由重写规则
   - 设置 Node.js 22 版本
   - 配置构建命令和输出目录

2. **.vercelignore** - 忽略不必要的文件
   - 忽略开发环境文件
   - 忽略构建缓存和日志
   - 忽略 IDE 配置文件

### 环境变量

如果需要配置环境变量，可以在 Vercel 项目设置中添加：

- `VITE_BASE_PATH` - 应用的基础路径（默认为 `/`）
- 其他 Vite 环境变量

## 故障排查

### 构建失败
1. 检查 Node.js 版本是否正确（需要 Node.js 22）
2. 检查依赖是否正确安装
3. 查看 Vercel 构建日志

### 路由问题
1. 确保 SPA 路由重写规则正确
2. 检查 `vite.config.ts` 中的 `base` 配置

### 静态资源问题
1. 检查 `public` 目录中的资源是否正确复制
2. 确保路径引用正确

## 自定义域名

如果需要使用自定义域名：

1. 进入 Vercel 项目设置
2. 选择 "Domains"
3. 添加自定义域名
4. 按照指引配置 DNS

## 持续集成

每次推送到 Git 仓库的主分支会自动触发重新部署。

---

**注意：** 部署前请确保：
1. 项目能正常构建
2. 所有依赖已正确声明
3. 路由配置正确

部署后网站将可以通过 Vercel 提供的域名访问。