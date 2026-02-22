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
import img from './img.jpg'

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
      { label: "Chairman Message", to: '#' },
      { label: "Approvals & Affiliation", to: '#' },
      { label: "Governing Council (GC)", to: '#' },
    ],
  },
  {
    label: "ADMINISTRATION",
    subLinks: [
      { label: "Administration", to: "#" },
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
      { label: "Our Faculty", to: "/faculty" },
      { label: 'Academic Results', to: '/result' },
      {
        label: 'Time Table', subLinks: [
          { label: 'B.A.', to: 'https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_5a080978caa54c829472d5cf26f615fb.pdf',newTab: true},
          { label: 'B.Sc.', to: 'https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_06e59c53ca194cf791a44948ee178644.pdf',newTab: true},
          { label: 'B.Com.', to: 'https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_da51bea7a68e42548a30d165a3b16b38.pdf',newTab: true},
          { label: 'BCA.', to: 'https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_ab08d55231b8498986dc39752c649267.pdf',newTab: true}
      ]},
      {
    label: "Syllabus",
    subLinks: [
      {
        label: 'Bachelor of Computer Application (BCA)', subLinks: [
          { label: "1st & 2nd Semester", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_d0dbdab7c70c408880341665f81ecff1.pdf",newTab: true },
          { label: "3rd & 4th Semester", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_2b19870a54c441bdb61691929bc10214.pdf",newTab: true  },
        ]
      },
      {
        label: 'Bachelor of Science (B.Sc.)', subLinks: [
          { label: "Physics", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_5ae127a71fdd4833b331787814f41fbc.pdf",newTab: true  },
          { label: "Zoology", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_7951d3531f424591934154d2ea5e3a26.pdf",newTab: true  },
          { label: "Mathematics", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_501186005bab4d1d9167fc30f8237f3c.pdf",newTab: true  },
          { label: "Chemistry", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_452c43e6f0ec40c8b8776d94974d8f11.pdf",newTab: true  },
          { label: "Botany", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_7617374e61924456832aa3ce9a4f614f.pdf",newTab: true  },
          { label: "Computer Science", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_54a4ade334304fd9b8cf8857e4f24fff.pdf",newTab: true  }
        ]
      },
      {
        label: 'Bachelor of Arts (B.A.)', subLinks: [
          { label: "History", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_c749882d462446969e14be7f7f93fb7a.pdf",newTab: true  },
          { label: "Political Science", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_f0df416baae14f88b2761a7f097db6d3.pdf",newTab: true  },
          { label: "Sociology", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_565720068d1b4634bcba0056a90590e9.pdf",newTab: true  },
          { label: "Economics", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_2618c98bac004424bedfa6cb176331a8.pdf",newTab: true },
          { label: "English", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_23290bf85e62495cb6303c9b823bc6d4.pdf",newTab: true  },
          { label: "Kannada", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_6fcf87b6579f4d669137fde45fd06975.pdf",newTab: true  },
          { label: "Hindi", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_5b3332cdbd8747a7a5ee8ccdd119ec4a.pdf",newTab: true  },
          { label: "Urdu", to: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_3210e6776f984e41a04db6ffe86b4636.pdf",newTab: true  },
        ]
      },
      {label: 'Bachelor of Commerce (B.Com.)', to: 'https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_177e9df6df4645a395bd790ae077224a.pdf',newTab: true }
    ],
  }
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
      { label: 'Online Admission', to: '/admission' },
      { label: 'Admission Details', to: '/admissionDetails' }
    ],
  },
  {
    label: "LIBRARY", subLinks: [
    { label: 'About Library', to: '#' }
    ]
  },
  {
    label: "AICTE", subLinks: [
    {label: 'Approvals', to:'https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_a930729474894e0494df07d747402163.pdf',newTab: true }
  ] },
  { label: "CONTACT", to: "/contact" },
];