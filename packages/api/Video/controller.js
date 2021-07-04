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
        category: "Valorant",
        thumbnail:
          "https://media.wired.com/photos/5ea0840cb0490300086261e3/master/pass/Cul-Reveal_ReactorA_VALORANT.jpg",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwnjbopSnoFrzBbO9ASM7wxSaYukJJGmaXfvmo-0cRg=s176-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Episode 2 Act III Gameplay Trailer - VALORANT",
        description:
          "Episode 2 Act III brings clear skies and sightlines. Reach for Radiant horizons on our new map Breeze, collect exclusive content in the latest Battlepass, and more.",
        uploadedBy: "VALORANT",
        videoId: "aLYnq0eA89w",
        category: "Valorant",
        thumbnail:
          "https://playvalorant.com/assets/video/game-overview-poster-launch.jpg",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwnh5cX3Hpigfm2Y3X1VAd1QrVBWgzFeaIM8RAuTu=s88-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "VALORANT - The BEST Viper Guide on BREEZE",
        description:
          "I did my homework, now its your turn to like, suscribe and share this video guys!",
        uploadedBy: "Unidaro",
        videoId: "fvLCdpGR8ic",
        category: "Valorant",
        thumbnail:
          "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt86cd8572a30911aa/60cbfdb00ece0255888d895a/V_Ep_03_REFLECTION_Article-Header.jpg?auto=webp&disable=upscale&height=549",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwngb45MjR1qX3QJMDVWwrXnBPpkV5CYLHsEWxST67g=s88-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "TenZ CARRIES Him Self VS RADIANTS (42 Kills) l Valorant",
        description:
          "Tenz is one of the best players in valorant with rank Radiant.Mostly he plays Jett and Omen.",
        uploadedBy: "Valolo",
        videoId: "zdgxB_4SCNg",
        category: "Valorant",
        thumbnail:
          "https://www.riotgames.com/darkroom/1440/d0807e131a84f2e42c7a303bda672789:3d02afa7e0bfb75f645d97467765b24c/valorant-offwhitelaunch-keyart.jpg",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwnhycAl0tK_uTldmMQmmPNr_rchmr3p8ioSE-1Cv=s88-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Football Matches That Shocked The World",
        description:
          "Football games that shocked the world! Barcelona, Bayern Munich, PSG, Liverpool, Brazil, Germany and more in video!",
        uploadedBy: "TKHD",
        videoId: "xSsiS304iY8",
        category: "Football",
        thumbnail:
          "https://www.vbetnews.com/wp-content/uploads/2019/12/0_FBL-LIGA-ESP-REAL-MADRID-BARCELONA-1200x900.jpg",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwni9Kb70j90xSwFzQtbjlq4vR4ZC0HB61Wd71sIDiA=s88-c-k-c0x00ffffff-no-rj",
      },

      {
        name: "Magic Moments in Football 2021",
        description:
          "Amazing Skills & Goals by The Best Players! A compilation of best moments of in 2020-2021",
        uploadedBy: "Lorenzo F7",
        category: "Football",
        videoId: "mhp_rF6VRUY",
        thumbnail:
          "https://cdn.bleacherreport.net/images_root/slides/photos/000/124/316/57604885.jpg.13723.0_original.jpg?1260480300",
        avatar:
          "https://yt3.ggpht.com/ytc/AAUvwngLOvyLcHFZdfmT7LoNg_GiAS_vqSp8yKLPXGM8rw=s88-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Hungary 0-3 Portugal | Match 11 | Highlights | UEFA Euro 2020 | 15th June, 2021",
        description:
          "A late Portugal push spearheaded the mercurial Cristiano Ronaldo saw them defeat hosts Hungary 0-3 at the Puskás Aréna. It was with Raphaël Guerreiro 84th-minute goal that the floodgates opened and allowed Ronaldo to get his name on the scoresheet. He scored a penalty to make it 0-2 in the 87th minute before scoring an excellent team goal in the 92nd minute. ",
        uploadedBy: "SonyLIV",
        category: "Football",
        videoId: "Y6jSmKU5OeQ",
        thumbnail:
          "https://images.moneycontrol.com/static-mcnews/2021/06/AP21166648130451-653x435.jpg",
        avatar:
          "https://yt3.ggpht.com/ytc/AKedOLQ-qSLciDHjc-nIeLYLG7pn4t8N9LrilNRN88eRDg=s48-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Lionel Messi - Top 20 Goals of The GOAT - HD",
        description:
          "Fad3nHD Production. The best Lionel Messi goals - great solo goals, runs, free kicks, long range goals and chips. Music: Machinimasound - Battle of Kings Extended",
        uploadedBy: "Fad3nHD",
        category: "Football",
        videoId: "PSanJ5swYBM",
        thumbnail:
          "https://assets.telegraphindia.com/telegraph/2021/May/1621286871_945b04f8-c9be-4512-b966-f0261d648432.gif",
        avatar:
          "https://yt3.ggpht.com/ytc/AKedOLSeqRm68FouCf3HphWifYffA-RS95HKVLT6APD8=s48-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Shroud’s Triumphant Return to CS:GO | Counter-Strike: Global Offensive | Shroud",
        description:
          "This is like when the dad finallly returns after buying milk for 23 years",
        uploadedBy: "Shroud",
        category: "CSGO",
        videoId: "02Wh2gO4Q58",
        thumbnail:
          "https://www.elecspo.com/static/uploads/13/2018/10/playcsgoformoney-1440x810.jpg",
        avatar:
          "https://yt3.ggpht.com/ytc/AKedOLQVPJGz7OrblaKq8e8jSq9g9_IR4C56YpXp4hto7Q=s48-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Smartest PRO CS:GO Plays 2021 (So far)",
        description:
          " Frags by: Aerial , boltz , broky , kyojin , doto , elige , FL1T , gratisfaction , hobbit , k0nfig , Malta , motm , nafany , nickelback , qikert , rain , rez , ropz , s1mple , shakezulla , snax , sonic , stanislaw",
        uploadedBy: "Shroud",
        category: "CSGO",
        videoId: "VJQ0f_12Zek",
        thumbnail:
          "https://www.gameophobic.com/wp-content/uploads/2018/11/MediaHandler.jpg",
        avatar:
          "https://yt3.ggpht.com/ytc/AKedOLRMeR1hY4RHLKW6LCCYCfIjRvLvzoXMg0ZX-l0cyw=s48-c-k-c0x00ffffff-no-rj",
      },


      {
        name: "NaVi vs Gambit - StarLadder CIS 2021 - HIGHLIGHTS l CSGO",
        description:
          "CSGO highlights 2021",
        uploadedBy: "Matz",
        category: "CSGO",
        videoId: "NM9jPO1B-9s",
        thumbnail:
          "https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1612812939",
        avatar:
          "https://yt3.ggpht.com/ytc/AKedOLTc8hNdj_rUKWCyI3YlPjIpMUFV4gl2gj10EIhfqw=s48-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "The Top 10 Greatest Comebacks in CS:GO",
        description:
          "Between the pressure of competing on the big stage, and the tilt that losing round after round puts you in, any comeback is incredibly impressive.",
        uploadedBy: "theScore esports",
        category: "CSGO",
        videoId: "Lh20uOrfRdw",
        thumbnail:
          "https://variety.com/wp-content/uploads/2018/07/csgo-image.png?w=681&h=383&crop=1",
        avatar:
          "https://yt3.ggpht.com/ytc/AKedOLSaMOvjLMq79kPHCat1I7bcdq9Mk1eOIgMPjr2a1Q=s48-c-k-c0x00ffffff-no-rj",
      },

      {
        name: "Halo Infinite | Campaign Gameplay Premiere – 8 Minute Demo",
        description:
          "In Halo Infinite's campaign, the Master Chief returns when humanity's fate hangs in the balance to confront the most ruthless foe he's ever faced – the Banished.",
        uploadedBy: "HALO",
        category: "HALO",
        videoId: "HZtc5-syeAk",
        thumbnail:
          "https://sm.ign.com/ign_in/news/h/halo-infin/halo-infinite-will-support-cross-play-and-cross-progression_1djx.jpg",
        avatar:
          "https://yt3.ggpht.com/ytc/AKedOLQq8edfZB_ohhtEwujMyGUy5uY2CZUPd6qiwXT5eA=s48-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Halo Infinite - Game Overview Trailer | E3 2021",
        description:
          "See new cinematics and gameplay for Halo Infinite  in this developer commentary trailer, revealed at the Xbox & Bethesda Games Showcase E3 2021. ",
        uploadedBy: "IGN",
        category: "HALO",
        videoId: "wDZ-9B6hX5A",
        thumbnail:
          "https://i.gadgets360cdn.com/large/HaloInfinite_XGS_Inline1_1595521834185.jpeg",
        avatar:
          "https://yt3.ggpht.com/JWYn6LAwVbg1BK5SYrvJljq6vWGMzvNfmChHEW_Xw60f6OdJ23GsLld7MFH6ZkgOPk98lAeo=s48-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Halo 4 Gameplay Walkthrough Part 1",
        description:
          "NEW Halo 4 Gameplay Walkthrough Part 1 includes the Prologue and Mission 1: Dawn of the Halo 4 Campaign for Xbox 360. This Halo 4 Gameplay Walkthrough will include a Review, all Missions and the Ending of the Single Player Campaign.",
        uploadedBy: "TheRadBrad",
        category: "HALO",
        videoId: "iTR1VJoJZVQ",
        thumbnail:
          "https://i.pinimg.com/originals/82/cd/18/82cd18f969b29b4eade19f43bdba49ad.jpg",
        avatar:
          "https://yt3.ggpht.com/ytc/AKedOLROJ-u9YcoWU5LzbbiMcsNWDICtcGGXrT7ApSBPFw=s48-c-k-c0x00ffffff-no-rj",
      },
      {
        name: "Halo Infinite Story Trailer | Xbox + Bethesda E3 2021",
        description:
          "Halo: Infinite brings Master Chief back in an open world game for the latest installment of Halo franchise. We see grappling hooks as Master Chief makes his way to discover Cortana is now a rogue AI who has been deleted. After Master Chief and Halo brought massive success Microsft",
        uploadedBy: "GameSpot",
        category: "HALO",
        videoId: "JNhrhYRRUO8",
        thumbnail:
          "https://media.comicbook.com/2021/06/halo-infinite-1272082-1280x0.jpeg",
        avatar:
          "https://yt3.ggpht.com/ytc/AKedOLQJQs26Rq7shdNxGvJGzpEsvDG6WHzmumsFZqgpLuw=s48-c-k-c0x00ffffff-no-rj",
      },
    ]).then((data) =>
      res.json({
        message: "videos added successfully!",
        data,
      })
    );
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
