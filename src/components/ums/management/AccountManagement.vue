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
                <el-form-item label="账号名称">
                  <el-input v-model="form.accountName" placeholder="账号名称" style="width: 220px;"></el-input>
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
        <span>账号列表</span>
        <el-button class="btn-add" @click="onAddAccount" size="mini">添加账号</el-button>
      </el-card>
  
      <el-card class="operate-container" shadow="never">
        <div class="table-container">
          <el-table :data="accounts" style="width: 100%" v-loading="loading" border>
            <el-table-column prop="name" label="账号名称" width="140" align="center"></el-table-column>
            <el-table-column prop="phoneNumber" label="手机号码" width="140" align="center"></el-table-column>
            <el-table-column prop="department" label="归属部门" width="140" align="center"></el-table-column>
            <el-table-column prop="createdTime" label="创建时间" width="200" align="center"></el-table-column>
            <el-table-column prop="position" label="职位" width="140" align="center"></el-table-column>
            <el-table-column prop="status" label="启用状态" width="140" align="center"></el-table-column>
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
    name: 'AccountManagement',
    data() {
      return {
        form: {
          accountName: '',
          status: '',
          page: 1,
          size: 5
        },
        initialForm: {
          accountName: '',
          status: '',
          page: 1,
          size: 5
        },
        accounts: [],
        loading: false,
        total: 0
      };
    },
    methods: {
      onSearch() {
        this.form.page = 1;
        this.getAccounts();
      },
      onReset() {
        this.form = { ...this.initialForm };
        this.getAccounts();
      },
      handleSizeChange(val) {
        this.form.page = 1;
        this.form.size = val;
        this.getAccounts();
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getAccounts();
      },
      onAddAccount() {
        // 实现添加账号逻辑
      },
      onDisable(row) {
        // 实现停用账号逻辑
      },
      onDelete(row) {
        // 实现删除账号逻辑
      },
      onEdit(row) {
        // 实现编辑账号逻辑
      },
      getAccounts() {
        this.loading = true;
        // 模拟API调用
        setTimeout(() => {
          this.accounts = [
            {
              name: '王小X',
              phoneNumber: '1315242XXXX',
              department: '技术部',
              createdTime: '2016-09-12 10:32:12',
              position: '技术经理',
              status: '已启用'
            },
            {
              name: '李二X',
              phoneNumber: '1315242XXXX',
              department: '产品部',
              createdTime: '2016-09-12 10:32:12',
              position: '产品经理',
              status: '已启用'
            }
          ];
          this.total = this.accounts.length;
          this.loading = false;
        }, 1000);
      }
    },
    created() {
      this.getAccounts();
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
  