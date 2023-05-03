//接口请求函数
import ajax from './ajax';
 const BASE = 'http://localhost:3000';


export const reqLogin_username = (username, password) =>{
    return ajax(
        {
            method: 'POST',
            url: BASE + '/login',
            data:{
                username,
                password
            }
        }
    )
}

export const reqLogin_email = (email, password) =>{
    return ajax(
        {
            method: 'POST',
            url: BASE + '/login',
            data:{
                email,
                password
            }
        }
    )
}
