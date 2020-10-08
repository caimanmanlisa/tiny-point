export const mold = [{
  'path': '/',
  'children': [{
    'path': 'type',
    'name': 'type',
    'meta': {
      'title': '类型',
      'icon': 'component',
      'affix': true,
      'parent': 'mold'
    }
  }]
}, {
  'path': '/modeSelect',
  'children': [{
    'path': 'modeSelect',
    'name': 'modeSelect',
    'meta': {
      'title': '下拉框维护',
      'icon': 'nested',
      'affix': true,
      'parent': 'mold'
    }
  }]
}, {
  'path': '/modeTable',
  'children': [{
    'path': 'modeTable',
    'name': 'modeTable',
    'meta': {
      'title': '表结构',
      'icon': 'table',
      'affix': true,
      'parent': 'mold'
    }
  }]
}, {
  'path': '/modeCase',
  'children': [{
    'path': 'modeCase',
    'name': 'modeCase',
    'meta': {
      'title': '实例',
      'icon': 'example',
      'affix': true,
      'parent': 'mold'
    }
  }]
}
  //  {
  //   'path': '/modeTest',
  //   'children': [{
  //     'path': 'modeTest',
  //     'name': 'modeTest',
  //     'meta': {
  //       'title': '测试',
  //       'icon': 'zip',
  //       'affix': true,
  //       'parent': 'mold'
  //     }
  //   }]
  // }

]

export const personnel = [{
  'path': '/orgCus',
  'meta': {
    'title': '字段自定义',
    'icon': 'edit'
  },
  'children': [{
    'path': 'define',

    'meta': {
      'title': '组织',
      // 'icon': 'component',
      'affix': true
    }
  }, {
    'path': 'jobCus',
    'meta': {
      'title': '岗位',
      // 'icon': 'dashboard',
      'affix': true
    }
  }, {
    'path': 'employCus',
    'meta': {
      'title': '人员',
      // 'icon': 'dashboard',
      'affix': true
    }
  }]
},

// {
//   'path': '/post',
//   'redirect': 'noRedirect',
//   'children': [{
//     'path': 'define',
//     'name': 'postDefine',
//     'meta': {
//       'title': '岗位字段定义',
//       'icon': 'dashboard',
//       'affix': true
//     }
//   }]
// },

// {
//   'path': '/personnel',
//   'redirect': 'noRedirect',
//   'children': [{
//     'path': 'define',
//     'name': 'personnelDefine',
//     'meta': {
//       'title': '人员字段定义',
//       'icon': 'dashboard',
//       'affix': true
//     }
//   }]
// },

{
  'path': '/role',
  'redirect': 'noRedirect',
  'children': [{
    'path': 'define',
    'name': 'role',
    'meta': {
      'title': '角色',
      'icon': 'user',
      'affix': true
    }
  }]
}, {
  'path': '/organiZation',
  'redirect': 'noRedirect',
  'children': [{
    'path': 'define',
    'name': 'organiZation',
    'meta': {
      'title': '组织',
      'icon': 'tree',
      'affix': true
    }
  }]
}, {
  'path': '/privileges',
  'redirect': 'noRedirect',
  'children': [{
    'path': 'define',
    'name': 'privileges',
    'meta': {
      'title': '权限',
      'icon': 'lock',
      'affix': true
    }
  }]
}, {
  'path': '/orgList',
  'redirect': 'noRedirect',
  'children': [{
    'path': 'define',
    'name': 'orgList',
    'meta': {
      'title': '组织展示',
      'icon': 'tree-table',
      'affix': true
    }
  }]
}, {
  'path': '/empList',
  'redirect': 'noRedirect',
  'children': [{
    'path': 'define',
    'name': 'empList',
    'meta': {
      'title': '人员展示',
      'icon': 'peoples',
      'affix': true
    }
  }]
}, {
  'path': '/upload',
  'redirect': 'noRedirect',
  'children': [{
    'path': 'define',
    'name': 'upload',
    'meta': {
      'title': '文件上传',
      'icon': 'clipboard',
      'affix': true
    }
  }]
}]

// export const contract = [{
//   'path': '/contract',
//   'children': [{
//     'path': 'define',
//     'name': 'contracAspx',
//     'meta': {
//       'title': '合同台账',
//       'icon': 'dashboard',
//       'affix': true
//     }
//   }]
// },
// {
//   'path': '/customerInfo',
//   'children': [{
//     'path': 'define',
//     'name': 'customerInfo',
//     'meta': {
//       'title': '客户信息',
//       'icon': 'dashboard',
//       'affix': true
//     }
//   }]
// }, {
//   'path': '/systemTest',
//   'children': [{
//     'path': 'define',
//     'name': 'systemTest',
//     'meta': {
//       'title': '系统测试',
//       'icon': 'dashboard',
//       'affix': true
//     }
//   }]
// }, {
//   'path': '/productInfolist',
//   'children': [{
//     'path': 'define',
//     'name': 'productInfolist',
//     'meta': {
//       'title': '新产品信息单',
//       'icon': 'dashboard',
//       'affix': true
//     }
//   }]
// }, {
//   'path': '/productProposal',
//   'children': [{
//     'path': 'define',
//     'name': 'productProposal',
//     'meta': {
//       'title': '产品建议书',
//       'icon': 'dashboard',
//       'affix': true
//     }
//   }]
// }]

export const flow = [{
  'path': '/flow',
  'children': [{
    'path': 'define',
    'name': 'flowType',
    'meta': {
      'title': '类型',
      'icon': 'dashboard',
      'affix': true
    }
  }]
},
{
  'path': '/flowList',
  'children': [{
    'path': 'define',
    'name': 'flowList',
    'meta': {
      'title': '流转列表',
      'icon': 'list',
      'affix': true
    }
  }]
}, {
  'path': '/flowTest',
  'children': [{
    'path': 'define',
    'name': 'flowTest',
    'meta': {
      'title': '流转测试',
      'icon': 'zip',
      'affix': true
    }
  }]
}, {
  'path': '/flowPageShow',
  'children': [{
    'path': 'define',
    'name': 'flowPageShow',
    'meta': {
      'title': '流转页面展示',
      'icon': 'form',
      'affix': true
    }
  }]
}
]

export const matter = [{
  'path': '/matter',
  'children': [{
    'path': 'define',
    'name': 'applyReq',
    'meta': {
      'title': '申请',
      'icon': 'dashboard',
      'affix': true
    }
  }]
},
{
  'path': '/needDealt',
  'children': [{
    'path': 'define',
    'name': 'needDealt',
    'meta': {
      'title': '待办',
      'icon': 'dashboard',
      'affix': true
    }
  }]
}, {
  'path': '/matterCompleted',
  'children': [{
    'path': 'define',
    'name': 'matterCompleted',
    'meta': {
      'title': '已办',
      'icon': 'dashboard',
      'affix': true
    }
  }]
}, {
  'path': '/personalApply',
  'children': [{
    'path': 'define',
    'name': 'personalApply',
    'meta': {
      'title': '个人申请',
      'icon': 'dashboard',
      'affix': true
    }
  }]
},
{
  'path': '/matterSearch',
  'children': [{
    'path': 'define',
    'name': 'matterSearch',
    'meta': {
      'title': '查询',
      'icon': 'dashboard',
      'affix': true
    }
  }]
}, {
  'path': '/matterAgent',
  'children': [{
    'path': 'define',
    'name': 'matterAgent',
    'meta': {
      'title': '代理',
      'icon': 'dashboard',
      'affix': true
    }
  }]
}, {
  'path': '/matterMonitor',
  'children': [{
    'path': 'define',
    'name': 'matterMonitor',
    'meta': {
      'title': '个人申请',
      'icon': 'dashboard',
      'affix': true
    }
  }]
}
]

export const connect = [{
  'path': '/connect',
  'children': [{
    'path': 'define',
    'name': 'connect',
    'meta': {
      'title': '对接1',
      'icon': 'dashboard',
      'affix': true
    }
  }]
},
{
  'path': '/connect2',
  'children': [{
    'path': 'define',
    'name': 'connect2',
    'meta': {
      'title': '对接2',
      'icon': 'dashboard',
      'affix': true
    }
  }]
}

]

export const integration = [{
  'path': '/integration',
  'children': [{
    'path': 'define',
    'name': 'task',
    'meta': {
      'title': '定时任务',
      'icon': 'skill',
      'affix': true
    }
  }]
},
{
  'path': '/source',
  'children': [{
    'path': 'define',
    'name': 'source',
    'meta': {
      'title': '外部数据源',
      'icon': 'international',
      'affix': true
    }
  }]
},
{
  'path': '/api',
  'children': [{
    'path': 'define',
    'name': 'api',
    'meta': {
      'title': '接口对接',
      'icon': 'exit-fullscreen',
      'affix': true
    }
  }]
},
{
  'path': '/systemButton',
  'children': [{
    'path': 'define',
    'name': 'systemButton',
    'meta': {
      'title': '系统按钮维护',
      'icon': 'tab',
      'affix': true
    }
  }]
}

]

export const quality = [{
  'path': '/quality',
  'children': [{
    'path': 'define',
    'name': 'quality',
    'meta': {
      'title': '个人工作台',
      'icon': 'dashboard',
      'affix': true
    }
  }]
},
{
  'path': '/qualityStrategy',
  'children': [{
    'path': 'define',
    'name': 'qualityStrategy',
    'meta': {
      'title': '质量先行策略',
      'icon': 'dashboard',
      'affix': true
    }
  }]
}
]

/* 文件路由 start*/
export const file = [
  {
    'path': '/directorySettings',
    'children': [{
      'path': 'define',
      'name': 'directorySettings',
      'meta': {
        'title': '目录设置',
        'icon': 'excel',
        'affix': true
      }
    }]
  },
  {
    'path': '/fieldManagement',
    'children': [{
      'path': 'define',
      'name': 'fieldManagement',
      'meta': {
        'title': '文件字段管理',
        'icon': 'dashboard',
        'affix': true
      }
    }]
  },
  {
    'path': '/batchUpload',
    'children': [{
      'path': 'define',
      'name': 'batchUpload',
      'meta': {
        'title': '文件批量上传',
        'icon': 'link',
        'affix': true
      }
    }]
  },
  {
    'path': '/fileCreation',
    'children': [{
      'path': 'define',
      'name': 'fileCreation',
      'meta': {
        'title': '文件创建',
        'icon': 'documentation',
        'affix': true
      }
    }]
  },
  {
    'path': '/fileDirectory',
    'children': [{
      'path': 'define',
      'name': 'fileDirectory',
      'meta': {
        'title': '文件目录',
        'icon': 'guide',
        'affix': true
      }
    }]
  },
  {
    'path': '/fileQuery',
    'children': [{
      'path': 'define',
      'name': 'fileQuery',
      'meta': {
        'title': '文件查询',
        'icon': 'search',
        'affix': true
      }
    }]
  }

]

/* 文件路由 end*/
