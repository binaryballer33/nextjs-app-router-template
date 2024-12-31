# Next JS App Router Starter Template

## Template Project Tech Stack

-   React v18
-   Next v14 ( App Router )
-   Typescript v5
-   Node v20.x
-   Docker ( Containerization )
-   Eslint ( Linting )
-   Prettier ( Formatting )
-   Import, Objects, Types And JSX Props Sorting With Perfectionist
-   Husky ( Pre-Commit Validation )
-   Redux Toolkit
-   Zod ( Client Side Validation And Data Modelling )
-   React-Hook-Form ( Form Validation )
-   Server Actions ( API Endpoints )
-   TanStack React Query v5 ( Caching, API Queries And Mutations )
-   Authentication ( Next Auth v5 )
    -   Login
    -   Register
    -   Account Verification
    -   Forgot Password
    -   Two-Factor Authentication
-   Personalized Emails ( Resend and React Email )
-   Postgres Database Provider ( Supabase, Can Be Any Database Provider )
-   Prisma ORM ( DB CRUD Operations, Type Generation )
-   Pagination
-   Internationalization ( i18next ) - Multilanguage Support
-   Fully Responsive On Desktop, Tablet And Mobile
-   Advance React Components
    -   Light And Dark Themes
    -   Count Up
    -   Accordions
    -   Graphs
    -   Charts
    -   Modals & Dialogs
    -   Tabs
    -   Mobile App Bottom Navigation Bar ( Work In Progress )
    -   Multi-Layouts ( Work In Progress )
    -   Website Keyboard Shortcut Cmd + K ( For Searching Through The Website Work In Progress )
    -   Animations ( AOS But Changing Library To Framer Motion Work In Progress )
    -   Date Pickers ( Work In Progress )
    -   Carousels ( Work In Progress )
    -   Drag And Drop ( Work In Progress )
    -   File Uploads ( Work In Progress )
    -   Maps ( react-map-gl and mapbox-gl Work In Progress )
    -   Paginated Tables And Grids

## Getting Started With The Package

Package Manager Is Bun, But You Can Use NPM, Yarn or Pnpm

```
bun install

# or

npm install

# or

yarn install

# or

pnpm install

```

### Environment Variables Needed

```
NEXT_PUBLIC_BACKEND_BASE_URL

# If Using Supabase ( there's a branch for this implementation )
NEXT_PUBLIC_SUPABASE_REF_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# if Using Next Auth
AUTH_SECRET=

# if Using Google Or Facebook OAuth Providers
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_FACEBOOK_ID=
AUTH_FACEBOOK_SECRET=

# If Using Prisma
DATABASE_URL=

# If Using AWS DynamoDB ( there's a branch for this implementation )
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=
NEXT_PUBLIC_AWS_REGION=
NEXT_PUBLIC_AWS_DYNAMO_DB_TABLE_NAME=
```

### Seeding The Database

Make Sure You Have TSX installed, Use TSX to run seed file, it will allow you to use other necessary dependencies
created in the project unlike mjs or js files

`npm install -g tsx`

`tsx prisma/seed-db/seed-database.ts `

### Install Dependencies

`npm install`
