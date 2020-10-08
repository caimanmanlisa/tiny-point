import request from '@/utils/request'
import baseUrl from './index'

/* 流程类型新增*/
export function fsetType(data) {
  return request({
    url: `${baseUrl}/fset/type`,
    method: 'post',
    data
  })
}

export function fsetTypeUpdata(data, id) {
  console.log(data, id)
  return request({
    url: `${baseUrl}/fset/type/id/${id}`,
    method: 'put',
    data
  })
}

export function fsetTypeDelete(arr) {
  const arrStr = arr.join(',')
  console.log(arrStr)
  return request({
    url: `${baseUrl}/fset/type/id/${arrStr}`,
    method: 'delete'
  })
}

// http://sksigmar.com:81/fset/flowList/info/paging
/* 流转列表 查询*/
export function flowListInfoPaging(data) {
  return request({
    url: `${baseUrl}/fset/flowList/info/paging`,
    method: 'get',
    params: data
  })
}

// http://sksigmar.com:81/fset/type/paging?page=1&rows=10&sortBy=seqNo&desc=false
export function typePaging(data) {
  console.log('baseUrl: ', baseUrl)
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
  return request({
    url: `${baseUrl}/fset/type/paging`,
    method: 'get',
    params: data
  })
}

/* 流转类型接口  查询所有的流程信息*/  
export function fsetTypeAll(data) {
  return request({
    url: `${baseUrl}/fset/type/all`,
    method: 'get'
  })
}

/* 选择表结构接口*/
export function selTable(data) {
  return request({
    url: `${baseUrl}/mode/table/selTableByPage`,
    method: 'get',
    params: data
  })
}

/* 当前用户名*/
/* 要完善 */

/* 新增流转流转接口*/
// http://sksigmar.com:81/fset/flowList/info/112/upd

export function addFlowlist(data) {
  return request({
    url: `${baseUrl}/fset/flowList/info/112/upd`,
    method: 'post',
    data
  })
}

/* 获取节点设置table列表数据*/
// Request URL: http://sksigmar.com:81/fset/flowList/nodeInfo/111/all
export function nodesSetTablelist(id) {
  return request({
    url: `${baseUrl}/fset/flowList/nodeInfo/${id}/all`,
    method: 'get'
  })
}

// http://sksigmar.com:81/fset/flowList/nodeInfo 1保存
export function flowListNodeInfo(data) {
  return request({
    url: `${baseUrl}/fset/flowList/nodeInfo`,
    method: 'post',
    data
  })
}

// http://sksigmar.com:81/docu/folder/id/0/sub 目录数据
export function docuFolder(id) {
  return request({
    url: `${baseUrl}/docu/folder/id/${id}/sub`,
    method: 'get'
  })
}

