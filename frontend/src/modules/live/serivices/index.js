import service from '../../../services';

export const initLiveDataRequest = (params) => {
    return service.get('/api/social/openlive', {params: params})
}