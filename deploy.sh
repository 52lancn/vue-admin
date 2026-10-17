#!/bin/bash

echo "开始部署 Vue 管理系统到 Vercel"

# 检查是否已登录
if ! npx vercel whoami 2>/dev/null; then
    echo "请先登录 Vercel:"
    npx vercel login
fi

echo "进行部署..."
npx vercel --prod

echo "部署完成！"