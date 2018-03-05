const NEXT_PAGE = 'NEXT_PAGE';
const PREVIOUS_PAGE = 'PREVIOUS_PAGE';
const GET_PHOTO_SUCCESS = 'GET_PHOTO_SUCCESS';
const initialState = { 
  currentPage: 1,
  previousPageCursors:[""],
  currentPageCursor:"",
  nextPageCursor:"",
  hasNextPage:true,
  photos:[]
 }

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_PHOTO_SUCCESS:
      if (state.hasNextPage) {
        //let edges2 = action.data.edges.map((p,i)=>{let pp={...p,opacity:0}; return pp});
        return {
          ...state,
          hasNextPage:action.data.page_info.has_next_page,
          photos: action.data.edges,
          nextPageCursor: action.data.page_info.end_cursor 
        };
      } else {
        return state;
      }

    case NEXT_PAGE:
      if (state.hasNextPage) {
        return {
          ...state,
          currentPage: state.currentPage + 1,
          previousPageCursors:[...state.previousPageCursors,state.currentPageCursor],
          currentPageCursor:state.nextPageCursor

        };
      } else {
        return state;
      }
    case PREVIOUS_PAGE:
      if (state.currentPage > 1) {
        return {
          ...state,
          currentPage: state.currentPage - 1,
          previousPageCursors: state.previousPageCursors.slice(0,-1),
          currentPageCursor:state.previousPageCursors.slice(-1)[0],
          hasNextPage:true,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}