import cross_icon from './cross_icon.svg'
import menu_icon from './menu_icon.svg'
import logo2 from './logo.png'
import hero_image from './hero_image.jpg'
import about_image from './about_image.jpg'
import bg_video from './bg_video.mp4'
import principal from './Principal.jpg'
import admin from './4574122.jpg'
import clab from './Chemistry_lab.jpeg'
import office from './Office.jpeg'
import photo from './Photo.jpeg'

export const assets = {
    cross_icon,
    menu_icon,
    logo2,
    hero_image,
    about_image,
    principal,
    bg_video,
    admin
}

// src/assets/assets.js

export const galleryImages = [
    photo,
    office,
    clab,
    principal,
    hero_image,
    about_image,
    principal,
    hero_image,
    about_image,
];

// assets.js or ../assets/assets.js

export const facultyList = [
  {
    name: "Miss Nayer Fatima",
    title: "Professor",
    department: "Botany",
    course: "B.sc",
    image: "/faculty/ayesha.jpg",
    bio: "Dr. Ayesha Khan is a renowned expert in Plant Taxonomy with 15+ years of teaching and research experience.",
  },
  {
    name: "Miss Madiha Fatima",
    title: "Professor",
    department: "Zoology",
    course: "B.sc",
    image: "/faculty/ayesha.jpg",
    bio: "Dr. Ayesha Khan is a renowned expert in Plant Taxonomy with 15+ years of teaching and research experience.",
  },
  {
    name: "Mr. Rajeev Verma",
    title: "Assistant Professor",
    department: "Commerce",
    course: "B.Com",
    image: "/faculty/rajeev.jpg",
    bio: "Specializes in Financial Accounting and Business Law with hands-on experience in corporate consulting.",
  },
  {
    name: "Mr. Rajeev Verma",
    title: "Assistant Professor",
    department: "Commerce",
    course: "B.Com",
    image: "/faculty/rajeev.jpg",
    bio: "Specializes in Financial Accounting and Business Law with hands-on experience in corporate consulting.",
  },
  {
    name: "Mr. Rajeev Verma",
    title: "Assistant Professor",
    department: "Commerce",
    course: "B.Com",
    image: "/faculty/rajeev.jpg",
    bio: "Specializes in Financial Accounting and Business Law with hands-on experience in corporate consulting.",
  },
];


export const menuItems = [
    { label: "HOME", to: "/" },
    {
      label: "ABOUT",
      subLinks: [
        { label: "Our Mission", to: "/mission" },
        { label: "Principal Message", to: "/principal" },
      ],
    },
    {
      label: "COURSES",
      subLinks: [
        { label: "B.A", to: "#" },
        { label: "B.Sc", to: "#" },
        { label: "B.Com", to: "#" },
        { label: "BCA", to: "#" },
      ],
     },
    {
      label: "ACADAMICS",
      subLinks: [
        { label: "Our Faculty", to: "/faculty" },
        { label: "Exam Time Table", to: "#" },
        { label: "Exam Result", to: "#" },
      ],
    },
    {
        label: "ONLINE ADMISSION", to: '/admission'
    },
    { label: "CONTACT", to: "/contact" },
  ];
