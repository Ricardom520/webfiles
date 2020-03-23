import service from '../../../services';

// 初始化我的文档数据
export const initMyfilesRequest = (params) => {
    return service.post('/api/myfiles',{...params})
}

// 粘贴我的文档文件
export const pasteFileRequest = (params) => {
    return service.post('/api/myfiles/paste', {...params})
}

// 重命名我的文档文件
export const handleNewNameRequest = (params) => {
    return service.post('/api/myfiles/rename', {...params})
}

// 删除我的文档文件
export const deleteFileRequest = (params) => {
    return service.post('/api/myfiles/delete', {...params})
}

// 新建文件夹
export const createFileRequest = (params) => {
    return service.post('/api/myfiles/createfile', {...params})
}

// 上传文件
export const uploadFileRequest = (params) => {
    return service.post('/api/myfiles/upload', {...params});
}

// 下载文件
export const downloadFileRequest = (params) => {
    return service.get('/api/myfiles/download', {params:params})
}

// 寻找文件
export const findFileRequest = (params) => {
    return service.post('/api/myfiles/find', {...params});
}

export const findFileFavourRequest = (params) => {
    return service.post('/api/favourite/find', {...params});
}

// 添加收藏
export const addToFavouriteRequest = (params) => {
    return service.post('/api/myfiles/favour', {...params});
}

// 取消收藏
export const cancelToMyfileRequest = (params) => {
    return service.post('/api/favourite/cancel', {...params});
}

// 初始化垃圾箱
export const initDustbinRequest = (params) => {
    return service.get('/api/dustbin', {params: params})
}

// 彻底删除
export const deleteDustbinRequest = (params) => {
    return service.post('/api/dustbin/delete', {...params})
}

// 垃圾箱还原
export const reductionDustbinRequest = (params) => {
    return service.post('/api/dustbin/reduction', {...params})
}

// 搜索垃圾箱
export const findDustFileRequest = (params) => {
    return service.get('/api/dustbin/find', {params: params})
}

// 初始化收藏夹
export const initFavouriteRequest = (params) => {
    return service.get('/api/favourite',{params:params});
}

// 初始化文件数据
export const initFileRequest = (params) => {
    return service.get('/api/file', {params:params})
}

// 搜索文件数据
export const findFileFileRequest = (params) => {
    return service.get('/api/file/find', {params: params});
}

// 分享文件
export const shareFileRequest = (params) => {
    return service.post('/api/myfiles/share', {...params})
}

// 初始化我的分享
export const initMysharesRequest = (params) => {
    return service.get('/api/share', {params:params});
}

// 取消我的分享
export const cancelShareRequest = (params) => {
    return service.post('/api/share/cancel', {...params})
}

// 获取分享图片的数据
export const getsharePicRequest = (params) => {
    return service.get('/api/myfiles/getpic', {params:params})
}

// 分享图片
export const sharePicRequest = (params) => {
    return service.post('/api/myfiles/sharepic', {...params})
}

// 获取已有分享软件
export const getHasProRequest = (params) => {
    return service.get('/api/myfiles/getsoft', {params:params})
}

// 创建分享软件项目
export const createNewProRequest = (params) => {
    return service.post('/api/myfiles/createsoft', {...params})
}