/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-30 21:47:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-13 14:34:33
 * @FilePath: \manage\src\views\serves\GoodsApi.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-30 21:47:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-12 11:08:15
 * @FilePath: \manage\src\views\serves\GoodsApi.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { get, post , delet,put} from '../utils/request'


// 获取商品
export const GoodsItemApi = (page = 1,name='') => get('/api/v1/admin/product', { page ,name})

// 登录接口
export const admin = () => get('/api/v1/auth/manager_info')

// 新增
export const plusdata = (data = {}) => post(`/api/v1/admin/product`, data)

// 修改
export const changdata = (id, data = {}) => put(`/api/v1/admin/product/${id}`,data)

// 删除
export const deldata = (id) => delet(`/api/v1/admin/product/${id}`)

// 根据ID获取单条数据
export const getonlydata = (id) => get(`api/v1/admin/product/${id}`)

