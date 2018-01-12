<template>
    <el-dialog
            title="首次请设置支付密码"
            :visible.sync="centerDialogVisible"
            width="30%"
            custom-class="dialogg"
            :close-on-press-escape='false'
            :show-close="false"
            :close-on-click-modal="false"
            center>
        <div>
            <input type="password"  class="payPasw" maxlength="6" @keyup="showTime" ref="paymentPwdInput"  v-model="payPass"/>
        </div>
        <span slot="footer" class="dialog-footer">
        <div @click="userWithd" class="paypassword" ref="btn">
            确定
        </div>
            <input type="text"  style="display: none;"/>
    </span>
    </el-dialog>
</template>
<script>
import qs from "qs";

export default {
    props:{
        centerDialogVisible:{
            type:Boolean,
            default:false
        },
    },
    data(){
        return{
            payPass:''
        }
    },
    methods: {
        showTime(){
            if (this.payPass.length > 5) {
                this.$refs.paymentPwdInput.blur();
                this.$refs.btn.style.backgroundColor="#ee8354"
            }else{
                this.$refs.btn.style.backgroundColor="#f9d9cb" 
            }
        },
        userWithd(){
            if(this.payPass.length<6) return ;
            this.$axios.post('/strategist/publisher/initPaymentPassword',qs.stringify({paymentPassword:this.payPass})).then((response)=>{
                this.$emit('close')
                    // this.centerDialogVisible = false
            })
        },
    }
};
</script>
<style scoped>
.v-modal {
  z-index: 89 !important;
}
.dialogg {
  width: 408px !important;
  margin-top: 26vh !important;
  height: 236px !important;
  border-radius: 10px;
}
.payPasw {
  width: 286px;
  height: 42px;
  margin: 0 auto;
  display: block;
  letter-spacing: 40px;
  text-indent: 25px;
  background: url("../assets/img/passWborder.png") no-repeat;
}
.paypassword {
  width: 300px;
  height: 40px;
  background: #f9d9cb;
  color: #fff;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
}
</style>
