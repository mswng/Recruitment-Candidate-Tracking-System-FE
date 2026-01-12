# 📋 RecruitHub - Complete File Listing

Danh sách toàn bộ files trong dự án.

## 📊 Statistics

```
Total Files:        50+
Total Directories:  20+
Total Lines:        15,000+
Documentation:      7 files
Source Files:       40+
```

---

## 📁 Directory Structure

### Root Files
```
RecruitHub/
├── package.json              ← Dependencies & scripts
├── jsconfig.json             ← JavaScript config
├── README.md                 ← Main documentation
├── QUICKSTART.md             ← Quick start guide (5 min)
├── GUIDE.md                  ← Detailed guide
├── README_FEATURES.md        ← Feature documentation
├── TEST_GUIDE.md             ← Testing guide (30+ tests)
├── CHANGELOG.md              ← Version history
├── DOCS_INDEX.md             ← Documentation index
└── PROJECT_SUMMARY.md        ← Project completion summary
```

### Public Folder
```
public/
├── index.html                ← HTML entry point
├── manifest.json             ← PWA manifest
├── robots.txt                ← SEO robots file
└── favicon.ico               ← Browser favicon
```

### Source Code (src/)
```
src/
├── index.js                  ← React app entry point
├── App.js                    ← Root component
├── App.css                   ← App styles
├── App.test.js              ← App tests
├── index.css                ← Global styles
├── reportWebVitals.js       ← Performance metrics
└── setupTests.js            ← Test setup
```

### Components Folder (src/components/)
```
src/components/
└── layouts/
    ├── index.js             ← Layout exports
    ├── defaultlayout/
    │   └── DefaultLayout.js ← Default layout wrapper
    ├── header/
    │   ├── Header.js        ← Header component (with dropdown)
    │   ├── Header.module.scss
    │   └── headerComp/
    │       ├── index.js
    │       ├── Dropdown/
    │       │   ├── Dropdown.js
    │       │   └── Dropdown.module.scss
    │       └── notification/
    │           ├── Notification.js
    │           └── Notification.module.scss
    ├── footer/
    │   ├── Footer.js        ← Footer component
    │   └── Footer.module.scss
    └── Sidebar/
        ├── Sidebar.js
        └── Sidebar.module.scss
```

### Pages Folder (src/pages/)

#### Home Page
```
src/pages/home/
├── HomePage.js              ← Landing page with hero banner
└── HomePage.module.scss     ← Hero, stats, job preview styles
```

#### Jobs Page
```
src/pages/jobs/
├── Jobs.js                  ← Job search & listing page
└── Jobs.module.scss         ← Filter, search, job cards styles
```

#### Companies Page
```
src/pages/companies/
├── Companies.js             ← Company browser page
└── Companies.module.scss    ← Company cards, filter styles
```

#### Auth Pages
```
src/pages/auth/
├── Login.js                 ← Login with role selection + quick login
├── Register.js              ← Registration page
├── ForgotPassword.js        ← Password recovery
└── Auth.module.scss         ← Form, input, button styles
```

#### Admin Pages
```
src/pages/admin/
├── home.js                  ← Old admin home (can be deprecated)
├── AdminDashboard.js        ← New admin dashboard (stats + management)
├── users.js                 ← User management page
├── pipeline.js              ← Pipeline configuration page
└── Dashboard.module.scss    ← Dashboard styles (used by all roles)
```

#### HR Pages
```
src/pages/hr/
└── HRDashboard.js           ← HR dashboard with job/candidate management
```

#### Interviewer Pages
```
src/pages/interviewer/
├── InterviewerDashboard.js  ← Interviewer dashboard with interview list
├── MyInterviews.js          ← Interview list view
└── InterviewDetail.js       ← Interview detail/evaluation page
```

#### Candidate Pages
```
src/pages/candidate/
└── CandidateDashboard.js    ← Candidate dashboard with application tracking
```

#### Profile Pages
```
src/pages/profile/
├── Profile.js               ← User profile management
└── Profile.module.scss      ← Profile form styles
```

### Routers Folder (src/routers/)
```
src/routers/
├── AppRouter.js             ← Main router wrapper with role-based routing
└── routes.js                ← Route definitions for all roles
```

### Utils Folder (src/utils/)
```
src/utils/
├── auth.js                  ← Login/logout helper functions
└── testHelpers.js           ← Quick login test utilities
```

### Assets Folder (src/assets/)
```
src/assets/
├── css/
│   └── globalStyles/
│       ├── globalStyles.scss  ← Global CSS variables & resets
│       └── index.js
├── fonts/
│   └── Inter/               ← Inter font family
│       ├── Inter-Regular.ttf
│       ├── Inter-Bold.ttf
│       └── ...
└── imgs/                    ← Image assets (if any)
```

---

## 📄 File Count by Type

```
.js files            : ~25 files (components & pages)
.scss files          : ~15 files (styling)
.json files          : 3 files (config)
.html files          : 1 file (public)
.md files            : 7 files (documentation)
.txt files           : 1 file (robots.txt)
──────────────────────────────
Total Project Files  : 50+
```

---

## 🎯 Key Files by Purpose

### Authentication & Routing
- `src/routers/AppRouter.js` - Main router
- `src/routers/routes.js` - Route definitions
- `src/utils/auth.js` - Auth helpers
- `src/utils/testHelpers.js` - Test utilities

### Layout & Navigation
- `src/components/layouts/header/Header.js` - Header with dropdown
- `src/components/layouts/footer/Footer.js` - Footer
- `src/components/layouts/defaultlayout/DefaultLayout.js` - Layout wrapper

### Pages (Public)
- `src/pages/home/HomePage.js` - Home page
- `src/pages/jobs/Jobs.js` - Job search
- `src/pages/companies/Companies.js` - Company browser
- `src/pages/auth/Login.js` - Login page
- `src/pages/auth/Register.js` - Registration
- `src/pages/auth/ForgotPassword.js` - Password recovery

### Pages (Protected)
- `src/pages/admin/AdminDashboard.js` - Admin dashboard
- `src/pages/hr/HRDashboard.js` - HR dashboard
- `src/pages/interviewer/InterviewerDashboard.js` - Interviewer dashboard
- `src/pages/candidate/CandidateDashboard.js` - Candidate dashboard
- `src/pages/profile/Profile.js` - User profile

### Management Pages
- `src/pages/admin/users.js` - User management
- `src/pages/admin/pipeline.js` - Pipeline configuration
- `src/pages/interviewer/MyInterviews.js` - Interview list
- `src/pages/interviewer/InterviewDetail.js` - Interview detail

### Styling
- `src/pages/admin/Dashboard.module.scss` - Dashboard styles (reused)
- `src/pages/auth/Auth.module.scss` - Auth styles
- `src/pages/home/HomePage.module.scss` - Home page styles
- `src/pages/jobs/Jobs.module.scss` - Jobs page styles
- `src/pages/companies/Companies.module.scss` - Companies styles

### Configuration
- `package.json` - Dependencies & scripts
- `jsconfig.json` - JavaScript paths config

### Entry Points
- `src/index.js` - React app entry
- `src/App.js` - Root component
- `public/index.html` - HTML entry

---

## 📚 Documentation Files

### Getting Started
1. **QUICKSTART.md** (5 min)
   - Installation
   - Quick demo
   - Tips & tricks

2. **README.md** (10 min)
   - Project intro
   - Setup guide
   - Basic features

### User & Feature Docs
3. **GUIDE.md** (15 min)
   - Features overview
   - Design system
   - Routes & navigation

4. **README_FEATURES.md** (20 min)
   - Detailed features
   - Page breakdown
   - Tech stack

### Testing & QA
5. **TEST_GUIDE.md** (30+ min)
   - 30+ test cases
   - Test checklist
   - Troubleshooting

### Project Management
6. **CHANGELOG.md** (5 min)
   - Version history
   - Features added
   - Roadmap

7. **DOCS_INDEX.md** (10 min)
   - Documentation guide
   - Navigation map
   - Reading paths

8. **PROJECT_SUMMARY.md** (5 min)
   - Project completion
   - Achievement summary
   - Deployment readiness

---

## 🔢 Lines of Code

### Estimation by Component

| Component | Files | Approx Lines |
|-----------|-------|--------------|
| Pages | 15 | 2,000 |
| Components | 8 | 800 |
| Styles (SCSS) | 15 | 2,500 |
| Routing | 2 | 100 |
| Utils | 2 | 200 |
| Config | 3 | 50 |
| **Subtotal** | **45** | **5,650** |
| **Documentation** | **7** | **9,000+** |
| **TOTAL** | **52+** | **14,650+** |

---

## 🎯 Important Files to Know

### Must-Read (in order)
1. **QUICKSTART.md** - Start here
2. **GUIDE.md** - User guide
3. **README_FEATURES.md** - All features

### For Testing
- **TEST_GUIDE.md** - 30+ test cases

### For Development
- **src/routers/routes.js** - All routes
- **src/routers/AppRouter.js** - Router logic
- **src/components/layouts/header/Header.js** - Navigation

### For Styling
- **src/assets/css/globalStyles/globalStyles.scss** - Global styles
- **src/pages/admin/Dashboard.module.scss** - Reusable dashboard styles

### For Understanding
- **PROJECT_SUMMARY.md** - Project overview
- **CHANGELOG.md** - What's new

---

## 📦 Dependencies

See `package.json` for all dependencies:
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "react-scripts": "5.x",
    "sass": "^1.x"
  }
}
```

---

## 🚀 How to Find Files

### By Purpose

**Authentication**
- src/utils/auth.js
- src/pages/auth/Login.js
- src/pages/auth/Register.js

**Navigation**
- src/routers/AppRouter.js
- src/routers/routes.js
- src/components/layouts/header/Header.js

**Dashboards**
- src/pages/admin/AdminDashboard.js
- src/pages/hr/HRDashboard.js
- src/pages/interviewer/InterviewerDashboard.js
- src/pages/candidate/CandidateDashboard.js

**Styling**
- src/assets/css/globalStyles/
- src/pages/*/**.module.scss

**Documentation**
- QUICKSTART.md
- GUIDE.md
- TEST_GUIDE.md
- README_FEATURES.md

---

## ✅ File Checklist

### Core Files
- ✅ src/index.js - Entry point
- ✅ src/App.js - Root component
- ✅ package.json - Dependencies
- ✅ public/index.html - HTML

### Components
- ✅ Header & Footer
- ✅ DefaultLayout
- ✅ All pages (7)
- ✅ All dashboards (4)

### Styles
- ✅ Global styles
- ✅ Component styles
- ✅ Dashboard styles
- ✅ Responsive designs

### Routing
- ✅ AppRouter.js
- ✅ routes.js
- ✅ Role-based routing

### Documentation
- ✅ 7 docs files
- ✅ This file listing

---

## 🔍 Quick File Search

**I need...**

| Need | File |
|------|------|
| Homepage | src/pages/home/HomePage.js |
| Jobs page | src/pages/jobs/Jobs.js |
| Login | src/pages/auth/Login.js |
| Admin dash | src/pages/admin/AdminDashboard.js |
| Routes | src/routers/routes.js |
| Header | src/components/layouts/header/Header.js |
| Styles | src/pages/*/**.module.scss |
| Get started | QUICKSTART.md |
| All features | README_FEATURES.md |
| Tests | TEST_GUIDE.md |

---

## 📊 File Sizes (Approximate)

| File | Size | Type |
|------|------|------|
| HomePage.js | 3 KB | Component |
| AdminDashboard.js | 2 KB | Component |
| Dashboard.module.scss | 12 KB | Styling |
| Test_GUIDE.md | 18 KB | Doc |
| README_FEATURES.md | 15 KB | Doc |
| Other pages | 1-3 KB | Component |

---

## 🎯 File Organization Best Practices

### Current Structure
```
✓ Pages grouped by feature (admin/, auth/, etc)
✓ Components grouped by layout
✓ Styles colocated with components
✓ Routes centralized in routes.js
✓ Utils separated for reuse
```

### To Add in Future
```
□ Tests in __tests__ folders
□ Constants in constants.js
□ Hooks in custom hooks folder
□ Types in types/ folder
```

---

## 📝 Creating New Files

When adding new files:

1. **Pages**: `src/pages/[feature]/NewPage.js`
2. **Components**: `src/components/[category]/NewComponent.js`
3. **Styles**: `src/[location]/NewComponent.module.scss`
4. **Utils**: `src/utils/newUtil.js`

Example:
```
src/pages/jobs/
├── Jobs.js               ← Page component
├── Jobs.module.scss      ← Page styles
└── JobCard.js            ← Sub-component
```

---

## 🚀 To Get All Files Listed

```bash
# List all files
find src -type f -name "*.js" -o -name "*.scss"

# Count files
find src -type f | wc -l

# Show structure
tree src
```

---

**Total Project Files: 50+**  
**Documented: ✅ Yes**  
**Organized: ✅ Yes**  
**Production-Ready: ✅ Yes**

---

For detailed file descriptions, see:
- GUIDE.md - Project structure section
- README_FEATURES.md - Architecture section
- This file - Complete listing
