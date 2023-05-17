//接口请求函数
import ajax from './ajax';
const BASE = '';

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
            url: BASE + '/register/customer',
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
            url: BASE + '/register/serviceProvider',
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
export const reqServices = (pageNum, pageSize, searchCategory, searchCity) => {
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
export const reqCommentbyId = (provider,service) => {
    return ajax(BASE + '/review/info?',
        {
            params: {
                provider:provider,
                service:service
            }
        }
    )
}
// 订阅服务
// 等后端通知接口
export const reqSubscribeService = (email, password, username, role, repeatPwd) => {
    return ajax.post(BASE + '待修改',
        {
            method: 'POST',
            url: BASE + '/register/customer',
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

export const reqAcptServer = (adminKey, provider, service) => {
    return ajax(
        {
            method: 'POST',
            url: BASE + '/service/acpt',
            data: {
                adminKey,
                provider,
                service
            }
        }
    )
}

export const reqDelComment = (adminKey, provider, service, username) => {
    return ajax(
        {
            method: 'POST',
            url: BASE + '/review/rm',
            data: {
                adminKey,
                provider,
                service,
                username
            }
        }
    )
}





export const reqDecServer = (adminKey, provider, service) => {
    return ajax(
        {
            method: 'POST',
            url: BASE + '/service/acpt',
            data: {
                adminKey,
                provider,
                service
            }
        }
    )
}



export const reqUpdateInformation = (email, username, address, postcode, description) => {
    return ajax(BASE + '/user/update',
        {
            method: 'POST', 
            data: {
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
export const reqMyRequest = (email) => {
    return ajax(BASE + '/request/receiver?',
        {
            params: { email:email 
            }
        }
    )
}

export const reqRequest = (email) => {
    return ajax(BASE + '/request/sender?',
        {
            params: { email:email 
            }
        }
    )
}

//获取已经完成的服务    
export const reqHistoryRequest = (email) => {
    return ajax(BASE + '待修改',
        {
            params: { email }
        }
    )
}


//历史服务里提交评论
export const reqAddReview = (provider,
    service,
    username,
    content,
    ctime) => {
    return ajax.post(BASE + '/review/add',
        {
            data: {
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
            data: {
                email,
                username,
                address,
                postcode,
                description
            }
        })
}

//更改密码
export const reqUpdatePassword = (
    email,
    oldPwd,
    newPwd,
    repeatNewPwd) => {
    return ajax.post(BASE + '/pwd/update',
        {
            data: {
                email,
                oldPwd,
                newPwd,
                repeatNewPwd
            }
        })
}


//更新服务
export const reqUpdateRequest = (userEmail, providerEmail, serviceName, content, status) => {
    return ajax.post(BASE + '待修改',
        {
            data: {
                userEmail,
                providerEmail,
                serviceName,
                content,
                status
            }
        }
    )
}
//用户取消服务
export const reqRejectRequest = (id, status) => {
    return ajax.post(BASE + '待修改',
        {
            data: {
                id, status
            }
        }
    )
}

export const sendRequest = (sender,receiver,service,content,status) => {
    return ajax(BASE+'/request/send',
    {
        method: 'POST',
        data:{
            sender,
            receiver,
            service,
            content,
            status
        }
    }
    )
}

export const updateRequest = (_id,content,status) => {
    return ajax(BASE+'/request/update',
    {
        method: 'POST',
        data:{
            _id,
            content,
            status
        }
    }
    )
}

export const addService = (provider,service,catagory,description,area,availability,price) => {
    return ajax(BASE + '/service/add',
    {
        method: 'POST',
        data:{
            provider,
            service,
            catagory,
            description,
            area,
            availability,
            price
        }
    }
    )
}

export const acceptPro = (adminKey,email) => {
    return ajax(BASE + '/user/acpt',
    {
        method: 'POST',
        data:{
            adminKey,
            email
        }
    }
    )
}

export const removePro = (adminKey,email) => {
    return ajax(BASE + '/user/rm',
    {
        method: 'POST',
        data:{
            adminKey,
            email
        }
    }
    )
}

export const updateService = (provider,service,catagory,description,area,availability,price) => {
    return ajax(BASE + '/service/update',
    {
        method: 'POST',
        data:{
            provider,
            service,
            catagory,
            description,
            area,
            availability,
            price
        }
    }
    )
}
//用户获取所有消息
export const reqMessage = (email) => {

    return ajax(BASE + '',
        {
            params: {
                email
            }
        }
    )

}

export const reqUserInfo = (username) => {
    return ajax(BASE + '/user/info?',
    {
        params: {
            username : username
        }
    }
)
}

export const reqUnProvider = () => {
    return ajax(BASE + '/user/unavailable',
    {
        params: {
        
    }
    }
)
}

export const reqLowProvider = () => {
    return ajax(BASE + '/user/lowLevel',
    {
        params: {
        
    }
    }
)
}

export const reqProviderService = (provider) => {
    return ajax(BASE + '/service/info?',
    {
        params: {
            provider : provider
        }
    }
)
}




