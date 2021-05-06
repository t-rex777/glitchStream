const Video = require("./model");

// MIDDLEWARE
exports.getVideoById = async (req, res, next, videoId) => {
  try {
    const video = await Video.findById(videoId);
    req.video = video;
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// READ
exports.getOneVideo = async (req, res) => {
  try {
    const { video } = await req;
    res.send(video);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.json(videos);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// CREATE
exports.createVideo = async (req, res) => {
  try {
    await Video.insertMany([
      {
        name: "WRECKING HAVOC IN VALORANT COMPETITIVE WITH DUELISTS",
        description:
          "Valorant aggresive gameplay in competitive match against diamond players",
        uploadedBy: "STUNZ",
        videoId: "wSLoJWVjQzs",
        thumbnail:
          "https://i.ytimg.com/an_webp/wSLoJWVjQzs/mqdefault_6s.webp?du=3000&sqp=COjTs4QG&rs=AOn4CLBEcuofQxKf7IYrcqqp-1N8kl8Q3g",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwnjbopSnoFrzBbO9ASM7wxSaYukJJGmaXfvmo-0cRg=s176-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Episode 2 Act III Gameplay Trailer - VALORANT",
        description:
          "Episode 2 Act III brings clear skies and sightlines. Reach for Radiant horizons on our new map Breeze, collect exclusive content in the latest Battlepass, and more.",
        uploadedBy: "VALORANT",
        videoId: "aLYnq0eA89w",
        thumbnail:
          "https://i.ytimg.com/an_webp/aLYnq0eA89w/mqdefault_6s.webp?du=3000&sqp=CIzks4QG&rs=AOn4CLARZy1DyItQaonYH1nqFooCeHRwBQ",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwnh5cX3Hpigfm2Y3X1VAd1QrVBWgzFeaIM8RAuTu=s88-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "VALORANT - The BEST Viper Guide on BREEZE",
        description:
          "I did my homework, now its your turn to like, suscribe and share this video guys!",
        uploadedBy: "Unidaro",
        videoId: "fvLCdpGR8ic",
        thumbnail:
          "https://i.ytimg.com/an_webp/fvLCdpGR8ic/mqdefault_6s.webp?du=3000&sqp=CPvis4QG&rs=AOn4CLDn08LbY8ZLICqkvVGAg57oyA1pjA",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwngb45MjR1qX3QJMDVWwrXnBPpkV5CYLHsEWxST67g=s88-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "TenZ CARRIES Him Self VS RADIANTS (42 Kills) l Valorant",
        description:
          "Tenz is one of the best players in valorant with rank Radiant.Mostly he plays Jett and Omen.",
        uploadedBy: "Valolo",
        videoId: "zdgxB_4SCNg",
        thumbnail:
          "https://i.ytimg.com/an_webp/zdgxB_4SCNg/mqdefault_6s.webp?du=3000&sqp=CJj0s4QG&rs=AOn4CLBvk4sRLi9Zfx8d_vfqcH8oEpcxcw",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwnhycAl0tK_uTldmMQmmPNr_rchmr3p8ioSE-1Cv=s88-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Football Matches That Shocked The World",
        description:
          "Football games that shocked the world! Barcelona, Bayern Munich, PSG, Liverpool, Brazil, Germany and more in video!",
        uploadedBy: "TKHD",
        videoId: "xSsiS304iY8",
        thumbnail:
          "https://i.ytimg.com/an_webp/xSsiS304iY8/mqdefault_6s.webp?du=3000&sqp=CPz6s4QG&rs=AOn4CLBmX-tImWLvJrpTeaXR-PLi4V10ZA",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwni9Kb70j90xSwFzQtbjlq4vR4ZC0HB61Wd71sIDiA=s88-c-k-c0x00ffffff-no-rj",
      },

      {
        name: "Magic Moments in Football 2021",
        description:
          "Amazing Skills & Goals by The Best Players! A compilation of best moments of in 2020-2021",
        uploadedBy: "Lorenzo F7",
        videoId: "mhp_rF6VRUY",
        thumbnail:
          "https://i.ytimg.com/an_webp/mhp_rF6VRUY/mqdefault_6s.webp?du=3000&sqp=CIiEtIQG&rs=AOn4CLAR0H0SaFYQg7zDfzkhvUwaVAZtLg",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwngLOvyLcHFZdfmT7LoNg_GiAS_vqSp8yKLPXGM8rw=s88-c-k-c0x00ffffff-no-rj",
      },
    ]).then(data=>res.json({
      message : "videos added successfully!",
      data
    }));
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// UPDATE
exports.updateVideo = async (req, res) => {
  try {
    const video = req.video;
    let updatedVideo = req.body;
    updatedVideo = extend(video, updatedVideo);
    await updatedVideo.save((err, vid) => {
      if (err) {
       return res.status(400).json({
          message: "Error in updating video",
        });
      }
      res.json(vid);
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// DELETE
exports.deleteVideo = (req, res) => {
  try {
    const deleteVideo = req.video;
    deleteVideo.deleteOne((err, vid) => {
      if (err) {
       return res.status(400).json({
          message: "Error in deleteing video",
        });
      }
      res.json(vid);
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
