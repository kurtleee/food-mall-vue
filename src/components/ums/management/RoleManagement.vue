<template>
  <div class="app-container">
    <p class="breadcrumb-space"></p>
    

    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="form" size="small" label-width="140px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="角色名称">
                <el-input v-model="form.roleName" placeholder="角色名称" style="width: 220px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="启用状态">
                <el-select v-model="form.status" placeholder="请选择状态" clearable style="width: 220px">
                  <el-option label="已启用" value="enabled"></el-option>
                  <el-option label="已停用" value="disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="form-buttons" style="text-align: right; margin-right: 50px;">
              <el-form-item>
                <el-button @click="onSearch" type="primary" size="small">查询</el-button>
                <el-button @click="onReset" size="small">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>角色列表</span>
      <el-button class="btn-add" @click="onAddRole" size="mini">添加角色</el-button>
    </el-card>
      
    <el-card class="operate-container" shadow="never">
      <div class="table-container">
        <el-table :data="roles" style="width: 100%" v-loading="loading" border>
          <el-table-column prop="name" label="角色名称" width="200" align="center"></el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="260" align="center"></el-table-column>
          <el-table-column prop="personnelDetails" label="人员明细" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="onViewPersonnel(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="启用状态" width="200" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="onDisable(scope.row)">停用</el-button>
              <el-button size="mini" type="danger" @click="onDelete(scope.row)">删除</el-button>
              <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="form.size"
        :page-sizes="[3, 5, 10, 15]"
        :current-page.sync="form.page"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoleManagement',
  data() {
    return {
      activeIndex: '1',
      form: {
        roleName: '',
        status: '',
        page: 1,
        size: 5
      },
      initialForm: {
        roleName: '',
        status: '',
        page: 1,
        size: 5
      },
      roles: [],
      loading: false,
      total: 0
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onSearch() {
      this.form.page = 1;
      this.getRoles();
    },
    onReset() {
      this.form = { ...this.initialForm };
      this.getRoles();
    },
    handleSizeChange(val) {
      this.form.page = 1;
      this.form.size = val;
      this.getRoles();
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.getRoles();
    },
    onAddRole() {
      // 实现添加角色逻辑
    },
    onViewPersonnel(row) {
      // 实现查看人员明细逻辑
    },
    onDisable(row) {
      // 实现停用角色逻辑
    },
    onDelete(row) {
      // 实现删除角色逻辑
    },
    onEdit(row) {
      // 实现编辑角色逻辑
    },
    getRoles() {
      this.loading = true;
      // 模拟API调用
      setTimeout(() => {
        this.roles = [
          {
            name: '超级管理员',
            createdTime: '2016-09-12 10:32:12',
            personnelDetails: '查看',
            status: '已启用'
          },
          {
            name: '系统管理员',
            createdTime: '2016-09-12 10:32:12',
            personnelDetails: '查看',
            status: '已启用'
          }
        ];
        this.total = this.roles.length;
        this.loading = false;
      }, 1000);
    }
  },
  created() {
    this.getRoles();
  }
};
</script>

<style>
.app-container {
  background: #fff;
  overflow-y: auto;
}
.filter-container, .operate-container, .top-container {
  margin-bottom: 20px;
}
.table-container {
  margin-top: 20px;
}
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
.el-form-item {
  margin-bottom: 20px;
}
.form-buttons {
  display: flex;
  justify-content: flex-end;
}
.separator {
  margin: 0 10px;
}
</style>
