export default {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "github" */'@/views/vueList/index.vue'),
    meta: {
        title: 'list'
    }
}