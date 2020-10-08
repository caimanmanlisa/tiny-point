import request from "@/utils/request";
import baseUrl from "./index";

/* 新建文件目录接口*/
export function fileDirectory(data) {
  return request({
    url: `${baseUrl}/docu/folder`,
    method: "post",
    data
  });
}

/* 更新文件目录 /docu/folder/id/{id}*/
export function fileDirectoryUpdata(data, id) {
  console.log(data, id);
  return request({
    url: `${baseUrl}/docu/folder/id/${id}`,
    method: "put",
    data
  });
}

/* 新增文档编码接口  /docu/code  */

export function fileCode(data) {
  return request({
    url: `${baseUrl}/docu/code`,
    method: "post",
    data
  });
}

/* 根据文档目录id查询文档编码设置  /docu/code/fid/{fid} fid获得id */

export function fileCodeSettings(fid) {
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    url: `${baseUrl}/docu/code/fid/${fid}`,
    method: "get"
  });
}

/*根据fid查询目录版本信息 /docu/version/fid/{fid}  */

export function fileVersionSettings(fid) {
  return request({
    url: `${baseUrl}/docu/version/fid/${fid}`,
    method: "get"
  });
}

/* 新增文件目录版本设置本接口  /docu/version  */

export function fileVersion(data) {
  return request({
    url: `${baseUrl}/docu/version`,
    method: "post",
    data
  });
}

/* 校验文件编码是否重复 docu/folder/fcode*/
export function fileCodeRepeat(data) {
  return request({
    url: `${baseUrl}/docu/folder/fcode`,
    method: "get",
    params: data
  });
}

//权限管理

//目录权限
//新建目录权限   New permission POST    /docu/jus

export function newPermission(data) {
  return request({
    url: `${baseUrl}/docu/jus`,
    method: "post",
    data
  });
}



/*根据文件目录id查询   GET /docu/jus/fid/{fid}  Permission directory */

export function newPermissionSettings(fid) {
  return request({
    url: `${baseUrl}/docu/jus/fid/${fid}`,
    method: 'get'
  })
}

//新建默认权限  /docu/other-jus

export function  defaultPermission(data) {
  return request({
    url: `${baseUrl}/docu/other-jus`,
    method: "post",
    data
  });
}
/*根据目录id查询默认权限复制接口复制文档复制地址 GET  /docu/other-jus/fid/{fid}*/
export function defaultPermissionSettings(fid) {
  return request({
    url: `${baseUrl}/docu/other-jus/fid/${fid}`,
    method: 'get'
  })
}





/*创建权限更新*/
export function fsetTypeUpdata(data, id) {
  console.log(data, id)
  return request({
    url: `${baseUrl}/docu/jus/id/${id}`,
    method: 'put',
    data
  })
}

/*默认权限更新   /docu/other-jus/id/{id}*/  
export function fsetTypeUpdata0(data, id) {
  console.log(data, id)
  return request({
    url: `${baseUrl}/docu/other-jus/id/${id}`,
    method: 'put',
    data
  })
}


/*创建权限删除*/
/*/docu/jus/id/{ids}*/
export function fsetTypeDelete(arr) {
  const arrStr = arr.join(',')
  console.log(arrStr)
  return request({
    url: `${baseUrl}/docu/jus/id/${arrStr}`,
    method: 'delete'
  })
}

/*默认权限删除*/
// /docu/other-jus/id/{ids}
export function fsetTypeDelete0(arr) {
  const arrStr = arr.join(',')
  console.log(arrStr)
  return request({
    url: `${baseUrl}/docu/other-jus/id/${arrStr}`,
    method: 'delete'
  })
}



/*下级目录*/
// 根据id查询文件目录信息    GET  /docu/folder/id/{id}

export function nextCodeSettings(id) {
  return request({
    url: `${baseUrl} /docu/folder/id/${fid}`,
    method: 'get'
  })
}

//查询当前目录下的文件夹 分页  GET  /docu/folder/id/{id}/paging
// export function typePaging(data) {
//   return request({
//     url: `${baseUrl}/docu/doc/paging`,
//     method: 'get',
//     params: data
//   })
// }

//查询所有的文件 查询所nextCodePaging有的文件   GET/docu/doc/paging
export function nextCodePaging(data,id) {
  return request({
    url: `${baseUrl}/docu/folder/id/${id}/paging`,
    method: 'get',
    params: data  
  })
}



// 检查文件夹的名字是否重复 true 不重复 false 重复
export function folderName(data) {
  return request({
    url: `${baseUrl}/docu/folder/name`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    method: 'get',
    params: data
  })
}


/*文件信息*/
//查询所有的文件 查询所有的文件   GET/docu/doc/paging
export function typePaging(data) {
  return request({
    url: `${baseUrl}/docu/doc/paging`,
    method: 'get',
    params: data
  })
}


/*根据id查询文件信息 get /docu/doc/id/{id}*/
export function renewDoc(id) {
  console.log(id)
  return request({
    url: `${baseUrl}/docu/doc/id/${id}`,
    method: 'get'
  })
}

// upload http://sksigmar.com:81/docu/file/fid/
export function upload(id, data) {
  console.log(id)
  return request({
    url: `${baseUrl}/docu/file/fid/${id}`,
    method: 'post',
    data
  })
}

//修改  根据id更新内容复制接口复制文档复制地址 PUT /docu/doc/id/{id}
export function editUpdata(data, id) {
  console.log(data, id)
  return request({
    url: `${baseUrl}/docu/doc/id/${id}`,
    method: 'put',
    data
  })
}


//删除 // /docu/doc/id/{ids}  文件删除 docDel
export function docDel(arr) {
  const arrStr = arr.join(',')
  console.log(arrStr)
  return request({
    url: `${baseUrl}/docu/doc/id/${arrStr}`,
    method: 'delete'
  })
}


//批量发布目录   PUT  /docu/doc/id/{ids}/choice

export function publishDoc(arr) {
  const arrStr = arr.join(',')
  console.log(arrStr)
  return request({
    url: `${baseUrl}/docu/doc/id/${arrStr}/choice`,
    method: 'put'
  })
}




/*共享文件*/

//新增文件权限  POST /docu/privileges
export function  addDocPermission(data) {
  return request({
    url: `${baseUrl}/docu/privileges`,
    method: "post",
    data
  });
}






//部门分页
export function orgPage(data) {
  return request({
      url: `${baseUrl}/hrm/unit/page`,
      method: 'get',
      params:data
  })
}

//人员分页
export function menPage(data,id) {
  return request({
      url: `${baseUrl}/hrm/emp/page/dept/-1`,
      method: 'get',
      params:data
  })
}

//角色分页
export function rolePage(data) {
  return request({
      url: `${baseUrl}/hrm/role/page`,
      method: 'get',
      params:data
  })
}




