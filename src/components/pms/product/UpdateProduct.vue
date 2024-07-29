<template>
    <div>
      <h1>编辑商品</h1>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
        <el-form-item label="商品ID" prop="id">
            <el-tooltip effect="dark" content="商品ID不可修改" placement="top">
            <el-input v-model="form.id" readonly disabled></el-input>
            </el-tooltip>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="form.tag"></el-input>
        </el-form-item>
        <el-form-item label="现价" prop="currentPrice">
          <el-input v-model="form.currentPrice" type="number"></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="originalPrice">
          <el-input v-model="form.originalPrice" type="number"></el-input>
        </el-form-item>
        <el-form-item label="销售数量" prop="saleCount">
          <el-input v-model="form.saleCount" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="specification">
          <el-tooltip effect="dark" content="请标明单位，如：1kg">
            <el-input v-model="form.specification"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="品类" prop="type">
          <el-select v-model="form.type.id" placeholder="请选择品类" clearable>
            <el-option v-for="item in typeOptions" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="后台分类" prop="classification">
          <el-select v-model="form.classification.id" placeholder="请选择分类" clearable>
            <el-option v-for="item in classificationOptions" :key="item.id" :label="item.classificationName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片上传">
          <el-upload
            class="avatar-uploader"
            action="api/good/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgSrc" :src="imgSrc" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateProduct">提交</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditProduct',
    data() {
      return {
        imgSrc: '',
        form: {
          id: null,
          title: '',
          imgSrc: '',
          description: '',
          tag: '',
          currentPrice: '',
          originalPrice: '',
          saleCount: '',
          status: '',
          specification: '',
          type: {
            id: null,
            typeName: ''
          },
          classification: {
            id: null,
            classificationName: ''
          }
        },
        typeOptions: [],
        classificationOptions: [],
        rules: {
          title: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ],
          tag: [
            { required: true, message: '请输入标签', trigger: 'blur' }
          ],
          currentPrice: [
            { required: true, message: '请输入现价', trigger: 'blur' }
          ],
          originalPrice: [
            { required: true, message: '请输入原价', trigger: 'blur' }
          ],
          saleCount: [
            { required: true, message: '请输入销售数量', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请输入状态', trigger: 'blur' }
          ],
          specification: [
            { required: true, message: '请输入规格', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          classification: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
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
      getClassficOptions() {
        this.$axios.get('/api/category/getCategoryList')
          .then(response => {
            if (response.data.code === 200) {
              this.classificationOptions = response.data.data;
              console.log('后台分类数据:', this.classificationOptions); // 确保数据正确
            } else {
              this.$message.error('获取后台分类数据失败');
            }
          })
          .catch(error => {
            this.$message.error('获取后台分类数据失败');
          });
      },
      getProductDetails() {
        this.$axios.get(`/api/admin/getProductById/${this.$route.query.id}`)
            .then(response => {
                if (response.data.code === 200) {
                    this.form = response.data.data;
                    this.imgSrc = this.form.imgSrc;
                } else {
                    this.$message.error('获取商品详情失败');
                }
            })
            .catch(error => {
                this.$message.error('获取商品详情失败');
            });
    },
      handleAvatarSuccess(res, file) {
        console.log('上传成功的响应:', res);
        this.imgSrc = res.data;
        this.form.imgSrc = res.data;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
  
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      updateProduct() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.form.type.id || !this.form.classification.id) {
              this.$message.error('请完整选择品类和后台分类');
              return;
            }
            this.$axios.post('/api/admin/updateProduct', this.form)
              .then(res => {
                if (res.data.code === 200) {
                  this.$message.success('更新成功！');
                  this.$router.push('/home/productIndex');
                } else {
                  this.$message.error('更新失败');
                }
              });
          } else {
            console.log('表单验证失败');
          }
        });
      },
      onReset() {
        this.$refs.form.resetFields();
      }
    },
    created() {
      this.getTypeOptions();
      this.getClassficOptions();
      this.getProductDetails();
    },
  };
  </script>
  
  <style scoped>
  .demo-form {
    max-width: 600px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
  