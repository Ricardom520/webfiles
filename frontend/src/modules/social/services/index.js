import service from '../../../services';

export const initSocialnrjxRequest = (params) => { // 初始化社区首页内容精选
    return service.get('/api/social/nrjx', {params:params})
}

export const initSocialdptjRequest = (params) => { // 初始化社区首页单品推荐
  return service.get('/api/social/dptj', {params: params})
}

export const initDataPdfRequest = (params) => { // 初始化论文社区
    return service.get('/api/social/pdf', {params:params})
}

export const openDataPdfRequest = (params) => { // 打开pdf文件
    return service.get('/api/social/openpdf', {params: params});
}

export const initDataLiveRequest = (params) => {
    return service.get('/api/social/live', {params:params})
}

export const initDataPhotoRequest = (params) => {
    return service.get('/api/social/photo', {params:params})
}

export const openDataPicRequest = (params) => { // 打开pdf文件
    return service.get('/api/social/openphoto', {params: params});
}

export const initDataSoftwareRequest = (params) => {
    return service.get('/api/social/software', {params:params})
}