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
export const TrashIcon = ({ size = '16px', color = '#000000' }) => (
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
