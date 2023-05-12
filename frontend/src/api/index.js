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

export const reqCommentbyId = (serviceId) => {
    return ajax(BASE + '/review/info',
        {
            params: {
                serviceId
            }
        }

    )
}