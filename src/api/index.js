import axios from "axios";
const baseURL = "https://todolist-api.hexschool.io";
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
/* account api */
// 註冊
// const data = {
//   email: "", //string
//   possword: "", //string
//   nickname: "", //string
// };
export const regist = (data) => {
  return axios.post(`/users/sign_up`, data);
};
// 登入
// const data = {
//   email: "", //string
//   possword: "", //string
// };
export const login = (data) => {
  return axios.post(`/users/sign_in`, data);
};
// 驗證token
export const getAccessToken = () => {
  return axios.get(`/users/checkout`);
};
// 登出
export const logOut = () => {
  return axios.post(`/users/sign_out`);
};

/* to-do api */
// 取得帳號所有代辦事項
export const getTodoList = () => {
  return axios.get(`/todos/`);
};
// 新增代辦事項
// const data = {
//   content: "", //string
// }
export const postTodoList = (data) => {
  return axios.post(`/todos/`, data);
};
// 更新代辦事項
// const data = {
//   content: "", //string
// }
export const updataTodoList = (id, data) => {
  return axios.put(`/todos/${id}`, data);
};
// 刪除代辦事項
export const delTodoList = (id) => {
  return axios.delete(`/todos/${id}`);
};
// 新增代辦事項
export const changeTodoListStatus = (id) => {
  return axios.patch(`/todos/${id}/toggle`);
};
