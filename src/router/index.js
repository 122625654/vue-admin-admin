import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'

/**

*注意：子菜单仅在route children.length>=1时出现

*详情见：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html

*

*隐藏：true如果设置为true，项目将不会显示在侧栏中（默认值为false）

*alwaysShow:true如果设置为true，将始终显示根菜单

*如果未设置alwaysShow，则当项目有多个子路线时，

*它将变为嵌套模式，否则不显示根菜单

*重定向：如果设置为noRedirect，noRedirect将不会在面包屑中重定向

*“必须由名称设置”<路由器名称：！）

*元：{

角色：['admin'，'editor']控制页面角色（您可以设置多个角色）

标题：“标题”侧边栏和面包屑中显示的名称（推荐设置）

图标：“svg名称”/“el-icon-x”侧边栏中显示的图标

noCache:true如果设置为true，则不会缓存页面（默认值为false）

粘贴：true如果设置为true，则标签将粘贴在“标签”视图中

breadcrumb:false如果设置为false，则项目将隐藏在breadcrumb中（默认为true）

activeMenu:“/example/list”如果设置路径，侧边栏将突出显示您设置的路径

}

*/

/**
 * constantRoutes
 * 没有权限要求的基页
 * 可以访问所有角色
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
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    hidden: true,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** 当路由图太长时，可以将其拆分为小模块 **/
  chartsRouter,
  // 隐藏
  tableRouter,

  // 隐藏
  {
    path: '/tab',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  // 隐藏
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  // 隐藏
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    hidden: true,
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },
  {
    path: '/dataManagement',
    component: Layout,
    redirect: '/dataManagement/data',
    alwaysShow: true,
    name: 'DataManagement',
    meta: { title: '数据管理', icon: 'chart' },
    children: [
      {
        path: 'data',
        component: () => import('@/views/dataManagement/data'),
        name: 'Data',
        meta: { title: '导入管理' }
      },
      {
        path: 'batch',
        component: () => import('@/views/dataManagement/batch'),
        name: 'Batch',
        meta: { title: '批次管理' }
      },
      {
        path: 'case',
        component: () => import('@/views/dataManagement/case'),
        name: 'Case',
        meta: { title: '案件管理' }
      }

    ]
  },

  {
    path: '/electricityManagement',
    component: Layout,
    redirect: '/electricityManagement/case',
    alwaysShow: true,
    name: 'ElectricityManagement',
    meta: { title: '电催管理', icon: 'international' },
    children: [
      {
        path: 'case',
        component: () => import('@/views/theCase/index'),
        name: 'Case',
        meta: { title: '我的案件' }
      }
    ]
  },

  {
    path: '/systemSettings',
    component: Layout,
    redirect: '/systemSettings/accountSettings',
    alwaysShow: true,
    name: 'SystemSettings',
    meta: { title: '系统设置', icon: 'tree' },
    children: [
      {
        path: 'accountSettings',
        component: () => import('@/views/systemSettings/accountSettings'),
        name: 'AccountSettings',
        meta: { title: '账号设置' }
      },
      {
        path: 'accountLog',
        component: () => import('@/views/systemSettings/accountLog'),
        name: 'AccountLog',
        meta: { title: '账号日志' }
      },
      {
        path: 'permissionGroupSetting',
        component: () => import('@/views/systemSettings/permissionGroupSetting'),
        name: 'PermissionGroupSetting',
        meta: { title: '权限组设置' }
      },
      {
        path: 'positionSetting',
        component: () => import('@/views/systemSettings/positionSetting'),
        name: 'PositionSetting',
        meta: { title: '职位设置' }
      },
      {
        path: 'departmentSetUp',
        component: () => import('@/views/systemSettings/departmentSetUp'),
        name: 'DepartmentSetUp',
        meta: { title: '部门设置' }
      }
      //
      //
    ]
  },

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
