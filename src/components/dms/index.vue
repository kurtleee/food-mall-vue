<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" size="small">查询搜索</el-button>
        <el-button style="float:right;margin-right: 15px" size="small">重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input
              v-model="paramData.param.orderNumOrSorterNameOrRepositoryId"
              class="input-width"
              placeholder="订单编号/配送员/仓库名称"
              @change="getList"
            ></el-input>
          </el-form-item>

          <el-form-item label="配送状态：">
            <el-select v-model="paramData.param.status" @change="getList" class="input-width">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="已配送" :value="1"></el-option>
              <el-option label="未配送" :value="2"></el-option>
              <el-option label="配送中" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在城市：">
            <el-select
              v-model="paramData.param.city"
              class="input-width"
              placeholder="全部"
              clearable
              @change="updateRegionOptions"
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在地区：">
            <el-select
              v-model="paramData.param.region"
              class="input-width"
              placeholder="全部"
              clearable
              @change="getList"
            >
              <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="下单时间：">
            <el-date-picker v-model="orderTime" type="daterange" align="right" unlink-panels range-separator="-"
              start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
              @change="getList"></el-date-picker>
          </el-form-item>

          <el-form-item label="商品数量：">
            <el-input v-model="paramData.param.minGoodsNum" style="width: 90px;" placeholder="最小数量"></el-input>
            <span>~</span>
            <el-input v-model="paramData.param.maxGoodsNum" style="width: 90px;" placeholder="最大数量"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table :data="list" :default-sort="{ prop: 'orderTime', order: 'descending' }">
        <el-table-column prop="orderNum" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
        <el-table-column prop="goodsNum" label="商品数量" align="center" width="180"></el-table-column>
        <el-table-column prop="deliveryTime" label="配送时长" align="center" width="180"></el-table-column>
        <el-table-column prop="status" label="配送状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">已配送</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status == 2">未配送</el-tag>
            <el-tag type="warning" v-else>待配送</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deliverymanName" label="配送员" align="center"></el-table-column>
        <el-table-column prop="city" label="所在城市" align="center"></el-table-column>
        <el-table-column prop="region" label="所在区域" align="center"></el-table-column>
        <el-table-column prop="repositoryName" label="仓库名称" align="center"></el-table-column>
      </el-table>
    </div>
    <el-footer style="position: fixed; bottom: 0; width: 100%; transition: opacity 0.8s ease-in-out;">
        <el-pagination
          v-if="showPagination"
          style="margin-left: 50%; transform: translateX(-40%); "
          layout="sizes, prev, pager, next, jumper, ->, total"
          :current-page="paramData.page"
          :page-size="paramData.size"
          :page-sizes="[2, 5, 10]"
          :total="total"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
    </el-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPagination: true,
      scrollTimeout: null,
      total: 0,
      list: "",
      orderTime: [],
      paramData: {
        page: 1,
        size: 5,
        param: {
          orderNumOrDeliverymanNameOrRepositoryId: null,
          status: null,
          city: null,
          region: null,
          minOrderTime: null,
          maxOrderTime: null,
          minGoodsNum: null,
          maxGoodsNum: null
        }
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      cityOptions: [
        {
          label: "南京",
          value: 1,
          regions: [
            { label: "江宁区", value: 11 },
            { label: "鼓楼区", value: 12 },
            { label: "秦淮区", value: 13 },
            { label: "玄武区", value: 14 }
          ]
        },
        {
          label: "常州",
          value: 2,
          regions: [
            { label: "新北区", value: 21 },
            { label: "武进区", value: 22 },
            { label: "金坛区", value: 23 }
          ]
        },
        {
          label: "赣州",
          value: 3,
          regions: [
            { label: "章贡区", value: 31 },
            { label: "南康区", value: 32 },
            { label: "赣县区", value: 33 }
          ]
        },
        {
          label: "芜湖",
          value: 4,
          regions: [
            { label: "镜湖区", value: 41 },
            { label: "弋江区", value: 42 },
            { label: "鸠江区", value: 43 }
          ]
        },
        {
          label: "莆田",
          value: 5,
          regions: [
            { label: "城厢区", value: 51 },
            { label: "涵江区", value: 52 },
            { label: "荔城区", value: 53 }
          ]
        },
        {
          label: "合肥",
          value: 6,
          regions: [
            { label: "瑶海区", value: 61 },
            { label: "庐阳区", value: 62 },
            { label: "蜀山区", value: 63 }
          ]
        }
      ],
      regionOptions: [],
      logisticsDialogVisible: false
    };
  },
  methods: {
    handleScroll() {
      // 滚动时隐藏分页组件
      this.showPagination = false;

      // 清除之前的定时器
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      // 设置新的定时器，在停止滚动后显示分页组件
      this.scrollTimeout = setTimeout(() => {
        this.showPagination = true;
      }, 200); // 100毫秒的延迟，可以根据需要调整
    },
    // 根据城市显示地区
    updateRegionOptions(cityValue) {
      const selectedCity = this.cityOptions.find(
        city => city.label === cityValue
      );
      if (selectedCity) {
        this.regionOptions = selectedCity.regions;
        this.getList();
      } else {
        this.regionOptions = [];
      }
    },
    getList() {
      this.paramData.param.minOrderTime = this.orderTime[0]
        ? this.orderTime[0]
        : "";
      this.paramData.param.maxOrderTime = this.orderTime[1]
        ? this.orderTime[1]
        : "";
      console.log(this.paramData);
      this.$axios.post("api/delivery/getDeliveryList", this.paramData).then(res => {
        console.log(res.data);
        this.list = res.data.data.resultList;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(arg) {
      this.paramData.size = arg;
      this.getList();
    },
    handleCurrentChange(arg) {
      this.paramData.page = arg;
      this.getList();
    }
  },
  created() {
    this.getList();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
};
</script>

<style></style>