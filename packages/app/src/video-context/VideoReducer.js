export const initialState = {
  user: "",
  category: "",
  videos: [],
  video: {},
  playlist: [],
  history: [],
  likedVideos: [],
  toast: "",
  ham: true,
  toastStyle: { display: "none" },
  loadingStyle: { display: "none" },
};

export const videoReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { ...state, user: action.payload };
    case "SIGNOUT":
      localStorage.removeItem("__rtoken");
      return {
        ...state,
        user: "",
        video: {},
        playlist: [],
        history: [],
        likedVideos: [],
      };
    case "SET_VIDEOS":
      return { ...state, videos: action.payload };
    case "SET_VIDEO":
      return { ...state, video: action.payload };
    case "SET_PLAYLIST":
      return { ...state, playlist: action.payload };
    case "SET_HISTORY":
      return { ...state, history: action.payload };
    case "SET_LIKED_VIDEOS":
      return { ...state, likedVideos: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "TOAST":
      return { ...state, toast: action.payload };
    case "HAM":
      return { ...state, ham: !state.ham };
    case "TOAST_STYLE":
      return { ...state, toastStyle: action.payload };
    case "LOADING_STYLE":
      return { ...state, loadingStyle: action.payload };
    default:
    console.log(action)
  }
};
