import Vue from 'vue'
import Router from 'vue-router'

import IconBase from '../components/IconBase';
import IconError from '../components/icons/IconError';
import IconSettings from '../components/icons/IconSettings';
import IconArrowUp from '../components/icons/IconArrowUp';
import IconSelected from '../components/icons/IconSelected';
import IconTrash from '../components/icons/IconTrash';

Vue.component('IconBase', IconBase);
Vue.component('IconError', IconError);
Vue.component('IconArrowUp', IconArrowUp);
Vue.component('IconSettings', IconSettings);
Vue.component('IconSelected', IconSelected);
Vue.component('IconTrash', IconTrash);

const Home = () =>
    import('@/containers/Home')

const Analytics = () =>
    import('@/pages/Analytics')

const Employees = () =>
    import('@/pages/Employees')
const EmployeeAnalytics = () =>
    import('@/pages/EmployeeAnalytics')
const SharedFooterAnalytics = () =>
    import('@/pages/Integrations/SharedFooterAnalytics')


const Integration = () =>
    import('@/pages/Integration')

const Woocommerce = () =>
    import('@/pages/Integrations/Woocommerce')
const Wordpress = () =>
    import('@/pages/Integrations/Wordpress')
const FooterAnalytics = () =>
    import('@/pages/Integrations/FooterAnalytics')
const OnSuccessAdded = () =>
    import('@/pages/Integrations/OnSuccessAdded')
//Payment
const Payment = () =>
    import('@/pages/Payment')
const PaymentSuccess = () =>
    import('@/pages/PaymentSuccess')
const PaymentFailed = () =>
    import('@/pages/PaymentFailed')

// PayPal
const PayPalInitial = () =>
    import('@/pages/Payments/PayPal/Initial.vue')

// Auth
const Authorization = () =>
    import('@/pages/Authorization')
const Registration = () =>
    import('@/pages/Registration')
const ForgotPassword = () =>
    import('@/pages/ForgotPassword')
const ResetPasswordSent = () =>
    import('@/pages/ResetPasswordSent')
const SetPassword = () =>
    import('@/pages/SetPassword')
const ChangePassword = () =>
    import('@/pages/ChangePassword')
const PasswordChanged = () =>
    import('@/pages/PasswordChanged')
const ActivationSent = () =>
    import('@/pages/ActivationSent')
Vue.use(Router)

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: configRoutes()
})




function configRoutes() {
    return [{
            path: '/auth',
            redirect: '/auth',
            name: 'Authorization',
            component: {
                render(c) {
                    return c('router-view')
                }
            },
            meta: {
                guestOnly: true
            },
            children: [{
                    path: 'login',
                    name: 'Authorization',
                    component: Authorization
                },
                {
                    path: 'register',
                    name: 'Registration',
                    component: Registration
                },
                {
                    path: 'forgotPassword',
                    name: 'ForgotPassword',
                    component: ForgotPassword
                },
                {
                    path: 'ResetPasswordSent',
                    name: 'ResetPasswordSent',
                    component: ResetPasswordSent
                },
                {
                    path: 'changePassword',
                    name: 'ChangePassword',
                    component: ChangePassword
                },
                {
                    path: 'passwordChanged',
                    name: 'PasswordChanged',
                    component: PasswordChanged
                },
                {
                    path: 'ActivationSent',
                    name: 'ActivationSent',
                    component: ActivationSent
                },
                {
                    path: 'set_password',
                    name: 'set_password',
                    component: SetPassword
                }
            ]
        }, {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            },
            children: [{
                    path: 'integration',
                    name: 'Integration',
                    component: Integration,
                    meta: {
                        employerOnly: false
                    },
                },

                {
                    path: 'payment_paypall',
                    name: 'payment_paypall',
                    component: PayPalInitial,
                    meta: {
                        employerOnly: false
                    },
                },        {
                    path: 'payment',
                    name: 'Payment',
                    component: Payment,
                    meta: {
                        employerOnly: false
                    },
                },
                {
                    path: 'payment_success',
                    name: 'PaymentSuccess',
                    component: PaymentSuccess,
                    meta: {
                        employerOnly: false
                    },
                },
                {
                    path: 'payment_failed',
                    name: 'PaymentFailed',
                    component: PaymentFailed,
                    meta: {
                        employerOnly: false
                    },
                },
                {
                    path: 'integration/woocommerce',
                    name: 'Woocommerce',
                    component: Woocommerce,
                    redirect: '/integration',
                    children: [{
                        path: ':website',
                        name: 'Woocommerce',
                    }],
                    meta: {
                        employerOnly: false
                    },
                },
                {
                    path: 'integration/wordpress',
                    name: 'Wordpress',
                    component: Wordpress,
                    redirect: '/integration',
                    children: [{
                        path: ':website',
                        name: 'Wordpress',
                    }],
                    meta: {
                        employerOnly: false
                    },
                },
                {
                    path: 'integration/woocommerce/:website/success',
                    name: 'successfulIntegration',
                    component: OnSuccessAdded
                },
                {
                    path: 'analytics',
                    name: 'Analytics',
                    component: Analytics
                }, {
                    path: 'analytics/:website',
                    name: 'FooterAnalytics',
                    component: FooterAnalytics
                },
                {
                    path: 'employees',
                    name: 'Employees',
                    component: Employees,
                    meta: {
                        employerOnly: false
                    },
                },
                {
                    path: 'employees/:employee',
                    name: 'EmployeeAnalytics',
                    component: EmployeeAnalytics,
                    meta: {
                        employerOnly: false
                    },
                },
                {
                    path: 'employees/:employee/:website',
                    name: 'SharedFooterAnalytics',
                    component: SharedFooterAnalytics,
                    meta: {
                        employerOnly: false
                    },
                }

            ]
        }

    ]
}