import service from '../../../services';

// 初始化我的文档菜单
export const initMyfieRequest = (params) => {
    return service.post('/api/menus/myfile', {...params})
}