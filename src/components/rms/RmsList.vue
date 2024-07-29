<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>仓库管理</span>
        <el-button style="float:right" type="primary" @click="getList()" size="small">
          查询搜索
        </el-button>
        <el-button style="float:right;margin-right: 15px" @click="reset" size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item>
            <el-input class="input-width" placeholder="仓库名称/仓库地址" v-model="paramData.param.nameOrAddress"></el-input>
          </el-form-item>
          <el-form-item label="所在城市：">
            <el-select v-model="paramData.param.city" class="input-width" placeholder="全部" clearable
              @change="updateRegionOptions">
              <el-option v-for="item in cityOptions" :key="item.value" :label="item.label"
                :value="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在地区：">
            <el-select v-model="paramData.param.region" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in regionOptions" :key="item.value" :label="item.label"
                :value="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input class="input-width" placeholder="仓库面积" v-model="paramData.param.minArea"></el-input>
            <span>~</span>
            <el-input class="input-width" placeholder="仓库面积" v-model="paramData.param.maxArea"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input class="input-width" placeholder="关联小区数" v-model="paramData.param.minCommunity"></el-input>
            <span>~</span>
            <el-input class="input-width" placeholder="关联小区数" v-model="paramData.param.maxCommunity"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input class="input-width" placeholder="骑手数" v-model="paramData.param.minSorter"></el-input>
            <span>~</span>
            <el-input class="input-width" placeholder="骑手数" v-model="paramData.param.maxSorter"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input class="input-width" placeholder="分拣员数" v-model="paramData.param.minDeliveryman"></el-input>
            <span>~</span>
            <el-input class="input-width" placeholder="分拣员数" v-model="paramData.param.maxDeliveryman"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>仓库列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="returnApplyTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange"
        v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="仓库名称" width="180" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="city" label="所在城市" width="180" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="region" label="所在区域" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="address" label="仓库地址" width="180" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="area" label="仓库面积" width="180" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="communityCount" label="关联小区数" width="180" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="deliverymanCount" label="骑手数" width="180" align="center">
          <template></template>
        </el-table-column>
        <el-table-column prop="sorterCount" label="分拣员数" width="180" align="center">
          <template></template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="registoryDetail(scope.row.id)">查看详情</el-button>
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
      list: [],
      paramData: {
        page: 1,
        size: 10,
        param: {
          nameOrAddress: null,
          city: null,
          minArea: null,
          maxArea: null,
          minCommunity: null,
          maxCommunity: null,
          minSorter: null,
          maxSorter: null,
          minDeliveryman: null,
          maxDeliveryman: null
        },
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
            { label: "鸠江区", value: 43 },
          ]
        },
        {
          label: "莆田",
          value: 5,
          regions: [
            { label: "城厢区", value: 51 },
            { label: "涵江区", value: 52 },
            { label: "荔城区", value: 53 },
          ]
        },
        {
          label: "合肥",
          value: 6,
          regions: [
            { label: "瑶海区", value: 61 },
            { label: "庐阳区", value: 62 },
            { label: "蜀山区", value: 63 },
          ]
        }
      ],
      selectedCity: "",
      regionOptions: [],
      pageNum: 1,
      pageSize: 10,
      status: '',
      createTime: '',
      handleMan: '',
      handleTime: '',
      value: '',
      total:0,
      listLoading: false,
      multipleSelection: [],
      operateType: 1,
    }
  },

  methods: {
    registoryDetail(row){
      this.$router.push({path:'/rmsDetail',query:{'id':row}});
    },
    reset() {
      this.paramData.param.nameOrAddress = null,
        this.paramData.param.city = null,
        this.paramData.param.minArea = null,
        this.paramData.param.maxArea = null,
        this.paramData.param.minCommunity = null,
        this.paramData.param.maxCommunity = null,
        this.paramData.param.minSorter = null,
        this.paramData.param.maxSorter = null,
        this.paramData.param.region = null,
        this.paramData.param.minDeliveryman = null,
        this.paramData.param.maxDeliveryman = null,
        this.getList()

    },
    getList() {
      this.$axios.post("api/repository/getRepositoryList", this.paramData)
        .then(res => {
          console.log(res.data);
          this.list = res.data.data.resultList;
          this.total = res.data.data.total;
        })
    },
    updateRegionOptions(cityValue) {
      console.log(cityValue)
      const selectedCity = this.cityOptions.find(
        city => city.label === cityValue
      );
      if (selectedCity) {
        this.regionOptions = selectedCity.regions;
      } else {
        this.regionOptions = [];
      }
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