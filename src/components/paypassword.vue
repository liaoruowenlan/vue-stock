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
            <input type="password"  class="payPasw" maxlength="6" @keyup="showTime($event)" ref="paymentPwdInput"  v-model="payPass" :class="addCSs?'adss':''" />
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
            default:false,
        },
    },
    data(){
        return{
            payPass:'',
            addCSs:false
        }
    },
    methods: {
        showTime(event){
            this.payPass = this.payPass.replace(/[^\d]/g,'');
            if (this.payPass.length > 5) {
                // this.$refs.paymentPwdInput.blur();
                this.addCSs =true;
                if(event.keyCode == 13){
                    this.userWithd()
                }
                this.$refs.btn.style.backgroundColor="#ee8354"
            }else{
                this.$refs.btn.style.backgroundColor="#f9d9cb" 
                this.addCSs = false;
            }
        },
        userWithd(){
            if(this.payPass.length<6) return ;
            this.$axios.post('/strategist/publisher/initPaymentPassword',qs.stringify({paymentPassword:this.payPass})).then((response)=>{
                 this.$alert('设置成功', '密码设置', {
                    confirmButtonText: '确定',
                    showClose:true,
                    callback: action => {
                        this.$emit('close')
                    }
                });

                    // this.centerDialogVisible = false
            })
        },
    }
};
</script>
<style scoped>
.adss{
    text-indent: 30px !important;
}
.v-modal {
  z-index: 89 !important;
}
/* .dialogg {
  width: 408px !important;
  margin-top: 26vh !important;
  height: 236px !important;
  border-radius: 10px;
  z-index: 8999 !important;
  
} */
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
