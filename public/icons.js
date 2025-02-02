import React from 'react';

// UserRoundCog Icon
export const UserRoundCog = ({ size = 20, color = '#586570' }) => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
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
      stroke='currentColor'
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
      stroke='currentColor'
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
export const SunIcon = ({ size = 20, color = '#000' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <circle cx='12' cy='12' r='6' stroke='currentColor'></circle>
      <path d='M12 2V3' stroke='currentColor'></path>
      <path d='M12 21V22' stroke='currentColor'></path>
      <path d='M22 12L21 12' stroke='currentColor'></path>
      <path d='M3 12L2 12' stroke='currentColor'></path>
      <path d='M19.0708 4.92969L18.678 5.32252' stroke='currentColor'></path>
      <path d='M5.32178 18.6777L4.92894 19.0706' stroke='currentColor'></path>
      <path d='M19.0708 19.0703L18.678 18.6775' stroke='currentColor'></path>
      <path d='M5.32178 5.32227L4.92894 4.92943' stroke='currentColor'></path>
   </svg>
);

// Infinity Icon
export const InfinityIcon = ({ size = 24, color = '#c5514c' }) => (
   <svg
      focusable='false'
      aria-hidden='true'
      width={size}
      height={size}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path d='M3 12c0-2.168 1.36-4 3.5-4 1.352 0 2.291.498 3.053 1.26.486.486.899 1.078 1.293 1.729.176-.316.363-.647.564-.982a9.018 9.018 0 00-1.15-1.454C9.334 7.627 8.148 7 6.5 7 3.64 7 2 9.466 2 12s1.64 5 4.5 5c1.648 0 2.834-.627 3.76-1.553.92-.919 1.551-2.078 2.177-3.204.633-1.14 1.225-2.198 2.01-2.983C15.21 8.498 16.148 8 17.5 8c2.14 0 3.5 1.832 3.5 4s-1.36 4-3.5 4c-1.352 0-2.291-.498-3.053-1.26-.486-.486-.899-1.078-1.293-1.729-.176.316-.363.647-.564.982a9.02 9.02 0 001.15 1.454c.926.926 2.112 1.553 3.76 1.553 2.86 0 4.5-2.466 4.5-5s-1.64-5-4.5-5c-1.648 0-2.834.627-3.76 1.553-.893.893-1.547 2.07-2.159 3.171-.585 1.054-1.168 2.155-2.028 3.016C8.79 15.502 7.852 16 6.5 16 4.36 16 3 14.168 3 12z'></path>
   </svg>
);

// Home Icon
export const HomeIcon = ({ size = '20px', color = '#4270b1' }) => (
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
      width='20'
      height='20'
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
export const TickCircleIcon = ({ size = '20px', color = '#586570' }) => (
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
      width='20'
      height='20'
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
         stroke='currentColor'
         strokeWidth='0.9600000000000002'
         strokeLinecap='round'
         strokeLinejoin='round'
      ></path>
   </svg>
);

// Calendar Icon
export const PaperClipIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill='currentColor'
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

// Today clock Icon
export const TodayClockIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path d='M23,11a1,1,0,0,0-1,1,10.034,10.034,0,1,1-2.9-7.021A.862.862,0,0,1,19,5H16a1,1,0,0,0,0,2h3a3,3,0,0,0,3-3V1a1,1,0,0,0-2,0V3.065A11.994,11.994,0,1,0,24,12,1,1,0,0,0,23,11Z M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z'></path>
   </svg>
);

// Tomorrow click Icon
export const TomorrowClockIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path d='M14.6,21.3c-.3.226-.619.464-.89.7H16a1,1,0,0,1,0,2H12a1,1,0,0,1-1-1c0-1.5,1.275-2.456,2.4-3.3.75-.562,1.6-1.2,1.6-1.7a1,1,0,0,0-2,0,1,1,0,0,1-2,0,3,3,0,0,1,6,0C17,19.5,15.725,20.456,14.6,21.3ZM23,15a1,1,0,0,0-1,1v3H21a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v2a3,3,0,0,0,3,3h1v2a1,1,0,0,0,2,0V16A1,1,0,0,0,23,15ZM13,12V7a1,1,0,0,0-2,0v4H8a1,1,0,0,0,0,2h4A1,1,0,0,0,13,12ZM23,2a1,1,0,0,0-1,1V5.374A12,12,0,1,0,7.636,23.182,1.015,1.015,0,0,0,8,23.25a1,1,0,0,0,.364-1.932A10,10,0,1,1,20.636,7H18a1,1,0,0,0,0,2h3a3,3,0,0,0,3-3V3A1,1,0,0,0,23,2Z'></path>
   </svg>
);

// Time calendar Icon
export const TimerCalendarIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M7 1C6.44772 1 6 1.44772 6 2V3H5C3.34315 3 2 4.34315 2 6V20C2 21.6569 3.34315 23 5 23H13.101C12.5151 22.4259 12.0297 21.7496 11.6736 21H5C4.44772 21 4 20.5523 4 20V11H20V11.2899C20.7224 11.5049 21.396 11.8334 22 12.2547V6C22 4.34315 20.6569 3 19 3H18V2C18 1.44772 17.5523 1 17 1C16.4477 1 16 1.44772 16 2V3H8V2C8 1.44772 7.55228 1 7 1ZM16 6V5H8V6C8 6.55228 7.55228 7 7 7C6.44772 7 6 6.55228 6 6V5H5C4.44772 5 4 5.44772 4 6V9H20V6C20 5.44772 19.5523 5 19 5H18V6C18 6.55228 17.5523 7 17 7C16.4477 7 16 6.55228 16 6Z'
         fill='currentColor'
      ></path>
      <path
         d='M17 16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16V17.703L19.8801 18.583C20.2706 18.9736 20.2706 19.6067 19.8801 19.9973C19.4896 20.3878 18.8564 20.3878 18.4659 19.9973L17.2929 18.8243C17.0828 18.6142 16.9857 18.3338 17.0017 18.0588C17.0006 18.0393 17 18.0197 17 18V16Z'
         fill='currentColor'
      ></path>
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M24 18C24 21.3137 21.3137 24 18 24C14.6863 24 12 21.3137 12 18C12 14.6863 14.6863 12 18 12C21.3137 12 24 14.6863 24 18ZM13.9819 18C13.9819 20.2191 15.7809 22.0181 18 22.0181C20.2191 22.0181 22.0181 20.2191 22.0181 18C22.0181 15.7809 20.2191 13.9819 18 13.9819C15.7809 13.9819 13.9819 15.7809 13.9819 18Z'
         fill='currentColor'
      ></path>
   </svg>
);

// Today calendar Icon
export const TodayCalendarIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M3 9H21M9 15L11 17L15 13M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z'
         stroke='currentColor'
         strokeWidth='2'
         strokeLinecap='round'
         strokeLinejoin='round'
      ></path>
   </svg>
);

// Tomorrow calendar Icon
export const TomorrowCalendarIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M3 9H21M7 3V5M17 3V5M10 16L12 18M12 18L14 16M12 18V12M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z'
         stroke='currentColor'
         strokeWidth='2'
         strokeLinecap='round'
         strokeLinejoin='round'
      ></path>
   </svg>
);

// Next Week calendar Icon
export const NextWeekCalendarIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z'
         stroke='currentColor'
         strokeWidth='2'
         strokeLinecap='round'
         strokeLinejoin='round'
      ></path>
   </svg>
);

// Peak Date Icon
export const PeakCalendarIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M10 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V10M7 3V5M17 3V5M3 9H21M13.5 13.0001L7 13M10 17.0001L7 17M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z'
         stroke='currentColor'
         strokeWidth='2'
         strokeLinecap='round'
         strokeLinejoin='round'
      ></path>
   </svg>
);

// Daily Icon
export const DailyIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      width={size}
      height={size}
      viewBox='-11 0 32 32'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M1.906 2.625h5.469v22.969h-2.281v-20.75h-3.188v-2.219z'
         transform='translate(8.5, 0)'
      ></path>

      <path
         d='M9 2c6.406 0 7.969 7 7.969 12.063s-1.563 12.063-7.969 12.063-7.719-7.063-7.719-12.063 1.281-12.063 7.719-12.063zM9.094 24.063c4.906 0 5.719-6.281 5.719-9.969 0-3.656-0.813-9.938-5.719-9.938-5.063 0-5.625 6.25-5.625 9.938s0.563 9.969 5.625 9.969z'
         transform='translate(-8, 0)'
      ></path>
   </svg>
);

// Weekdays Icon
export const WeekDaysIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      width={size}
      height={size}
      viewBox='-7 0 32 32'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M13.719 1.375v15.438h2.781v2.25h-2.781v6.531h-2.219v-6.531h-10.219zM5.594 16.813h5.906v-8.344z'
         transform='translate(8.5, 0)'
      ></path>

      <path
         d='M9 2c6.406 0 7.969 7 7.969 12.063s-1.563 12.063-7.969 12.063-7.719-7.063-7.719-12.063 1.281-12.063 7.719-12.063zM9.094 24.063c4.906 0 5.719-6.281 5.719-9.969 0-3.656-0.813-9.938-5.719-9.938-5.063 0-5.625 6.25-5.625 9.938s0.563 9.969 5.625 9.969z'
         transform='translate(-8, 0)'
      ></path>
   </svg>
);

// Weekly Icon
export const WeeklyIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      width={size}
      height={size}
      viewBox='-7 0 32 32'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M1.906 4.844v-2.219h14.594l-12.313 23.563-2-1.031 10.625-20.313h-10.906z'
         transform='translate(8.5, 0)'
      ></path>

      <path
         d='M9 2c6.406 0 7.969 7 7.969 12.063s-1.563 12.063-7.969 12.063-7.719-7.063-7.719-12.063 1.281-12.063 7.719-12.063zM9.094 24.063c4.906 0 5.719-6.281 5.719-9.969 0-3.656-0.813-9.938-5.719-9.938-5.063 0-5.625 6.25-5.625 9.938s0.563 9.969 5.625 9.969z'
         transform='translate(-8, 0)'
      ></path>
   </svg>
);

// Monthly Icon
export const MonthlyIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      width={size}
      height={size}
      viewBox='-7 0 32 32'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M4.875 8h-2.25c0.063-3.281 2.781-6 6.094-6s6.031 2.719 6.031 6.094c0 1.969-0.969 3.719-2.438 4.813 2.094 1.25 3.5 3.531 3.5 6.125 0 3.938-3.188 7.094-7.094 7.094-3.844 0-6.969-3-7.125-6.781h2.25c0.156 2.531 2.281 4.594 4.875 4.594 2.688 0 4.844-2.219 4.844-4.906s-2.156-4.875-4.844-4.875v-2.219c2.125 0 3.813-1.719 3.813-3.844s-1.688-3.844-3.813-3.844-3.813 1.656-3.844 3.75z'
         transform='translate(-8.5, 0)'
      ></path>

      <path
         d='M9 2c6.406 0 7.969 7 7.969 12.063s-1.563 12.063-7.969 12.063-7.719-7.063-7.719-12.063 1.281-12.063 7.719-12.063zM9.094 24.063c4.906 0 5.719-6.281 5.719-9.969 0-3.656-0.813-9.938-5.719-9.938-5.063 0-5.625 6.25-5.625 9.938s0.563 9.969 5.625 9.969z'
         transform='translate(8, 0)'
      ></path>
   </svg>
);

// Yearly Icon
export const YearlyIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      fill='currentColor'
      width={size}
      height={size}
      viewBox='-7 0 32 32'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M1.906 2.625h5.469v22.969h-2.281v-20.75h-3.188v-2.219z'
         transform='translate(-5.5, 0)'
      ></path>

      <path
         d='M14.5 13.531l-8.344 9.813h10.156v2.25h-15.031l7.969-9.344s3.656-4.219 4-4.75 0.594-1.469 0.594-2.344c0-2.719-2.188-4.938-4.938-4.938-2.719 0-4.938 2.219-4.938 4.938 0 0.813 0.188 1.531 0.531 2.219h-2.313c-0.25-0.719-0.406-1.406-0.406-2.219 0-3.906 3.219-7.125 7.125-7.125 3.656 0 6.656 2.75 7.063 6.313 0.031 0.25 0.031 0.563 0.031 0.813 0 1.656-0.563 3.188-1.5 4.375z'
         transform='translate(5, 0)'
      ></path>
   </svg>
);

// Bell Icon
export const BellIcon = ({ size = '14px', color = '#586570' }) => (
   <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
   >
      <path
         d='M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003'
         stroke='currentColor'
         strokeWidth='2'
         strokeLinecap='round'
         strokeLinejoin='round'
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
export const MenuStarIcon = ({ size = '14px', color = '#000000' }) => (
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
