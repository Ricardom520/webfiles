import service from '../../../services';

// 注册请求;
export const LoginRuquest = (params) => {
    console.log(params)
    return service.post('/api/login', {...params});
}