import service from '../../../services';

export const initLiveNoRequest = (params) => {
  return service.get('/api/admin/liveno', {params: params})
}

export const initLiveYesRequest = (params) => {
  return service.get('/api/admin/liveyes', {params: params})
}

export const initPhotoRequest = (params) => {
  return service.get('/api/admin/photo', {params: params})
}

export const initItRequest = (params) => {
  return service.get('/api/admin/software', {params: params})
}

export const initPdfRequest = (params) => {
  return service.get('/api/admin/pdf', {params: params})
}

export const initFilesRequest = (params) => {
  return service.get('/api/admin/files', {params: params})
}

export const initUsersRequest = (params) => {
  return service.get('/api/admin/users', {params: params})
}

export const deleteLiveRequest = (params) => {
  return service.post('/api/admin/deletelive', {...params})
}

export const passLiveRequest = (params) => {
  return service.post('/api/admin/passlive', {...params})
}