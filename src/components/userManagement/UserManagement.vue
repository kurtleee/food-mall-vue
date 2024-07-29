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
                <el-form-item label="用户ID">
                  <el-input v-model="form.id" placeholder="用户ID" style="width: 220px;"></el-input>
                </el-form-item>
              </el-col>   
              <el-col :span="8">  
                <el-form-item label="微信号">
                  <el-input v-model="form.wxId" placeholder="微信号" style="width: 220px;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="用户昵称">
                  <el-input v-model="form.nickName" placeholder="用户昵称" style="width: 220px;"></el-input>
                </el-form-item>
              </el-col>
              
              <el-col :span="8">
                <el-form-item label="是否交易">
                  <el-select v-model="form.transactionStatus" placeholder="请选择状态" clearable style="width: 220px">
                    <el-option label="是" value="yes"></el-option>
                    <el-option label="否" value="no"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="订单数量">
                  <el-input v-model="form.minOrder" placeholder="最低订单" style="width: 100px;"></el-input>
                  <span class="separator"> ~ </span>
                  <el-input v-model="form.maxOrder" placeholder="最高订单" style="width: 100px;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="消费金额">
                  <el-input v-model="form.minAmount" placeholder="最低金额" style="width: 100px;"></el-input>
                  <span class="separator"> ~ </span>
                  <el-input v-model="form.maxAmount" placeholder="最高金额" style="width: 100px;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="注册时间">
                  <el-date-picker v-model="form.startDate" type="date" placeholder="开始日期"></el-date-picker>
                  <span class="separator"> ~ </span>
                  <el-date-picker v-model="form.endDate" type="date" placeholder="结束日期"></el-date-picker>
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
        <span>用户列表</span>
        <div class="table-container">
        <el-table :data="users" style="width: 100%" v-loading="loading" border>
          <el-table-column prop="id" label="用户ID" width="140" align="center"></el-table-column>
          <el-table-column prop="name" label="用户昵称" width="140" align="center"></el-table-column>
          <el-table-column prop="wxId" label="微信号" width="140" align="center"></el-table-column>
          <el-table-column prop="registrationTime" label="注册时间" width="160" align="center"></el-table-column>
          <el-table-column prop="lastLoginTime" label="最近登录时间" width="160" align="center"></el-table-column>
          <el-table-column prop="amountSpent" label="消费金额" width="140" align="center"></el-table-column>
          <el-table-column prop="orderCount" label="订单数量" width="140" align="center">
            <template slot-scope="scope">
              <el-link :underline="false">{{ scope.row.orderCount }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="操作"  align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleUpdateUser(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          userId:'',
          wxId:'',
          nickName:'',
          minAmount: '',
          maxAmount: '',
          startDate: '',
          endDate: '',
          transactionStatus: '',
          minOrder: '',
          maxOrder: '',
          page: 1,
          size: 5
        },
        initialForm: {
          userId:'',
          wxId:'',
          nickName:'',
          minAmount: '',
          maxAmount: '',
          startDate: '',
          endDate: '',
          transactionStatus: '',
          minOrder: '',
          maxOrder: '',
          page: 1,
          size: 5
        },
        users: [],
        loading: false,
        total: 0
      };
    },
    methods: {
      onSearch() {
        this.form.page = 1;
        this.getUsers();
      },
      onReset() {
        this.form = { ...this.initialForm };
        this.getUsers();
      },
      handleSizeChange(val) {
        this.form.page = 1;
        this.form.size = val;
        this.getUsers();
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.getUsers();
      },
      handleAddUser() {
        // 实现新增用户逻辑
      },
      handleUpdateUser(index, row) {
        // 实现编辑用户逻辑
      },
      handleDelete(index, row) {
        // 实现删除用户逻辑
      },
      getUsers() {
        this.loading = true;
        // 模拟API调用
        setTimeout(() => {
          this.users = [
            {
              id: '463243',
              name: '赵三',
              phone: '18888888888',
              registrationTime: '2020-08-25 14:54',
              lastLoginTime: '2020-08-25 14:54',
              amountSpent: '3045',
              orderCount: '12'
            },
            {
              id: '463243',
              name: '赵三',
              phone: '18888888888',
              registrationTime: '2020-08-25 14:54',
              lastLoginTime: '2020-08-25 14:54',
              amountSpent: '44232',
              orderCount: '12'
            }
          ];
          this.total = this.users.length;
          this.loading = false;
        }, 1000);
      }
    },
    created() {
      this.getUsers();
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
  