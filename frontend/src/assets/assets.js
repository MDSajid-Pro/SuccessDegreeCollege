import cross_icon from "./cross_icon.svg";
import menu_icon from "./menu_icon.svg";
import logo2 from "./logo.png";
import hero_image from "./hero_image.jpg";
import about_image from "./about_image.jpg";
import principal from "./Principal.png";
import home_icon from "./home_icon.svg";
import add_icon from "./add_icon.svg";
import list_icon from "./list_icon.svg";
import comment_icon from "./comment_icon.svg";
import tick_icon from "./tick_icon.svg"
import bin_icon from "./bin_icon.svg"
import upload_area from './upload_area.svg'
import Banner from './Banner.png'
import Face from './face.png'
import Aliya from './Aliya-Anjum.png'
import img from './Img.jpg'

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
  upload_area,
  Banner,
  Face,
  Aliya,
  img
};


export const menuItems = [
  {
    label: "HOME", to: "/"
  },
  {
    label: "ABOUT US",
    subLinks: [
      { label: "Mission & Vission", to: "/mission" },
      { label: "Principal Message", to: '/principal' },
      { label: "Awards & Achievements", to: '#' },
      { label: "Chairman Message", to: '/chairman-message' },
      { label: "Approvals & Affiliation", to: '/approval-affiliation' },
    ],
  },
  {
    label: "ADMINISTRATION",
    subLinks: [
      { label: "Organization Structure", to: 'https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_3a8e12745ed54899b2579d7f55d09f40.pdf',newTab: true  },
      {
        label: "Faculty", subLinks: [
          { label: "Teaching Staff", to: "/teaching-staff" },
          { label: "Non Teaching Staff", to: "/non-teaching-staff" },
          {label: "Administrative Staff", to: "/administrative-staff"}
      ] },
    ],
  },
  {
    label: "ACADAMICS",
    subLinks: [
      { label: 'Academic Results', to: '/result' },
      { label: 'University Rank Holders', to: '/topper' },
      { label: 'Syllabus', to: '/syllabus' }
    ],
  },
  {
    label: "STUDENT CORNER", 
    subLinks: [
      { label: 'Grievance Redressal', to: '#' },
      {
        label: 'Committees', subLinks: [
          { label: 'Anti Ragging Cell', to: '#' },
          { label: 'Internal Complaint Committee (ICC)', to: '#' },
          { label: 'SC/ST/OBC Cell', to: '#' }
      ]}
    ],
   },
  {
    label: "ADMISSION",
    subLinks: [
      { label: 'Online Admission', to: 'https://uucms.karnataka.gov.in/Login/CandidateRegistration',newTab: true },
      { label: 'Admission Details', to: '/admissionDetails' }
    ],
  },
  {
    label: "LIBRARY", subLinks: [
      { label: 'About Library', to: '/library' }
    ]
  },
  { label: "CONTACT", to: "/contact" },
];