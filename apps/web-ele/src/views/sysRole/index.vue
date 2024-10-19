<script lang="ts" setup>
// #region  导入

import type { FormInstance, FormRules } from 'element-plus';

import { onMounted, reactive, ref } from 'vue';

import {
  LucidEye,
  LucidPen,
  LucidPlus,
  LucidSearch,
  LucidX,
} from '@vben/icons';

import { getRolePageList } from '@/api';
import {
  ElButton,
  ElCard,
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
  ElPagination,
  ElPopconfirm,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import {
  type PageInfo,
  type SysRole,
  type SysRoleQuery,
  sysRoleRules,
  useDefaultPage,
  useDefaultSysRole,
} from '#/types';

const page = reactive<PageInfo>(useDefaultPage());
const queryData: SysRoleQuery = reactive({ NameOrCode: '' });

const onQueryMenu = () => {
  page.CurrentPage = 0;
  LoadData();
};
// #endregion

// #region 表格区域

const tableData = reactive<SysRole[]>([]);

onMounted(() => {
  LoadData();
});

function LoadData() {
  window.console.log(`${page.CurrentPage} items per page`);
  getRolePageList().then((p: SysRole[]) => {
    Object.assign(tableData, p);
  });
}

// #endregion

// #region 分页区域

const handleSizeChange = (val: number) => {
  page.CurrentPage = val;
};
const handleCurrentChange = (val: number) => {
  page.CurrentPage = val;
};
// #endregion

// #region 弹窗区域

const detailDialogDisplay = ref(false);
const editDialogDisplay = ref(false);
const editDialogTitle = ref('');

const ruleForm = reactive<SysRole>(useDefaultSysRole());

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<SysRole>>(sysRoleRules);

function onEdit() {
  editDialogTitle.value = '编辑';
  editDialogDisplay.value = true;
}

function onAddClick() {
  editDialogTitle.value = '添加';
  editDialogDisplay.value = true;
}

function onViewDetail() {
  detailDialogDisplay.value = true;
}

const save_Click = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('添加成功');
      editDialogDisplay.value = false;
    } else {
      window.console.log(fields);
    }
  });
};

function onRemove() {
  ElMessage.success('删除成功');
}
// #endregion
</script>
<template>
  <div class="common-layout">
    <ElContainer style="height: 100%">
      <ElHeader style="line-height: 100px">
        <ElForm :inline="true" :model="queryData" class="demo-form-inline">
          <ElFormItem label="角色名/编号">
            <ElInput
              v-model="queryData.NameOrCode"
              clearable
              placeholder="请输入角色名或编号"
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
            <ElButton title="添加" type="primary" @click="onAddClick">
              <LucidPlus />
            </ElButton>
          </template>
          <ElTable
            :border="true"
            :data="tableData"
            row-key="Id"
            style="width: 100%"
          >
            <ElTableColumn label="名称" prop="Name" />
            <ElTableColumn label="编码" prop="Code" />
            <ElTableColumn label="创建时间" prop="CreateTime" />
            <ElTableColumn label="备注" prop="Remark" />
            <ElTableColumn fixed="right" label="操作" min-width="120">
              <template #default>
                <ElButton
                  size="small"
                  title="详情"
                  type="primary"
                  @click="onViewDetail"
                >
                  <LucidEye />
                </ElButton>
                <ElButton
                  size="small"
                  title="编辑"
                  type="primary"
                  @click="onEdit"
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
          :background="page.Background"
          :current-page="page.CurrentPage"
          :default-page-size="page.PageSize"
          :disabled="page.Disabled"
          :page-sizes="page.Size"
          :size="page.SizeStype"
          :total="400"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </ElFooter>
    </ElContainer>
  </div>

  <ElDialog v-model="editDialogDisplay" draggable overflow width="700">
    <template #header>{{ editDialogTitle }}</template>
    <ElDivider />

    <ElForm
      ref="ruleFormRef"
      :inline-message="true"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      label-width="auto"
      status-icon
    >
      <ElDescriptions
        :border="true"
        :column="2"
        class="margin-top"
        size="default"
      >
        <ElDescriptionsItem>
          <template #label>
            <ElFormItem label="编码" prop="Code" />
          </template>
          <ElInput v-model="ruleForm.Code" style="width: 100%" />
        </ElDescriptionsItem>
        <ElDescriptionsItem>
          <template #label>
            <ElFormItem label="名称" prop="Name" />
          </template>
          <ElInput v-model="ruleForm.Name" />
        </ElDescriptionsItem>
        <ElDescriptionsItem>
          <template #label>
            <div class="cell-item">
              <ElFormItem label="备注" prop="Remark" />
            </div>
          </template>
          <ElInput v-model="ruleForm.Remark" type="textarea" />
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElForm>
    <ElDivider />
    <template #footer>
      <ElButton @click="editDialogDisplay = false"> 取消 </ElButton>
      <ElButton type="primary" @click="save_Click(ruleFormRef)">
        保存
      </ElButton>
    </template>
  </ElDialog>

  <ElDialog v-model="detailDialogDisplay" draggable overflow width="700">
    <template #header>详情</template>
    <ElDivider />

    <ElDescriptions
      :border="true"
      :column="3"
      class="margin-top"
      size="default"
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
        <ElTag size="small">School</ElTag>
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
      <ElButton @click="detailDialogDisplay = false"> 关闭 </ElButton>
    </template>
  </ElDialog>
</template>
<style scoped>
.el-container {
  min-height: 86vh;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
