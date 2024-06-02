import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpservice: HttpClientService
  ) { }

  // Admin Login

  adminLogin = (data: any) => this.httpservice.post('admin/login',data, 'admin');

  adminLogout = () =>{
    return this.httpservice.post(`admin/logout`,{}, 'admin')
  }

  // Categories
  addCategory = (category: FormData) => this.httpservice.post('admin/addCategory', category , 'admin',true);

  getCategories = () => this.httpservice.get('admin/fetchCategory', 'admin');

  // Sub Categories
  addSubCategory = (categoryId: any, subCategoryName: any) =>{
    let body = { Category: categoryId, subCategory_name: subCategoryName }
      return this.httpservice.post('admin/addSubCategory', body, 'admin')
  }

  getSubCategories = () =>{
      return this.httpservice.get('admin/fetchSubCategory', 'admin')
  }

  getSubCategoriesByCategoryId = (id:any) =>{
    return this.httpservice.post(`admin/SubCategoryByID/${id}`,{}, 'admin')
  }

  // Product

  addProduct = (data: FormData) => this.httpservice.post('admin/addProduct', data, 'admin', true)

  getProduct = () => this.httpservice.get('admin/fetchProduct', 'admin')

  deleteProduct = (id: any) => this.httpservice.delete(`admin/deleteProduct/${id}`,'admin')

  updateProduct = (data: FormData, id: any) => this.httpservice.post(`admin/editProduct/${id}`, data, 'admin', true)

  updateProductStatus = (productId: any, status: any) => this.httpservice.put(`admin/updateProductStatus/${productId}`,status, 'admin')
  
  //PRODUCT iMAGES

  deleteProductImage = (id: any) => this.httpservice.delete(`admin/deleteProductImage/${id}`,'admin')

  getProductImagesByProductId = (id: any) => this.httpservice.get(`getImagesByProductID/${id}`, 'admin')

  //Product Weight

  deleteProductWeight = (id: any) => this.httpservice.delete(`admin/deleteProductWeight/${id}`,'admin')

  editProductWeight = (productId: any, data: any) => this.httpservice.post(`admin/editProductWeight/${productId}`, data, 'admin')

  fetchAllWeight = () => this.httpservice.get(`admin/fetchAllWeight`, 'admin')

  //AboutUs

  getAbout = () => this.httpservice.get('admin/getAbout', 'admin')
  

  addAbout = (data: any) => this.httpservice.post('addAbout', data, 'admin')

  editAbout = (id: any,data: any) => this.httpservice.put(`admin/editAbout/${id}`, data,'admin')

  //paginate

  paginateProductByUrl = (url: any) => this.httpservice.get(url.replace(environment.baseURI,""), 'admin') 

  //Banner 

  addBannerdata = (data: FormData) => this.httpservice.post('admin/addBannerImage',data,'admin',true)

  getBannerData = () => this.httpservice.get('admin/getBanner', 'admin')

  updateBannerStatus = (id: any, body: any) => this.httpservice.put(`admin/updateStatus/${id}`, body,'admin')

  deleteBanner = (id:any) => this.httpservice.delete(`admin/deleteBanner/${id}`,'admin')

  //stock

  addStock = (data: any) => this.httpservice.post('admin/addProductStock',data, 'admin')

  getAllStock = () => this.httpservice.get('admin/fetchProductStock', 'admin')

  deleteStock = (id: any) => this.httpservice.delete(`admin/deleteProductStock/${id}`,'admin')

  editStockById = (data: any, id: any) => this.httpservice.put(`admin/editProductStock/${id}`,data,'admin')

  getAllProductForStock = () => this.httpservice.get(`admin/getAllProductForStock`, 'admin')

  getWeightByProduct = (productId: any) => this.httpservice.get(`admin/getWeightByProduct/${productId}`, 'admin')

  //Order

  fetchAllOrders = () => this.httpservice.get(`admin/fetchAllOrders`, 'admin')

  updateAWB = (data: any) => this.httpservice.put(`admin/updateAWB`, data,'admin')

  //Tags

  addIndividualTag = (data: any) => this.httpservice.post(`admin/addIndividualTag/${data.product_id}`, data, 'admin');

  deleteTags = (id: any) => this.httpservice.delete(`admin/deleteTags/${id}`,'admin');

  getTagByProdId = (id: any) => this.httpservice.get(`admin/getTagsByProductID/${id}`,'admin');

  //profile 

  getAllUsers = () => this.httpservice.get(`admin/getAllUser`,'admin');

  getUserById = (id: number) => this.httpservice.get(`admin/getUserByID/${id}`,'admin');

  updateUserData = (id: number,body: any ) => this.httpservice.post(`admin/updateUserProfileInfo/${id}`, body, 'admin')

  //Home page header

  getHeader = () => this.httpservice.get(`admin/fetchMidHeader`,'admin')

  putHeader = (body) => this.httpservice.post(`admin/addMidHeader`,body, 'admin')

  //Admin weight

  getWeightMaster = () => this.httpservice.get(`admin/getWeightMaster`,'admin')

  addWeightMaster = (data) => this.httpservice.post(`admin/addWeightMaster`,data, 'admin')

  updateWeightMaster = (id,data) => this.httpservice.put(`admin/editWeightMaster/${id}`,data, 'admin')

  deleteWeightMaster = id => this.httpservice.delete(`admin/deleteWeightMaster/${id}`, 'admin')

  //Get GST

  getGstValue = () => this.httpservice.get(`admin/getGST`,'admin')

  //GetDashboardData

  getDashboardData = () => this.httpservice.get(`admin/getDashboardData`,'admin')

}
