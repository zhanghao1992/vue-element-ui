<template>
  <el-container>
    <el-aside width="300px">
      <img class="asideBg" :src="asideBg" alt="">
    </el-aside>
    <el-container>
      <el-header id="head" ref="head">header</el-header>
      <el-main>
        <el-row>
          <el-col :span="10" :offset="5">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
              <el-form-item label="用户名" prop="name">
                <el-input ref="name" v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item class="captchaBox" label="图形验证码" prop="captcha">
                <el-input v-model="ruleForm.captcha"></el-input>
                <captcha class="captcha" @setPublicKey="setPublicKeyHandler"></captcha>
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
  //  import vueValidate from './vueValidate'
  import Captcha from '@/components/base/Captcha/Captcha'
  import { mapGetters, mapActions } from 'vuex'
  import jsencrypt from 'jsencrypt'

  export default {
    data () {
      return {
        asideBg: require('./demo.jpg'),
        ruleForm: {
          name: '',
          password: '',
          captcha: '',
          encryptedCaptcha: ''
        },
        rules: {
          name: [
            {required: true, message: '输入登录名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '输入密码', trigger: 'blur'}
//            {validator: vueValidate.validatePass, trigger: 'blur'}
//          {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '输入图形验证码', trigger: 'blur'}
          ]
        },
        publicKey: ''
      }
    },
    mounted () {},
    computed: {
      ...mapGetters(['captcha'])
    },
    methods: {
      setPublicKeyHandler (publicKey) {
        this.publicKey = publicKey
      },
      onSubmit () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const encrypt = new jsencrypt.JSEncrypt()
            // 图形验证码明文
            const captchaValue = this.ruleForm.captcha
            //  密码加密传输
            const publicKey = this.publicKey
            encrypt.setPublicKey(publicKey)
            this.ruleForm.encryptedCaptcha = encrypt.encrypt(captchaValue)
            this.$http.post('/node/login', {
              ruleForm: this.ruleForm
            }).then(json => {
              const res = json.data
              if (res.code === 0) {
//                const WL = window.localStorage
//                WL.setItem('userInfo', JSON.stringify(this.ruleForm))
                this.$router.push('/haslogin')
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.msg
                })
              }
            })
          } else {
            return false
          }
        })
      },
      ...mapActions(['setUser', 'exit'])
    },
    components: {
      Captcha
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*@import 'Login.css';*/

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

  .captchaBox {
    position: relative;
  }

  .captcha {
    position: absolute;
    right: 3px;
    top: 0;
    height: 100%;
    padding: 1px;
    box-sizing: border-box;
  }

  .asideBg {
    width: 100%;
  }
</style>
