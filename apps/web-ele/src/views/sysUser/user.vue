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
  ElOption,
  ElPagination,
  ElPopconfirm,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import {
  type PageInfo,
  type SysUser,
  sysUserRules,
  useDefaultPage,
  useDefaultSysUser,
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

const tableData = reactive<SysUser[]>([]);

onMounted(() => {
  // getParentPageList().then((p: SysUser[]) => {
  //   Object.assign(tableData, p);
  // });
});

function LoadData() {
  // getParentPageList().then((p: SysUser[]) => {
  //   Object.assign(tableData, p);
  // });
}

// #endregion

// #region 分页区域

const page = reactive<PageInfo>(useDefaultPage());

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

const ruleForm = reactive<SysUser>(useDefaultSysUser());

const dialogAddOrEdidTitle = ref('添加');
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<SysUser>>(sysUserRules);
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
      <ElDescriptions
        :border="true"
        :column="2"
        class="margin-top"
        size="default"
      >
        <ElDescriptionsItem>
          <template #label> <ElFormItem label="编号" prop="Code" /> </template>
          <ElInput v-model="ruleForm.Code" style="width: 100%" />
        </ElDescriptionsItem>
        <ElDescriptionsItem>
          <template #label> <ElFormItem label="名称" prop="Name" /> </template>
          <ElInput v-model="ruleForm.Name" />
        </ElDescriptionsItem>
        <ElDescriptionsItem>
          <template #label>
            <ElFormItem label="路由名" prop="RoutName" />
          </template>
          <ElInput v-model="ruleForm.RoutName" />
        </ElDescriptionsItem>
        <ElDescriptionsItem>
          <template #label>
            <div class="cell-item">
              <ElFormItem label="路由地址" prop="RoutPath" />
            </div>
          </template>
          <ElInput v-model="ruleForm.Path" />
        </ElDescriptionsItem>
        <ElDescriptionsItem>
          <template #label>
            <div class="cell-item">
              <ElFormItem label="Icon" prop="Icon" />
            </div>
          </template>
          <ElInput v-model="ruleForm.Icon" />
        </ElDescriptionsItem>
        <ElDescriptionsItem>
          <template #label>
            <ElFormItem label="父级菜单" prop="PId" />
          </template>
          <ElSelect v-model="ruleForm.PId" placeholder="请选择父级菜单">
            <ElOption
              label="根目录"
              value="00000000-0000-0000-0000-000000000000"
            />
            <ElOption
              v-for="item in parent"
              :key="item.Id"
              :label="`${item.Name}(${item.Code})`"
              :value="item.Id"
            />
          </ElSelect>
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

.el-form-item {
  margin-bottom: 0;
}
</style>
