import ajax from '../utils/ajax'

const BASE_URL = '/api'

//登录
export const login = (data) => ajax(BASE_URL + '/user/login', data, 'POST')
//获取用户信息
export const getInfo = (token) => ajax(BASE_URL + '/user/info', {token}, 'GET')
//退出登录
export const logout = () => ajax(BASE_URL + '/user/logout', {}, 'POST')

