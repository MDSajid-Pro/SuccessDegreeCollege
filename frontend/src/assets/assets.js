import cross_icon from "./cross_icon.svg";
import menu_icon from "./menu_icon.svg";
import logo2 from "./logo.png";
import hero_image from "./hero_image.jpg";
import about_image from "./about_image.jpg";
import principal from "./Principal.jpg";
import home_icon from "./home_icon.svg";
import add_icon from "./add_icon.svg";
import list_icon from "./list_icon.svg";
import comment_icon from "./comment_icon.svg";
import tick_icon from "./tick_icon.svg"
import bin_icon from "./bin_icon.svg"
import upload_area from './upload_area.svg'

export const assets = {
  cross_icon,
  menu_icon,
  logo2,
  hero_image,
  about_image,
  principal,
  home_icon,
  add_icon,
  list_icon,
  comment_icon,
  tick_icon,
  bin_icon,
  upload_area
};


export const menuItems = [
  {
    label: "HOME", to: "/"
  },
  {
    label: "ABOUT",
    subLinks: [
      { label: "Our Mission", to: "/mission" },
      { label: "Principal Message", to: "/principal" },
    ],
  },
  {
    label: "ACADAMICS",
    subLinks: [
      { label: "Our Faculty", to: "/faculty" },
      { label: 'Academic Results', to: '/result'}
    ],
  },
  {
    label: "ADMISSION",
    subLinks: [
      { label: 'Online Admission', to: '/admission' },
      { label: 'Admission Details', to: '/admissionDetails' }
    ],
  },
  {
    label: "PASSOUT STUDENTS LIST",
    subLinks: [
      { label: 'Student List 2023-2024', to: '#'},
      { label: 'Student List 2024-2025', to: '#' },
      { label: 'Student List 2025-2026', to: '#'}
    ]
  },
  { label: "CONTACT", to: "/contact" },
];