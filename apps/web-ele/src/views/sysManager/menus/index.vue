<script lang="ts" setup>
// #region  导入

import type { FormInstance, FormRules } from 'element-plus';

import type { PageResponse } from '#/types/PageRecord';

import { onMounted, reactive, ref } from 'vue';

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
  ElInputNumber,
  ElMain,
  ElMessage,
  ElOption,
  ElPagination,
  ElPopconfirm,
  ElRow,
  ElSelect,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import { getChildPageList, getParentPageList } from '#/api';
import {
  type PageInfo,
  type SysMenu,
  sysMenuRules,
  useDefaultPage,
} from '#/types';

// #endregion

// #region 查询区域
interface MenuQuery {
  NameOrCode: string;
}
const queryData: MenuQuery = reactive({ NameOrCode: '' });

const onQueryMenu = () => {
  LoadData();
};
// #endregion

// #region 表格区域

const tableData = reactive<SysMenu[]>([]);
const page = reactive<PageInfo>(useDefaultPage());
const menuInfoDetail: SysMenu = {
  component: '',
  id: '',
  KeepAlive: false,
  Link: false,
  Name: '',
  OrderIndex: 0,
  parentId: '',
  Path: '',
  Remark: '',
  Title: '',
};

const ruleForm = reactive<SysMenu>(menuInfoDetail);

onMounted(() => {
  LoadData();
});

function LoadData() {
  getParentPageList(page.currentPage, page.PageSize, queryData.NameOrCode).then(
    (p: PageResponse<SysMenu>) => {
      Object.assign(tableData, p.record);
      page.total = p.total;
      page.currentPage = p.currentPage;
    },
  );
}
const table_Parent_Row_Click = (
  row: SysMenu,
  _treeNode: unknown,
  resolve: (date: SysMenu[]) => void,
) =>
  getChildPageList(row.id).then((c: PageResponse<SysMenu>) =>
    resolve(c.record),
  );

// #endregion

// #region 分页区域

const handleSizeChange = (val: number) => {
  window.console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  window.console.log(`current page: ${val}`);
};
// #endregion

// #region 弹窗区域
const menuDetailDialog = ref(false);
const dialogAddOrEditVisible = ref(false);

const dialogAddOrEdidTitle = ref('添加');
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<SysMenu>>(sysMenuRules);
function onEdit() {
  dialogAddOrEdidTitle.value = '编辑';
  dialogAddOrEditVisible.value = true;
}

function onAddClick() {
  dialogAddOrEdidTitle.value = '添加';
  dialogAddOrEditVisible.value = true;
}

const SaveMenu = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('添加成功');
      dialogAddOrEditVisible.value = false;
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
            <ElButton title="添加" type="primary" @click="onAddClick">
              <LucidPlus />
            </ElButton>
          </template>
          <ElTable
            :border="true"
            :data="tableData"
            :load="table_Parent_Row_Click"
            :tree-props="{ hasChildren: 'hasChildren' }"
            lazy
            row-key="id"
            style="width: 100%"
          >
            <ElTableColumn label="模块/菜单" prop="title" />
            <ElTableColumn label="备注" prop="remark" />
            <ElTableColumn label="页面缓存" prop="keepalive">
              <template #default="scope">
                <ElTag
                  :type="scope.row.keepalive ? 'warning' : 'success'"
                  disable-transitions
                >
                  {{ scope.row.keepalive ? '已开启' : '已关闭' }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn label="component" prop="component" />
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
          v-model:current-page="page.currentPage"
          v-model:page.size="page.Size"
          :background="page.Background"
          :default-page-size="page.PageSize"
          :disabled="page.Disabled"
          :size="page.SizeStype"
          :total="page.total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </ElFooter>
    </ElContainer>
  </div>

  <ElDialog v-model="dialogAddOrEditVisible" draggable overflow width="700">
    <template #header>{{ dialogAddOrEdidTitle }}</template>
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
      <ElRow>
        <ElCol :span="12">
          <ElFormItem label="父级菜单" prop="ParentId">
            <ElSelect v-model="ruleForm.parentId" placeholder="请选择父级菜单">
              <ElOption
                label="根目录"
                value="00000000-0000-0000-0000-000000000000"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="RoutName">
            <ElInput v-model="ruleForm.name" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="RoutPath">
            <ElInput v-model="ruleForm.path" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="Component">
            <ElInput v-model="ruleForm.component" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="12">
          <ElFormItem label="图标">
            <ElInput v-model="ruleForm.icon" />
          </ElFormItem>
        </ElCol>

        <ElCol :span="12">
          <ElFormItem label="排序">
            <ElInputNumber v-model="ruleForm.orderIndex" :max="1000" :min="1" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="前端缓存">
            <ElSwitch v-model="ruleForm.keepAlive" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="右侧固定">
            <ElSwitch v-model="ruleForm.affixTab" />
          </ElFormItem>
        </ElCol>
        <ElCol>
          <ElFormItem label="外部链接地址">
            <ElInput v-model="ruleForm.link" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol>
          <ElFormItem label="备注">
            <ElInput v-model="ruleForm.remark" type="textarea" />
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>
    <ElDivider />
    <template #footer>
      <ElButton @click="dialogAddOrEditVisible = false"> 取消 </ElButton>
      <ElButton type="primary" @click="SaveMenu(ruleFormRef)"> 保存 </ElButton>
    </template>
  </ElDialog>

  <ElDialog v-model="menuDetailDialog" draggable overflow width="700">
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
      <ElButton @click="menuDetailDialog = false"> 关闭 </ElButton>
    </template>
  </ElDialog>
</template>
<style scoped>
.el-container {
  min-height: 86vh;
}
</style>
