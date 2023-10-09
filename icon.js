const Icon = {
  X: {
    view: ({ attrs }) => m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
      { class: attrs.class },
      [
        m("line[x1='18'][y1='6'][x2='6'][y2='18']"),
        m("line[x1='6'][y1='6'][x2='18'][y2='18']")
      ]
    )
  },
  Delete: {
    view: ({ attrs }) => m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
      { class: attrs.class }, [
      m("path[d='M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z']"),
      m("line[x1='18'][y1='9'][x2='12'][y2='15']"),
      m("line[x1='12'][y1='9'][x2='18'][y2='15']")
    ])
  },
  Save: {
    view: ({ attrs }) => m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
      { class: attrs.class }, [
      m("path[d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z']"),
      m("polyline[points='17 21 17 13 7 13 7 21']"),
      m("polyline[points='7 3 7 8 15 8']")
    ])
  },
  Image: {
    view: ({ attrs }) => m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
      { class: attrs.class }, [
      m("rect[x='3'][y='3'][width='18'][height='18'][rx='2'][ry='2']"),
      m("circle[cx='8.5'][cy='8.5'][r='1.5']"),
      m("polyline[points='21 15 16 10 5 21']")
    ])
  },
  Download: {
    view: ({ attrs }) => m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
      { class: attrs.class }, [
      m("path[d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4']"),
      m("polyline[points='7 10 12 15 17 10']"),
      m("line[x1='12'][y1='15'][x2='12'][y2='3']")
    ])
  },
  Folder: {
    view: ({ attrs }) => m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
      { class: attrs.class }, 
        m("path[d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z']")
    )
  },
  FilePlus: {
    view: ({ attrs }) => m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
      { class: attrs.class }, [
      m("path[d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z']"),
      m("polyline[points='14 2 14 8 20 8']"),
      m("line[x1='12'][y1='18'][x2='12'][y2='12']"),
      m("line[x1='9'][y1='15'][x2='15'][y2='15']")
    ])
  },
  Arrow: {
    view: ({ attrs }) =>  m("svg.-mr-1.h-5.w-5.text-gray-400[viewBox='0 0 20 20'][fill='currentColor'][aria-hidden='true']", 
      m("path[fill-rule='evenodd'][d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'][clip-rule='evenodd']")
    )
  }
};
