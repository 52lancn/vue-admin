# Vercel 部署指南 - 详细步骤

## 方法一：通过 Vercel CLI 手动部署（最简单）

### 步骤 1：安装 Vercel CLI
```bash
npm install -g vercel
```

### 步骤 2：在项目目录登录
```bash
cd 你的项目目录
vercel login
```

### 步骤 3：部署到生产环境
```bash
vercel --prod
```

### 步骤 4：按照提示操作
- 选择项目名称（默认：vue-admin）
- 确认覆盖现有设置（输入 y）
- 系统会自动构建并部署

## 方法二：通过 GitHub 自动部署（推荐）

### 步骤 1：将项目推送到 GitHub
```bash
git init
git add .
git commit -m "Initial commit: Vue 管理系统"
git branch -M main
git remote add origin 你的GitHub仓库URL
git push -u origin main
```

### 步骤 2：在 Vercel 创建账户并连接 GitHub
1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的仓库

### 步骤 3：配置 Vercel 项目
- 框架预设：Vite
- 构建命令：`npm run build-only`
- 输出目录：`dist`
- 环境变量：无需特殊设置

### 步骤 4：完成部署
- 点击 "Deploy"
- 等待构建完成
- 获得部署链接

## 方法三：使用 GitHub Actions 自动部署

### 步骤 1：设置 Vercel 环境变量
1. 在 Vercel 获取以下信息：
   - VERCEL_TOKEN
   - VERCEL_ORG_ID
   - VERCEL_PROJECT_ID

2. 在 GitHub 仓库设置 Secrets：
   - 进入 Settings → Secrets and variables → Actions
   - 添加上述三个变量

### 步骤 2：推送代码到 GitHub
```bash
git push origin main
```

### 步骤 3：查看部署状态
- 在 GitHub Actions 标签页查看构建状态
- 在 Vercel 控制台查看部署状态

## 部署后配置

### 自定义域名
1. 进入 Vercel 项目设置
2. 选择 "Domains"
3. 添加你的域名
4. 配置 DNS 记录

### 环境变量
在 Vercel 项目设置中：
1. 进入 "Environment Variables"
2. 添加需要的变量
3. 重新部署生效

## 故障排除

### 1. 构建失败
```bash
# 本地测试构建
npm run build-only

# 查看错误信息
npm run build-only 2>&1
```

### 2. 路由404
- 确保 `vercel.json` 中的重写规则正确
- 检查 `vite.config.ts` 中的 `base` 配置

### 3. 静态资源加载失败
- 检查 `public` 目录文件是否存在
- 确保资源路径正确

### 4. 权限问题
```bash
# 清理缓存
rm -rf node_modules
npm cache clean --force
npm install --legacy-peer-deps
```

## 部署文件说明

- `vercel.json` - Vercel 配置
- `.vercelignore` - 忽略文件列表
- `.github/workflows/deploy-vercel.yml` - GitHub Actions 工作流
- `vite.config.ts` - Vite 构建配置
- `package.json` - 项目依赖和脚本

## 验证部署

部署成功后：
1. 访问 Vercel 提供的链接
2. 测试所有页面路由
3. 验证功能正常
4. 检查控制台无错误

## 持续集成

- 每次推送到 `main` 分支自动部署
- Pull Request 创建预览部署
- 部署历史可回滚

---

**快速开始命令：**
```bash
# 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 创建一个空的 GitHub 仓库然后：
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main

# 然后访问 vercel.com 导入仓库
```

**提示：** 建议使用方法二（通过 GitHub 连接到 Vercel），这是最简单且自动化的方式。