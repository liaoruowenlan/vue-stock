<template>
  <div class="mask" v-if="show">
      <el-dialog
              title="请输入支付密码"
              :visible.sync="centerDialogVisible"
              width="30%"
              custom-class="dialogg"
              :modal="false"
              @close = "clear"
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
      <div class="main">
          <span class="close" @click="close"> X </span>
          <h2>{{name}} {{instrumentId}}</h2>
          <ul class="firstUl" v-for="(item,index) in dataList" :key="index" v-show="index==bigI">
              <li class="topone clearfix">
                  <span class="label fl">点买类型</span>
                  <ul class="toptwo fr clearfix" ref="toptwo">
                      <li :class="index1==i?'active fl':'fl'"  v-for="(o,i) in listTitle" :key="i" @click="click(i)">{{o}}</li>
                  </ul>
              </li>
              <li class="topone clearfix" >
                  <span class="label fl">申请金额</span>
                  <ul class="toptwo fr clearfix">
                      <li :class="index2==i?'active fl':'fl'" v-for="(el,i) in item.amountValues" :key="i"  @click="click1(el,i)">{{((el.value)/10000).toFixed(1)}}万</li>
                  </ul>
              </li>
              <li class="topone clearfix" >
                  <span class="label fl">股  &nbsp;&nbsp;数</span>
                  <div>{{parseInt(marketValue/upLimitPrice)%100>0?parseInt(marketValue/upLimitPrice)-parseInt(marketValue/upLimitPrice)%100:'不足购买一手'}}</div>
              </li>
              <li class="topone clearfix" >
                  <span class="label fl">资金使用率</span>
                  <div>{{((parseInt(marketValue/upLimitPrice)-parseInt(marketValue/upLimitPrice)%100)*upLimitPrice/marketValue*100).toFixed(2)}}%</div>
              </li>
              <li class="topone clearfix" >
                  <span class="label fl">止盈率</span>
                  <div>{{item.profit*100}}%</div>
              </li>
              <li class="topone clearfix" >
                  <span class="label fl">止损率</span>
                  <ul class="toptwo fr clearfix">
                      <li :class="index3==i?'active fl losses':'fl losses'" v-for="(el,i) in item.losses" :key="i"  @click="click2(el,i)">-{{((el.point)*100).toFixed(2)}}%</li>
                  </ul>
              </li>
              <li class="topone clearfix" >
                  <span class="label fl">信息服务费</span>
                  <div>{{item.serviceFeePerWan*(marketValue/10000)}}元</div>
              </li>
              <li class="topone clearfix" >
                  <span class="label fl">履约保证金</span>
                  <div>{{marketValue*(losses*1000+item.wearingPoint*1000)/1000}}</div>
              </li>
              <li class="topone clearfix" >
                  <span class="label fl">递 延 费</span>
                  <div>{{item.deferred}}/天</div>
              </li>
          </ul>
          <ul class="secondUl">
            <li class="delayed">
              <el-checkbox  v-model="checked" >递延费到期自动支付</el-checkbox>
            </li>
            <li class="buyNow">
              <button @click="submit">立即点买</button>
            </li>
            <li class="info">
              交易时间 09:30-11:30 13:30-14:50
            </li>
          </ul>
      </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array
    },
    listTitle: {
      type: Array
    },
    amountValues: {
      type: Array
    },
    upLimitPrice: {
      type: [Number, String]
    },
    name: {
      type: String
    },
    instrumentId: {
      type: String
    }
  },
  watch: {
    dataList() {
      this.marketValue =
        this.dataList.length > 0 ? this.dataList[0].amountValues[0].value : "";
      this.losses =
        this.dataList.length > 0 ? this.dataList[0].losses[0].point : "";
      this.reserveFund =
        this.dataList.length > 0 ? this.dataList[0].wearingPoint : "";
      this.profitPoint =
        this.dataList.length > 0 ? this.dataList[0].profit : "";
      this.serviceFee =
        this.dataList.length > 0 ? this.dataList[0].serviceFeePerWan : "";
      this.id = this.dataList.length > 0 ? this.dataList[0].id : "";
    }
  },
  data() {
    return {
      payPass: "",
      centerDialogVisible: false,
      bigI: 0,
      index1: 0,
      index2: 0,
      index3: 0,
      color1: "",
      checked: true,
      marketValue: "",
      losses: 0,
      id: "",
      reserveFund: "",
      profitPoint: "",
      serviceFee: "",
      dialogVisible: true,
      canBuy:true
    };
  },
  methods: {
    clear(){
      this.payPass = ''
    },
    showTime() {
      if (this.payPass.length > 5) {
        this.$refs.paymentPwdInput.blur();
        this.$refs.btn.style.backgroundColor="#ee8354"        
      }else{
        this.$refs.btn.style.backgroundColor="#f9d9cb" 
      }
    },
    userWithd() {
      if(this.payPass.length<5) return;
      if(!this.canBuy) return;
      this.canBuy =false;
      var _this = this
      var requestObj = {
        stockCode: this.instrumentId, //股票代码
        lossPoint: this.losses, //止损点
        profitPoint: this.profitPoint, //止盈点
        delegatePrice: this.upLimitPrice, //upLimitPrice
        reserveFund:
          this.marketValue *
          (this.losses * 1000 + this.reserveFund * 1000) /
          1000, //保证金
        serviceFee: this.serviceFee * this.marketValue / 10000, //信息服务费
        applyAmount: this.marketValue, //申请金额
        strategyTypeId: this.id, //类型id
        deferred: this.checked, //选择框
        paymentPassword:this.payPass//支付密码
      };
      axios.post('/strategist/buyRecord/buy',qs.stringify(requestObj), {
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then((response)=>{
        _this.canBuy = true
        this.centerDialogVisible=false;
        this.payPass='';
        this.$refs.btn.style.backgroundColor="#f9d9cb";   
        if(response.data.code==200){
          this.$alert('已开启自动支付，在到期日期之后的交易日下午14:40自动扣除递延费18元/天,不出现止盈、止损、延期费扣除失败的情况下可以继续持有策略之下个交易日！', '购买成功', {
          confirmButtonText: '我知道了',})
        }else if(response.data.code==6008){          
          this.$alert(response.data.message, '点买通知', {
          confirmButtonText: '去设置支付密码',
          callback: action => {
           this.$router.push('/myaccount/setup')
          }})
        }else{
          this.$alert(response.data.message, '购买提示', )          
        }
      })

    },
    submit() {
      this.centerDialogVisible=true
    },
    close() {
      this.$emit("close");
    },
    click(index) {
      this.losses = this.dataList[index].losses[0].point;
      this.marketValue = this.dataList[index].amountValues[0].value;
      this.index1 = index;
      this.index2 = 0;
      this.index3 = 0;
      this.bigI = index;
      this.id = index + 1;
      this.reserveFund = this.dataList[index].wearingPoint;
      this.serviceFee = this.dataList[index].serviceFeePerWan;
      this.profitPoint = this.dataList[index].profit;
      console.log(this.reserveFund);
    },
    click1(value, index) {
      this.index2 = index;
      this.marketValue = value.value;
    },
    click2(value, index) {
      this.index3 = index;
      this.losses = value.point;
    }
  }
};
</script>
<style scoped>
.v-modal {
  z-index: 89 !important;
}
.dialogg {
  width: 408px !important;
  margin-top: 30vh !important;
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
.close {
  position: absolute;
  color: #ddd;
  font-size: 40px;
  right: 34px;
  top: 10px;
  cursor: pointer;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  top: 0;
  left: 0;
}
.mask .main {
  width: 800px;
  min-height: 710px;
  position: absolute;
  background-color: #ffffff;
  left: 50%;
  margin-left: -408px;
  top: 50%;
  margin-top: -400px;
  padding: 30px 140px;
  box-sizing: border-box;
}
.mask .main h2 {
  line-height: 50px;
  font-family: MicrosoftYaHei;
  font-size: 22px;
  text-align: center;
  color: #1e242e;
  font-weight: normal;
  border-bottom: 1px solid #ece7e7;
  margin-bottom: 20px;
}
.firstUl{
  min-height: 468px;
}
.firstUl > li:nth-of-type(2n) {
  border-bottom: 1px dashed #ece7e7;
}
.firstUl > li {
  padding: 10px 0;
}
.firstUl > li:last-child {
  border: none;
}
.toptwo {
  width: 82%;
}
.topone .label {
  font-size: 14px;
  display: inline-table;
  line-height: 20px;
  color: #687284;
  margin-right: 20px;
  margin-top: 2px;
  width: 70px;
}
.toptwo li {
  display: inline-block;
  width: 70px;
  height: 24px;
  border: solid 1px #dee0e4;
  text-align: center;
  margin-right: 30px;
  margin-bottom: 12px;
}
li.active {
  background-color: #ee8354;
  border: solid 1px #ee8354;
  color: #fff;
}
.secondUl li {
  padding: 10px 0;
}
.delayed {
  text-align: right;
}
.buyNow {
  text-align: center;
}
li.losses {
  width: 100px;
}
.secondUl button {
  width: 400px;
  height: 42px;
  background-color: #ee8354;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
}
li.info {
  font-size: 12px;
  color: #b2b0b3;
  padding: 0;
  text-align: center;
}
</style>
