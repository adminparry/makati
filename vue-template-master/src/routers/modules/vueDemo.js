export default {
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "github" */'@/views/vuedemo/index.vue'),
    meta: {
        title: 'demo'
    }
}