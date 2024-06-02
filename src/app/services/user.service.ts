import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpservice: HttpClientService,
  ) { }

    // User Login
    signin = (data: any) => this.httpservice.post('user/login', data, 'user');

    //Validate User
    validateUser = () => this.httpservice.get('user/checkUser', 'user');
  
    //Validate Admin
    validateAdmin = () => this.httpservice.get('checkAdmin', 'admin');
  
    // User Signup
    signUp = (body: any) => this.httpservice.post('user/register', body, 'user')
  
    // User Logout
    logOut = () => this.httpservice.post('user/logout',{}, 'user')
  
    // Forget Password
    forgetPassword = (body: any) => this.httpservice.post('user/forgotPassword',body, 'user')
  
    verifyOTP = (body: any) => this.httpservice.post('user/verifyOtp',body, 'user')
  
    resetPassword = (body: any) => this.httpservice.post('user/updatePassword', body, 'user')
  
    //categories
    fetchCategories = () => this.httpservice.get('fetchCategory', 'user')
  
    fetCategoryByCatId = (id: any) => this.httpservice.get(`getCategoryByID/${id}`, 'user')
  
    //subcategories
    fetSubCategoryBySubCatId = (id: any) => this.httpservice.get(`getSubCategoryByID/${id}`, 'user')
  
    //products
    getProducts = (isFilter: boolean,data: any, url ='') =>{
      let params: any;
      if(isFilter){
         params = new HttpParams()
        .set('pageOffset',10)
        .set('terms',data.terms || '')
        .set('minPrice',data?.minPrice)
        .set('maxPrice',data?.maxPrice)
        .set('brand',data?.brand);
        params = params.toString()
        params = '?'+ params
      }else{
        params = '';
      } 
      if(url ==""){
        return this.httpservice.get(`fetchProduct${params}`, 'user');
      }else{
        return this.httpservice.get(url.replace(environment.baseURI,''), 'user');
      }
    }
  
    getProductById = (id: any) => this.httpservice.get(`fetchSingleProduct/${id}`, 'user');
  
    getRandomProduct = () => this.httpservice.get('randomFetchProduct', 'user');
  
    getProductUnderCategory = (id: any) => this.httpservice.get(`getProductUnderCategory/${id}`, 'user');
  
    getProductUnderSubCategory = (id: any) => this.httpservice.get(`getProductUnderSubCategory/${id}`, 'user');
  
    //Feedback
    getFeedbackByProductId = (id: any) => this.httpservice.get(`getFeedbackByProductID/${id}`, 'user');
  
    addUserFeedBack = (body: any) => this.httpservice.post('addUserFeedBack',body, 'user');
  
    //Cart
    addToCart = (body: any) => this.httpservice.post(`user/addCartItem`,body, 'user');
  
    fetchCartItems = () => this.httpservice.get(`user/fetchCartItem`, 'user');
  
    removeItemFromCart = (id: any) => this.httpservice.delete(`user/deleteCartItem/${id}`,'user');
  
    editCartItemById = (id: any, body: any) => this.httpservice.post(`user/editCartItem/${id}`, body, 'user');
  
    //Address
    addAddress = (data: any) => this.httpservice.post(`user/addAddress`,data, 'user');
  
    getAddress = () => this.httpservice.get(`user/getAddress`, 'user');
  
    updateAddress = (id: any,data: any) => this.httpservice.post(`user/editAddress/${id}`,data, 'user');
  
    deleteAddress = (id: any) => this.httpservice.delete(`user/deleteAddress/${id}`,'user');
  
    //States
    fetchState = () => this.httpservice.get(`fetchState`, 'user');
  
    // City
  
    fetchCity = (id: any) => this.httpservice.get(`fetchCity/${id}`, 'user');
  
    //Profile
    getProfileInfo = () => this.httpservice.get(`user/getProfileDetails`, 'user');
  
    updateProfile = (data : FormData) => this.httpservice.post('user/updateProfileInfo', data, 'user', true);

    editProfile = (data : any) => this.httpservice.post('user/editProfile', data, 'user');
  
    //Search
    searchProduct = (data: any) => this.httpservice.get(`searchProduct?s=${data}`, 'user')
  
    //filter product
  
    filterProduct = (data: any) => this.httpservice.get(`filterProduct?terms=${data.terms}&brand=${data.brand}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}`,'')
  
    //getCat subcat
  
    catSubCatFetch = () => this.httpservice.get(`catSubCatFetch`,'')
  
    //Payment
    userPayment = (data: any) => this.httpservice.post(`user/payment`,data, 'user')
  
    userPaymentSuccess = (data: any) => this.httpservice.post(`user/paymentSuccess`,data, 'user')
  
    getPaymentStatus = (body : any) => this.httpservice.post(`user/getPaymentStatus`,body, 'user')
  
    //paginate
  
    paginateProductByUrl = (url: any) =>this.httpservice.get(url.replace(environment.baseURI,""), 'user')
  
    //contactusmail
  
    sentContactMail = (data: any) => this.httpservice.post(`sendContactMail`,data, 'user')
  
    //aboutus
  
    getAbout = () => this.httpservice.get('getAbout', 'user')
  
    //Banner
  
    getBanner = () => this.httpservice.get('fetchActiveBanner', 'user')
  
    //Order
  
    getAllOrders = () => this.httpservice.get('user/getAllOrders', 'user')
  
    getOrderDetailsByID = (id: any) => this.httpservice.get(`user/getOrderDetailsByID/${id}`, 'user')
  
    trackOrderDetailsByAWB = (awb: any) => this.httpservice.post(`user/trackOrder/${awb}`,{}, 'user')
  
    cancelOrder = (orderId: any) => this.httpservice.post(`user/cancelOrder/${orderId}`,{}, 'user')
  
    //Invoice
  
    getInvoiceById = (id: any) => this.httpservice.getPdf(`user/InvoicePage/${id}`, 'user')
  
    // Reload api
  
    reloadApi = () => this.httpservice.get(`user/reloadApi`, 'user')

    //Header Text

    getHeader = () =>  this.httpservice.get(`fetchUserMidHeader`, 'user')

    //Gst Percentage

    getGstValue = () => this.httpservice.get(`user/getGST`,'user')

}
