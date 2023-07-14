/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-07-13 18:57:41
 * @LastEditors: Johannjensen johannajensen1@gmail.com
 * @LastEditTime: 2023-07-14 09:17:36
 * @FilePath: \manage\src\views\serves\GoodsProduct.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { delet, get, post, put } from '../utils/request'

// 商品分类
export const dataproduct = (page = 1, name = '') => get(`/api/v1/admin/productcategory`, {page,name})

// 删除商品分类
export const deldataproduct = (id)=>delet(`/api/v1/admin/productcategory/${id}`)

// 修改商品分类信息
export const changdatamessage = (id, data) => put(`/api/v1/admin/productcategory/${id}`, data)

// 根据ID获取单条数据
export const getonlydata = (id) => get(`api/v1/admin/productcategory/${id}`)

// 新增商品信息
export const plusnewdata = (data = {})=>post(`/api/v1/admin/productcategory`,data)