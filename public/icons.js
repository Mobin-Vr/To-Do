import React from 'react';

// UserRoundCog Icon

export const UserRoundCog = ({ size = 20, color = '#586570' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='1'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-user-round-cog'
   >
      <path d='M2 21a8 8 0 0 1 10.434-7.62' />
      <circle cx='10' cy='8' r='5' />
      <circle cx='18' cy='18' r='3' />
      <path d='m19.5 14.3-.4.9' />
      <path d='m16.9 20.8-.4.9' />
      <path d='m21.7 19.5-.9-.4' />
      <path d='m15.2 16.9-.9-.4' />
      <path d='m21.7 16.5-.9.4' />
      <path d='m15.2 19.1-.9.4' />
      <path d='m19.5 21.7-.4-.9' />
      <path d='m16.9 15.2-.4-.9' />
   </svg>
);

// Settings Icon
export const SettingsIcon = ({ size = 20, color = '#586570' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='1'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-settings'
   >
      <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
      <circle cx='12' cy='12' r='3' />
   </svg>
);

// RefreshCw Icon
export const RefreshCw = ({ size = 20, color = '#586570' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='1'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-refresh-cw'
   >
      <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
      <path d='M21 3v5h-5' />
      <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
      <path d='M8 16H3v5' />
   </svg>
);

// Menu Icon
export const MenuIcon = ({ size = 26, color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path d='M5 6.5H19V8H5V6.5Z' fill={color}></path>
      <path d='M5 16.5H19V18H5V16.5Z' fill={color}></path>
      <path d='M5 11.5H19V13H5V11.5Z' fill={color}></path>
   </svg>
);

// Chevron Icon
export const ChevronIcon = ({ size = 13, color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path d='M7 15L12 20L17 15M7 9L12 4L17 9' stroke={color}></path>
   </svg>
);

// Sun Icon
export const SunIcon = ({ size = 20, color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <circle cx='12' cy='12' r='6' stroke={color}></circle>
      <path d='M12 2V3' stroke={color}></path>
      <path d='M12 21V22' stroke={color}></path>
      <path d='M22 12L21 12' stroke={color}></path>
      <path d='M3 12L2 12' stroke={color}></path>
      <path d='M19.0708 4.92969L18.678 5.32252' stroke={color}></path>
      <path d='M5.32178 18.6777L4.92894 19.0706' stroke={color}></path>
      <path d='M19.0708 19.0703L18.678 18.6775' stroke={color}></path>
      <path d='M5.32178 5.32227L4.92894 4.92943' stroke={color}></path>
   </svg>
);

// Infinity Icon
export const InfinityIcon = ({ size = 20, color = '#c5514c' }) => (
   <svg
      fill={color}
      width={size}
      height={size}
      viewBox='0 0 256 256'
      id='Flat'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path d='M248,128a55.99955,55.99955,0,0,1-95.59766,39.59766q-.17137-.17139-.332-.35254L92.11963,99.55225a40,40,0,1,0,0,56.8955l8.519-9.61914a8,8,0,1,1,11.97754,10.6084l-8.68652,9.80811q-.16041.1809-.332.35254a56,56,0,1,1,0-79.19532q.17137.17139.332.35254l59.95068,67.69287a40,40,0,1,0,0-56.8955l-8.519,9.61914A8,8,0,0,1,143.38379,98.563l8.68652-9.80811q.16041-.1809.332-.35254A56,56,0,0,1,248,128Z'></path>
   </svg>
);

// Home Icon
export const HomeIcon = ({ size = '20px', color = '#4270b1' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M12 3.1875L21.4501 10.275L21.0001 11.625H20.25V20.25H3.75005V11.625H3.00005L2.55005 10.275L12 3.1875ZM5.25005 10.125V18.75H18.75V10.125L12 5.0625L5.25005 10.125Z'
         fill={color}
      ></path>
   </svg>
);

// Plus Icon
export const PlusIcon = ({ size = '21px', color = '#000000' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path d='M4 12H20M12 4V20' stroke={color}></path>
   </svg>
);

// Circle Icon
export const CircleIcon = ({ size = '20px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         id='Vector'
         d='M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z'
         stroke={color}
      ></path>
   </svg>
);

// Tick Circle Icon
export const TickCircleIcon = ({ size = '20px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         id='Vector'
         d='M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z'
         stroke={color}
      ></path>
   </svg>
);

// Completed Circle Icon
export const CompletedIcon = ({ size = '20px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 1024 1024'
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
   >
      <path
         fill={color}
         d='M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z'
      ></path>
   </svg>
);

// Magnifier Icon
export const MagnifierIcon = ({ size = '10px', color = '#586570' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
      height={size}
      width={size}
      viewBox='0 0 512 512'
      stroke={color}
   >
      <path d='M508.255,490.146l-128-128c-0.06-0.06-0.137-0.077-0.196-0.128c34.193-38.434,55.142-88.917,55.142-144.418 c0-120.175-97.425-217.6-217.6-217.6S0.001,97.425,0.001,217.6s97.425,217.6,217.6,217.6c55.501,0,105.975-20.949,144.418-55.151 c0.06,0.06,0.077,0.137,0.128,0.196l128,128c2.5,2.509,5.777,3.755,9.054,3.755s6.554-1.246,9.054-3.746 C513.247,503.253,513.247,495.147,508.255,490.146z M217.601,409.6c-105.865,0-192-86.135-192-192s86.135-192,192-192 s192,86.135,192,192S323.466,409.6,217.601,409.6z'></path>
   </svg>
);

// X Icon
export const XIcon = ({ size = '16px', color = '#000000' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
   >
      <path stroke={color} d='M12 12 6 6m6 6 6 6m-6-6 6-6m-6 6-6 6'></path>
   </svg>
);

// Dot Icon
export const DotIcon = ({ size = '12px', color = '#586570' }) => (
   <svg
      fill={color}
      height={size}
      width={size}
      id='Layer_1'
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      stroke={color}
   >
      <path d='M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z'></path>
   </svg>
);

// Trash Icon
export const TrashIcon = ({ size = '16px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17'
         stroke={color}
      ></path>
   </svg>
);

// Star Icon
export const StarIcon = ({ size = '14px', color = '#000000' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 64 64'
      enableBackground='new 0 0 64 64'
      fill={color}
      stroke={color}
   >
      <path
         fill='#231F20'
         d='M32.001,2.484c0.279,0,0.463,0.509,0.463,0.509l8.806,18.759l20.729,3.167L47,40.299L50.541,62 l-18.54-10.254L13.461,62l3.541-21.701L2.003,24.919l20.729-3.167L31.53,3.009C31.53,3.009,31.722,2.484,32.001,2.484 M32.001,0.007 c-0.775,0-1.48,0.448-1.811,1.15l-8.815,18.778L1.701,22.941c-0.741,0.113-1.356,0.632-1.595,1.343 c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657l-3.378,20.704c-0.124,0.756,0.195,1.517,0.822,1.957 C12.653,63.877,13.057,64,13.461,64c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25 c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657 c0.523-0.537,0.703-1.321,0.465-2.031c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.812,1.157 C33.481,0.455,32.776,0.007,32.001,0.007L32.001,0.007z'
      ></path>
   </svg>
);

// Full Star Icon
export const FullStarIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 64 64'
      enableBackground='new 0 0 64 64'
      fill={color}
      strokeWidth='0.4'
   >
      <path
         fill={color}
         d='M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15 C33.479,0.448,32.773,0,31.998,0s-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343 c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957 c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25 c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657 C63.951,25.771,64.131,24.987,63.893,24.277z'
      ></path>
   </svg>
);

// Arrow Icon
export const ArrowIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         stroke={color}
         strokeWidth='2.4'
         strokeMiterlimit='10'
         strokeLinecap='round'
         strokeinejoin='round'
         d='M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008'
      ></path>
   </svg>
);

// Clock Icon
export const ClockIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 1024.00 1024.00'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
      stroke={color}
   >
      <path
         d='M176.8 983.2c-4.8 0-9.6-1.6-13.6-5.6-8.8-7.2-9.6-20.8-2.4-30.4l80-93.6-4.8-4C135.2 768.8 77.6 648 77.6 519.2c0-49.6 8.8-98.4 24.8-144.8l1.6-4-3.2-2.4C62.4 338.4 40 293.6 40 245.6c0-84.8 68.8-153.6 153.6-153.6 42.4 0 81.6 16.8 110.4 46.4l3.2 3.2 4-1.6c60-31.2 127.2-47.2 195.2-47.2 68.8 0 138.4 17.6 200.8 50.4l4 2.4 3.2-3.2c28.8-31.2 69.6-49.6 112.8-49.6 84.8 0 153.6 68.8 153.6 153.6 0 51.2-25.6 99.2-68 128l-4 2.4 1.6 4c15.2 44.8 23.2 91.2 23.2 140 0 129.6-57.6 250.4-158.4 331.2l-4.8 3.2 78.4 93.6c4 4 5.6 9.6 4.8 15.2-0.8 5.6-3.2 11.2-8 15.2-4 3.2-8.8 4.8-14.4 4.8-6.4 0-12-2.4-16.8-7.2l-81.6-96-4 2.4c-68 41.6-145.6 64-224.8 64-80 0-157.6-22.4-224.8-64l-4-2.4-82.4 96.8c-4 2.4-10.4 5.6-16 5.6zM505.6 134.4c-212 0-384 172-384 384s172 384 384 384 384-172 384-384-172.8-384-384-384z m320 0c-27.2 0-52.8 9.6-72.8 28l-5.6 4.8 5.6 4c56.8 40.8 103.2 95.2 134.4 157.6l3.2 6.4 5.6-4.8c25.6-20.8 40-52 40-84.8 0-61.6-49.6-111.2-110.4-111.2z m-631.2 0c-60.8 0-110.4 49.6-110.4 110.4 0 30.4 12 58.4 33.6 79.2l5.6 5.6 3.2-6.4c32-61.6 79.2-116 136.8-155.2l6.4-4-5.6-4.8c-20-16-44.8-24.8-69.6-24.8z'
         fill=''
      ></path>
      <path
         d='M504.8 540c-12 0-21.6-9.6-21.6-21.6V269.6c0-12 9.6-21.6 21.6-21.6s21.6 9.6 21.6 21.6v227.2h212c12 0 21.6 9.6 21.6 21.6 0 12-9.6 21.6-21.6 21.6H504.8z'
         fill=''
      ></path>
   </svg>
);

// Repeat Icon
export const RepeatIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill={color}
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 58.778 58.778'
      stroke={color}
   >
      <path d='M39.389,48.229h-29V11.186l6.682,6.682c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293 c0.391-0.391,0.391-1.023,0-1.414l-8.389-8.389c-0.391-0.391-1.023-0.391-1.414,0l-8.389,8.389c-0.391,0.391-0.391,1.023,0,1.414 s1.023,0.391,1.414,0l6.682-6.682v38.043c0,0.552,0.448,1,1,1h30c0.552,0,1-0.448,1-1S39.941,48.229,39.389,48.229z'></path>
      <path d='M58.485,40.91c-0.391-0.391-1.023-0.391-1.414,0l-6.682,6.682V9.229c0-0.552-0.448-1-1-1h-30c-0.552,0-1,0.448-1,1 c0,0.552,0.448,1,1,1h29v37.364l-6.682-6.682c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l8.389,8.389 c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l8.389-8.389C58.876,41.934,58.876,41.301,58.485,40.91z'></path>
   </svg>
);

// Calendar Icon
export const CalendarIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M3 9H21M17 13.0014L7 13M10.3333 17.0005L7 17M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z'
         stroke={color}
         strokeWidth='0.9600000000000002'
         strokeLinecap='round'
         strokeLinejoin='round'
      ></path>
   </svg>
);

// Calendar Icon
export const PaperClipIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill={color}
      width={size}
      height={size}
      viewBox='0 0 1920 1920'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M1752.768 221.109C1532.646.986 1174.283.986 954.161 221.109l-838.588 838.588c-154.052 154.165-154.052 404.894 0 558.946 149.534 149.421 409.976 149.308 559.059 0l758.738-758.626c87.982-88.094 87.982-231.417 0-319.51-88.32-88.208-231.642-87.982-319.51 0l-638.796 638.908 79.85 79.849 638.795-638.908c43.934-43.821 115.539-43.934 159.812 0 43.934 44.047 43.934 115.877 0 159.812l-758.739 758.625c-110.23 110.118-289.355 110.005-399.36 0-110.118-110.117-110.005-289.242 0-399.247l838.588-838.588c175.963-175.962 462.382-176.188 638.909 0 176.075 176.188 176.075 462.833 0 638.908l-798.607 798.72 79.849 79.85 798.607-798.72c220.01-220.123 220.01-578.485 0-798.607'
         fillRule='evenodd'
      ></path>
   </svg>
);
