<template>
    <div class="optional-seo">
        <div>
            <div class="clearfix">
              <input type="text" class="seo-text" v-model="code"   @keyup="changeCode($event)" placeholder="输入股票名称/代码" />
              <!-- <input type="button" value="搜索" class="seo-btn"/> -->
            </div>
            <ul v-if="searchShow" >
              <li  class="clearfix searchList" v-for="(item,index) in searchList" :key="index">
                <span class="fl">{{item.name}} </span>   
                <span class="fl"> {{item.code}}</span>     
                <el-button type="danger" class="fr" size="mini" style="marginTop:1px;" :disabled="item.disabled" @click="add(item.code)">加入自选</el-button>
              </li>
              
            </ul>
        </div>
        <div class="user_div-table">
             <el-table
            :data="dataList"
            style="width: 100%"
            v-loading="loading"
            element-loading-background="#fff"
            >
            <el-table-column
            prop="name"
            label="股票名称"
            width="220px"
            align="center">
            <template slot-scope="scope">
              <span class="codeName">
               {{ scope.row.name }} ( {{scope.row.code}} )
              </span>
            </template>               
            </el-table-column>
            <el-table-column
            prop="lastPrice"
            label="当前价"
            width="200px"
            class="red"
            align="center">
            <template slot-scope="scope">
                <span :class="[scope.row.upDropSpeed>0?'red':'green']">{{ scope.row.lastPrice }}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="upDropSpeed"
            label="涨跌幅"
            width="200px"
            align="center">
            <template slot-scope="scope">
                <span :class="[scope.row.upDropSpeed>0?'red':'green']">{{ scope.row.upDropSpeed>0?'+'+(scope.row.upDropSpeed*10000/100).toFixed(2):(scope.row.upDropSpeed*10000/100).toFixed(2) }}%</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="remarks"
            label="操作"
            width="190px"
            align="center">
            <template slot-scope="scope">
                <el-button type="text" size="medium" class="res" @click="getList()">刷 新</el-button>
                <el-button type="text" size="medium" class="pointBuy" @click="point(scope.row,$event)">点 买</el-button>
                <el-button type="text" size="medium" class="remove" @click="remove(scope.row)">移 除</el-button>
            </template>
            </el-table-column>
            </el-table>  
        </div>
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size='size'
            v-if="dataList.length>0"
            @current-change="currentPage">
        </el-pagination>
        <BuyMask @close="close"  :show="show" :dataList="buyList" :listTitle="listTitle" :amountValues="amountValues" :upLimitPrice="upLimitPrice" :name="name" :instrumentId="instrumentId"></BuyMask>
    </div>
</template>

<script>
import BuyMask from "../../../components/buy";
export default {
  name: "optional",
  data() {
    return {
      dataList: [],
      loading: false,
      total: 0,
      size: 8,
      page: 0,
      code: "",
      searchList: [],
      canSearch: false,
      searchShow: false,
      exmSearch: [],
      show: false,
      buyList: [],
      listTitle: [],
      amountValues: [],
      upLimitPrice: "",
      name: "",
      instrumentId: ""
    };
  },
  components: {
    BuyMask
  },

  mounted() {
    this.getList();
  },
  methods: {
    changeCode(event) {
      var val = this.code;
      var _this = this;
      if (val === "") {
        this.canSearch = false;
        this.searchShow = false;
        // console.log(this.canSearch)
        return;
      }
      this.canSearch = true;
      this.$axios
        .get("/strategist/stock/selectStock?keyword=" + val)
        .then(response => {
          if (response.data.code == 200) {
            console.log(this.dataList);
            var data = response.data.result.splice(0, 4);
            for (let i = 0; i < this.dataList.length; i++) {
              for (let j = 0; j < data.length; j++) {
                if (
                  data[j].name == this.dataList[i].name ||
                  data[j].code == this.dataList[i].code
                ) {
                  data[j].disabled = true;
                  break;
                }
              }
            }
            _this.searchList = data;
            console.log(data);
            this.exmSearch.push(data);
            this.searchShow = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    currentPage(val) {
      this.page = val - 1;
      this.getList();
    },
    remove(code) {
      var _this = this;
      _this.code = "";
      this.$confirm(
        '确定移除"' + code.name + '" （' + code.code + "） 这只股票吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios
            .post(
              "/strategist/favoriteStock/removeFavoriteStock?stockCodes=" +
                code.code
            )
            .then(res => {
              if (res.data.code == 200) {
                var _this = this;
                this.$message({
                  type: "success",
                  message: "删除成功!",
                  duration:500               
                });
              }
              this.getList()
            })
            .catch(res => {
              console.log(res.data);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    point(code, event) {
      event.stopPropagation();

      if (
        !this.$time.outtime(
          "09:30",
          new Date().getHours() + ":" + new Date().getMinutes()
        )
      ) {
        this.$alert("非交易时间段", "交易日式", {
          confirmButtonText: "确定"
        });
        return;
      }
      var _this = this;
      this.$axios
        .get("/strategist/stock/market/" + code.code)
        .then(function(response) {
          var data = response.data.result;
          _this.upLimitPrice = data.upLimitPrice;
          _this.name = data.name;
          _this.instrumentId = data.instrumentId;
          _this.buy();
        })
        .catch(function(error) {
          console.log(error);
        });
      // this.$router.push({ name: "Quotation", query: { code: code.code } });
    },
    close() {
      this.show = false;
      this.listTitle = [];
      this.upLimitPrice = "";
      // this.name=''
      // this.instrumentId=''
      this.amountValues = [];
    },
    buy() {
      var _this = this;
      var listTitle = this.listTitle;
      var amountValues = this.amountValues;
      this.$axios
        .get("/strategist/strategytype/lists")
        .then(response => {
          this.show = true;
          if (response.data.code == 200) {
            var data = response.data.result;
            _this.buyList = data;
            for (let i = 0; i < data.length; i++) {
              listTitle.push({name:data[i].name,id:data[i].id});
              amountValues.push(data[i].amountValues);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getList() {
      this.loading = true;
      if(!localStorage.getItem('token')) return; 
      this.$axios
        .get(
          "/strategist/favoriteStock/favoriteStockPage?page=" +
            this.page +
            "&size=" +
            this.size,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if(res.data.result.content == ""){
              this.page = 0;
              this.getList();
              
          }
          if (res.data.code == 200) {
            this.dataList = res.data.result.content;
            this.total = res.data.result.totalElements;
          }
          console.log(res.data);
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
    },
    add(code, event) {
      this.searchShow = false;
      this.code = "";
      if(!localStorage.getItem('token')) return;
      this.$axios
        .post("/strategist/favoriteStock/addFavoriteStock?stockCode=" + code)
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "加入成功",
              type: "success",
              duration: 3000
            });
          }
          this.getList();
        })
        .catch(res => {
          this.$message({
            showClose: true,
            message: "已收藏该股票",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style scoped>
.user_div-table {
  min-height: 540px;
}
.codeName {
  color: #3e59a7;
}
.red {
  color: #e26042;
  font-weight: 900;
  font-size: 18px;
}
.green {
  color: #47c233;
  font-weight: 900;
  font-size: 18px;
}
.res {
  color: #3e59a7;
  text-decoration: underline;
}
.pointBuy {
  color: #ee8354;
  text-decoration: underline;
}
.remove {
  text-decoration: underline;
  color: #687284;
}
.optional-seo {
  padding: 0 36px;
  box-sizing: border-box;
}
.optional-seo > div {
  position: relative;
}
.optional-seo ul {
  position: absolute;
  z-index: 99;
  line-height: 30px;
  padding: 0 36px;
  background: #fff;
  border: 1px solid #ddd;
  border-top: none;
  box-sizing: border-box;
  width: 812px;
}
.optional-seo ul li {
  padding: 2px 0;
}
.optional-seo > div > div {
  width: 814px;
  margin: 0 auto;
  margin-top: 11px;
}
.optional-seo > div > div > .seo-text {
  width: 774px;
  height: 28px;
  padding-left: 36px;
  border: 0;
  background: url("../../../assets/img/search@2x.png") no-repeat 11px 6px;
  background-size: 15px 17px;
  border: solid 1px #dee0e4;
  float: left;
  line-height: 30px;
}
.optional-seo > div > div > .seo-btn {
  border: 0;
  float: left;
  color: #fff;
  font-size: 14px;
  width: 60px;
  height: 30px;
  background: #dee0e4;
}
</style>