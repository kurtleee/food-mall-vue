<template>
  <div class="app-container">

    <p class="breadcrumb-space"></p>

    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="商品ID：">
            <el-input style="width: 220px" v-model="listQuery.id" placeholder="商品ID"></el-input>
          </el-form-item>
          <el-form-item label="商品标题：">
            <el-input style="width: 220px" v-model="listQuery.title" placeholder="商品标题"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" placeholder="请选择状态" clearable style="width: 220px">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品类：">
            <el-select v-model="listQuery.type" placeholder="请选择品类" clearable style="width: 220px">
              <el-option
                v-for="item in typeOptions"
                :key="item.id"
                :label="item.typeName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品现价：">
            <div style="display: flex; align-items: center;">
              <el-input
                v-model="listQuery.minCurrentPrice"
                placeholder="最低现价"
                style="width: 100px;">
              </el-input>
              <span style="padding: 0 8px;">~</span>
              <el-input
                v-model="listQuery.maxCurrentPrice"
                placeholder="最高现价"
                style="width: 100px;">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="商品原价：">
            <div style="display: flex; align-items: center;">
              <el-input
                v-model="listQuery.minOriginalPrice"
                placeholder="最低原价"
                style="width: 100px;">
              </el-input>
              <span style="padding: 0 8px;">~</span>
              <el-input
                v-model="listQuery.maxOriginalPrice"
                placeholder="最高原价"
                style="width: 100px;">
              </el-input>
            </div>
          </el-form-item>
          <el-col :span="24" class="form-buttons" style="text-align: right; margin-right: 50px;">
            <el-form-item>
              <el-button
                @click="handleSearchList"
                type="primary"
                size="small">
                查询
              </el-button>
              <el-button
                @click="handleResetSearch"
                size="small">
                重置
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProduct"
        size="mini">
        新增商品
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="商品ID" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.imgSrc"></template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.title }}</p>
            <p>描述：{{ scope.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column label="品类" width="100" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.type.typeName }}</p>
            <p>标签：{{ scope.row.tag }}</p>
          </template>
        </el-table-column>
        <el-table-column label="现价" width="100" align="center">
          <template slot-scope="scope">￥{{ scope.row.currentPrice }}</template>
        </el-table-column>
        <el-table-column label="原价" width="100" align="center">
          <template slot-scope="scope">￥{{ scope.row.originalPrice }}</template>
        </el-table-column>
        <el-table-column label="销量" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.saleCount }}</template>
        </el-table-column>
        <el-table-column label="状态" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="2"
              active-text="上架"
              inactive-text="下架"
              @change="handleStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{ formatDate(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column label="规格" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.specification }}</template>
        </el-table-column>
        <el-table-column label="商品后台分类" width="100" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.classification.classificationName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdateProduct(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作" style="width: 220px">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[3,5, 10, 15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Breadcrumb from '@/components/Breadcrumb.vue';



export default {
  name: 'ProductIndex',
  components: {
    Breadcrumb
  },
  data() {
    return {
      operateType: null,
      listQuery:{
        id: '',
        title: '',
        status: '',
        type: '',
        classification:'',
        minCurrentPrice: '',
        maxCurrentPrice: '',
        minOriginalPrice: '',
        maxOriginalPrice: '',
        page: 1,
        size: 5
      },
      initialQuery:{
        id: '',
        title: '',
        status: '',
        type: '',
        classification:'',
        minCurrentPrice: '',
        maxCurrentPrice: '',
        minOriginalPrice: '',
        maxOriginalPrice: '',
        page: 1,
        size: 5
      },
      list: [],
      total: 0,
      listLoading: false,
      multipleSelection: [],
      statusOptions: [
        { value: 1, label: '上架' },
        { value: 2, label: '下架' }
      ],
      typeOptions: [],
      operates: [
        { value: 'delete', label: '删除' }
      ]
    };
  },
 
  methods: {
    handleStatusChange(row) {
      this.updateStatus(row);
    },
    updateStatus(row) {
      this.$axios.post(`/api/admin/updateProductStatus`, { id: row.id, status: row.status  })
        .then(response => {
          if (response.data.code === 200) {
            this.$message.success('状态更新成功');
            this.getList(); // 刷新列表
          } else {
            this.$message.error('状态更新失败');
          }
        }).catch(error => {
          this.$message.error('状态更新失败');
        });
    },
    getList() {
  this.listLoading = true;


  
  // Create a copy of listQuery and remove empty strings
  let queryParams = {...this.listQuery};
  for (let key in queryParams) {
    if (queryParams[key] === '') {
      queryParams[key] = null; // 将空字符串替换为 null
    }
  }

  // 包装请求数据
  const requestData = {
    page: queryParams.page,  // 确保page被正确传递
    size: queryParams.size,
    param: {
      id: queryParams.id,
      title: queryParams.title,
      status: queryParams.status,
      classification: queryParams.classification ? { id: queryParams.classification } : null,
      minCurrentPrice: queryParams.minCurrentPrice,
      maxCurrentPrice: queryParams.maxCurrentPrice,
      minOriginalPrice: queryParams.minOriginalPrice,
      maxOriginalPrice: queryParams.maxOriginalPrice,
      type: queryParams.type ? { id: queryParams.type } : null
    }
  };

  // 输出处理后的参数用于调试
  console.log('Request Data:', requestData);

  this.$axios.post('/api/admin/getProductList', requestData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    this.listLoading = false;
    if (response.data.code === 200) {
      this.list = response.data.data.content;
      this.total = response.data.data.totalElements;
    } else {
      this.$message.error(response.data.msg);
    }
  }).catch(error => {
    this.listLoading = false;
    console.error("Error fetching list:s", error);
    this.$message.error("数据加载失败");
  });
},
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleResetSearch() {
      this.listQuery = { ...this.initialQuery };
      this.getList();
    },
    handleAddProduct() {
      this.$router.push({ name: 'addProduct' });
    },
    handleBatchOperate() {
      if (!this.operateType) {
        this.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (!this.multipleSelection.length) {
        this.$message({
          message: '请选择要操作的商品',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = this.multipleSelection.map(item => item.id);
        switch (this.operateType) {
          case 'delete':
            this.updateDeleteStatus(ids);
            break;
          default:
            break;
        }
        this.getList();
      });
    },
    handleSizeChange(val) {
  this.listQuery.page = 1; // 确保是page而不是pageNum
  this.listQuery.size = val; // 确保是size而不是pageSize
  this.getList();
  },

  handleCurrentChange(val) {
    this.listQuery.page = val; // 确保是page而不是pageNum
    this.getList();
  },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleUpdateProduct(index, row) {
      this.$router.push({ path: `/pms/updateProduct`, query: { id: row.id } });
    },
    handleDelete(index, row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateDeleteStatus([row.id]);
      });
    },
    updateDeleteStatus(ids) {
      axios.post('/api/products/delete', ids)
        .then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
    },
    formatDate(date) {
      if (!date) {
        return null; // 你可以在这里返回任何你想显示的默认值
      }
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        return 'Invalid Date'; // 处理无效日期
      }
      return d.toLocaleString();
    },
    getTypeOptions() {
    this.$axios.get('/api/type/getTypeList')
      .then(response => {
        if (response.data.code === 200) {
          this.typeOptions = response.data.data;
        } else {
          this.$message.error('获取品类数据失败');
        }
      })
      .catch(error => {
        this.$message.error('获取品类数据失败');
      });
  },
  },
  created() {
    this.getList();
    this.getTypeOptions();
  },
}
</script>

<style>
.app-container {
  background: #fff;
  /* padding: 20px; */
  overflow-y: auto; 
}
.filter-container, .operate-container, .top-container{
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
</style>
