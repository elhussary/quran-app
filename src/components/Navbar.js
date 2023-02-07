import React, { useEffect, useState } from "react";
import {
  IoHomeOutline,
  IoLogoGithub,
  IoNotificationsOutline,
  IoSunnySharp,
  IoMoonSharp,
} from "react-icons/io5";
const Navbar = () => {
  const [scrollbtn, setScrollbtn] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    var themeToggleLightIcon = document.getElementById(
      "theme-toggle-light-icon"
    );

    // Change the icons inside the button based on previous settings
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      themeToggleLightIcon.classList.remove("hidden");
    } else {
      themeToggleDarkIcon.classList.remove("hidden");
    }

    var themeToggleBtn = document.getElementById("theme-toggle");

    themeToggleBtn.addEventListener("click", function () {
      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle("hidden");
      themeToggleLightIcon.classList.toggle("hidden");

      // if set via local storage previously
      if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        }
      }
    });
  }, []);
  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      setScrollbtn(true);
    } else {
      setScrollbtn(false);
    }
  }
  return (
    <nav className="flex justify-between items-center fixed w-full z-10 bg-gray-50 dark:bg-neutral-800 border-b dark:border-neutral-700 p-1.5 top-0 left-0">
      {scrollbtn && (
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bg-gray-50 hover:bg-gray-100 p-2.5 bottom-32 right-5 text-black dark:text-white  dark:bg-neutral-700 dark:hover:bg-neutral-800 z-10 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 11l7-7 7 7M5 19l7-7 7 7"
            ></path>
          </svg>
        </div>
      )}
      <div>
        <form method="POST" className="w-full">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute top-2 left-3 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={(e) => {
                e.target.nextSibling.classList.toggle("invisible");
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for reciter,surah"
              className="w-60 md:w-96 invisible rounded-md p-2.5 dark:bg-neutral-700 dark:text-white text-sm pl-9 border-none focus:ring-0"
            />
          </div>
        </form>
      </div>
      <div>
        <ul className="flex">
          <li className="mr-3 cursor-pointer">
            <IoNotificationsOutline size={25} className="dark:text-teal-300" />
          </li>
          <li className="mr-3 cursor-pointer">
            <IoHomeOutline size={25} className="dark:text-teal-300" />
          </li>
          <li className="mr-3 cursor-pointer" id="theme-toggle">
            <IoSunnySharp
              size={25}
              id="theme-toggle-dark-icon"
              className="hidden dark:text-teal-300"
            />
            <IoMoonSharp
              size={25}
              id="theme-toggle-light-icon"
              className="hidden dark:text-teal-300"
            />
          </li>
          <li className="mr-3  cursor-pointer">
            <IoLogoGithub size={25} className="dark:text-teal-300" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
