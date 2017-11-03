<template>
  <el-container>
    <el-aside width="200px">
      <img class="asideBg" :src="asideBg" alt="">
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-row>
          <el-col :span="10" :offset="5">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
import vueValidate from './vueValidate'

export default {
  data () {
//    const checkPass = (rule, value, callback) => {
//      if (value !== 'sda') {
//        callback(new Error('年龄不能为空'))
//      }
//    }
    return {
      asideBg: require('./demo.jpg'),
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          {required: true, message: '输入登录名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '输入密码', trigger: 'blur'},
//          {validator: vueValidate.validatePass, trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    vueValidate.validateName()
  },
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          this.$message.error('请重新填写表单！')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.asideBg {
  width: 100%;
}
</style>
