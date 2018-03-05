import { CameraRoll } from 'react-native';

export function nextPage() {
  return {
    type: 'NEXT_PAGE',
    
  };
}
export function previousPage() {
  return {
    type: 'PREVIOUS_PAGE',
    
  };
}



export function nextPageAction(end_cursor) {
  return (dispatch) => {
    dispatch(nextPage());
    dispatch(getPhotoAction(end_cursor));
  };
}

export function previousPageAction(end_cursor) {
  return (dispatch) => {
    dispatch(previousPage());
    dispatch(getPhotoAction(end_cursor));
  };
}


export function gettingPhoto() {
  return {
    type: 'GETTING_PHOTO'
  }
}

export function getPhotosSuccess(data) {
  return {
    type: 'GET_PHOTO_SUCCESS',
    data,
  }
}

export function getPhotosFailure(err) {
  return {
    type: 'GET_PHOTO_FAILURE',
    err,
  }
}


export function getPhotoAction(end_cursor) {
  return (dispatch) => {
    dispatch(gettingPhoto());
    CameraRoll.getPhotos({
     first: 6,
     after: end_cursor,
     assetType: 'Photos',
    })
      .then(data => {
        dispatch(getPhotosSuccess(data));
      })
      .catch((err) => console.log('err:', err))

  }
  

}







