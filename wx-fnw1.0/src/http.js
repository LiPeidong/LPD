// import router from './router';
import axios from 'axios';
import BASE_URL from './constants'
axios.interceptors.request.use(
    config => {
        if (config.url == BASE_URL + '/api/get_access_token') {
            return config
        } else {
            // console.log('提交请求成功')
            let now_t = new Date().getTime(); //当前时间
            if (!localStorage.getItem('tokens')) {
                axios.get(BASE_URL + '/api/get_access_token').then((res) => {
                    res.data.expires_at = new Date().getTime() + (res.data.expires_in - 20) * 1000;
                    localStorage.setItem("tokens", JSON.stringify(res.data));
                })
            }
            let expires_at = JSON.parse(localStorage.getItem("tokens")).expires_at //过期时间
            if (expires_at <= now_t) {
                // console.log('过期')
                //tokens过期了
                axios.get(BASE_URL + '/api/get_access_token').then((res) => {
                    res.data.expires_at = new Date().getTime() + (res.data.expires_in - 20) * 1000;
                    localStorage.setItem("tokens", JSON.stringify(res.data));
                })
            }
            const token = JSON.parse(localStorage.getItem("tokens"));

            if (token) {
                config.headers.Authorization = 'Bearer ' + token.access_token;
            }
            return config;
        }
    },
    err => {
        console.log(err)
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // console.log('请求响应成功')
        return response;
    },
    error => {
        console.log(error)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log('出现401')
                    // 401 token过期 清除token信息
                    localStorage.removeItem("tokens");
                    config.headers.Authorization = 'Bearer ' + token.access_token;
                    break;
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        // return Promise.reject(error.response.data)
    });


export default axios;
