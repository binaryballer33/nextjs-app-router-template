# Next JS App Router Mui Starter Template

## About

This Template Uses The Following Technologies

- React
- Next
- Typescript
- MUI ( Light And Dark Themes )
- Redux
- Redux Toolkit
- TanStack React Query v5
- Pagination
- Prisma
- Zod
- React-Hook-Form ( Work In Progress )
- Multilanguage Support
- Eslint ( linting )
- Prettier ( formatting )
- Husky ( pre-commit validation )
- Import Sorting With @ianvs/prettier-plugin-sort-imports
- Fully Desktop / Tablet / Mobile Responsive
- Advance Components
    - Animate On Scroll ( AOS )
    - Count Up
        - Carousels ( Work In Progress )
        - Accordions
        - Graphs, Charts
        - Modals
        - Tabs

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

Run npm install or use script ( Work In Progress )
