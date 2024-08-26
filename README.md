# Next JS App Router Mui Starter Template

## Template Project Tech Stack

- React v18 ( Change To v19 Work In Progress )
- Next v14 ( App Router )
- Typescript v5
- Node v21.x
- Docker ( Containerization )
- Eslint ( Linting )
- Prettier ( Formatting )
- Husky ( Pre-Commit Validation )
- Import Sorting With @ianvs/prettier-plugin-sort-imports
- Redux Toolkit
- Zod ( Client Side Validation And Data Modelling )
- React-Hook-Form ( Form Validation )
- TanStack React Query v5 ( Caching, API Queries And Mutations )
- Prisma ( DB CRUD Operations )
- Pagination
- Internationalization ( i18next ) - Multilanguage Support
- Fully Responsive On Desktop, Tablet And Mobile
- Advance MUI Components
    - Light And Dark Themes
    - Count Up
    - Accordions
    - Graphs
    - Charts
    - Modals & Dialogs
    - Tabs
    - Mobile App Bottom Navigation Bar ( Work In Progress )
    - Multi-Layouts ( Work In Progress )
    - Website Keyboard Shortcut Cmd + K ( For Searching Through The Website Work In Progress )
    - Animations ( AOS But Changing Library To Framer Motion Work In Progress )
    - Date Pickers ( Work In Progress )
    - Carousels ( Work In Progress )
    - Drag And Drop ( Work In Progress )
    - File Uploads ( Work In Progress )
    - Maps ( react-map-gl and mapbox-gl Work In Progress )
    - Paginated Tables And Grids ( Changing To Mui-Data-Grid Work In Progress )

## Getting Started With The Package

### Environment Variables Needed

```
NEXT_PUBLIC_BACKEND_BASE_URL

# If Using Supabase
NEXT_PUBLIC_SUPABASE_REF_ID
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

# If Using Prisma
DATABASE_URL

# If Using AWS DynamoDB
NEXT_PUBLIC_AWS_ACCESS_KEY_ID
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
NEXT_PUBLIC_AWS_REGION
NEXT_PUBLIC_AWS_DYNAMO_DB_TABLE_NAME
```

### Seeding The Database

Make Sure You Have TSX installed, Use TSX to run seed file, it will allow you to use other neccessary dependencies
created in the project unlike mjs or js files

`npm install -g tsx`

`tsx src/mocks/seed-database.ts `

### Install Dependencies

`npm install`
