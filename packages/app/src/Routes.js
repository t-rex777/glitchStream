import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import VideoPage from "./components/VideoCard/VideoPage";
import SignIn from './components/User/SignIn';
import PrivateRoute from './components/User/PrivateRoute';
import History from './components/History/History';
import LikedVideos from './components/LikedVideos/LikedVideos';
import Playlist from "./components/Playlist/Playlist";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/video/:videoId" exact component={VideoPage} />
        <Route path="/signin" exact component={SignIn} />
        <PrivateRoute path="/history" exact component={History} />
        <PrivateRoute path="/likedvideos" exact component={LikedVideos} />
        <PrivateRoute path="/playlist" exact component={Playlist} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
