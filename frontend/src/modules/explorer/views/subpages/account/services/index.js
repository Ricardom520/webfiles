import service from '../../../../../../services';

// 修改用户密码
export const modifyPassRequest = (params) => {
    return service.post('/api/selfcode/password', {...params})
}