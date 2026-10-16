<template>
  <div class="container">
    <Breadcrumb :items="['功能示例', '图片列表']" />
    <a-card class="general-card" title="图片列表">
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
                    placeholder="请输入图片标题"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="category" label="图片分类">
                  <a-select
                    v-model="formModel.category"
                    :options="categoryOptions"
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
        :scroll="{ x: 960 }"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #url="{ record }">
          <a-image
            width="120"
            height="75"
            fit="cover"
            :src="record.url"
            :preview="true"
            :title="record.title"
          />
        </template>
        <template #category="{ record }">
          <a-tag :color="categoryColorMap[record.category]">
            {{ categoryLabelMap[record.category] }}
          </a-tag>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    queryImageList,
    type ImageRecord,
    type ImageListParams,
  } from '@/api/media';
  import type { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';

  const { loading, setLoading } = useLoading(true);
  const renderData = ref<ImageRecord[]>([]);

  const generateFormModel = () => {
    return {
      keyword: '',
      category: '',
    };
  };
  const formModel = ref(generateFormModel());

  const categoryOptions = computed<SelectOptionData[]>(() => [
    { label: '风景', value: 'landscape' },
    { label: '人像', value: 'portrait' },
    { label: '产品', value: 'product' },
  ]);
  const categoryLabelMap: Record<string, string> = {
    landscape: '风景',
    portrait: '人像',
    product: '产品',
  };
  const categoryColorMap: Record<string, string> = {
    landscape: 'green',
    portrait: 'arcoblue',
    product: 'orange',
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
      title: '预览',
      dataIndex: 'url',
      slotName: 'url',
      width: 150,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '分类',
      dataIndex: 'category',
      slotName: 'category',
      width: 100,
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 100,
    },
    {
      title: '大小',
      dataIndex: 'size',
      width: 100,
    },
    {
      title: '上传时间',
      dataIndex: 'createdTime',
      width: 180,
    },
  ]);
  const fetchData = async (
    params: ImageListParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryImageList(params);
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
    } as ImageListParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current, ...formModel.value } as ImageListParams);
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };
</script>

<script lang="ts">
  export default {
    name: 'ImageList',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
