<template>
    <div class="optional-seo">
        <div>
            <input type="text" class="seo-text" placeholder="输入股票名称/代码/简拼" />
            <input type="button" value="搜索" class="seo-btn"/>
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
            width="180"
            align="center">
            </el-table-column>
            <el-table-column
            prop="lastPrice"
            label="当前价"
            width="180"
            class="red"
            align="center">
            <template slot-scope="scope">
                <span :class="[scope.row.upDropSpeed>0?'red':'green']">{{ scope.row.lastPrice }}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="upDropSpeed"
            label="涨跌幅"
            width="180"
            align="center">
            <template slot-scope="scope">
                <span :class="[scope.row.upDropSpeed>0?'red':'green']">{{ scope.row.upDropSpeed>0?'+'+(scope.row.upDropSpeed*10000/100).toFixed(2):(scope.row.upDropSpeed*10000/100).toFixed(2) }}%</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="remarks"
            label="操作"
            width="180"
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
      page:0
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    currentPage(val){
        this.page = val -1
        this.getList()
    },
    remove(code) {
        this.loading = true;
        this.$confirm('确定移除"'+ code.name+'" （'+ code.code+'） 这只股票吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.post('/strategist/favoriteStock/removeFavoriteStock?stockCodes='+code.code).then((res)=>{
                if(res.data.code == 200){
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                }
            }).catch((res)=>{
                console.log(res.data)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    point(code){
        this.$router.push({ name: 'Quotation', params: { code: code.code }})
    },
    getList() {
        this.loading= true
      this.$axios
        .get("/strategist/favoriteStock/favoriteStockList?page="+this.page+"&size="+this.size, {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.dataList = res.data.result;
            this.total = res.data.result.length;
          }
          console.log(res.data);
        setTimeout(()=>{
            this.loading= false
        },300)
          
        });
    }
  }
};
</script>

<style scoped>
.red {
  color: #e26042;
}
.green {
  color: #47c233;
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
.optional-seo > div {
  width: 814px;
  margin: 0 auto;
  margin-top: 11px;
}
.optional-seo > div > .seo-text {
  width: 715px;
  height: 28px;
  padding-left: 36px;
  border: 0;
  background: url("../../../assets/img/search@2x.png") no-repeat 11px 6px;
  background-size: 15px 17px;
  border: solid 1px #dee0e4;
  float: left;
  line-height: 30px;
}
.optional-seo > div > .seo-btn {
  border: 0;
  float: left;
  color: #fff;
  font-size: 14px;
  width: 60px;
  height: 30px;
  background: #dee0e4;
}
</style>