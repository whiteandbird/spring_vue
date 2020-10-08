
<template>
  <div class="app-container">
      新增讲师
     <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import th from '@/api/teacher/teacher'

export default {
    data(){
        return{
            isupdate:false,
            teacher:{},
            saveBtnDisabled:false
        }
    },
    created()
    {
        if(this.$route.params&&this.$route.params.id)
        {
          this.isupdate=true;
          const id=this.$route.params.id;
          this.getinfo(id);
        }
    },
    //监听
    watch:{
      $route(to,from)
      {
          console.log(from);
          console.log(to);
          if(this.$route.params&&!this.$route.params.id)
          {
            this.teacher={};
          }
      }
    },
    methods:{
      
      getinfo(id)
      {
        th.getTeacherinfo(id).then(
          response=>{
            this.teacher=response.data.teacher;
          }
        );
      },

      saveOrUpdate()
      {
          if(this.isupdate)
          {
              th.updateTeacher(this.teacher).then(response=>{
                this.$message({
                    type:'success',
                    message:'修改成功'
                });
                this.$router.push({path:'/teacher/table/'})
              });
          }
          else
          {
             th.addTeacher(this.teacher).then(response=>
          {
              this.teacher={};
              this.$message({
                  type:'success',
                  message:'添加成功'
              });
              this.$router.push({path:'/teacher/table'})
          });
          }
      }
    }
    
}
</script>