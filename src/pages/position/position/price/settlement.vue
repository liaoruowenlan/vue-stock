<template>
    <div class="settlement">
        <ul class="main">
            <li class="item" style="textAlign:center" v-if="dataList.length<1"> 暂无数据 </li>
            <List :item="item" v-for="(item,index) in dataList" :key="index" :index="index"/>
        </ul>
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
import List from './hasList'
export default {
  name: "settlement",
  data() {
    return {
      total: 0,
      size: 4,
      dataList:[],
      page:0,
    };
  },
  components: {
    List  
  },
  mounted () {
    this.getList()  
  },
  methods: {
    currentPage(val) {
        this.page = val - 1
        this.getList()
    },
    getList(){
        this.$axios.get('/strategist/buyRecord/pagesUnwind?page='+this.page+'&size='+this.size,{
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }).then((res)=>{
            if(res.data.code == 200){
                this.dataList = res.data.result.content
                this.total = res.data.result.totalElements
            }
        })
    }
  }
};
</script>

<style scoped>
.main{
    min-height: 600px;

}
.settlement {
    padding: 10px 100px;
}
</style>