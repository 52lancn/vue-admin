<template>
  <div class="container">
    <Breadcrumb :items="['功能示例', '基础表单']" />
    <a-card class="general-card" title="基础表单">
      <a-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
        style="max-width: 480px"
      >
        <a-form-item field="name" label="姓名" validate-trigger="blur">
          <a-input v-model="formModel.name" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item field="gender" label="性别">
          <a-radio-group v-model="formModel.gender">
            <a-radio value="male">男</a-radio>
            <a-radio value="female">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="birthday" label="出生日期">
          <a-date-picker
            v-model="formModel.birthday"
            style="width: 100%"
            placeholder="请选择出生日期"
          />
        </a-form-item>
        <a-form-item field="email" label="邮箱" validate-trigger="blur">
          <a-input v-model="formModel.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item field="phone" label="手机号" validate-trigger="blur">
          <a-input v-model="formModel.phone" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item field="address" label="地址">
          <a-input v-model="formModel.address" placeholder="请输入地址" />
        </a-form-item>
        <a-form-item field="description" label="个人简介">
          <a-textarea
            v-model="formModel.description"
            placeholder="请输入个人简介"
            :max-length="{ length: 200, errorOnly: true }"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" :loading="submitting" @click="onSubmit">
              提交
            </a-button>
            <a-button @click="onReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import type { FieldRule, FormInstance } from '@arco-design/web-vue';

  const formRef = ref<FormInstance>();
  const submitting = ref(false);

  const formModel = reactive({
    name: '',
    gender: 'male',
    birthday: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });

  const rules: Record<string, FieldRule[]> = {
    name: [{ required: true, message: '姓名不能为空' }],
    email: [
      { required: true, message: '邮箱不能为空' },
      {
        match: /^[\w.-]+@[\w.-]+\.\w+$/,
        message: '邮箱格式不正确',
      },
    ],
    phone: [
      { required: true, message: '手机号不能为空' },
      {
        match: /^1[3-9]\d{9}$/,
        message: '手机号格式不正确',
      },
    ],
  };

  const onSubmit = async () => {
    const errors = await formRef.value?.validate();
    if (errors) return;
    submitting.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      Message.success('提交成功');
    } finally {
      submitting.value = false;
    }
  };

  const onReset = () => {
    formRef.value?.resetFields();
  };
</script>

<script lang="ts">
  export default {
    name: 'BasicForm',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
