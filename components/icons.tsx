import React from 'react';

const iconProps = {
    className: "h-6 w-6",
    strokeWidth: 2,
};

export const Logo = () => (
    <img 
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgODIiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQtMiIgeDE9IjQ3MS42NiIgeTE9IjMuMzkiIHgyPSI0NzEuNjYiIHkyPSI4MC41MyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguNDEsIDAsIDAsIC45OCwgLTIyMi43MSwgLTEuNTUpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNWNlNmY4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDNiZGU5Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iNDk3LjY4IiB5MT0iMTguMzkiIHgyPSI0OTcuNjgiIHkyPSI4MS42NyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguMzgsIDAsIDAsIC44OSwgLTI4Ny4zNCwgLTE0LjkyKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzY5NTNmMiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzVhNGVlYiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwb2x5Z29uIHBvaW50cz0iNjYuNjcgMzUuMTggNDcuNTQgMzUuMTggMzEuNjkgNTEuMDQgNDcuNTQgNTEuMDQgNjYuNjcgMzUuMTgiIGZpbGw9IiMyNDI4NTUiLz48cG9seWdvbiBwb2ludHM9IjEyNi4wNyAzNS4xOCAxMDYuOTUgMzUuMTggNjEuMjUgODEuODcgNzYuNDUgODEuODcgMTI2LjA3IDM1LjE4IiBmaWxsPSIjNDg0ODk4Ii8+PHBvbHlnb24gcG9pbnRzPSI4NC40NSAzMy43MiA0OS4yMSAzMy43MiA0MC4yOCA0Mi42NSA3MS4wNiA0Mi42NSA4NC40NSAzMy43MiIgZmlsbD0iIzM2NzNkOCIvPjxwb2x5Z29uIHBvaW50cz0iMTEzLjQyIDQuMTMgMTA2LjI0IDExLjMxIDEyNC45NyAzMCAxMzIuMTUgMjIuODIgMTEzLjQyIDQuMTMiIHN0eWxlPSJmaWxsOnVybCgjZ3JhZGllbnQtMikiLz48cGF0aCBkPSJtMTI0Ljk3LDMwbC01Ljk2LDQuMDhjLTMuNDQsMi4zNS0zLjc0LDYuNzYtMi4xMSw5LjY4bDYuNSw5LjQ2YzEuNjMsMi45MSw1LDEuODUsNS43Ny0xLjVsMi4zMy0xMC41Yy43Ny0zLjMzLTEuMjQtNS45NS00LjM4LTYuNDNsLTQuMjYtLjczIiBzdHlsZT0iZmlsbDojY2RjZWNkIi8+PHBhdGggZD0ibTEwOC43Nyw0NC42MmMtLjQ3LTEuNDQtMS4yMi0xLjQ0LTEuNjksMGwtNS45MywxOC4wNGMtLjQ3LDEuNDQsMS4wOCwyLjUyLDEuOTUsMS4zOGw0LjM3LTUuNzJjLjg4LTEuMTUsMi40My0xLjE1LDIuODQsMGw0LjM3LDUuNzJjLjg4LDEuMDgsMi40My0uNDEsMS45NS0xLjM4bC01LjkyLTE4LjA0IiBzdHlsZT0iZmlsbDojY2RjZWNkIi8+PHBhdGggZD0ibTg4LjQsNDEuMmMtMy4zMy0uNzctNS45NSwxLjI0LTYuNDMsNC4zOGwtLjczLDQuMjZjLTIuMzUsMy40NC0yLjA1LDcuODYtLjg4LDExLjFsNy4yMiwxNC45NGMyLjMzLDUuMjUsNi43OSw1LjA0LDkuMjEsMS4xNWw2LjU3LTEwLjZjMS4xNS0xLjg1LC4wOS00LjE2LTEuNjMtNC42M2wtOS45Mi0yLjgyIiBzdHlsZT0iZmlsbDojY2RjZWNkIi8+PHBhdGggZD0ibTc4LjUxLDc4Ljk0Yy00LjY4LDAtOC40OC0zLjgtOC40OC04LjQ4czMuOC04LjQ4LDguNDgtOC40OCw4LjQ4LDMuOCw4LjQ4LDguNDgtMy44LDguNDgtOC40OCw4LjQ4Wm0wLTEyLjkxYy0yLjQ0LDAtNC40MywxLjk5LTQuNDMsNC40M3MxLjk5LDQuNDMsNC40Myw0LjQzLDQuNDMtMS45OSw0LjQzLTQuNDMtMS45OS00LjQzLTQuNDMtNC40MyIgZmlsbD0iI2NkY2VjZCIvPjxwYXRoIGQ9Im0xMDkuOTMsNjIuNDRjLTQuNjgsMC04LjQ4LTMuOC04LjQ4LTguNDhzMy44LTguNDgsOC40OC04LjQ4LDguNDgsMy44LDguNDgsOC40OC0zLjgsOC40OC04LjQ4LDguNDhabTAtMTIuOTFjLTIuNDQsMC00LjQzLDEuOTktNC40Myw0LjQzcywxLjk5LDQuNDMsNC40Myw0LjQzLDQuNDMtMS45OSw0LjQzLTQuNDMtMS45OS00LjQzLTQuNDMtNC40MyIgZmlsbD0iI2NkY2VjZCIvPjxwYXRoIGQ9Im0xMDIuOTMsMzEuMjJjLTQuNjgsMC04LjQ4LTMuOC04LjQ4LTguNDhzMy44LTguNDgsOC40OC04LjQ4LDguNDgsMy44LDguNDgsOC40OC0zLjgsOC40OC04LjQ4LDguNDhabTAtMTIuOTFjLTIuNDQsMC00LjQzLDEuOTktNC40Myw0LjQzcywxLjk5LDQuNDMsNC40Myw0LjQzLDQuNDMtMS45OSw0LjQzLTQuNDMtMS45OS00LjQzLTQuNDMtNC40MyIgZmlsbD0iI2NkY2VjZCIvPjxwYXRoIGQ9Im02Ni43NywzNS4yOGMtNC42OCwwLTguNDgtMy44LTguNDgtOC40OHMzLjgtOC40OCw4LjQ4LTguNDgsOC40OCwzLjgsOC40OCw4LjQ4LTMuOCw4LjQ4LTguNDgsOC40OFptMC0xMi45MWMtMi40NCwwLTQuNDMsMS45OS00LjQzLDQuNDNzMS45OSw0LjQzLDQuNDMsNC40Myw0LjQzLTEuOTksNC40My00LjQzLTEuOTktNC40My00LjQzLTQuNDMiIGZpbGw9IiNjZGNlY2QiLz48cG9seWdvbiBwb2ludHM9IjEyNi4yNiA0Mi4xMyAxNDQuNjQgNDIuMTMgMTUyLjc2IDY0LjQ1IDEzNC4zOCAxMDguMjYgMTE4LjQgMTA4LjI2IDEwMC4xMyA0Mi4xMyAxMjYuMjYgNDIuMTMiIHN0eWxlPSJmaWxsOnVybCgjZ3JhZGllbnQpIi8+PHBhdGggZD0ibTE2My44LDc3LjQ2aC0xNC40MnYyMi4xM2g2LjUxdjkuMzFoLTE1Ljc3di01MC4yMWgxNC4yNGMwLDAsMTEuMTYsMCwxMS4xNiwxMy45OCwwLDguMDMtNS4xNSwxMS43Ni01LjE1LDExLjc2bDcuMjksMjQuNDZoLTUuNzhaTTgxLjc5LDY5Ljg5aC0xNi41NGw4LjI1LTExLjE4LDguMjksMTEuMThaIiBmaWxsPSIjNGE0MDk4Ii8+PHBhdGggZD0ibTE2My44LDQ3LjY0aC0xNC40MnYxMy43OWgxNC4xM2M3LjA2LDAsNy4xOS02Ljg1LDcuMTktNi44OXMtLjI2LTYuOS03LjA2LTYuOWgtLjE0IiBmaWxsPSIjMjUyODU1Ii8+PHBhdGggZD0ibTE3My43Nyw4NS41N2gxNC4xM2wxMC4yNCwyMy43N2gtNy4wNmwtMS45OC00LjczaC0xMC4yNGwtMi4xMSw0LjczaC02LjY0bDEzLjY1LTIzLjc3Wm0xNC4xMy01Ljg3bC00LjczLDEwLjk5aDkuNDZsLTQuNzMtMTAuOTlaIiBmaWxsPSIjNDg0ODk4Ii8+PHBhdGggZD0ibTIxMy4wMyw5MC43NGgxMC42M3YxOC41OWgtMTkuOXYtNTAuMjFoMTkuOXYyMi4yN2gtMTAuNjN2LTkuNDZoMTAuNjN2LTkuNDZoLTEwLjYzdi0xMC41aC02LjUxbDEuNywyMS4zOGMwLDAsLjEzLDEuNzEtMS43LDEuNzFsLTEuNTYuMTNoLjg4bDEyLjAxLDEuNTZjMCwwLDIuMjQsLjEzLDIuMjQtMi4yNHYtMjAuNTZoNy4wNnY1MC4yMWgtNy4wNnYtMTguNTloLTEwLjYzdi04LjU1aDEwLjYzIiBmaWxsPSIjNGU0MDk4Ii8+PHBhdGggZD0ibTI0OC4yNiwxMDkuMzNoLTcuMDZ2LTUwLjIxaDcuMDZ2NTAuMjFaIiBmaWxsPSIjNGU0MDk4Ii8+PHBhdGggZD0ibTI0OC4yNiw0MC41MWgtNy4wNnYtMTEuNzZoNy4wNnYxMS43NloiIGZpbGw9IiM0ZTQwOTgiLz48cGF0aCBkPSJtMjcwLjYsOTAuODNoMTAuNjN2MTguNTFoLTE5Ljl2LTUwLjIxaDE5Ljl2MjIuMjdoLTEwLjYzdi05LjQ2aDEwLjYzdi05LjQ2aC0xMC42M3YtMTAuNWgtNi41MWwxLjcsMjEuMzhjMCwwLC4xMywxLjcxLTEuNywxLjcxLTEuNTYsMC0xLjU2LC4xMy0xLjU2LC4xM2guODhsMTIuMDEsMS41NmMwLDAsMi4yNCwuMTMsMi4yNC0yLjI0di0yMC41Nmg3LjA2djUwLjIxaC03LjA2di0xOC41MWgtMTAuNjN2LTguNDZoMTAuNjMiIGZpbGw9IiM0ZTQwOTgiLz48cGF0aCBkPSJtMzA5LjQyLDczLjM5bDEwLjEsMzUuOTRoLTYuNjRsLTEuODUtNi42NGgtMTEuNjVsLTEuODUsNi42NGgtNy4wNmwxMC4zNy0zNS45NGg4LjRaTTMwOS4xLDg4LjQzbC00LjI1LDE1aDguOTFsLTQuNjYtMTVoMFoiIGZpbGw9IiMzOTdiZDgiLz48cGF0aCBkPSJtMTgyLjM1LDY5Ljg5aC0xNi41NGw4LjI1LTExLjE4LDguMjksMTEuMThaIiBmaWxsPSIjM2E3YmQ4Ii8+PC9zdmc+"
      alt="BA Studio Logo"
      className="h-full w-auto object-contain"
    />
);

export const HomeIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const LightBulbIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const DocumentTextIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const TemplateIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

export const MenuIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const CloseIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const SunIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const MoonIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

export const ChartBarIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

export const InformationCircleIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const QuestionMarkCircleIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const SparklesIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export const NewspaperIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 6h6m-6 4h6m4-11h2m-2 4h2m-2 4h2M9 3v2m6 13V9" />
    </svg>
);

export const ClipboardListIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

export const XIcon = () => (
    <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

export const ExternalLinkIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);