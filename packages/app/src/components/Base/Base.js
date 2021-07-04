import React from "react";
import { useVideo } from "../../video-context/VideoContext";
import SideNav from "../Nav/SideNav";
import UpperNav from "./../Nav/UpperNav";
import "./base.css";
import Toast from './../Toast/Toast';
import Loading from '../Loader/Loading';

function Base({ children }) {
  const {state} = useVideo();
  return (
    <div className="base">
      <div className="upperNav">
        <UpperNav />
      </div>
      <div className="sideNav">
      <SideNav className="sideNav"/>
      </div>
      <div className="children"> {children}
      <Loading/></div>
      {state.toast && <Toast />} 
      
      <div className="suggestedVideos"></div>
    </div>
  );
}

export default Base;
