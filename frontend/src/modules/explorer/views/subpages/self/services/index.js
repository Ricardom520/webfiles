import service from '../../../../../../services';

// 初始化用户资料
export const InitSelfRequest = (params) => {
    return service.post('/api/selfcode', {...params})
}

// 修改用户资料
export const modifySelfRequest = (params) => {
    return service.post(`/api/selfcode/modify`, {...params})
}