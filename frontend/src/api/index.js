//接口请求函数
import ajax from './ajax';
const BASE = 'http://localhost:3000';

//用户名登录
export const reqLogin_username = (username, password) => {
    return ajax(
        {
            method: 'POST',
            url: BASE + '/login',
            data: {
                username,
                password
            }
        }
    )
}
//邮箱登录
export const reqLogin_email = (email, password) => {
    return ajax(
        {
            method: 'POST',
            url: BASE + '/login',
            data: {
                email,
                password
            }
        }
    )
}

//个人注册
export const reqRegister = (email, username, role, password, repeatPwd) => {
    return ajax(
        {
            method: 'POST',
            url: BASE + '/register',
            data: {
                email,
                password,
                username,
                role,
                repeatPwd
            }
        }
    )
}

//服务注册
export const reqServiceRegister = (email, username, role, password, repeatPwd, description, address, postcode) => {
    return ajax(
        {
            method: 'POST',
            url: BASE + '/register',
            data: {
                email,
                username,
                role,
                password,
                repeatPwd,
                description,
                address,
                postcode
            }
        })
}


// 获取所有服务
export const reqServices = (pageNum, pageSize,searchCategory,searchCity) => {
    return ajax(BASE + '/service/info',
        {
            params: {
                pageNum,
                pageSize,
                searchCategory,
                searchCity
            }
        }
    )
}

export const reqProviders = (pageNum, pageSize) => {
    return ajax(BASE + '/user/info',
        {
            params: {
                pageNum,
                pageSize,
            }
        }
    )
}


//搜索
//搜索服务（按分类和地址）
export const reqSearchServices = ({ pageNum, pageSize, searchCategory, searchCity }) => {
    return ajax(BASE + '/service/search',
        {
            params: {
                pageNum,
                pageSize,
                searchCategory,
                searchCity
            }
        }
    )
}
//按id搜索服务，其实这个好像用处不大了已经。
export const reqServicebyId = (serviceId) => {
    return ajax(BASE + '/service/info',
        {
            params: {
                serviceId
            }
        }

    )
}

export const reqReviewRate = (serviceId) => {
    return ajax(BASE + '/user/review',
        {
            params: {
                serviceId
            }
        }

    )
}

//按service的id获取评论
export const reqCommentbyId = (serviceId) => {
    return ajax(BASE + '/review/info',
        {
            params: {
                serviceId
            }
        }
    )
}
// 订阅服务
// 等后端通知接口
export const reqSubscribeService = (email,password,username,role,repeatPwd) => {
    return ajax.post(BASE + '待修改',
        {
            method: 'POST',
            url: BASE + '/register/customer',
            data:{
                email,
                password,
                username,
                role,
                repeatPwd
            }
        }
    )
}

export const reqAcptServer = (adminKey,provider,service) =>{
    return ajax(
        {
            method: 'POST',
            url: BASE + '/service/acpt',
            data:{
                adminKey,
                provider,
                service
            }
        }
    )
}

export const reqDelComment = (adminKey,provider,service,username) =>{
    return ajax(
        {
            method: 'POST',
            url: BASE + '/service/acpt',
            data:{
                adminKey,
                provider,
                service,
                username
            }
        }
    )
}

export const reqRequest = (username) => {
    return ajax(
        {
            method: 'POST',
            url: BASE + '/request',
            data: {
                username,
            }
        }
    )
}
export const reqDecServer = (adminKey,provider,service) =>{
    return ajax(
        {
            method: 'POST',
            url: BASE + '/service/acpt',
            data:{
                adminKey,
                provider,
                service
            }
        }
    )
}



export const reqUpdateInformation = (email, username,address,postcode, description) =>{
    return ajax(
        {
            method: 'POST',
            url: BASE + '/user/update',
            data:{
                email,
                username,
                address,
                postcode,
                description
            }
        }
    )
}

//获取正在进行的服务
export const reqMyService = (待修改, a, b, c) => {
    return ajax(BASE + '待修改',
        {
            params: { a }
        }
    )
}


//历史服务里提交评论
export const reqAddReview = (provider,
    service,
    username,
    content,
    ctime) => {
    return ajax(BASE + '/review/add',
        {
            params: {
                provider,
                service,
                username,
                content,
                ctime
            }
        }
    )
}

//个人信息里提交修改
export const reqEditUser = (
    email,
    username,
    address,
    postcode,
    description) => {
    return ajax.post(BASE + '/user/update',
        {
            email,
            username,
            address,
            postcode,
            description
        })
}

export const reqUpdatePassword = (
    email,
    oldPwd,
    newPwd,
    repeatNewPwd) => {
    return ajax.post(BASE + '/pwd/update',
        {
            email,
            oldPwd,
            newPwd,
            repeatNewPwd
        })
}
