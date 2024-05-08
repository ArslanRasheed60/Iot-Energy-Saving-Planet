import { COLORS } from "constants/ChartConstant";

export const regionData = [
  {
    color: "#3e82f7",
    name: "United States of America",
    value: "37.61%",
  },
  {
    color: "#04d182",
    name: "Brazil",
    value: "16.79%",
  },
  {
    color: "#ffc542",
    name: "India",
    value: "12.42%",
  },
  {
    color: "#fa8c16",
    name: "China",
    value: "9.85%",
  },
  {
    color: "#ff6b72",
    name: "Malaysia",
    value: "7.68%",
  },
  {
    color: "#a461d8",
    name: "Thailand",
    value: "5.11%",
  },
];

export const pagesViewData = [
  {
    title: "Room",
    amount: 76,
  },
  {
    title: "Dring Room",
    amount: 63,
  },
  {
    title: "Toilet",
    amount: 52,
  },
  {
    title: "Comfort Room",
    amount: 351,
  },
  {
    title: "Bed Room",
    amount: 170,
  },
];

export const sessionColor = [COLORS[3], COLORS[0], COLORS[1]];
export const sessionData = [3561, 1443, 2462];
export const sessionLabels = ["Dasktops", "Tablets", "Mobiles"];
const jointSessionData = () => {
  let arr = [];
  for (let i = 0; i < sessionData.length; i++) {
    const data = sessionData[i];
    const label = sessionLabels[i];
    const color = sessionColor[i];
    arr = [
      ...arr,
      {
        data: data,
        label: label,
        color: color,
      },
    ];
  }
  return arr;
};
export const conbinedSessionData = jointSessionData();

export const socialMediaReferralData = [
  {
    title: "Facebook",
    data: [
      {
        data: [12, 14, 2, 47, 42, 15, 47],
      },
    ],
    percentage: 30.1,
    amount: 322,
  },
  {
    title: "Twitter",
    data: [
      {
        data: [9, 32, 12, 42, 25, 33],
      },
    ],
    percentage: 21.6,
    amount: 217,
  },
  {
    title: "Youtube",
    data: [
      {
        data: [10, 9, 29, 19, 22, 9, 12],
      },
    ],
    percentage: -7.1,
    amount: 188,
  },
  {
    title: "Linkedin",
    data: [
      {
        data: [25, 66, 41, 89, 63, 25, 44],
      },
    ],
    percentage: 11.9,
    amount: 207,
  },
  {
    title: "Dribbble",
    data: [
      {
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
      },
    ],
    percentage: -28.5,
    amount: 86,
  },
];

export const uniqueVisitorsDataDay = {
  series: [
    {
      name: "Stay Duration",
      data: [12, 4, 7, 15],
    },
    {
      name: "Home Visits",
      data: [1, 2, 3, 1],
    },
  ],
  categories: ["12:00 AM", "6:00 AM", "12:00 PM", "6:00 PM"],
};

export const uniqueVisitorsDataWeek = {
  series: [
    {
      name: "Stay Duration",
      data: [45, 52, 38, 24, 33, 26, 21],
    },
    {
      name: "Home Visits",
      data: [15, 11, 12, 12, 13, 14, 12],
    },
  ],
  categories: [
    "01 May",
    "02 May",
    "03 May",
    "04 May",
    "05 May",
    "06 May",
    "07 May",
  ],
};

export const uniqueVisitorsDataMonth = {
  series: [
    {
      name: "Stay Duration",
      data: [135, 141, 162, 142, 113, 118, 129, 125, 131, 115],
    },
    {
      name: "Home Visits",
      data: [45, 52, 38, 24, 33, 26, 21, 15, 20, 16],
    },
  ],
  categories: [
    "03 April",
    "06 April",
    "09 April",
    "12 April",
    "15 April",
    "18 April",
    "21 April",
    "24 April",
    "27 April",
    "30 April",
  ],
};
