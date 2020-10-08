import request from '@/utils/request'
import baseUrl from './index'

// 组织字段定义
export function orgCusAll(data) {
  return request({
    url: `${baseUrl}/hrm/unitCus/all`,
    method: 'get',
    data
  })
}

export function orgCusAdd(data) {
  // const data={ }
// 写要传递的参数，json格式
  return request({
    url: `${baseUrl}/hrm/unitCus`,
    method: 'post',
    // datatype:'json',
    data
  })
}

export function orgCusDel(id) {
  return request({
    url: `${baseUrl}/hrm/unitCus/id/${id}`,
    method: 'delete'
  })
}

export function orgCusUpdate(data, id) {
  return request({
    url: `${baseUrl}/hrm/unitCus/id/${id}`,
    method: 'put',
    data
  })
}

// 下拉框弹出表
// ${baseUrl}/mode/select/selSelectByPage?page=1&rows=10&sortBy=seqNo&desc=false
export function selectAll(data) {
  return request({
    url: `${baseUrl}/mode/select/selSelectByPage`,
    method: 'get',
    params: data
  })
}

// 系统按钮弹出表
// ${baseUrl}/sys/select/pageSelect?page=1&rows=5
export function sysAll(data) {
  return request({
    url: `${baseUrl}/sys/select/pageSelect`,
    method: 'get',
    params: data
  })
}

// 数据库字段名重复校验
export function orgFieldName(data) {
  return request({
    url: `${baseUrl}/hrm/unitCus/name/${data}`,
    method: 'get'
  })
}

// 岗位字段定义
export function jobCusAll(data) {
  return request({
    url: `${baseUrl}/hrm/jobCus/all`,
    method: 'get',
    data
  })
}

export function jobCusAdd(data) {
  return request({
    url: `${baseUrl}/hrm/jobCus`,
    method: 'post',
    // datatype:'json',
    data
  })
}

export function jobCusDel(id) {
  return request({
    url: `${baseUrl}/hrm/jobCus/id/${id}`,
    method: 'delete'
  })
}

export function jobCusUpdate(data, id) {
  return request({
    url: `${baseUrl}/hrm/jobCus/id/${id}`,
    method: 'put',
    data
  })
}

// 岗位字段名重复校验
export function jobFieldName(data) {
  return request({
    url: `${baseUrl}/hrm/jobCus/name/${data}`,
    method: 'get'
  })
}

// 人员字段定义
export function empCusAll(data) {
  return request({
    url: `${baseUrl}/hrm/empCus/all`,
    method: 'get',
    data
  })
}

export function empCusAdd(data) {
  return request({
    url: `${baseUrl}/hrm/empCus`,
    method: 'post',
    data
  })
}

export function empCusDel(id) {
  return request({
    url: `${baseUrl}/hrm/empCus/id/${id}`,
    method: 'delete'
  })
}

export function empCusUpdate(data, id) {
  return request({
    url: `${baseUrl}/hrm/empCus/id/${id}`,
    method: 'put',
    data
  })
}

// 人员字段名重复校验
export function empFieldName(data) {
  return request({
    url: `${baseUrl}/hrm/empCus/name/${data}`,
    method: 'get'
  })
}

// 角色

// 分页,显示所有数据
export function RolePage(data) {
  return request({
    url: `${baseUrl}/hrm/role/page`,
    method: 'get',
    params: data
  })
}

export function RoleAdd(data) {
  return request({
    url: `${baseUrl}/hrm/role`,
    method: 'post',
    data
  })
}

// 根据id删除角色组信息,id用逗号拼接
export function RoleDel(arr) {
  const ids = arr.join(',')
  return request({
    url: `${baseUrl}/hrm/role/id/${ids}`,
    method: 'delete'
  })
}

export function RoleUpdate(data, id) {
  return request({
    url: `${baseUrl}/hrm/role/id/${id}`,
    method: 'put',
    data
  })
}

// 根据角色组编码判断人员是否存在,新增时id可不传,更新时id必须传
export function ckCode(data) {
  return request({
    url: `${baseUrl}/hrm/role/code`,
    method: 'get',
    params: {
      roleCode: data
    }
  })
}

// 根据id查询角色组信息
export function RoleSearch(data) {
  return request({
    url: `${baseUrl}/hrm/role/id/${id}`,
    method: 'get',
    params: data
  })
}

// 新增人员列表
export function withempAdd(data) {
  return request({
    url: `${baseUrl}/hrm/role/with-emp`,
    method: 'post',
    params: data
  })
}

// 通过角色组id查询人员分页
export function perPage(data, id) {
  return request({
    url: `${baseUrl}/hrm/emp/page/role/${data}`,
    method: 'get',
    params: data
  })
}

// 查询部门下的人员
export function perAll(data, id) {
  return request({
    url: `${baseUrl}/hrm/emp/page/dept/${data}`,
    method: 'get',
    params: data
  })
}
