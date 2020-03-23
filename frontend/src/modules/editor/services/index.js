import service from '../../../services';

export const submitEditorRequest = (params) => {
    return service.post('/api/editor', {...params})
}