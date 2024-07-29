<template>
    <div>
        <div>
            <el-descriptions class="margin-top" title="订单状态" :column="2" :size="size" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        订单编号
                    </template>
                    {{ orderId }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        下单时间
                    </template>
                    {{ orderDetail.orderDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        收货地址
                    </template>
                    {{ orderDetail.detailAddress }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        商品金额
                    </template>
                    <el-tag style="color: green;" size="small">￥{{ orderDetail.orderPrice }}</el-tag>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <br>
        <br>
        <div>
            <el-table :data="orderDetail.orderItems" border style="width: 100%">
                <el-table-column prop="good.imgSrc,good.title" label="商品">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.good.imgSrc" style="margin-right: 20px;"></el-image>
                        <span>{{ scope.row.good.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="good.currentPrice" label="单价">
                </el-table-column>
                <el-table-column prop="buyCount" label="数量">
                </el-table-column>
                <el-table-column prop="sumPrice" label="商品总价">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
                    // this.list = res.data.data.resultList;
                    // this.total = res.data.data.total;
                })
        }

    },
    created() {
        this.orderId = this.$route.query.orderId
        this.tableData();
    }
}
</script>

<style></style>