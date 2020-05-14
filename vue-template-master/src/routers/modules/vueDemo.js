import Static from '@/views/vuedemo/index.vue';

export default {
    path: '/demo',
    name: 'demo',

    component: Static,
    children: [
        {
            path: 'water',
            name: 'water',
            meta: {
                title: 'water'
            },
            component: () => import(/* webpackChunkName: "water" */'@/components/Water/index.vue'),
        },
        {
            path: 'PulltoRefresh',
            name: 'PulltoRefresh',
            meta: {
                title: 'PulltoRefresh'
            },
            component: () => import(/* webpackChunkName: "water" */'@/components/PulltoRefresh/demo.vue'),
        },
        {
            path: 'slider',
            name: 'slider',
            meta: {
                title: 'slider'
            },
            component: () => import(/* webpackChunkName: "water" */'@/components/Slider/demo.vue'),
        },
        {
            path: 'calendar',
            name: 'calendar',
            meta: {
                title: 'calendar'
            },
            component: () => import(/* webpackChunkName: "water" */'@/components/Calendar/index.vue'),
        },
        {
            path: 'calendar-ios',
            name: 'calendar-ios',
            meta: {
                title: 'calendar-ios'
            },
            component: () => import(/* webpackChunkName: "water" */'@/components/Calendar/ios.vue'),
        },
        {
            path: 'gravity',
            name: 'gravity',
            meta: {
                title: 'gravity'
            },
            component: () => import(/* webpackChunkName: "water" */'@/views/vuedemo/Gravity.vue'),
        },
        
        {
            path: 'number3',
            name: 'number3',
            meta: {
                title: 'number3'
            },
            component: () => import(/* webpackChunkName: "water" */'@/views/vuedemo/number3.vue'),
        },
        {
            path: 'date',
            name: 'date',
            meta: {
                title: 'date'
            },
            component: () => import(/* webpackChunkName: "water" */'@/views/vuedemo/date.vue'),
        },

    ]
}