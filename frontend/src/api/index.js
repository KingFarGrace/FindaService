//接口请求函数
import ajax from './ajax';
const BASE = 'http://localhost:3000';


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
export const reqSearchServices = ({ pageNum, pageSize, searchCategory, searchCity }) => {
    return ajax(BASE + '/service/search',
        {
            params: {
                pageNum,
                pageSize,
            }
        }
    )
}
//按id搜索
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

export const reqCommentbyId = (serviceId) => {
    return ajax(BASE + '/review/info',
        {
            params: {
                serviceId
            }
        }
    )}

export const reqRegister = (email, username, role, password, repeatPwd) =>{
    return ajax(
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

export const reqServiceRegister = (email, username, role, password, repeatPwd, description, address, postcode) =>{
    return ajax(
        {
            method: 'POST',
            url: BASE + '/register/serviceProvider',
            data:{
                email,
                username,
                role,
                password,
                repeatPwd,
                description,
                address,
                postcode
            }
        })}
