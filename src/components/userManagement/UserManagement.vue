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
                <el-input v-model="form.userId" placeholder="用户ID" style="width: 220px;"></el-input>
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
              <el-form-item label="订单数量">
                <el-input v-model="form.minTotalOrders" placeholder="最低订单" style="width: 100px;"></el-input>
                <span class="separator"> ~ </span>
                <el-input v-model="form.maxTotalOrders" placeholder="最高订单" style="width: 100px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="消费金额">
                <el-input v-model="form.minOrderPrice" placeholder="最低金额" style="width: 100px;"></el-input>
                <span class="separator"> ~ </span>
                <el-input v-model="form.maxOrderPrice" placeholder="最高金额" style="width: 100px;"></el-input>
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
          <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="nickName" label="用户昵称" align="center"></el-table-column>
          <el-table-column prop="wxId" label="微信号" align="center"></el-table-column>
          <el-table-column prop="createTime" label="注册时间" align="center"></el-table-column>
          <el-table-column prop="totalOrderPrice" label="消费金额" align="center"></el-table-column>
          <el-table-column prop="totalOrders" label="订单数量" align="center">
            <template slot-scope="scope">
              <el-link :underline="false">{{ scope.row.totalOrders }}</el-link>
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
        userId: '',
        wxId: '',
        nickName: '',
        minTotalOrders: '',
        maxTotalOrders: '',
        minOrderPrice: '',
        maxOrderPrice: '',
        page: 1,
        size: 5
      },
      initialForm: {
        userId: '',
        wxId: '',
        nickName: '',
        minTotalOrders: '',
        maxTotalOrders: '',
        minOrderPrice: '',
        maxOrderPrice: '',
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
    getUsers() {
      this.loading = true;
      axios.post('/api/admin/getUserList', {
        page: this.form.page,
        size: this.form.size,
        param:{
          userId: this.form.userId || null,
          wxId: this.form.wxId || null,
          nickName: this.form.nickName || null,
          minTotalOrders: this.form.minTotalOrders || null,
          maxTotalOrders: this.form.maxTotalOrders || null,
          minOrderPrice: this.form.minOrderPrice || null,
          maxOrderPrice: this.form.maxOrderPrice || null
        }
      })
        .then(response => {
          console.log(response.data.resultList)
          if (response.data.code === 200) {
            this.users = response.data.data.resultList;
            this.total = response.data.data.total;
          } else {
            this.$message.error("数据加载失败");
          }
        })
        .catch(error => {
          this.$message.error("数据加载失败");
        })
        .finally(() => {
          this.loading = false;
        });
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
