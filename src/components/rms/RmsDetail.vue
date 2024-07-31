<template>
  <div>
    <!--未完成绑定-->
    <div style="width: 80%; margin: 0 auto; background-color:whitesmoke;padding: 20px; border-radius: 20px">
      <el-form ref="form" :model="form" label-width="90px" label-position="left">
        <el-form-item label="仓库名称">
          <el-input v-model="repository.name"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-select class="input-width" placeholder="全部" clearable @change="updateRegionOptions"
            v-model="repository.city">
            <el-option v-for="item in cityOptions" :key="item.value" :label="item.label"
              :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-select class="input-width" placeholder="全部" clearable v-model="repository.region">
            <el-option v-for="item in regionOptions" :key="item.value" :label="item.label"
              :value="item.label"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="仓库地址">
          <el-input type="textarea" v-model="repository.address"></el-input>
        </el-form-item>
        <el-form-item label="仓库面积">
          <el-input v-model="repository.area" placeholder="㎡"></el-input>
        </el-form-item>
        <el-button type="primary" @click="updateRepository" style="float: right;">提交修改</el-button>
        <div style="clear: both;"></div>
      </el-form>
    </div>
    <br />
    <br />
    <div style="width: 80%; margin: 0 auto; background-color:whitesmoke;padding: 20px; border-radius: 20px">
      <el-form ref="form" :model="form" label-width="90px" label-position="left">
        <el-form-item label="关联小区">
          <el-input style="width: 50%; margin-right: 20px" placeholder="输入小区名称"
            v-model="communityParam.param.name"></el-input>
          <el-button type="primary" @click="getCommunityList">查询搜索</el-button>
          <el-button type="success" style="float: right;" @click="getAvailableCommunityList">新增小区</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="communities" border>
        <el-table-column prop="name" label="小区名称" align="center"></el-table-column>
        <el-table-column prop="name,region,city" label="小区地址" align="center">
          <template slot-scope="scope">{{ scope.row.city + scope.row.region + scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="removeCommunity(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination 
        small 
        background 
        style="margin-left: 50%; transform:translateX(-40%)"
        @size-change="handleSizeChangeCommunity" 
        @current-change="handleCurrentChangeCommunity"
          layout="total, sizes,prev, pager, next,jumper" 
          :current-page.sync="communityParam.page"
          :page-size="communityParam.size" 
          :page-sizes="[2, 3, 5, 10, 15]" 
          :total="communityParam.total">
        </el-pagination>
      </div>
      <el-dialog :visible.sync="communityVisible" title="新增小区">
        <el-table :data="communitiesAvailable" border>
          <el-table-column prop="name" label="小区名称" align="center"></el-table-column>
          <el-table-column prop="name,region" label="小区地址" align="center">
            <template slot-scope="scope">{{ scope.row.region + scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="addCommunity(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <br />
    <br />
    <div style="width: 80%; margin: 0 auto; background-color:whitesmoke;padding: 20px; border-radius: 20px">
      <el-form ref="form" :model="form" label-width="90px" label-position="left">
        <el-form-item label="配置骑手">
          <el-input style="width: 50%; margin-right: 20px" placeholder="请输入骑手手机号/姓名"
            v-model="deliverymanParam.param.nameOrPhone"></el-input>
          <el-button type="primary" @click="getDeliverymanList">查询搜索</el-button>
          <el-button type="success" style="float: right;" @click="getAvailableDeliveryman">新增骑手</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="deliverymen" border>
        <el-table-column prop="name" label="骑手姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="骑手手机号" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="removeOrAddDeliveryman(scope.row)">移出</el-button>
            <el-button type="text" @click="updateDeliveryman(scope.row)">{{ scope.row.status === 1 ? "禁用" : "启用"
              }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination 
        small 
        background 
        style="margin-left: 50%; transform:translateX(-40%)"
        @size-change="handleSizeChangeDeliveryman" 
        @current-change="handleCurrentChangeDeliveryman"
          layout="total, sizes,prev, pager, next,jumper" 
          :current-page.sync="deliverymanParam.page"
          :page-size="deliverymanParam.size" 
          :page-sizes="[2, 3, 5, 10, 15]" 
          :total="deliverymanParam.total">
        </el-pagination>
      </div>
      <el-dialog :visible.sync="deliverymanVisible" title="新增骑手">
        <el-table :data="deliverymenAvailable" border>
          <el-table-column prop="name" label="骑手姓名" align="center"></el-table-column>
          <el-table-column prop="phone" label="骑手手机号" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="removeOrAddDeliveryman(scope.row)">移入</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <br />
    <br />
    <div style="width: 80%; margin: 0 auto; background-color:whitesmoke;padding: 20px; border-radius: 20px">
      <el-form ref="form" :model="form" label-width="90px" label-position="left">
        <el-form-item label="配置分拣员">
          <el-input style="width: 50%; margin-right: 20px" placeholder="请输入分拣员手机号/姓名"
            v-model="sorterParam.param.nameOrPhone"></el-input>
          <el-button type="primary" @click="getSorterList">查询搜索</el-button>
          <el-button type="success" style="float: right;" @click="getAvailableSorter">新增分拣员</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="sorters" border>
        <el-table-column prop="name" label="分拣员姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="分拣员手机号" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="removeOrAddSorter(scope.row)">移出</el-button>
            <el-button type="text" @click="updateSorter(scope.row)">{{ scope.row.status === 1 ? "禁用" : "启用"
              }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination 
        small 
        background 
        style="margin-left: 50%; transform:translateX(-40%)"
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper" 
          :current-page.sync="sorterParam.page"
          :page-size="sorterParam.size" 
          :page-sizes="[2, 3, 5, 10, 15]" 
          :total="sorterParam.total">
        </el-pagination>
      </div>
      <el-dialog :visible.sync="sorterVisible" title="新增分拣员">
        <el-table :data="sortersAvailable" border>
          <el-table-column prop="name" label="分拣员姓名" align="center"></el-table-column>
          <el-table-column prop="phone" label="分拣员手机号" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="removeOrAddSorter(scope.row)">移入</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      communityVisible: false,
      deliverymanVisible: false,
      sorterVisible: false,
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
      selectedCity: "",
      regionOptions: [],
      repository: {},
      communityParam: {
        page: 1,
        size: 3,
        total: "",
        param: {}
      },
      communities: [],
      communitiesAvailable: [],
      deliverymanParam: {
        page: 1,
        size: 3,
        total: "",
        param: {}
      },
      deliverymen: [],
      deliverymenAvailable: [],
      sorterParam: {
        page: 1,
        size: 3,
        total: "",
        param: {}
      },
      sorters: [],
      sortersAvailable: []
    };
  },
  methods: {
    handleSizeChangeDeliveryman(val){
      this.deliverymanParam.page = 1;
      this.deliverymanParam.size = val;
      this.getDeliverymanList();
    },
    handleCurrentChangeCommunity(val){
      this.deliverymanParam.page = val;
      this.getDeliverymanList();
    },
    handleSizeChangeCommunity(val){
      this.communityParam.page = 1;
      this.communityParam.size = val;
      this.getCommunityList();
    },
    handleCurrentChangeCommunity(val){
      this.communityParam.page = val;
      this.getCommunityList();
    },
    handleSizeChange(val) {
      this.sorterParam.page = 1;
      this.sorterParam.size = val;
      this.getSorterList();
    },
    handleCurrentChange(val) {
      this.sorterParam.page = val;
      this.getSorterList();
    },
    updateRegionOptions(cityValue) {
      console.log(cityValue);
      const selectedCity = this.cityOptions.find(
        city => city.label === cityValue
      );
      if (selectedCity) {
        this.regionOptions = selectedCity.regions;
      } else {
        this.regionOptions = [];
      }
    },
    updateRepository() {
      this.$axios
        .post("/api/repository/updateRepository", this.repository)
        .then(resp => {
          if (resp.data.code == 200) {
            this.$message.success("修改成功");
          }
        });
    },
    getCommunityList() {
      this.communityParam.param.repositoryId = this.repository.id;
      this.$axios
        .post("/api/community/getCommunityList", this.communityParam)
        .then(resp => {
          if (resp.data.code == 200) {
            this.communities = resp.data.data.resultList;
            this.communityParam.total = resp.data.data.total;
          }
        });
    },
    removeCommunity(row) {
      row.repositoryId = null;
      this.$axios.post("/api/community/updateCommunity", row).then(resp => {
        if (resp.data.code == 200) {
          this.$message.success("删除成功");
          this.getCommunityList();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    getAvailableCommunityList() {
      this.communityVisible = true;
      this.communityParam.param.region = this.repository.region;
      this.$axios
        .post("/api/community/getCommunityAvailable", this.communityParam)
        .then(resp => {
          if (resp.data.code == 200) {
            this.communitiesAvailable = resp.data.data.resultList;
            this.communityParam.total = resp.data.data.total;
          }
        });
    },
    addCommunity(row) {
      row.repositoryId = this.repository.id;
      this.$axios.post("/api/community/updateCommunity", row).then(resp => {
        if (resp.data.code == 200) {
          this.$message.success("添加成功");
          this.getAvailableCommunityList();
          this.getCommunityList();
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    getDeliverymanList() {
      this.deliverymanParam.param.repositoryId = this.repository.id;
      this.$axios
        .post("/api/deliveryman/getDeliverymanList", this.deliverymanParam)
        .then(resp => {
          if (resp.data.code == 200) {
            this.deliverymen = resp.data.data.resultList;
            this.deliverymanParam.total = resp.data.data.total;
          }
        });
    },
    removeOrAddDeliveryman(row) {
      row.repositoryId = row.repositoryId == null ? this.repository.id : null;
      this.$axios.post("/api/deliveryman/updateDeliveryman", row).then(resp => {
        if (resp.data.code == 200) {
          this.$message.success(
            row.repositoryId == null ? "移出成功" : "移入成功"
          );
          this.getDeliverymanList();
          if (row.repositoryId != null) {
            this.getAvailableDeliveryman();
            this.getDeliverymanList();
          }
        } else {
          this.$message.error(
            row.repositoryId == null ? "移入失败" : "移出失败"
          );
        }
      });
    },
    updateDeliveryman(row) {
      row.status = row.status === 1 ? 2 : 1;
      this.$axios.post("/api/deliveryman/updateDeliveryman", row).then(resp => {
        if (resp.data.code == 200) {
          this.$message.success("修改成功");
          this.getDeliverymanList();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    getAvailableDeliveryman() {
      this.deliverymanVisible = true;
      this.$axios
        .post(
          "/api/deliveryman/getAvailableDeliverymanList",
          this.deliverymanParam
        )
        .then(resp => {
          if (resp.data.code == 200) {
            this.deliverymenAvailable = resp.data.data.resultList;
            this.deliverymanParam.total = resp.data.data.total;
          }
        });
    },
    getSorterList() {
      this.sorterParam.param.repositoryId = this.repository.id;
      this.$axios
        .post("/api/sorter/getSorterList", this.sorterParam)
        .then(resp => {
          if (resp.data.code == 200) {
            this.sorters = resp.data.data.resultList;
            this.sorterParam.total = resp.data.data.total;
          }
        });
    },
    removeOrAddSorter(row) {
      row.repositoryId = row.repositoryId == null ? this.repository.id : null;
      this.$axios.post("/api/sorter/updateSorter", row).then(resp => {
        if (resp.data.code == 200) {
          this.$message.success(
            row.repositoryId == null ? "移出成功" : "移入成功"
          );
          this.getSorterList();
          if (row.repositoryId != null) {
            this.getAvailableSorter();
            this.getSorterList();
          }
        } else {
          this.$message.error(
            row.repositoryId == null ? "移入失败" : "移出失败"
          );
        }
      });
    },
    updateSorter(row) {
      row.status = row.status === 1 ? 2 : 1;
      this.$axios.post("/api/sorter/updateSorter", row).then(resp => {
        if (resp.data.code == 200) {
          this.$message.success("修改成功");
          this.getSorterList();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    getAvailableSorter() {
      this.sorterVisible = true;
      this.$axios
        .post("/api/sorter/getAvailableSorterList", this.sorterParam)
        .then(resp => {
          if (resp.data.code == 200) {
            this.sortersAvailable = resp.data.data.resultList;
            this.sorterParam.total = resp.data.data.total;
          }
        });
    }
  },
  created() {
    this.repository = this.$route.query.repository;
    this.getCommunityList();
    this.getDeliverymanList();
    this.getSorterList();
  }
};
</script>

<style></style>