import request from '@/utils/request'


export default
{
   getTeacherList(current,limit,teacherquery){
    return request({
        url:`/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
        method:'post',
        data:teacherquery
    })
   },
   deletTeacher(teacherid)
   {
      return request({
           url:`/eduservice/edu-teacher/deleteById/${teacherid}`,
           method:'get'
        })
   },
   addTeacher(teacher)
   {
        return request({
            url:'/eduservice/edu-teacher/addTeacher',
            method:'post',
            data:teacher
        })
   },
   getTeacherinfo(id){
       return request({
           url:`/eduservice/edu-teacher/getTeacher/${id}`,
           method:'get'
       })
   },
   updateTeacher(teacher)
   {
       return request({
            url:'/eduservice/edu-teacher/updateTeacher',
            method:'post',
            data: teacher
       });
   }
}