<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '用户信息']" />
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card class="general-card" title="账号信息">
          <div class="profile-header">
            <a-avatar :size="72">
              <img alt="avatar" src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image" />
            </a-avatar>
            <div class="profile-name">
              <div class="name">{{ userStore.name }}</div>
              <div class="role">前端工程师</div>
            </div>
          </div>
          <a-descriptions :column="1" :label-style="{ paddingRight: '24px' }">
            <a-descriptions-item label="账号">
              {{ userStore.name }}
            </a-descriptions-item>
            <a-descriptions-item label="登录方式"> 邮箱登录 </a-descriptions-item>
            <a-descriptions-item label="注册时间"> 2024-01-01 </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card class="general-card" title="基本资料">
          <a-form
            ref="formRef"
            :model="formModel"
            :rules="rules"
            :label-col-props="{ span: 4 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-form-item field="nickname" label="昵称" validate-trigger="blur">
              <a-input v-model="formModel.nickname" placeholder="请输入昵称" />
            </a-form-item>
            <a-form-item field="email" label="邮箱" validate-trigger="blur">
              <a-input v-model="formModel.email" placeholder="请输入邮箱" />
            </a-form-item>
            <a-form-item field="phone" label="手机号" validate-trigger="blur">
              <a-input v-model="formModel.phone" placeholder="请输入手机号" />
            </a-form-item>
            <a-form-item field="bio" label="个人简介">
              <a-textarea
                v-model="formModel.bio"
                placeholder="请输入个人简介"
                :max-length="{ length: 200, errorOnly: true }"
                allow-clear
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" :loading="submitting" @click="onSubmit">
                保存修改
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import type { FieldRule, FormInstance } from '@arco-design/web-vue';
  import { useUserStore } from '@/store';

  const userStore = useUserStore();
  const formRef = ref<FormInstance>();
  const submitting = ref(false);

  const formModel = reactive({
    nickname: '',
    email: '',
    phone: '',
    bio: '',
  });

  const rules: Record<string, FieldRule[]> = {
    nickname: [{ required: true, message: '昵称不能为空' }],
    email: [
      { required: true, message: '邮箱不能为空' },
      {
        match: /^[\w.-]+@[\w.-]+\.\w+$/,
        message: '邮箱格式不正确',
      },
    ],
  };

  const onSubmit = async () => {
    const errors = await formRef.value?.validate();
    if (errors) return;
    submitting.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      Message.success('保存成功');
    } finally {
      submitting.value = false;
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'ProfileInfo',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .profile-name {
      margin-left: 16px;
      .name {
        font-size: 16px;
        font-weight: 500;
      }
      .role {
        margin-top: 4px;
        font-size: 12px;
        color: var(--color-text-3);
      }
    }
  }
</style>
