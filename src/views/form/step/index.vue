<template>
  <div class="container">
    <Breadcrumb :items="['功能示例', '分步表单']" />
    <a-card class="general-card" title="分步表单">
      <div class="step-wrap">
        <a-steps :current="current" lineless>
          <a-step description="填写转账信息">第一步</a-step>
          <a-step description="确认账户信息">第二步</a-step>
          <a-step description="完成">第三步</a-step>
        </a-steps>
      </div>

      <div v-if="current === 0" class="form-wrap">
        <a-form
          ref="stepFormRef"
          :model="stepModel"
          :rules="stepRules"
          :label-col-props="{ span: 6 }"
          :wrapper-col-props="{ span: 18 }"
          label-align="left"
          style="max-width: 480px"
        >
          <a-form-item field="payAccount" label="付款账户" validate-trigger="blur">
            <a-input v-model="stepModel.payAccount" placeholder="请输入付款账户" />
          </a-form-item>
          <a-form-item field="receiveAccount" label="收款账户" validate-trigger="blur">
            <a-input
              v-model="stepModel.receiveAccount"
              placeholder="请输入收款账户"
            />
          </a-form-item>
          <a-form-item field="amount" label="转账金额" validate-trigger="blur">
            <a-input-number
              v-model="stepModel.amount"
              :min="0"
              :precision="2"
              style="width: 100%"
              placeholder="请输入转账金额"
            >
              <template #prefix>￥</template>
            </a-input-number>
          </a-form-item>
        </a-form>
      </div>

      <div v-else-if="current === 1" class="form-wrap">
        <a-descriptions
          :column="1"
          :label-style="{ paddingRight: '24px' }"
          bordered
        >
          <a-descriptions-item label="付款账户">
            {{ stepModel.payAccount }}
          </a-descriptions-item>
          <a-descriptions-item label="收款账户">
            {{ stepModel.receiveAccount }}
          </a-descriptions-item>
          <a-descriptions-item label="转账金额">
            ￥{{ stepModel.amount }}
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <div v-else class="form-wrap">
        <a-result status="success" title="转账成功">
          <template #subtitle>
            预计 2 小时内到账，请留意收款账户余额变动
          </template>
        </a-result>
      </div>

      <div class="footer-wrap">
        <a-space>
          <a-button v-if="current > 0" @click="prev">上一步</a-button>
          <a-button
            v-if="current < 2"
            type="primary"
            :loading="submitting"
            @click="next"
          >
            下一步
          </a-button>
          <a-button
            v-if="current === 2"
            type="primary"
            @click="done"
          >
            再次转账
          </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import type { FieldRule, FormInstance } from '@arco-design/web-vue';

  const stepFormRef = ref<FormInstance>();
  const current = ref(0);
  const submitting = ref(false);

  const stepModel = reactive({
    payAccount: '',
    receiveAccount: '',
    amount: 0,
  });

  const stepRules: Record<string, FieldRule[]> = {
    payAccount: [{ required: true, message: '付款账户不能为空' }],
    receiveAccount: [{ required: true, message: '收款账户不能为空' }],
    amount: [{ required: true, message: '转账金额不能为空' }],
  };

  const next = async () => {
    if (current.value === 0) {
      const errors = await stepFormRef.value?.validate();
      if (errors) return;
    }
    if (current.value === 1) {
      submitting.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        Message.success('转账已提交');
      } finally {
        submitting.value = false;
      }
    }
    current.value = Math.min(current.value + 1, 2);
  };

  const prev = () => {
    current.value = Math.max(current.value - 1, 0);
  };

  const done = () => {
    current.value = 0;
    stepModel.payAccount = '';
    stepModel.receiveAccount = '';
    stepModel.amount = 0;
  };
</script>

<script lang="ts">
  export default {
    name: 'StepForm',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .step-wrap {
    max-width: 550px;
    margin: 24px auto 40px;
  }
  .form-wrap {
    max-width: 550px;
    margin: 0 auto;
  }
  .footer-wrap {
    max-width: 550px;
    margin: 24px auto 0;
    text-align: center;
  }
</style>
