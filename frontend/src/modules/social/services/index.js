import service from '../../../services';

export const initDataPdfRequest = (params) => {
    return service.get('/api/social/pdf', {params:params})
}