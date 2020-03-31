import service from '../../../services';

export const initSoftwareRequest = (params) => {
    return service.get('/api/software', {params:params});
}

export const downloadFileRequest = (params) => {
    return service.post('/api/software/download', {...params})
}

export const initCommonRequest = (params) => {
    return service.get('/api/software/common', {params:params});
}