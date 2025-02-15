const duration = 60000; // 1 minute
export const ALARM_STOP_TIMEOUT = duration;
export const TOAST_DURATION = duration;

export const CHECK_REMINDERS_INTERVAL = 30000; // 30 sec
export const SNOOZE_DURATION = 5 * 60 * 1000; // 5 minutes

// Default task object
export const defaultCategoryId = '00000000-0000-0000-0000-000000000000';
export const defaultCategory = {
   category_id: defaultCategoryId,
   category_title: 'default',
   category_owner_id: null,
   category_created_at: null,
   has_category_collaborator: false,
   has_category_invatation: false,
};

////////////////////
///// Colors ///////
////////////////////

export const DEFAULT_COLOR = {
   blue: '#286fd4',
   current: '#586570',
   gray: '#9ca3af',
   buttonHover: '#d2d5db',
   primaryText: '#586570',
};

// Route background color settings
export const BG_COLORS = {
   '/my-day': {
      mainBackground: '#dfedf9',
      taskBackground: '#f6f6f6',
      primaryText: '#586570',
      secondaryText: '#3063ab',
      ternaryText: '#586570',
      iconColor: '#586570',
      toggleBackground: '#f6f6f6',
      toggleText: '#586570',
      toggleHover: '#F6F8FA',
      taskHover: '#f4f4f5',
      buttonHover: '#d2d5db',
      secondaryHover: '#f4f4f5',
   },

   '/important': {
      mainBackground: '#ffe4e9',
      taskBackground: '#f6f5f5',
      primaryText: '#ac395d',
      secondaryText: '#3063ab',
      ternaryText: '#586570',
      iconColor: '#ac395d',
      toggleBackground: '#f6f6f6',
      toggleText: '#586570',
      taskHover: '#f4f4f5',
      buttonHover: '#ffeff2',
      secondaryHover: '#f4f4f5',
   },

   '/planned': {
      mainBackground: '#d4f1ef',
      taskBackground: '#f6f6f6',
      primaryText: '#166f6b',
      secondaryText: '#3063ab',
      ternaryText: '#586570',
      iconColor: '#166f6b',
      toggleBackground: '#f6f6f6',
      toggleText: '#166f6b',
      toggleHover: '#E8F4F3',
      taskHover: '#f4f4f5',
      buttonHover: '#aac1bf',
      secondaryHover: '#f4f4f5',
   },

   '/all': {
      mainBackground: '#c4514c',
      taskBackground: '#f4eeed',
      primaryText: '#fff',
      secondaryText: '#3063ab',
      ternaryText: '#586570',
      iconColor: '#c4514c',
      toggleBackground: '#f3cfcd',
      toggleText: '#000',
      toggleHover: '#F6DAD8',
      taskHover: '#f6f6f6',
      buttonHover: '#de9b98',
      secondaryHover: '#f4f4f5',
   },

   '/completed': {
      mainBackground: '#c4514c',
      taskBackground: '#f4eeed',
      primaryText: '#fff',
      secondaryText: '#3063ab',
      ternaryText: '#586570',
      iconColor: '#c4514c',
      toggleBackground: '#f3cfcd',
      toggleText: '#000',
      toggleHover: '#F6DAD8',
      taskHover: '#f6f6f6',
      buttonHover: '#de9b98',
      secondaryHover: '#f4f4f5',
   },

   '/tasks': {
      mainBackground: '#dfedf9',
      taskBackground: '#f4f5f6',
      primaryText: '#3063ab',
      secondaryText: '#3063ab',
      ternaryText: '#586570',
      iconColor: '#3063ab',
      toggleBackground: '#f6f6f6',
      toggleText: '#586570',
      toggleHover: '#FAFAFA',
      taskHover: '#f6f6f6',
      buttonHover: '#ecf5fc',
      secondaryHover: '#f4f4f5',
   },

   '/slug': {
      mainBackground: '#5d71bf',
      taskBackground: '#eeeff3',
      primaryText: '#fff',
      secondaryText: '#3063ab',
      ternaryText: '#586570',
      iconColor: '#5d71bf',
      toggleBackground: '#d0d6ee',
      toggleText: '#000',
      toggleHover: '#DBE0F5',
      taskHover: '#f6f6f6',
      buttonHover: '#a2addb',
      secondaryHover: '#f4f4f5',
   },

   '/search': {
      mainBackground: '#5d71bf',
      taskBackground: '#eeeff3',
      primaryText: '#fff',
      secondaryText: '#3063ab',
      ternaryText: '#586570',
      iconColor: '#5d71bf',
      toggleBackground: '#d0d6ee',
      toggleText: '#242424',
      toggleHover: '#DBE0F5',
      taskHover: '#f6f6f6',
      buttonHover: '#a2addb',
      secondaryHover: '#f4f4f5',
   },
};
