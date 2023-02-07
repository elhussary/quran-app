import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import Navbar from "./components/Navbar";
import {
  IoPlaySharp,
  IoVolumeMediumSharp,
  IoPauseSharp,
  IoCloudDownloadSharp,
  IoVolumeMuteSharp,
  IoVolumeHighSharp,
  IoTimeSharp,
} from "react-icons/io5";
import _ from "lodash";
import axios from "axios";
import Suras from "./Data/Suras";
import Reciter from "./Data/Reciter";
import Reciters from "./components/Main/Reciters";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

function App() {
  const audioPlayer = useRef();
  const [id, setId] = useState("133");
  const [currentreciter, setCurrentreciter] = useState(
    "https://www.sqorebda3.com/vb/Photo/new_1421857851_932.jpg"
  );
  const [currentsurah, setCurrentsurah] = useState("The Opener");
  const [currentarsurah, setCurrentarsurah] = useState("الفاتحة");
  const [duration, setDuration] = useState(0);
  const [prayer, setPrayertimes] = useState([]);
  let today = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const [reciter, setReciter] = useState(Reciter);
  const [isplaying, setIsplaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [val, setVal] = useState(3); //volume
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0); // progress bar
  const [current, setCurrent] = useState(
    "https://server12.mp3quran.net/maher/Almusshaf-Al-Mojawwad/001.mp3"
  ); // current audio

  //
  useEffect(() => {
    // Fetch API
    axios
      .get(`https://qurani-api.herokuapp.com/api/reciters/${id}`)
      .then(function (response) {
        // handle success
        setReciter(response.data.surasData);
        setCurrent(response.data.surasData[0].url);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    // Fetch API
    axios
      .get(`https://api.pray.zone/v2/times/day.json?city=Cairo&date=${date}`)
      .then(function (response) {
        // handle success
        setPrayertimes(response.data.results.datetime);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (isplaying) {
      audioPlayer.current.play();
    }
  }, [current]);
  useEffect(() => {
    if (seekValue == 100) {
      setIsplaying(false);
    }
  }, [seekValue]);
  const onPlaying = () => {
    setDuration(audioPlayer.current.duration);
    setCurrentTime(audioPlayer.current.currentTime);
    if (audioPlayer.current.currentTime && audioPlayer.current.duration > 0) {
      setSeekValue(
        (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
      );
    }
  };
  const onLoaded = () => {
    setDuration(audioPlayer.current.duration);
    audioPlayer.current.volume = val / 100;
  };
  const onChangeVolume = () => {
    if (val == 0) {
      setMuted(true);
      audioPlayer.current.muted = true;
    } else {
      setMuted(false);
      audioPlayer.current.muted = false;
    }
  };
  function formatDuration(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }

  return (
    <>
      <div className="p-4">
        <Navbar />
        <div className="flex justify-between pt-12 pb-24">
          <audio
            src={current}
            ref={audioPlayer}
            onTimeUpdate={onPlaying}
            onVolumeChange={onChangeVolume}
            onLoadedMetadata={onLoaded}
          ></audio>
          <div className="w-full">
            <table className="text-center w-full text-sm">
              <thead className="text-teal-600 dark:text-teal-300">
                <tr>
                  <th className="px-2 py-3 ">#</th>
                  <th className="px-2 py-3">Surah</th>
                  <th className="px-2 py-3 ">Play</th>
                  <th className="px-2 py-3 ">Download</th>
                </tr>
              </thead>
              <tbody>
                {_.zip(Suras, reciter).map((element) => {
                  return (
                    <tr
                      key={element[0].index}
                      className={
                        current == element[1].url
                          ? "bg-teal-600 cursor-pointer text-white"
                          : " cursor-pointer"
                      }
                      onDoubleClick={() => {
                        setCurrent(element[1].url);
                        setIsplaying(true);
                        audioPlayer.current.play();
                        setCurrentsurah(element[0].ename);
                        setCurrentarsurah(element[0].name);
                      }}
                    >
                      <th>
                        <p>{element[0].index}</p>
                      </th>
                      <td>
                        <div className="flex items-center justify-center">
                          <h3 className="font-bold ">
                            {element[0].ename} ( {element[0].name} )
                          </h3>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            if (isplaying) {
                              if (current === element[1].url) {
                                setIsplaying(false);
                                audioPlayer.current.pause();
                              } else if (current != element[1].url) {
                                setCurrent(element[1].url);
                                audioPlayer.current.play();
                              }
                            } else {
                              setIsplaying(true);
                              setCurrent(element[1].url);
                              audioPlayer.current.play();
                            }
                          }}
                        >
                          {current == element[1].url ? (
                            isplaying ? (
                              <IoPauseSharp size={20} />
                            ) : (
                              <IoPlaySharp size={20} />
                            )
                          ) : (
                            <IoPlaySharp size={20} />
                          )}
                        </button>
                      </td>
                      <td>
                        <button>
                          <a href={element[1].url} download>
                            <IoCloudDownloadSharp size={20} />
                          </a>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="w-96 hidden md:block ml-2">
            <h1 className="text-xl font-bold mb-3">
              Prayer Times (مواعيد الصلاة)
            </h1>
            {prayer.map((element, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between bg-teal-600 dark:bg-transparent p-1.5 rounded-lg text-white mb-2">
                    <div className="flex items-center mr-5">
                      <div>
                        <p className="">Fajr</p>
                        <p className="text-sm dark:text-gray-200">الفجر</p>
                      </div>
                    </div>
                    <div className="flex space-x-6 items-center">
                      <p className="text-sm">{element.times.Fajr}</p>
                      <button className="bg-teal-500 text-white p-1 w-8 h-8 rounded-b-sm rounded-r-lg">
                        <IoTimeSharp size={25} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between dark:bg-transparent bg-teal-600 p-1.5 rounded-lg text-white mb-2">
                    <div className="flex items-center mr-5">
                      <div>
                        <p className="">Dhuhr</p>
                        <p className="text-sm dark:text-gray-200">الظهر</p>
                      </div>
                    </div>
                    <div className="flex space-x-6 items-center">
                      <p className="text-sm">{element.times.Dhuhr}</p>
                      <button className="bg-teal-500 text-white p-1 w-8 h-8 rounded-b-sm rounded-r-lg">
                        <IoTimeSharp size={25} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between dark:bg-transparent bg-teal-600 p-1.5 rounded-lg text-white mb-2">
                    <div className="flex items-center mr-5">
                      <div>
                        <p className="">Asr</p>
                        <p className="text-sm dark:text-gray-200">العصر</p>
                      </div>
                    </div>
                    <div className="flex space-x-6 items-center">
                      <p className="text-sm">{element.times.Asr}</p>
                      <button className="bg-teal-500 text-white p-1 w-8 h-8 rounded-b-sm rounded-r-lg">
                        <IoTimeSharp size={25} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between dark:bg-transparent bg-teal-600 p-1.5 rounded-lg text-white mb-2">
                    <div className="flex items-center mr-5">
                      <div>
                        <p className="">Maghrib</p>
                        <p className="text-sm dark:text-gray-200">المغرب</p>
                      </div>
                    </div>
                    <div className="flex space-x-6 items-center">
                      <p className="text-sm">{element.times.Maghrib}</p>
                      <button className="bg-teal-500 text-white p-1 w-8 h-8 rounded-b-sm rounded-r-lg">
                        <IoTimeSharp size={25} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between dark:bg-transparent bg-teal-600 p-1.5 rounded-lg text-white mb-2">
                    <div className="flex items-center mr-5">
                      <div>
                        <p className="">Isha</p>
                        <p className="text-sm dark:text-gray-200">العشاء</p>
                      </div>
                    </div>
                    <div className="flex space-x-6 items-center">
                      <p className="text-sm">{element.times.Isha}</p>
                      <button className="bg-teal-500 text-white p-1 w-8 h-8 rounded-b-sm rounded-r-lg">
                        <IoTimeSharp size={25} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-5 ">
              <h1 className="text-xl font-bold">Top Reciters</h1>
              <Reciters setId={setId} setCurrentreciter={setCurrentreciter} />
            </div>
          </div>
        </div>
        <footer className="w-full bg-gray-50 dark:bg-neutral-900 p-6 fixed bottom-0 left-1 z-10 rounded-lg">
          <div className="flex justify-around flex-wrap-reverse md:flex-nowrap">
            <div className="flex items-center mr-2 ">
              <img
                src={currentreciter}
                alt=""
                className="rounded-full mr-2 object-cover w-9 h-9 md:w-11 md:h-11 "
              />
              <div>
                <p className="text-sm ">{currentsurah}</p>
                <p className="text-sm text-gray-400">{currentarsurah}</p>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <ul className="flex items-center">
                <li
                  className="cursor-pointer text-white w-9 h-9 rounded-l-sm rounded-r-lg bg-teal-500 flex justify-center items-center"
                  title="Start"
                  onClick={() => {
                    const PrevValue = isplaying;
                    if (!PrevValue) {
                      setIsplaying(true);
                      audioPlayer.current.play();
                    } else {
                      setIsplaying(false);
                      audioPlayer.current.pause();
                    }
                  }}
                >
                  {isplaying ? (
                    <IoPauseSharp size={26} />
                  ) : (
                    <IoPlaySharp size={26} />
                  )}
                </li>
              </ul>
            </div>
            <div className="flex  items-center space-x-2 order-1 sm:order-none md:order-none ">
              <p className="text-xs">{formatDuration(currentTime)}</p>
              <input
                type="range"
                value={seekValue}
                max={100}
                className=" rounded-lg w-60 md:w-72 lg:w-96 overflow-hidden appearance-none bg-gray-400 h-2.5 "
                onChange={(e) => {
                  const progressBar =
                    audioPlayer.current.duration * (+e.target.value / 100);
                  audioPlayer.current.currentTime = progressBar;
                  setSeekValue(e.target.value);
                }}
              />
              <p className="text-xs">{formatDuration(duration)}</p>
            </div>
            <div className="flex items-center ">
              <button className="text-gray-500 mr-3">
                {muted ? (
                  <IoVolumeMuteSharp size={20} />
                ) : val > 30 ? (
                  <IoVolumeHighSharp size={20} />
                ) : (
                  <IoVolumeMediumSharp size={20} />
                )}
              </button>
              <input
                type="range"
                value={val}
                min={0}
                max={100}
                onChange={(e) => {
                  setVal(e.target.value);
                  audioPlayer.current.volume = e.target.value / 100;
                }}
                className="h-2.5 w-14 md:w-36 overflow-hidden appearance-none bg-gray-400 rounded-lg"
              ></input>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
