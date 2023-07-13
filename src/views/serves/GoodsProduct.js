/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-07-13 18:57:41
 * @LastEditors: Johannjensen johannajensen1@gmail.com
 * @LastEditTime: 2023-07-13 21:29:41
 * @FilePath: \manage\src\views\serves\GoodsProduct.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { get } from '../utils/request'

// 商品分类
export const dataproduct = ()=>get(`/api/v1/admin/productcategory`)
