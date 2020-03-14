import service from '../../../services';

export const initSelfPhotoRequest = (params) => {
    return service.get('/api/selfcode/photo', {params:params});
}