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
export const reqServices = (pageNum, pageSize) => {
    return ajax(BASE + '/service/info',
        {
            params: {
                pageNum,
                pageSize
            }
        }
    )
}

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
export const reqSubscribeService = (userEmail, providerEmail, serviceName, content) => {
    return ajax.post(BASE + '待修改',
        {
            data: {
                userEmail,
                providerEmail,
                serviceName,
                content
            }
        }
    )
}

//获取正在进行的服务    
export const reqMyRequest = (email) => {
    return ajax(BASE + '待修改',
        {
            params: { email }
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