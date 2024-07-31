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
                <el-form-item label="部门名称">
                  <el-input v-model="form.departmentName" placeholder="部门名称" style="width: 220px;"></el-input>
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
        <span>部门列表</span>
        <el-button class="btn-add" @click="onAddDepartment" size="mini">添加部门</el-button>
      </el-card>
  
      <el-card class="operate-container" shadow="never">
        <div class="table-container">
          <el-table :data="departments" style="width: 100%" v-loading="loading" border>
            <el-table-column prop="name" label="部门名称" width="200" align="center"></el-table-column>
            <el-table-column prop="createdTime" label="创建时间" width="260" align="center"></el-table-column>
            <el-table-column prop="personnelDetails" label="部门人员" width="200" align="center">
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
    name: 'DepartmentManagement',
    data() {
      return {
        form: {
          departmentName: '',
          status: '',
          page: 1,
          size: 5
        },
        initialForm: {
          departmentName: '',
          status: '',
          page: 1,
          size: 5
        },
        departments: [],
        loading: false,
        total: 0
      };
    },
    methods: {
      navigateTo(page) {
        this.$router.push({ name: page });
      },
      onSearch() {
        this.form.page = 1;
        this.getDepartments();
      },
      onReset() {
        this.form = { ...this.initialForm };
        this.getDepartments();
      },
      handleSizeChange(val) {
        this.form.page = 1;
        this.form.size = val;
        this.getDepartments();
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getDepartments();
      },
      onAddDepartment() {
        // 实现添加部门逻辑
      },
      onViewPersonnel(row) {
        // 实现查看部门人员逻辑
      },
      onDisable(row) {
        // 实现停用部门逻辑
      },
      onDelete(row) {
        // 实现删除部门逻辑
      },
      onEdit(row) {
        // 实现编辑部门逻辑
      },
      getDepartments() {
        this.loading = true;
        // 模拟API调用
        setTimeout(() => {
          this.departments = [
            {
              name: '运营专员',
              createdTime: '2016-09-12 10:32:12',
              personnelDetails: '查看',
              status: '已启用'
            },
            {
              name: '市场主管',
              createdTime: '2016-09-12 10:32:12',
              personnelDetails: '查看',
              status: '已启用'
            },
            {
              name: '销售经理',
              createdTime: '2016-09-12 10:32:12',
              personnelDetails: '查看',
              status: '已停用'
            }
          ];
          this.total = this.departments.length;
          this.loading = false;
        }, 1000);
      }
    },
    created() {
      this.getDepartments();
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
  