import service from '../../../services';

// 注册请求;
export const RegisterRuquest = (params) => {
    console.log(params)
    return service.post('/api/register', {...params});
}