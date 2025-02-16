import React from 'react';

// UserRoundCog Icon
export const UserRoundCog = ({ size = 20, color = 'currentColor' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
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
export const SettingsIcon = ({ size = 20, color = 'currentColor' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='1.4'
      strokeLinecap='round'
      strokeLinejoin='round'
   >
      <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
      <circle cx='12' cy='12' r='3' />
   </svg>
);

// SyncIcon Icon
export const SyncIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-label=''
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M16.5 6.67a.5.5 0 01.3.1l.08.07.01.02A5 5 0 0113.22 15L13 15H6.7l1.65 1.65c.18.17.2.44.06.63l-.06.07a.5.5 0 01-.63.06l-.07-.06-2.5-2.5a.5.5 0 01-.06-.63l.06-.07 2.5-2.5a.5.5 0 01.76.63l-.06.07L6.72 14h.14L7 14h6a4 4 0 003.11-6.52.5.5 0 01.39-.81zm-4.85-4.02a.5.5 0 01.63-.06l.07.06 2.5 2.5.06.07a.5.5 0 010 .56l-.06.07-2.5 2.5-.07.06a.5.5 0 01-.56 0l-.07-.06-.06-.07a.5.5 0 010-.56l.06-.07L13.28 6h-.14L13 6H7a4 4 0 00-3.1 6.52c.06.09.1.2.1.31a.5.5 0 01-.9.3A4.99 4.99 0 016.77 5h6.52l-1.65-1.65-.06-.07a.5.5 0 01.06-.63z'
         fill={color}
      ></path>
   </svg>
);

// Menu Icon
export const MenuIcon = ({ size = 20, color = '#586570' }) => (
   <svg
      aria-label=''
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M2 4.5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm0 5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm.5 4.5a.5.5 0 000 1h15a.5.5 0 000-1h-15z'
         fill='currentColor'
      ></path>
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
      <path d='M7 15L12 20L17 15M7 9L12 4L17 9' stroke='currentColor'></path>
   </svg>
);

// Sun Icon
export const SunIcon = ({ size = '20', color = '#000' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         d='M10 2c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm0 12a4 4 0 100-8 4 4 0 000 8zm0-1a3 3 0 110-6 3 3 0 010 6zm7.5-2.5a.5.5 0 000-1h-1a.5.5 0 000 1h1zM10 16c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm-6.5-5.5a.5.5 0 000-1H2.46a.5.5 0 000 1H3.5zm.65-6.35c.2-.2.5-.2.7 0l1 1a.5.5 0 11-.7.7l-1-1a.5.5 0 010-.7zm.7 11.7a.5.5 0 01-.7-.7l1-1a.5.5 0 01.7.7l-1 1zm11-11.7a.5.5 0 00-.7 0l-1 1a.5.5 0 00.7.7l1-1a.5.5 0 000-.7zm-.7 11.7a.5.5 0 00.7-.7l-1-1a.5.5 0 00-.7.7l1 1z'
         fill='currentColor'
      ></path>
   </svg>
);

// Infinity Icon
export const InfinityIcon = ({ size = '20', color = '#c5514c' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path d='M3 12c0-2.168 1.36-4 3.5-4 1.352 0 2.291.498 3.053 1.26.486.486.899 1.078 1.293 1.729.176-.316.363-.647.564-.982a9.018 9.018 0 00-1.15-1.454C9.334 7.627 8.148 7 6.5 7 3.64 7 2 9.466 2 12s1.64 5 4.5 5c1.648 0 2.834-.627 3.76-1.553.92-.919 1.551-2.078 2.177-3.204.633-1.14 1.225-2.198 2.01-2.983C15.21 8.498 16.148 8 17.5 8c2.14 0 3.5 1.832 3.5 4s-1.36 4-3.5 4c-1.352 0-2.291-.498-3.053-1.26-.486-.486-.899-1.078-1.293-1.729-.176.316-.363.647-.564.982a9.02 9.02 0 001.15 1.454c.926.926 2.112 1.553 3.76 1.553 2.86 0 4.5-2.466 4.5-5s-1.64-5-4.5-5c-1.648 0-2.834.627-3.76 1.553-.893.893-1.547 2.07-2.159 3.171-.585 1.054-1.168 2.155-2.028 3.016C8.79 15.502 7.852 16 6.5 16 4.36 16 3 14.168 3 12z'></path>
   </svg>
);

// Home Icon
export const HomeIcon = ({ size = '20', color = '#4270b1' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M10.55 2.53c.84-.7 2.06-.7 2.9 0l6.75 5.7c.5.42.8 1.05.8 1.71v9.8c0 .97-.78 1.76-1.75 1.76h-3.5c-.97 0-1.75-.79-1.75-1.75v-5.5a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25v5.5c0 .96-.78 1.75-1.75 1.75h-3.5C3.78 21.5 3 20.7 3 19.75v-9.8c0-.67.3-1.3.8-1.73l6.75-5.69zm1.93 1.15a.75.75 0 00-.96 0l-6.75 5.7a.75.75 0 00-.27.56v9.8c0 .14.11.26.25.26h3.5c.14 0 .25-.12.25-.25v-5.5c0-.97.78-1.75 1.75-1.75h3.5c.97 0 1.75.78 1.75 1.75v5.5c0 .13.11.25.25.25h3.5c.14 0 .25-.12.25-.25v-9.8c0-.23-.1-.44-.27-.58l-6.75-5.7z'
         fill='currentColor'
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
      <path d='M4 12H20M12 4V20' stroke='currentColor'></path>
   </svg>
);

// Circle Icon
export const CircleIcon = ({ size = '20px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         d='M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z'
         fill='currentColor'
      ></path>
   </svg>
);

// Tick Circle Icon
export const TickCircleIcon = ({ size = '20', color = '#586570' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         d='M10 2a8 8 0 110 16 8 8 0 010-16zm0 1a7 7 0 100 14 7 7 0 000-14zm3.36 4.65c.17.17.2.44.06.63l-.06.07-4 4a.5.5 0 01-.64.07l-.07-.06-2-2a.5.5 0 01.63-.77l.07.06L9 11.3l3.65-3.65c.2-.2.51-.2.7 0z'
         fill='currentColor'
      ></path>
   </svg>
);

// Completed Circle Icon
export const CompletedIcon = ({ size = '20px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         d='M10 2a8 8 0 110 16 8 8 0 010-16zm3.36 5.65a.5.5 0 00-.64-.06l-.07.06L9 11.3 7.35 9.65l-.07-.06a.5.5 0 00-.7.7l.07.07 2 2 .07.06c.17.11.4.11.56 0l.07-.06 4-4 .07-.08a.5.5 0 00-.06-.63z'
         fill='currentColor'
      ></path>
   </svg>
);

// Magnifier Icon
export const MagnifierIcon = ({ size = '10px', color = '#586570' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      height={size}
      width={size}
      viewBox='0 0 512 512'
      stroke='currentColor'
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
      <path
         stroke='currentColor'
         d='M12 12 6 6m6 6 6 6m-6-6 6-6m-6 6-6 6'
      ></path>
   </svg>
);

// Dot Icon
export const DotIcon = ({ size = '20px', color = '#586570' }) => (
   <svg
      aria-label=''
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M10 3C10.828 3 11.5 3.672 11.5 4.5C11.5 5.328 10.828 6 10 6C9.172 6 8.5 5.328 8.5 4.5C8.5 3.672 9.172 3 10 3ZM10 9C10.828 9 11.5 9.672 11.5 10.5C11.5 11.328 10.828 12 10 12C9.172 12 8.5 11.328 8.5 10.5C8.5 9.672 9.172 9 10 9ZM10 15C10.828 15 11.5 15.672 11.5 16.5C11.5 17.328 10.828 18 10 18C9.172 18 8.5 17.328 8.5 16.5C8.5 15.672 9.172 15 10 15Z'
         fill='currentColor'
      ></path>
   </svg>
);

// Trash Icon
export const TrashIcon = ({ size = '20px', color = '#586570' }) => (
   <svg
      aria-label=''
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         d='M8.5 4h3a1.5 1.5 0 00-3 0zm-1 0a2.5 2.5 0 015 0h5a.5.5 0 010 1h-1.05l-1.2 10.34A3 3 0 0112.27 18H7.73a3 3 0 01-2.98-2.66L3.55 5H2.5a.5.5 0 010-1h5zM5.74 15.23A2 2 0 007.73 17h4.54a2 2 0 001.99-1.77L15.44 5H4.56l1.18 10.23zM8.5 7.5c.28 0 .5.22.5.5v6a.5.5 0 01-1 0V8c0-.28.22-.5.5-.5zM12 8a.5.5 0 00-1 0v6a.5.5 0 001 0V8z'
         fill='currentColor'
      ></path>
   </svg>
);

// Star Icon
export const StarIcon = ({ size = '20px', color = '#000000' }) => (
   <svg
      aria-label=''
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M10.79 3.1c.5-1 1.92-1 2.42 0l2.36 4.78 5.27.77c1.1.16 1.55 1.52.75 2.3l-3.82 3.72.9 5.25a1.35 1.35 0 01-1.96 1.42L12 18.86l-4.72 2.48a1.35 1.35 0 01-1.96-1.42l.9-5.25-3.81-3.72c-.8-.78-.36-2.14.75-2.3l5.27-.77 2.36-4.78zm1.2.94L9.75 8.6c-.2.4-.58.68-1.02.74l-5.05.74 3.66 3.56c.32.3.46.76.39 1.2l-.87 5.02 4.52-2.37c.4-.2.86-.2 1.26 0l4.51 2.37-.86-5.03c-.07-.43.07-.88.39-1.2l3.65-3.55-5.05-.74a1.35 1.35 0 01-1.01-.74L12 4.04z'
         fill='currentColor'
      ></path>
   </svg>
);

// Full Star Icon
export const FullStarIcon = ({ size = '20px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         d='M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9z'
         fill='currentColor'
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
         stroke='currentColor'
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
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
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
      fill='currentColor'
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 58.778 58.778'
      stroke='currentColor'
   >
      <path d='M39.389,48.229h-29V11.186l6.682,6.682c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293 c0.391-0.391,0.391-1.023,0-1.414l-8.389-8.389c-0.391-0.391-1.023-0.391-1.414,0l-8.389,8.389c-0.391,0.391-0.391,1.023,0,1.414 s1.023,0.391,1.414,0l6.682-6.682v38.043c0,0.552,0.448,1,1,1h30c0.552,0,1-0.448,1-1S39.941,48.229,39.389,48.229z'></path>
      <path d='M58.485,40.91c-0.391-0.391-1.023-0.391-1.414,0l-6.682,6.682V9.229c0-0.552-0.448-1-1-1h-30c-0.552,0-1,0.448-1,1 c0,0.552,0.448,1,1,1h29v37.364l-6.682-6.682c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l8.389,8.389 c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l8.389-8.389C58.876,41.934,58.876,41.301,58.485,40.91z'></path>
   </svg>
);

// Calendar Icon
export const CalendarIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      fill={color}
      width={size}
      height={size}
      aria-hidden='true'
      aria-label=''
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z'
         fill={color}
      ></path>
   </svg>
);

// Calendar Icon
export const PaperClipIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-label=''
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M4.83 10.48l5.65-5.65a3 3 0 014.25 4.24L8 15.8a1.5 1.5 0 01-2.12-2.12l6-6.01a.5.5 0 10-.7-.71l-6 6.01a2.5 2.5 0 003.53 3.54l6.71-6.72a4 4 0 10-5.65-5.66L4.12 9.78a.5.5 0 00.7.7z'
         fill={color}
      ></path>
   </svg>
);

// Today clock Icon
export const TodayReminderIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         d='M17 10C17 13.7296 14.0832 16.778 10.4062 16.9884C10.2229 17.349 10.0011 17.6867 9.7461 17.996C9.83041 17.9987 9.91505 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 10.0849 2.00132 10.1696 2.00395 10.2539C2.3133 9.99891 2.65099 9.77706 3.01159 9.5938C3.22197 5.91685 6.27035 3 10 3C13.866 3 17 6.13401 17 10Z'
         fill={color}
      ></path>
      <path
         d='M9.5 5C9.22386 5 9 5.22386 9 5.5V10.5C9 10.7761 9.22386 11 9.5 11H12.5C12.7761 11 13 10.7761 13 10.5C13 10.2239 12.7761 10 12.5 10H10V5.5C10 5.22386 9.77614 5 9.5 5Z'
         fill={color}
      ></path>
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M5.5 19C7.98528 19 10 16.9853 10 14.5C10 12.0147 7.98528 10 5.5 10C3.01472 10 1 12.0147 1 14.5C1 16.9853 3.01472 19 5.5 19ZM3.14645 14.8536L5.14605 16.8532L5.14857 16.8557C5.19602 16.9026 5.25051 16.938 5.30861 16.9621C5.36669 16.9861 5.4303 16.9996 5.497 17L5.5 17L5.503 17C5.5697 16.9996 5.63331 16.9861 5.69139 16.9621C5.75036 16.9377 5.80561 16.9015 5.85355 16.8536L7.85355 14.8536C8.04882 14.6583 8.04882 14.3417 7.85355 14.1464C7.65829 13.9512 7.34171 13.9512 7.14645 14.1464L6 15.2929V12.5C6 12.2239 5.77614 12 5.5 12C5.22386 12 5 12.2239 5 12.5V15.2929L3.85355 14.1464C3.65829 13.9512 3.34171 13.9512 3.14645 14.1464C2.95118 14.3417 2.95118 14.6583 3.14645 14.8536Z'
         fill={color}
      ></path>
   </svg>
);

// Tomorrow Icon
export const TomorrowReminderIcon = ({
   size = '20',
   color = 'currentColor',
}) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         d='M17 10C17 13.7296 14.0832 16.778 10.4062 16.9884C10.2229 17.349 10.0011 17.6867 9.7461 17.996C9.83041 17.9987 9.91505 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 10.0849 2.00132 10.1696 2.00395 10.2539C2.3133 9.99891 2.65099 9.77706 3.01159 9.5938C3.22197 5.91685 6.27035 3 10 3C13.866 3 17 6.13401 17 10Z'
         fill={color}
      ></path>
      <path
         d='M9.5 5C9.22386 5 9 5.22386 9 5.5V10.5C9 10.7761 9.22386 11 9.5 11H12.5C12.7761 11 13 10.7761 13 10.5C13 10.2239 12.7761 10 12.5 10H10V5.5C10 5.22386 9.77614 5 9.5 5Z'
         fill={color}
      ></path>
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M10 14.5C10 12.0147 7.98528 10 5.5 10C3.01472 10 1 12.0147 1 14.5C1 16.9853 3.01472 19 5.5 19C7.98528 19 10 16.9853 10 14.5ZM5.85355 16.8536L7.85316 14.854L7.85567 14.8514C7.90256 14.804 7.93802 14.7495 7.96206 14.6914C7.98615 14.6333 7.9996 14.5697 7.99999 14.503L8 14.5L7.99999 14.497C7.9996 14.4303 7.98615 14.3667 7.96206 14.3086C7.93766 14.2496 7.90149 14.1944 7.85355 14.1464L5.85355 12.1464C5.65829 11.9512 5.34171 11.9512 5.14645 12.1464C4.95118 12.3417 4.95118 12.6583 5.14645 12.8536L6.29289 14H3.5C3.22386 14 3 14.2239 3 14.5C3 14.7761 3.22386 15 3.5 15H6.29289L5.14645 16.1464C4.95118 16.3417 4.95118 16.6583 5.14645 16.8536C5.34171 17.0488 5.65829 17.0488 5.85355 16.8536Z'
         fill={color}
      ></path>
   </svg>
);

// Time calendar Icon
export const PickReminderIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 20 20'
      aria-label=''
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         d='M17 5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h4.1c-.16-.32-.3-.65-.4-1H5.5A1.5 1.5 0 014 14.5V7h12v2.2c.35.1.68.24 1 .4V5.5zM5.5 4h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4zm9 15a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm-.5-6.5a.5.5 0 011 0V14h1a.5.5 0 010 1h-1.5a.5.5 0 01-.5-.5v-2z'
         fill={color}
      ></path>
   </svg>
);

// Today calendar Icon
export const TodayCalendarIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      height={size}
      width={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-hidden='true'
      aria-label=''
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-3v-1h3c.83 0 1.5-.67 1.5-1.5V7H4v7.5c0 .83.67 1.5 1.5 1.5h3v1h-3A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5V6h12v-.5c0-.83-.67-1.5-1.5-1.5zM11 9a1 1 0 11-2 0 1 1 0 012 0zm.88 5.07a.5.5 0 01-.7.06l-.68-.56v3.93a.5.5 0 11-1 0v-3.93l-.68.56a.5.5 0 01-.64-.76l1.5-1.25a.5.5 0 01.64 0l1.5 1.25c.21.17.24.49.06.7z'
         fill={color}
      ></path>
   </svg>
);

// Tomorrow calendar Icon
export const TomorrowCalendarIcon = ({
   size = '20',
   color = 'currentColor',
}) => (
   <svg
      height={size}
      width={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-label=''
      aria-hidden='true'
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M17 5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h4.1c-.16-.32-.3-.65-.4-1H5.5A1.5 1.5 0 014 14.5V7h12v2.2c.35.1.68.24 1 .4V5.5zM5.5 4h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4zM19 14.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-2.15.35a.5.5 0 00.15-.35.5.5 0 00-.15-.35l-2-2a.5.5 0 00-.7.7L15.29 14H12.5a.5.5 0 000 1h2.8l-1.15 1.15a.5.5 0 00.7.7l2-2z'
         fill={color}
      ></path>
   </svg>
);

// Next Week calendar Icon
export const NextWeekCalendarIcon = ({
   size = '20',
   color = 'currentColor',
}) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
   >
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M14.5 3C15.8807 3 17 4.11929 17 5.5V9.59971C16.6832 9.43777 16.3486 9.30564 16 9.20703V7H4V14.5C4 15.3284 4.67157 16 5.5 16H9.20703C9.30564 16.3486 9.43777 16.6832 9.59971 17H5.5C4.11929 17 3 15.8807 3 14.5V5.5C3 4.11929 4.11929 3 5.5 3H14.5ZM14.5 4H5.5C4.67157 4 4 4.67157 4 5.5V6H16V5.5C16 4.67157 15.3284 4 14.5 4Z'
         fill={color}
      ></path>
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M19 14.5C19 16.9853 16.9853 19 14.5 19C12.0147 19 10 16.9853 10 14.5C10 12.0147 12.0147 10 14.5 10C16.9853 10 19 12.0147 19 14.5ZM17.4497 14.8713L15.682 16.6391C15.4867 16.8343 15.1701 16.8343 14.9749 16.6391C14.7796 16.4438 14.7796 16.1272 14.9749 15.932L16.3891 14.5178L14.9749 13.1036C14.7796 12.9083 14.7796 12.5917 14.9749 12.3964C15.1701 12.2012 15.4867 12.2012 15.682 12.3964L17.4497 14.1642C17.645 14.3595 17.645 14.6761 17.4497 14.8713ZM12.1464 12.3964C11.9512 12.5917 11.9512 12.9083 12.1464 13.1036L13.5607 14.5178L12.1464 15.932C11.9512 16.1272 11.9512 16.4438 12.1464 16.6391C12.3417 16.8343 12.6583 16.8343 12.8536 16.6391L14.6213 14.8713C14.8166 14.6761 14.8166 14.3595 14.6213 14.1642L12.8536 12.3964C12.6583 12.2012 12.3417 12.2012 12.1464 12.3964Z'
         fill={color}
      ></path>
   </svg>
);

// Peak Date Icon
export const PeakCalendarIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-hidden='true'
      aria-label=''
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M17 5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h4.1c-.16-.32-.3-.65-.4-1H5.5A1.5 1.5 0 014 14.5V7h12v2.2c.35.1.68.24 1 .4V5.5zM5.5 4h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4zm9 15a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm-.5-6.5a.5.5 0 011 0V14h1a.5.5 0 010 1h-1.5a.5.5 0 01-.5-.5v-2z'
         fill={color}
      ></path>
   </svg>
);

// Daily Icon
export const DailyIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-label=''
      aria-hidden='true'
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zm-1.78 5c.44 0 .6.05.77.13.16.1.29.22.38.38.08.16.13.33.13.77v2.44c0 .44-.05.6-.13.77a.9.9 0 01-.38.38c-.16.08-.33.13-.77.13H7.28c-.44 0-.6-.05-.77-.13a.9.9 0 01-.38-.38c-.08-.16-.13-.33-.13-.77v-2.44c0-.44.05-.6.13-.77a.9.9 0 01.38-.38c.16-.08.33-.13.77-.13h5.44zm.2 1H7V13h5.98v-2.98h-.08zm.58-4a.5.5 0 01.09 1H6.5a.5.5 0 01-.09-1h7.09z'
         fill={color}
      ></path>
   </svg>
);

// Weekdays Icon
export const WeekDaysIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-hidden='true'
      aria-label=''
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M6.5 6a.5.5 0 00-.5.5v3c0 .28.22.5.5.5h7a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-7zM7 9V7h6v2H7zm10-3.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM5.5 4h9c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5v-9C4 4.67 4.67 4 5.5 4z'
         fill={color}
      ></path>
   </svg>
);

// Weekly Icon
export const WeeklyIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-label=''
      focusable='false'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zm-8 2a.5.5 0 01.5.41v7.09a.5.5 0 01-1 .09V6.5c0-.28.22-.5.5-.5zM10 6a.5.5 0 01.5.41v7.09a.5.5 0 01-1 .09V6.5c0-.28.22-.5.5-.5zm3.5 0a.5.5 0 01.5.41v7.09a.5.5 0 01-1 .09V6.5c0-.28.22-.5.5-.5z'
         fill={color}
      ></path>
   </svg>
);

// Monthly Icon
export const MonthlyIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-label=''
      aria-hidden='true'
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z'
         fill={color}
      ></path>
   </svg>
);

// Yearly Icon
export const YearlyIcon = ({ size = '20', color = 'currentColor' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={color}
      aria-label=''
      aria-hidden='true'
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M16 4.5A2.5 2.5 0 0013.5 2h-9A2.5 2.5 0 002 4.5v9A2.5 2.5 0 004.5 16h9a2.5 2.5 0 002.5-2.5v-9zM3 6h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 013 13.5V6zm1.5-3h9c.83 0 1.5.67 1.5 1.5V5H3v-.5C3 3.67 3.67 3 4.5 3zM5 17c.46.6 1.18 1 2 1h6.5a4.5 4.5 0 004.5-4.5v-7c0-.82-.4-1.54-1-2v9a3.5 3.5 0 01-3.5 3.5H5z'
         fill={color}
      ></path>
   </svg>
);

// Bell Icon
export const BellIcon = ({ size = '20', color = '#586570' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M10 2a5.92 5.92 0 015.98 5.36l.02.22V11.4l.92 2.22a1 1 0 01.06.17l.01.08.01.13a1 1 0 01-.75.97l-.11.02L16 15h-3.5v.17a2.5 2.5 0 01-5 0V15H4a1 1 0 01-.26-.03l-.13-.04a1 1 0 01-.6-1.05l.02-.13.05-.13L4 11.4V7.57A5.9 5.9 0 0110 2zm1.5 13h-3v.15a1.5 1.5 0 001.36 1.34l.14.01c.78 0 1.42-.6 1.5-1.36V15zM10 3a4.9 4.9 0 00-4.98 4.38L5 7.6V11.5l-.04.2L4 14h12l-.96-2.3-.04-.2V7.61A4.9 4.9 0 0010 3z'
         fill='currentColor'
      ></path>
   </svg>
);

// Note Icon
export const NoteIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         id='Vector'
         d='M13 19.9991C12.9051 20 12.7986 20 12.677 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V12.6747C20 12.7973 20 12.9045 19.9991 13M13 19.9991C13.2857 19.9966 13.4663 19.9862 13.6388 19.9448C13.8429 19.8958 14.0379 19.8147 14.2168 19.705C14.4186 19.5814 14.5916 19.4089 14.9375 19.063L19.063 14.9375C19.4089 14.5916 19.5809 14.4186 19.7046 14.2168C19.8142 14.0379 19.8953 13.8424 19.9443 13.6384C19.9857 13.4659 19.9964 13.2855 19.9991 13M13 19.9991V14.6001C13 14.04 13 13.7598 13.109 13.5459C13.2049 13.3577 13.3577 13.2049 13.5459 13.109C13.7598 13 14.0396 13 14.5996 13H19.9991'
         stroke='currentColor'
         strokeWidth='2'
         strokeLinecap='round'
         strokeLinejoin='round'
      ></path>
   </svg>
);

// Alphabet Icon
export const AlphabetIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      fill='currentColor'
      viewBox='0 0 1920 1920'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M1549.418 299.605V1429.62l203.915-204.032L1920 1392.255l-488.451 488.57-488.57-488.57 166.668-166.667 204.032 204.032V299.605h235.74ZM488.57 160l488.57 488.57-166.67 166.548-204.031-203.914v1129.898h-235.74V611.204L166.668 815.12 0 648.569 488.57 160Z'
         fillRule='evenodd'
      ></path>
   </svg>
);

// Sort Icon
export const SortIcon = ({ size = '20px', color = '#586570' }) => (
   <svg
      aria-label=''
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M2.35 7.35L5 4.71V16.5a.5.5 0 001 0V4.7l2.65 2.65a.5.5 0 00.7-.7l-3.49-3.5A.5.5 0 005.5 3a.5.5 0 00-.39.18L1.65 6.65a.5.5 0 10.7.7zm15.3 5.3L15 15.29V3.5a.5.5 0 00-1 0v11.8l-2.65-2.65a.5.5 0 00-.7.7l3.49 3.5a.5.5 0 00.36.15.5.5 0 00.39-.18l3.46-3.47a.5.5 0 10-.7-.7z'
         fill='currentColor'
      ></path>
   </svg>
);

// Menu Star Icon
export const MenuStarIcon = ({ size = '20', color = '#000000' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
   >
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M15.0859 8.50266L12.0001 2.25L8.9142 8.50266L2.01398 9.50532L7.00702 14.3723L5.82833 21.2447L12.0001 18L18.1718 21.2447L16.9931 14.3723L21.9862 9.50532L15.0859 8.50266ZM18.7627 10.5527L14.0898 9.87367L12.0001 5.63933L9.9103 9.87367L5.23742 10.5527L8.61875 13.8487L7.82052 18.5027L12.0001 16.3053L16.1796 18.5027L15.3814 13.8487L18.7627 10.5527Z'
         fill='currentColor'
      ></path>
   </svg>
);

// Share Icon
export const ShareIcon = ({ size = '20px', color = '#000000' }) => (
   <svg
      aria-label=''
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M9 2a4 4 0 100 8 4 4 0 000-8zM6 6a3 3 0 116 0 3 3 0 01-6 0zm-2 5a2 2 0 00-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 009 18c.41 0 .82-.02 1.21-.06A5.5 5.5 0 019.6 17 12 12 0 019 17a8.16 8.16 0 01-4.33-1.05A3.36 3.36 0 013 13a1 1 0 011-1h5.6c.18-.36.4-.7.66-1H4zm10.5 8a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0-7c.28 0 .5.22.5.5V14h1.5a.5.5 0 010 1H15v1.5a.5.5 0 01-1 0V15h-1.5a.5.5 0 010-1H14v-1.5c0-.28.22-.5.5-.5z'
         fill='currentColor'
      ></path>
   </svg>
);

// Users Icon
export const USersIcon = ({ size = '20px', color = '#000000' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M4.5 6.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM6.75 3.5a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zm5.69 11.65c.53.21 1.21.35 2.06.35 1.88 0 2.92-.67 3.47-1.43a2.92 2.92 0 00.53-1.5v-.07c0-.83-.67-1.5-1.5-1.5h-4.63c.24.29.42.63.53 1H17c.28 0 .5.22.5.5v.1l-.04.22c-.04.18-.13.42-.3.66-.33.46-1.04 1.02-2.66 1.02-.73 0-1.28-.11-1.69-.28-.08.28-.2.6-.37.93zM1.5 13c0-1.1.9-2 2-2H10a2 2 0 012 2V13.08a1.43 1.43 0 01-.01.18 3.95 3.95 0 01-.67 1.8C10.62 16.09 9.26 17 6.75 17c-2.51 0-3.87-.92-4.57-1.93a3.95 3.95 0 01-.68-1.99V13zm1 .06v.1l.06.33c.07.27.2.64.45 1C3.49 15.2 4.5 16 6.75 16s3.26-.8 3.74-1.5a2.95 2.95 0 00.5-1.42l.01-.02V13a1 1 0 00-1-1H3.5a1 1 0 00-1 1v.06zM13 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM14.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z'
         fill='currentColor'
      ></path>
   </svg>
);

// Copy Icon
export const CopyIcon = ({ size = '12px', color = '#000000' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z'
         stroke='currentColor'
         strokeWidth='2'
         strokeLinecap='round'
         strokeLinejoin='round'
      ></path>
   </svg>
);

// Success Icon
export const SuccessIcon = ({ size = '16px', color = '#000000' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
   >
      <path
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth={2}
         d='M5 13l4 4L19 7'
      />
   </svg>
);

// List Icon
export const ListIcon = ({ size = '20px', color = '#000000' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M3 6.5a1 1 0 100-2 1 1 0 000 2zm3-1c0-.28.22-.5.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0 5c0-.28.22-.5.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm.5 4.5a.5.5 0 000 1h11a.5.5 0 000-1h-11zm-2.5.5a1 1 0 11-2 0 1 1 0 012 0zm-1-4a1 1 0 100-2 1 1 0 000 2z'
         fill='currentColor'
      ></path>
   </svg>
);

// Users Icon
export const UsersIcon = ({ size = '20px', color = '#000000' }) => (
   <svg
      fill='currentColor'
      aria-hidden='true'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M4.5 6.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM6.75 3.5a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zm5.69 11.65c.53.21 1.21.35 2.06.35 1.88 0 2.92-.67 3.47-1.43a2.92 2.92 0 00.53-1.5v-.07c0-.83-.67-1.5-1.5-1.5h-4.63c.24.29.42.63.53 1H17c.28 0 .5.22.5.5v.1l-.04.22c-.04.18-.13.42-.3.66-.33.46-1.04 1.02-2.66 1.02-.73 0-1.28-.11-1.69-.28-.08.28-.2.6-.37.93zM1.5 13c0-1.1.9-2 2-2H10a2 2 0 012 2V13.08a1.43 1.43 0 01-.01.18 3.95 3.95 0 01-.67 1.8C10.62 16.09 9.26 17 6.75 17c-2.51 0-3.87-.92-4.57-1.93a3.95 3.95 0 01-.68-1.99V13zm1 .06v.1l.06.33c.07.27.2.64.45 1C3.49 15.2 4.5 16 6.75 16s3.26-.8 3.74-1.5a2.95 2.95 0 00.5-1.42l.01-.02V13a1 1 0 00-1-1H3.5a1 1 0 00-1 1v.06zM13 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM14.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z'
         fill='currentColor'
      ></path>
   </svg>
);

// Sign out Icon
export const SignOutIcon = ({ size = '20px', color = '#000000' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M9 20.7499H6C5.65324 20.7647 5.30697 20.7109 4.98101 20.5917C4.65505 20.4725 4.3558 20.2902 4.10038 20.0552C3.84495 19.8202 3.63837 19.5371 3.49246 19.2222C3.34654 18.9073 3.26415 18.5667 3.25 18.2199V5.77994C3.26415 5.43316 3.34654 5.09256 3.49246 4.77765C3.63837 4.46274 3.84495 4.17969 4.10038 3.9447C4.3558 3.70971 4.65505 3.52739 4.98101 3.40818C5.30697 3.28896 5.65324 3.23519 6 3.24994H9C9.19891 3.24994 9.38968 3.32896 9.53033 3.46961C9.67098 3.61027 9.75 3.80103 9.75 3.99994C9.75 4.19886 9.67098 4.38962 9.53033 4.53027C9.38968 4.67093 9.19891 4.74994 9 4.74994H6C5.70307 4.72412 5.4076 4.81359 5.17487 4.99977C4.94213 5.18596 4.78999 5.45459 4.75 5.74994V18.2199C4.78999 18.5153 4.94213 18.7839 5.17487 18.9701C5.4076 19.1563 5.70307 19.2458 6 19.2199H9C9.19891 19.2199 9.38968 19.299 9.53033 19.4396C9.67098 19.5803 9.75 19.771 9.75 19.9699C9.75 20.1689 9.67098 20.3596 9.53033 20.5003C9.38968 20.6409 9.19891 20.7199 9 20.7199V20.7499Z'
         fill='currentColor'
      ></path>
      <path
         d='M16 16.7499C15.9015 16.7504 15.8038 16.7312 15.7128 16.6934C15.6218 16.6556 15.5392 16.6 15.47 16.5299C15.3296 16.3893 15.2507 16.1987 15.2507 15.9999C15.2507 15.8012 15.3296 15.6105 15.47 15.4699L18.94 11.9999L15.47 8.52991C15.3963 8.46125 15.3372 8.37845 15.2962 8.28645C15.2552 8.19445 15.2332 8.09513 15.2314 7.99443C15.2296 7.89373 15.2482 7.7937 15.2859 7.70031C15.3236 7.60692 15.3797 7.52209 15.451 7.45087C15.5222 7.37965 15.607 7.32351 15.7004 7.28579C15.7938 7.24807 15.8938 7.22954 15.9945 7.23132C16.0952 7.23309 16.1945 7.25514 16.2865 7.29613C16.3785 7.33712 16.4613 7.39622 16.53 7.46991L20.53 11.4699C20.6705 11.6105 20.7493 11.8012 20.7493 11.9999C20.7493 12.1987 20.6705 12.3893 20.53 12.5299L16.53 16.5299C16.4608 16.6 16.3782 16.6556 16.2872 16.6934C16.1962 16.7312 16.0985 16.7504 16 16.7499Z'
         fill='currentColor'
      ></path>
      <path
         d='M20 12.75H9C8.80109 12.75 8.61032 12.671 8.46967 12.5303C8.32902 12.3897 8.25 12.1989 8.25 12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25H20C20.1989 11.25 20.3897 11.329 20.5303 11.4697C20.671 11.6103 20.75 11.8011 20.75 12C20.75 12.1989 20.671 12.3897 20.5303 12.5303C20.3897 12.671 20.1989 12.75 20 12.75Z'
         fill='currentColor'
      ></path>
   </svg>
);

export const DateIcon = ({ size = '20', color = 'currentColor' }) => (
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
