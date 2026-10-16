<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '用户管理']" />
    <a-card class="general-card" title="用户管理">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="keyword" label="关键词">
                  <a-input
                    v-model="formModel.keyword"
                    placeholder="请输入姓名或账号"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="role" label="角色">
                  <a-select
                    v-model="formModel.role"
                    :options="roleOptions"
                    placeholder="全部"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="状态">
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    placeholder="全部"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-col flex="180px" style="text-align: right">
          <a-space>
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(columns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #role="{ record }">
          <a-tag :color="roleColorMap[record.role]">
            {{ roleLabelMap[record.role] }}
          </a-tag>
        </template>
        <template #status="{ record }">
          <span v-if="record.status === 'disabled'" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ statusLabelMap[record.status] }}
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    querySystemUserList,
    type SystemUserRecord,
    type SystemUserParams,
  } from '@/api/system';
  import type { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';

  const { loading, setLoading } = useLoading(true);
  const renderData = ref<SystemUserRecord[]>([]);

  const generateFormModel = () => {
    return {
      keyword: '',
      role: '',
      status: '',
    };
  };
  const formModel = ref(generateFormModel());

  const roleOptions = computed<SelectOptionData[]>(() => [
    { label: '管理员', value: 'admin' },
    { label: '编辑', value: 'editor' },
    { label: '访客', value: 'viewer' },
  ]);
  const roleLabelMap: Record<string, string> = {
    admin: '管理员',
    editor: '编辑',
    viewer: '访客',
  };
  const roleColorMap: Record<string, string> = {
    admin: 'red',
    editor: 'arcoblue',
    viewer: 'gray',
  };
  const statusOptions = computed<SelectOptionData[]>(() => [
    { label: '启用', value: 'enabled' },
    { label: '禁用', value: 'disabled' },
  ]);
  const statusLabelMap: Record<string, string> = {
    enabled: '启用',
    disabled: '禁用',
  };

  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '#',
      dataIndex: 'index',
      slotName: 'index',
      width: 70,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '账号',
      dataIndex: 'account',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      slotName: 'role',
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      slotName: 'status',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: 180,
    },
  ]);
  const fetchData = async (
    params: SystemUserParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await querySystemUserList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as SystemUserParams);
  };
  const onPageChange = (current: number) => {
    fetchData({
      ...basePagination,
      current,
      ...formModel.value,
    } as SystemUserParams);
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };
</script>

<script lang="ts">
  export default {
    name: 'SystemUser',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
