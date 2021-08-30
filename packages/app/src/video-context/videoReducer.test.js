import { videoReducer } from "./VideoReducer";

describe("Test videoReducer", () => {
  //test 1
  test("should signin user", () => {
    const reducedState = videoReducer(
      { user: "" },
      {
        type: "SIGNIN",
        payload: {
          _id: "60e14e128f80533bac06e55e",
          email: "admin@gmail.com",
          name: "admin",
          history: [],
          playlist: [],
          likedVideos: [],
          suscriptions: [],
        },
      }
    );
    expect(reducedState).toEqual({
      user: {
        _id: "60e14e128f80533bac06e55e",
        email: "admin@gmail.com",
        name: "admin",
        history: [],
        playlist: [],
        likedVideos: [],
        suscriptions: [],
      },
    });
  });

  //test 2
  test("should sign out", () => {
    const reducedState = videoReducer(
      {
        user: {
          _id: "60e14e128f80533bac06e55e",
          email: "admin@gmail.com",
          name: "admin",
          history: [],
          playlist: [],
          likedVideos: [],
          suscriptions: [],
        },
        video: { _id: "7486748486484553415" },
        playlist: [
          { _id: "7486748486484553415" },
          { _id: "7486748486484553415" },
        ],
        history: [
          { _id: "7486748486484553415" },
          { _id: "7486748486484553415" },
        ],
        likedVideos: [{ _id: "7486748486484553415" }],
      },
      {
        type: "SIGNOUT",
      }
    );
    expect(reducedState).toEqual({
      user: "",
      video: {},
      playlist: [],
      history: [],
      likedVideos: [],
    });
  });

  //test 3
  test("should set all videos", () => {
    const reducedState = videoReducer(
      { videos: [] },
      {
        type: "SET_VIDEOS",
        payload: [
          { _id: "7486748486484553415" },
          { _id: "7486748486484553416" },
        ],
      }
    );
    expect(reducedState).toEqual({
      videos: [{ _id: "7486748486484553415" }, { _id: "7486748486484553416" }],
    });
  });

  //test 4
  test("should set history", () => {
    const reducedState = videoReducer(
      { history: [] },
      {
        type: "SET_HISTORY",
        payload: [
          { _id: "7486748486484553415" },
          { _id: "7486748486484553416" },
          { _id: "7486748486484553417" },
        ],
      }
    );
    expect(reducedState).toEqual({
      history: [
        { _id: "7486748486484553415" },
        { _id: "7486748486484553416" },
        { _id: "7486748486484553417" },
      ],
    });
  });
  //test 5
  test("should set playlist", () => {
    const reducedState = videoReducer(
      { playlist: [] },
      {
        type: "SET_PLAYLIST",
        payload: [
          { _id: "7486748486484553415" },
          { _id: "7486748486484553416" },
          { _id: "7486748486484553417" },
        ],
      }
    );
    expect(reducedState).toEqual({
      playlist: [
        { _id: "7486748486484553415" },
        { _id: "7486748486484553416" },
        { _id: "7486748486484553417" },
      ],
    });
  });
  //test 6
  test("should set liked videos", () => {
    const reducedState = videoReducer(
      { likedVideos: [] },
      {
        type: "SET_LIKED_VIDEOS",
        payload: [
          { _id: "7486748486484553415" },
          { _id: "7486748486484553416" },
          { _id: "7486748486484553417" },
        ],
      }
    );
    expect(reducedState).toEqual({
      likedVideos: [
        { _id: "7486748486484553415" },
        { _id: "7486748486484553416" },
        { _id: "7486748486484553417" },
      ],
    });
  });
  //test 7
  test("should set category", () => {
    const reducedState = videoReducer(
      { category: "" },
      {
        type: "SET_CATEGORY",
        payload: "HALO",
      }
    );
    expect(reducedState).toEqual({
      category: "HALO",
    });
  });
  //test 8
  test("should set toast message", () => {
    const reducedState = videoReducer(
      { toast: "" },
      {
        type: "TOAST",
        payload: "Video deleted successfully",
      }
    );
    expect(reducedState).toEqual({
      toast: "Video deleted successfully",
    });
  });

  //test 9
  test("should set toast style", () => {
    const reducedState = videoReducer(
      { toastStyle: { display: "none" } },
      {
        type: "TOAST_STYLE",
        payload: { display: "block" },
      }
    );
    expect(reducedState).toEqual({
      toastStyle: { display: "block" },
    });
  });

  //test 10
  test("should set loading style", () => {
    const reducedState = videoReducer(
      { loadingStyle: { display: "none" } },
      {
        type: "LOADING_STYLE",
        payload: { display: "block" },
      }
    );
    expect(reducedState).toEqual({
      loadingStyle: { display: "block" },
    });
  });
});
