import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'type',
    children: [
      {
        path: 'type',
        component: () => import('@/views/mold/modeType'),
        name: 'mold',
        meta: { title: '类型', icon: 'dashboard', affix: true, parent: 'mold' }
      }
    ]
  },
  {
    path: '/modeSelect',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'modeSelect',
        component: () => import('@/views/mold/modeSelect'),
        name: 'modeSelect',
        meta: { title: '下拉框维护', icon: 'dashboard', affix: true, parent: 'mold' }
      }
    ]
  },
  {
    path: '/modeTable',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'modeTable',
        component: () => import('@/views/mold/modeTable'),
        name: 'modeTable',
        meta: { title: '表结构', icon: 'dashboard', affix: true, parent: 'mold' }
      }
    ]
  },
  {
    path: '/modeCase',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'modeCase',
        component: () => import('@/views/mold/modeCase'),
        name: 'modeCase',
        meta: { title: '实例', icon: 'dashboard', affix: true, parent: 'mold' }
      }
    ]
  },
  // {
  //   path: '/modeTest',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: 'modeTest',
  //       component: () => import('@/views/mold/modeTest'),
  //       name: 'modeTest',
  //       meta: { title: '测试', icon: 'dashboard', affix: true, parent: 'mold' }
  //     }
  //   ]
  // },

  {
    path: '/orgCus',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '字段自定义',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'define',
        component: () => import('@/views/personnel/orgCus'),
        name: 'personnel',
        meta: { title: '组织', icon: 'dashboard', affix: true, parent: 'personnel' },
        hidden: true
      }, {
        path: 'jobCus',
        component: () => import('@/views/personnel/jobCus'),
        name: 'personnel',
        meta: { title: '岗位', icon: 'dashboard', affix: true, parent: 'personnel' }
      }, {
        path: 'employCus',
        component: () => import('@/views/personnel/employCus'),
        name: 'personnel',
        meta: { title: '人员', icon: 'dashboard', affix: true, parent: 'personnel' }
      }
    ]
  },

  // {
  //   path: '/post',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: 'define',
  //       component: () => import('@/views/personnel/jobCus'),
  //       name: 'postDefine',
  //       meta: { title: '岗位字段定义', icon: 'dashboard', affix: true, parent: 'personnel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/personnel',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: 'define',
  //       component: () => import('@/views/personnel/employCus'),
  //       name: 'personnelDefine',
  //       meta: { title: '人员字段定义', icon: 'dashboard', affix: true, parent: 'personnel' }
  //     }
  //   ]
  // },

  {
    path: '/role',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/personnel/Role'),
        name: 'role',
        meta: { title: '角色', icon: 'dashboard', affix: true, parent: 'personnel' }
      }
    ]
  },
  {
    path: '/organiZation',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/personnel/organiZation'),
        name: 'organiZation',
        meta: { title: '组织', icon: 'dashboard', affix: true, parent: 'personnel' }
      }
    ]
  },
  {
    path: '/privileges',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/personnel/privileges'),
        name: 'role',
        meta: { title: '权限', icon: 'dashboard', affix: true, parent: 'personnel' }
      }
    ]
  },
  {
    path: '/orgList',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/personnel/orgList'),
        name: 'role',
        meta: { title: '组织展示', icon: 'dashboard', affix: true, parent: 'personnel' }
      }
    ]
  },
  {
    path: '/empList',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/personnel/empList'),
        name: 'role',
        meta: { title: '人员展示', icon: 'dashboard', affix: true, parent: 'personnel' }
      }
    ]
  },
  {
    path: '/upload',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/personnel/upload'),
        name: 'upload',
        meta: { title: '文件上传', icon: 'dashboard', affix: true, parent: 'personnel' }
      }
    ]
  },

  // {
  //   path: '/contract',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: 'define',
  //       component: () => import('@/views/case/contractAccount'),
  //       name: 'contractAspx',
  //       meta: { title: '合同台账', icon: 'dashboard', affix: true, parent: 'contract' }
  //     }
  //   ]
  // },
  // {
  //   path: '/customerInfo',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: 'define',
  //       component: () => import('@/views/case/customerInfo'),
  //       name: 'contractAspx',
  //       meta: { title: '客户信息', icon: 'dashboard', affix: true, parent: 'contract' }
  //     }
  //   ]
  // },
  // {
  //   path: '/systemTest',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: 'define',
  //       component: () => import('@/views/case/systemTest'),
  //       name: 'contractAspx',
  //       meta: { title: '系统测试', icon: 'dashboard', affix: true, parent: 'contract' }
  //     }
  //   ]
  // },
  // {
  //   path: '/productInfolist',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: 'define',
  //       component: () => import('@/views/case/productInfolist'),
  //       name: 'contractAspx',
  //       meta: { title: '新产品信息单', icon: 'dashboard', affix: true, parent: 'contract' }
  //     }
  //   ]
  // },
  // {
  //   path: '/productProposal',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   children: [
  //     {
  //       path: 'define',
  //       component: () => import('@/views/case/productProposal'),
  //       name: 'contractAspx',
  //       meta: { title: '产品建议书', icon: 'dashboard', affix: true, parent: 'contract' }
  //     }
  //   ]
  // },

  /* 文件路由 start*/
  {
    path: '/directorySettings',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/file/directorySettings'),
        name: 'file',
        meta: { title: '目录设置', icon: 'dashboard', affix: true, parent: 'file' }
      }
    ]
  },
  {
    path: '/fieldManagement',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/file/fieldManagement'),
        name: 'fieldManagement',
        meta: { title: '文件字段管理', icon: 'dashboard', affix: true, parent: 'file' }
      }
    ]
  },
  {
    path: '/batchUpload',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/file/batchUpload'),
        name: 'batchUpload',
        meta: { title: '文件批量上传', icon: 'dashboard', affix: true, parent: 'file' }
      }
    ]
  },
  {
    path: '/fileCreation',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/file/fileCreation'),
        name: 'batchUpload',
        meta: { title: '文件创建', icon: 'dashboard', affix: true, parent: 'file' }
      }
    ]
  },
  {
    path: '/fileDirectory',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/file/fileDirectory'),
        name: 'batchUpload',
        meta: { title: '文件目录', icon: 'dashboard', affix: true, parent: 'file' }
      }
    ]
  },
  {
    path: '/fileQuery',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/file/fileQuery'),
        name: 'fileQuery',
        meta: { title: '文件查询', icon: 'dashboard', affix: true, parent: 'file' }
      }
    ]
  },

  /* 文件路由 end*/

  {
    path: '/flow',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/flow/flowType'),
        name: 'flowType',
        meta: { title: '类型', icon: 'dashboard', affix: true, parent: 'flow' }
      }
    ]
  },
  {
    path: '/flowList',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/flow/flowList'),
        name: 'contractAspx',
        meta: { title: '流转列表', icon: 'dashboard', affix: true, parent: 'flow' }
      }
    ]
  },
  {
    path: '/flowTest',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/flow/flowTest'),
        name: 'contractAspx',
        meta: { title: '流转测试', icon: 'dashboard', affix: true, parent: 'flow' }
      }
    ]
  },
  {
    path: '/flowPageShow',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/flow/flowPageShow'),
        name: 'contractAspx',
        meta: { title: '流转页面展示', icon: 'dashboard', affix: true, parent: 'flow' }
      }
    ]
  },
  {
    path: '/matter',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/matter/applyReq'),
        name: 'matter',
        meta: { title: '申请', icon: 'dashboard', affix: true, parent: 'matter' }
      }
    ]
  },
  {
    path: '/needDealt',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/matter/needDealt'),
        name: 'needDealt',
        meta: { title: '待办', icon: 'dashboard', affix: true, parent: 'matter' }
      }
    ]
  },
  {
    path: '/matterCompleted',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/matter/matterCompleted'),
        name: 'contractAspx',
        meta: { title: '已办', icon: 'dashboard', affix: true, parent: 'matter' }
      }
    ]
  },
  {
    path: '/personalApply',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/matter/personalApply'),
        name: 'personalApply',
        meta: { title: '个人申请', icon: 'dashboard', affix: true, parent: 'matter' }
      }
    ]
  },
  {
    path: '/matterSearch',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/matter/matterSearch'),
        name: 'matterSearch',
        meta: { title: '查询', icon: 'dashboard', affix: true, parent: 'matter' }
      }
    ]
  },
  {
    path: '/matterAgent',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/matter/matterAgent'),
        name: 'contractAspx',
        meta: { title: '代理', icon: 'dashboard', affix: true, parent: 'matter' }
      }
    ]
  },
  {
    path: '/matterMonitor',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/matter/matterMonitor'),
        name: 'matterMonitor',
        meta: { title: '监控', icon: 'dashboard', affix: true, parent: 'matter' }
      }
    ]
  },
  {
    path: '/connect',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/connect/connect1'),
        name: 'connect',
        meta: { title: '对接1', icon: 'dashboard', affix: true, parent: 'connect' }
      }
    ]
  },
  {
    path: '/connect2',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/connect/connect2'),
        name: 'connect2',
        meta: { title: '对接2', icon: 'dashboard', affix: true, parent: 'connect' }
      }
    ]
  },
  {
    path: '/integration',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/integration/task'),
        name: 'integration',
        meta: { title: '定时任务', icon: 'dashboard', affix: true, parent: 'integration' }
      }
    ]
  },
  {
    path: '/source',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/integration/source'),
        name: 'source',
        meta: { title: '外部数据源', icon: 'dashboard', affix: true, parent: 'integration' }
      }
    ]
  },
  {
    path: '/api',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/integration/api'),
        name: 'source',
        meta: { title: '接口对接', icon: 'dashboard', affix: true, parent: 'integration' }
      }
    ]
  },
  {
    path: '/systemButton',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/integration/systemButton'),
        name: 'source',
        meta: { title: '系统按钮维护', icon: 'dashboard', affix: true, parent: 'integration' }
      }
    ]
  },
  {
    path: '/quality',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/quality/workBench'),
        name: 'quality',
        meta: { title: '个人工作台', icon: 'dashboard', affix: true, parent: 'quality' }
      }
    ]
  },
  {
    path: '/qualityStrategy',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'define',
        component: () => import('@/views/quality/qualityStrategy'),
        name: 'Strategy',
        meta: { title: '质量先行策略', icon: 'dashboard', affix: true, parent: 'quality' }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
