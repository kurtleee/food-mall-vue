<template>
    <div>
        <!--未完成绑定-->
        <div style="width: 80%; margin: 0 auto; background-color:whitesmoke;padding: 20px; border-radius: 20px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="仓库名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="所在城市">
                    <el-select class="input-width" placeholder="全部" clearable @change="updateRegionOptions">
                        <el-option v-for="item in cityOptions" :key="item.value" :label="item.label"
                            :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在地区">
                    <el-select class="input-width" placeholder="全部" clearable>
                        <el-option v-for="item in regionOptions" :key="item.value" :label="item.label"
                            :value="item.label"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="仓库地址">
                    <el-input type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="仓库面积">
                    <el-input>(㎡)</el-input>
                </el-form-item>
            </el-form>
        </div>
        <br>
        <br>
        <div style="width: 80%; margin: 0 auto; background-color:whitesmoke;padding: 20px; border-radius: 20px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="关联小区">
                    <el-input style="width: 50%; margin-right: 20px"></el-input>
                    <el-button type="primary">查询搜索</el-button>
                    <el-button type="success">新增小区</el-button>
                </el-form-item>
            </el-form>
        </div>
        <br>
        <br>
        <div style="width: 80%; margin: 0 auto; background-color:whitesmoke;padding: 20px; border-radius: 20px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="配置骑手">
                    <el-input style="width: 50%; margin-right: 20px"></el-input>
                    <el-button type="primary">查询搜索</el-button>
                    <el-button type="success">新增骑手</el-button>
                </el-form-item>
            </el-form>
        </div>
        <br>
        <br>
        <div style="width: 80%; margin: 0 auto; background-color:whitesmoke;padding: 20px; border-radius: 20px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="配置分拣员">
                    <el-input style="width: 50%; margin-right: 20px"></el-input>
                    <el-button type="primary">查询搜索</el-button>
                    <el-button type="success">新增分拣员</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
            orderId: '',
            orderDetail: {}
        }
    },
    methods: {
        tableData() {
            this.$axios.get("api/admin/getAdminOrderDetail/" + this.orderId)
                .then(res => {
                    console.log(res.data.data)
                    console.log(this.orderDetail);
                    if (res.data.code == 200) {
                        this.orderDetail = res.data.data
                    }
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
    },
    created() {
        this.orderId = this.$route.query.orderId
        this.tableData();
    }
}
</script>

<style></style>