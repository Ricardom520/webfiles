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