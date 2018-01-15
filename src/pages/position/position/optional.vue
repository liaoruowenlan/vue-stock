<template>
    <div class="optional-seo">
        <div>
            <div class="clearfix">
              <input type="text" class="seo-text" v-model="code" @keyup="changeCode($event)" placeholder="输入股票名称/代码/简拼" />
              <!-- <input type="button" value="搜索" class="seo-btn"/> -->
            </div>
            <ul v-if="searchShow" >
              <li  class="clearfix" v-for="(item,index) in searchList" :key="index">
                <span class="fl">{{item.name}} </span>   
                <span class="fl"> {{item.code}}</span>   
                <el-button type="danger" class="fr" size="mini" style="marginTop:1px;" @click="add(item.code)">加入自选</el-button>
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
                <el-button type="text" size="medium" class="pointBuy" @click="point(scope.row)">点 买</el-button>
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
    </div>
</template>

<script>
export default {
  name: "optional",
  data() {
    return {
      dataList: [],
      loading: false,
      total: 0,
      size: 8,
      page: 0,
      code:'',
      searchList: [],
      canSearch:false,
      searchShow:false,
      exmSearch:[]
    };
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
            var data = response.data.result.splice(0,4);
            _this.searchList = data;
            this.exmSearch.push(data)
            _this.first = data.slice(0, 1);
            this.searchShow = true
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
      var _this = this
      _this.code = ''
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
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              
              // this.$router.go(0);
              for(let i = 0;i<this.dataList.length;i++){
                if(this.dataList[i].code==code.code){
                  this.dataList.splice(i,1)
                  break
                }
              }
              // this.
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
    point(code) {
      this.$router.push({ name: "Quotation", query: { code: code.code } });
    },
    getList() {
      this.loading = true;
      this.$axios
        .get(
          "/strategist/favoriteStock/favoriteStockPage?page=" +
            this.page +
            "&size=" +
            this.size,
          {
            headers: {
              Authorization: sessionStorage.getItem("token")
            }
          }
        )
        .then(res => {
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
    add(code){
        this.searchShow = false;    
        this.code =''  
      this.$axios
        .post(
          "/strategist/favoriteStock/addFavoriteStock?stockCode=" + code
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "加入成功",
              type: "success"
            });
          }
          this.getList()
        }).catch((res)=>{
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
.user_div-table{
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
  width: 100%;
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