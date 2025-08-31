import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : "https://todolist-api.hexschool.io",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
}); //判斷開發環境或線上環境
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
/* account api */
// 註冊
// const data = {
//   email: "", //string
//   password: "", //string
//   nickname: "", //string
// };
export const regist = (data) => {
  return api.post(`/users/sign_up`, data);
};
// 登入
// const data = {
//   email: "", //string
//   password: "", //string
// };
export const login = (data) => {
  return api.post(`/users/sign_in`, data);
};
// 驗證token
export const getAccessToken = () => {
  return api.get(`/users/checkout`);
};
// 登出
export const logOut = () => {
  return api.post(`/users/sign_out`);
};

/* to-do api */
// 取得帳號所有代辦事項
export const getTodoList = () => {
  return api.get(`/todos/`);
};
// 新增代辦事項
// const data = {
//   content: "", //string
// }
export const postTodoList = (data) => {
  return api.post(`/todos/`, data);
};
// 更新代辦事項
// const data = {
//   content: "", //string
// }
export const updataTodoList = (id, data) => {
  return api.put(`/todos/${id}`, data);
};
// 刪除代辦事項
export const delTodoList = (id) => {
  return api.delete(`/todos/${id}`);
};
// 變更代辦事項狀態
export const changeTodoListStatus = (id) => {
  return api.patch(`/todos/${id}/toggle`);
};
