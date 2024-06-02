// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  shyamoni_logo: '../assets/img/logo/shyamoni_logo-removebg.png',
  shyamoni_main_logo:  '../assets/img/logo/Shyamoni_BWLogo.jpg',
  payment_logo: '../assets/img/logo/flo_payments.png',
  baseURI: 'http://127.0.0.1:8000/api/v1/',
  paymentGateway: "Razorpay",
  // paymentGateway: "Instamojo",
  razorpay: {
    key: 'rzp_test_KPZKxlhDa7sX4O',
    secret: '0spF6cdh4zW54NiHdjGGy3Kl'
  },
  defaultImage: '../assets/img/logo/default.png',
  defaultAvataar: '../assets/img/logo/avatar.png',
  gstPercentage: 0,
  noProductsFound: '../assets/img/cms/product-not-found.jpg',
  aboutImage: '../assets/img/products/shyamoni_store.jpg',
  breadcrumbImage: '../assets/themes/img/bg_breadcrumb.jpg',
  fastShipping:'../../assets/img/cms/flo_policy1.png',
  fastReturn:'../../assets/img/cms/flo_policy2.png',
  trustScore: '../../assets/img/cms/flo_policy3.png',
  securePayment: '../../assets/img/cms/flo_policy4.png',
  hourglass: '../assets/img/logo/hourglass.gif',
  adminLoginBackground: '../assets/img/logo/adminlogin5.jpg'
  // baseURI: 'https://shyamoni.com/api/v1/',
  // baseURI: 'https://7e8d-223-190-91-70.in.ngrok.io/api/v1/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
