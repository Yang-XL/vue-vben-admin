<script lang="ts" setup>
// #region  导入

import type { ComponentSize, FormInstance, FormRules } from 'element-plus';

import { reactive, ref } from 'vue';

import {
  LucidEye,
  LucidPen,
  LucidPlus,
  LucidSearch,
  LucidX,
} from '@vben/icons';

import {
  ElButton,
  ElCard,
  ElCol,
  ElContainer,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDivider,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElMain,
  ElMessage,
  ElOption,
  ElPagination,
  ElPopconfirm,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
} from 'element-plus';

// #endregion

// #region 查询区域
interface MenuQuery {
  NameOrCode: string;
}
const queryData: MenuQuery = { NameOrCode: '' };

const onQueryMenu = () => {
  window.console.log('submit!');
};
// #endregion

// #region 表格区域
interface Menu {
  Id: string;
  CreateTime: string;
  Code: string;
  Remark: string;
  PId: string;
  Name: string;
  HasChildren: boolean;
  children?: Menu[];
}

const tableData1: Menu[] = [
  {
    Code: 'sys_001',
    CreateTime: '2016-05-01 12:25:00',
    HasChildren: true,
    Id: 'F3FBFE37-F445-431F-8649-50732AB7A3F1',
    Name: '系统管理',
    PId: '00000000-0000-0000-0000-000000000000',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
  {
    Code: 'sys_002',
    CreateTime: '2016-05-01 12:25:00',
    HasChildren: false,
    Id: 'F3FBFE37-F445-431F-8649-50732AB7A3F2',
    Name: '用户管理',
    PId: '00000000-0000-0000-0000-000000000000',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
  {
    Code: 'sys_003',
    CreateTime: '2016-05-01 12:25:00',
    HasChildren: false,
    Id: 'F3FBFE37-F445-431F-8649-50732AB7A3F3',
    Name: '角色权限',
    PId: '00000000-0000-0000-0000-000000000000',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
];

const menuTableLoad = (
  row: Menu,
  _treeNode: unknown,
  resolve: (date: Menu[]) => void,
) => {
  window.console.log(`当前点击行：${row.Code}`);
  setTimeout(() => {
    resolve([
      {
        Code: 'sys_001_001',
        CreateTime: '2016-05-01 12:25:00',
        HasChildren: false,
        Id: 'F3FBFE37-F445-431F-8649-50732AB7A311',
        Name: '模块管理',
        PId: 'F3FBFE37-F445-431F-8649-50732AB7A3F1',
        Remark: 'No. 189, Grove St, Los Angeles',
      },
      {
        Code: 'sys_001_002',
        CreateTime: '2016-05-01 12:25:00',
        HasChildren: false,
        Id: 'F3FBFE37-F445-431F-8649-50732AB7A312',
        Name: '全局设置',
        PId: 'F3FBFE37-F445-431F-8649-50732AB7A3F1',
        Remark: 'No. 189, Grove St, Los Angeles',
      },
    ]);
  }, 1000);
};

// #endregion

// #region 分页区域
const pageSize4 = ref(30);
const currentPage4 = ref(1);
const size = ref<ComponentSize>('default');
const handleSizeChange = (val: number) => {
  window.console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  window.console.log(`current page: ${val}`);
};
// #endregion

// #region 弹窗区域
const background = ref(false);
const menuDetailDialog = ref(false);
const disabled = ref(false);
const dialogAddOrEditVisible = ref(false);

function showAddOrEditDialog() {
  dialogAddOrEditVisible.value = true;
}

function SaveMenu() {
  ElMessage.success('添加成功');
  dialogAddOrEditVisible.value = false;
}
function onRemove() {
  ElMessage.success('删除成功');
}
// #endregion

interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  location: string;
  type: string[];
  resource: string;
  desc: string;
}

const formSize = ref<ComponentSize>('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  desc: '',
  location: '',
  name: 'Hello',
  region: '',
  resource: '',
  type: [],
});

const rules = reactive<FormRules<RuleForm>>({
  count: [
    {
      message: 'Please select Activity count',
      required: true,
      trigger: 'change',
    },
  ],
  date1: [
    {
      message: 'Please pick a date',
      required: true,
      trigger: 'change',
      type: 'date',
    },
  ],
  date2: [
    {
      message: 'Please pick a time',
      required: true,
      trigger: 'change',
      type: 'date',
    },
  ],
  desc: [
    { message: 'Please input activity form', required: true, trigger: 'blur' },
  ],
  location: [
    {
      message: 'Please select a location',
      required: true,
      trigger: 'change',
    },
  ],
  name: [
    { message: 'Please input Activity name', required: true, trigger: 'blur' },
    { max: 5, message: 'Length should be 3 to 5', min: 3, trigger: 'blur' },
  ],
  region: [
    {
      message: 'Please select Activity zone',
      required: true,
      trigger: 'change',
    },
  ],
  resource: [
    {
      message: 'Please select activity resource',
      required: true,
      trigger: 'change',
    },
  ],
  type: [
    {
      message: 'Please select at least one activity type',
      required: true,
      trigger: 'change',
      type: 'array',
    },
  ],
});
</script>
<template>
  <div class="common-layout">
    <ElContainer style="height: 100%">
      <ElHeader style="line-height: 100px">
        <ElForm :inline="true" :model="queryData" class="demo-form-inline">
          <ElFormItem label="菜单名/编号">
            <ElInput
              v-model="queryData.NameOrCode"
              clearable
              placeholder="请输入菜单名或编号"
              style="width: 200px"
            />
          </ElFormItem>

          <ElFormItem>
            <ElButton title="查询" type="primary" @click="onQueryMenu">
              <LucidSearch />
            </ElButton>
          </ElFormItem>
        </ElForm>
      </ElHeader>
      <ElDivider />
      <ElMain style="height: 80%">
        <ElCard class="mb-5">
          <template #header>
            <ElButton title="添加" type="primary" @click="showAddOrEditDialog">
              <LucidPlus />
            </ElButton>
          </template>
          <ElTable
            :data="tableData1"
            :load="menuTableLoad"
            :tree-props="{ children: 'children', hasChildren: 'HasChildren' }"
            border
            lazy
            row-key="Id"
            style="width: 100%"
          >
            <ElTableColumn label="编码" prop="Code" />
            <ElTableColumn label="模块/菜单" prop="Name" />
            <ElTableColumn label="创建时间" prop="CreateTime" />
            <ElTableColumn label="备注" prop="Remark" />
            <ElTableColumn fixed="right" label="操作" min-width="120">
              <template #default>
                <ElButton
                  size="small"
                  title="详情"
                  type="primary"
                  @click="menuDetailDialog = true"
                >
                  <LucidEye />
                </ElButton>
                <ElButton
                  size="small"
                  title="编辑"
                  type="primary"
                  @click="dialogAddOrEditVisible = true"
                >
                  <LucidPen />
                </ElButton>
                <ElPopconfirm
                  icon-color="#626AEF"
                  title="确认删除本条数据？"
                  width="220"
                  @confirm="onRemove"
                >
                  <template #reference>
                    <ElButton size="small" title="删除" type="danger">
                      <LucidX />
                    </ElButton>
                  </template>
                  <template #actions="{ confirm, cancel }">
                    <ElButton size="small" @click="cancel">取消</ElButton>
                    <ElButton size="small" type="danger" @click="confirm">
                      删除
                    </ElButton>
                  </template>
                </ElPopconfirm>
              </template>
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElMain>
      <ElDivider />
      <ElFooter style="line-height: 80px">
        <ElPagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :background="background"
          :disabled="disabled"
          :page-sizes="[30, 50, 100, 200]"
          :size="size"
          :total="400"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </ElFooter>
    </ElContainer>
  </div>

  <ElDialog v-model="dialogAddOrEditVisible" draggable overflow width="700">
    <template #header>添加或编辑</template>
    <ElDivider />
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      :size="formSize"
      label-width="auto"
      status-icon
      style="max-width: 600px"
    >
      <ElRow>
        <ElCol :span="12">
          <ElFormItem label="编号" prop="name">
            <ElInput v-model="ruleForm.name" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="名称" prop="name">
            <ElInput v-model="ruleForm.name" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="路由名" prop="name">
            <ElInput v-model="ruleForm.name" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="VuePath" prop="name">
            <ElInput v-model="ruleForm.name" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Icon" prop="name">
            <ElInput v-model="ruleForm.name" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="父级菜单" prop="region">
            <ElSelect v-model="ruleForm.region" placeholder="Activity zone">
              <ElOption label="Zone one" value="shanghai" />
              <ElOption label="Zone two" value="beijing" />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="24">
          <ElFormItem label="备注" prop="desc">
            <ElInput v-model="ruleForm.desc" type="textarea" />
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>
    <ElDivider />
    <template #footer>
      <ElButton @click="dialogAddOrEditVisible = false"> 取消 </ElButton>
      <ElButton type="primary" @click="SaveMenu"> 保存 </ElButton>
    </template>
  </ElDialog>

  <ElDialog v-model="menuDetailDialog" draggable overflow width="700">
    <template #header>详情</template>
    <ElDivider />

    <ElDescriptions
      :column="3"
      :size="size"
      border
      class="margin-top"
      title="With border"
    >
      <template #extra>
        <ElButton type="primary">Operation</ElButton>
      </template>
      <ElDescriptionsItem>
        <template #label> Username </template>
        Yxl
      </ElDescriptionsItem>
      <ElDescriptionsItem>
        <template #label>
          <div class="cell-item">Telephone</div>
        </template>
        18100000000
      </ElDescriptionsItem>
      <ElDescriptionsItem>
        <template #label>
          <div class="cell-item">Place</div>
        </template>
        Suzhou
      </ElDescriptionsItem>
      <ElDescriptionsItem>
        <template #label>
          <div class="cell-item">Remarks</div>
        </template>
        <el-tag size="small">School</el-tag>
      </ElDescriptionsItem>
      <ElDescriptionsItem>
        <template #label>
          <div class="cell-item">Address</div>
        </template>
        备注
      </ElDescriptionsItem>
    </ElDescriptions>
    <ElDivider />
    <template #footer>
      <ElButton @click="menuDetailDialog = false"> 关闭 </ElButton>
    </template>
  </ElDialog>
</template>
<style scoped>
.el-container {
  min-height: 86vh;
}
</style>
