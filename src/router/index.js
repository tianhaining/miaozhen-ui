import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import ComponentHome from '@/views/componentLib/component-home'
import EchartsHome from '@/views/echarts/echartsHome'
import InstallPage from '@/views/componentLib/guide/installPage'
import HandPage from '@/views/componentLib/guide/handPage'
import LayoutPage from '@/views/componentLib/component/layoutPage'
import IconPage from '@/views/componentLib/component/iconPage'
import ButtonPage from '@/views/componentLib/component/buttonPage'
import RadioPage from '@/views/componentLib/component/radioPage'
import CheckboxPage from '@/views/componentLib/component/checkboxPage'
import InputPage from '@/views/componentLib/component/inputPage'
import SelectPage from '@/views/componentLib/component/selectPage'
import SwitchPage from '@/views/componentLib/component/switchPage'
import TimePickerPage from '@/views/componentLib/component/timePickerPage'
import DatePickerPage from '@/views/componentLib/component/datePickerPage'
import DateTimePickerPage from '@/views/componentLib/component/dateTimePickerPage'
import UploadPage from '@/views/componentLib/component/uploadPage'
import TransferPage from '@/views/componentLib/component/transferPage'
import FormPage from '@/views/componentLib/component/formPage'
import TablePage from '@/views/componentLib/component/tablePage'
import TagPage from '@/views/componentLib/component/tagPage'
import ProgressPage from '@/views/componentLib/component/progressPage'
import TreePage from '@/views/componentLib/component/treePage'
import PaginationPage from '@/views/componentLib/component/paginationPage'
//notice
import AlertPage from '@/views/componentLib/component/notice/alertPage'
import LoadingPage from '@/views/componentLib/component/notice/loadingPage'
import MessagePage from '@/views/componentLib/component/notice/messagePage'
import MessageBoxPage from '@/views/componentLib/component/notice/messageBoxPage'
import NotificationPage from '@/views/componentLib/component/notice/notificationPage'
//navigation
import NavMenuPage from '@/views/componentLib/component/navigation/navMenuPage'
import TabsPage from '@/views/componentLib/component/navigation/tabsPage'
import BreadcrumbPage from '@/views/componentLib/component/navigation/breadcrumbPage'
import DropdownPage from '@/views/componentLib/component/navigation/dropdownPage'
import StepsPage from '@/views/componentLib/component/navigation/stepsPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
        path: 'componentHome',
        name: 'ComponentHome',
        component: ComponentHome,
        children: [{
          path: 'installPage',
          name: 'InstallPage',
          component: InstallPage
        },{
          path: 'handPage',
          name: 'HandPage',
          component: HandPage
        },{
          path: 'layoutPage',
          name: 'LayoutPage',
          component: LayoutPage
        },{
          path: 'iconPage',
          name: 'IconPage',
          component: IconPage
        },{
          path: 'buttonPage',
          name: 'ButtonPage',
          component: ButtonPage
        },{
          path: 'radioPage',
          name: 'RadioPage',
          component: RadioPage
        },{
          path: 'checkboxPage',
          name: 'CheckboxPage',
          component: CheckboxPage
        },{
          path: 'inputPage',
          name: 'InputPage',
          component: InputPage
        },{
          path: 'selectPage',
          name: 'SelectPage',
          component: SelectPage
        },{
          path: 'switchPage',
          name: 'SwitchPage',
          component: SwitchPage
        },{
          path: 'timePickerPage',
          name: 'TimePickerPage',
          component: TimePickerPage
        },{
          path: 'datePickerPage',
          name: 'DatePickerPage',
          component: DatePickerPage
        },{
          path: 'dateTimePickerPage',
          name: 'DateTimePickerPage',
          component: DateTimePickerPage
        },{
          path: 'uploadPage',
          name: 'UploadPage',
          component: UploadPage
        },{
          path: 'transferPage',
          name: 'TransferPage',
          component: TransferPage
        },{
          path: 'formPage',
          name: 'FormPage',
          component: FormPage
        },{
          path: 'tablePage',
          name: 'TablePage',
          component: TablePage
        },{
          path: 'tagPage',
          name: 'TagPage',
          component: TagPage
        },{
          path: 'progressPage',
          name: 'ProgressPage',
          component: ProgressPage
        },{
          path: 'treePage',
          name: 'TreePage',
          component: TreePage
        },{
          path: 'paginationPage',
          name: 'PaginationPage',
          component: PaginationPage
        },{
          path: 'alertPage',
          name: 'AlertPage',
          component: AlertPage
        },{
          path: 'loadingPage',
          name: 'LoadingPage',
          component: LoadingPage
        },{
          path: 'messagePage',
          name: 'MessagePage',
          component: MessagePage
        },{
          path: 'messageBoxPage',
          name: 'MessageBoxPage',
          component: MessageBoxPage
        },{
          path: 'notificationPage',
          name: 'NotificationPage',
          component: NotificationPage
        },{
          path: 'navMenuPage',
          name: 'NavMenuPage',
          component: NavMenuPage
        },{
          path: 'tabsPage',
          name: 'TabsPage',
          component: TabsPage
        },{
          path: 'breadcrumbPage',
          name: 'BreadcrumbPage',
          component: BreadcrumbPage
        },{
          path: 'dropdownPage',
          name: 'DropdownPage',
          component: DropdownPage
        },{
          path: 'stepsPage',
          name: 'StepsPage',
          component: StepsPage
        }]
      },{
        path: 'echartsHome',
        name: 'EchartsHome',
        component: EchartsHome
      }]
    }
  ]
})
