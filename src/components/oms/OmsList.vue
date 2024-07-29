<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>订单列表</span>
        <el-button style="float:right" type="primary" @click="getList()" size="small">
          查询搜索
        </el-button>
        <el-button style="float:right;margin-right: 15px" @click="reset" size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input class="input-width" placeholder="订单编号/收货地址" v-model="paramData.param.orderIdOrAddress"></el-input>
          </el-form-item>

          <el-form-item prop="status" label="订单状态" align="center">
            <el-select v-model="paramData.param.status">
              <el-option label="待支付" :value="1"></el-option>
              <el-option label="待收货" :value="2"></el-option>
              <el-option label="待评价" :value="3"></el-option>
              <el-option label="售后处理中" :value="4"></el-option>
              <el-option label="已退款" :value="5"></el-option>
              <el-option label="已取消" :value="6"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-date-picker v-model="orderTime" type="datetimerange" :picker-options="pickerOptions" range-separator="~"
              start-placeholder="下单时间" end-placeholder="下单时间" align="right">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-input class="input-width" placeholder="商品金额" v-model="paramData.param.minOrderPrice"></el-input>
            <span>~</span>
            <el-input class="input-width" placeholder="商品金额" v-model="paramData.param.maxOrderPrice"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input class="input-width" placeholder="商品数量" v-model="paramData.param.minBuyCount"></el-input>
            <span>~</span>
            <el-input class="input-width" placeholder="商品数量" v-model="paramData.param.maxBuyCount"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>订单列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="returnApplyTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange"
        border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column prop="orderId" label="订单编号" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="orderDate" label="下单时间" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="orderPrice" label="商品金额" align="center">
          <template></template>
        </el-table-column>

        <el-table-column prop="buyCount" label="商品数量" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="detailAddress" label="收货地址" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" style="color: red">待支付</span>
            <span v-if="scope.row.status === 2" style="color: yellow">待收货</span>
            <span v-if="scope.row.status === 3" style="color: yellow">待评价</span>
            <span v-if="scope.row.status === 4" style="color: red">售后处理中</span>
            <span v-if="scope.row.status === 5" style="color: green">已退款</span>
            <span v-if="scope.row.status === 6" style="color: green">已取消</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="orderDetail(scope.row.orderId)">订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :current-page.sync="paramData.param.pageNum"
        :page-size="paramData.param.pageSize" :page-sizes="[5, 10, 15]" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0,
      multipleSelection: [],
      operateType: 1,
      orderTime: [],
      list: [],
      pageNum: 1,
      pageSize: 10,
      status: '',
      paramData: {
        page: 1,
        size: 10,
        param: {
          orderIdOrAddress: '',
          minOrderDate: '',
          maxOrderDate: '',
          minOrderPrice: '',
          maxOrderPrice: '',
          minBuyCount: '',
          maxBuyCount: '',
          status: ''
        },
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },

  methods: {
    orderDetail(row){
      this.$router.push({path:'/orderDetailList',query:{'orderId':row}});
    },
    getList() {
      this.paramData.param.minOrderTime = this.orderTime[0] ? this.orderTime[0] : "";
      this.paramData.param.maxOrderTime = this.orderTime[1] ? this.orderTime[1] : "";
      this.$axios.post("api/admin/getOrderList", this.paramData)
        .then(res => {
          console.log(res.data);
          this.list = res.data.data.resultList;
          this.total = res.data.data.total;
        })
    },
    reset() {
      this.paramData.param.orderIdOrAddress=''
      this.paramData.param.minOrderPrice=''
      this.paramData.param.maxOrderPrice=''
      this.paramData.param.minBuyCount=''
      this.paramData.param.maxBuyCount=''
      this.paramData.param.status=''
      this.paramData.param.minOrderDate=''
      this.paramData.param.maxOrderDate=''
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSearchList() {
      this.paramData.param.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.paramData.param.pageNum = 1;
      this.paramData.param.pageSize = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.paramData.param.pageNum = val;
      this.getList();
    },
  },
  created() {
    this.getList();
  }

}
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>