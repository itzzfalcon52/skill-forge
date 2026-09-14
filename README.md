# SkillForge

SkillForge is an online coding platform inspired by sites like LeetCode. I built this project to understand how an online judge actually works under the hood: how code is accepted from a browser, sent to an isolated execution environment, tested against test cases, evaluated for correctness, and tracked across users.

The platform lets users browse coding problems, write solutions in an in-browser code editor, run their code against predefined test cases, receive verdicts like Accepted or Wrong Answer, and see their past submissions. It also includes an admin workflow for creating problems with test cases and validating the problem's reference solution before it is saved.

---

## 1. Features

The repository includes the following working features:

- **Browse Problems**: Filter problems by title search, difficulty (Easy, Medium, Hard), and tags.
- **Problem Details**: Detailed view showing the problem statement, examples, constraints, hints, and editorial tabs.
- **In-Browser Code Editor**: Monaco Editor integration with language selection and theme toggle.
- **Multi-Language Support**: Solvers can write and execute code in Python, JavaScript, or C++.
- **Code Execution via Judge0**: Code execution is offloaded to Judge0 through RapidAPI.
- **Test-Case Based Judging**: Submissions are tested against problem test cases with per-test-case validation.
- **Execution Verdicts**: Supports verdicts including Accepted, Wrong Answer, Compilation Error, Runtime Error, Time Limit Exceeded, and Memory Limit Exceeded.
- **Detailed Execution Metrics**: Displays per-test-case status, execution time, memory usage, and error outputs (stderr or compile output).
- **Submission History**: Users can view their previous attempts on any problem, including timestamp, language, memory, time, and verdict.
- **Solved Problem Tracking**: Automatically records a solved status when a user gets an Accepted verdict on a problem.
- **User Authentication**: Handled through Clerk, with users onboarded into the local database with assigned roles (USER or ADMIN).
- **Admin Problem Creation**: Authorized admins can create new problems with examples, constraints, tags, test cases, code snippets, and reference solutions.
- **Reference Solution Validation**: During problem creation, the Python reference solution is tested against the provided test cases using Judge0 before the problem is saved to the database.
- **Playlists**: Users can create custom playlists, add problems to playlists, and view their playlists from their profile page.
- **User Profile**: Displays user statistics including total solved problems, total submissions, and created playlists.

---

## 2. Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 (App Router) | Full-stack framework providing client pages, API routes, and Server Actions. |
| React 19 | UI component architecture and client-side state management. |
| Prisma 7 | ORM used with `@prisma/adapter-pg` for schema modeling, migrations, and database queries. |
| PostgreSQL | Relational database storing users, problems, submissions, test case results, solved statuses, and playlists. |
| Clerk (`@clerk/nextjs`) | Authentication provider handling user registration, sign-in, session tokens, and route protection. |
| Judge0 | Remote code execution engine executing submitted code against test inputs inside sandboxed containers. |
| RapidAPI | API gateway used to connect to the hosted Judge0 CE API. |
| Monaco Editor (`@monaco-editor/react`) | In-browser code editor used on the problem solver page and admin problem creation form. |
| Tailwind CSS v4 | Utility CSS framework used for styling layouts, cards, dialogs, and tables. |
| Radix UI / Shadcn UI | Accessible primitive components (dialogs, tabs, tables, dropdowns, badges, buttons). |
| JavaScript | Primary language used across the codebase for frontend, server actions, and backend logic. |

---

## 3. How SkillForge Works

Here is the step-by-step lifecycle of how a user solves a problem:

1. **Authentication**: The user signs in using Clerk. The application onboards the user into PostgreSQL if a matching record does not already exist.
2. **Problem Selection**: The user navigates to the problems page, browses or filters problems, and clicks on a problem.
3. **Data Fetching**: The solver page calls `getProblemForSolver(problemId)` on the server.
4. **Sanitized Delivery**: The server returns problem details, starter code snippets, examples, constraints, and test inputs. Expected outputs and reference solutions are intentionally withheld from this response.
5. **Coding**: The user selects a language (JavaScript, Python, or C++) and edits the starter code inside the Monaco Editor.
6. **Code Submission**: The user clicks the "Run" button.
7. **Action Dispatch**: The client calls the `executeCode(source_code, language_id, problemId)` Server Action.
8. **User Verification**: The server verifies the user's session using Clerk's `currentUser()` and fetches the matching database user.
9. **Authoritative Test Cases**: The server retrieves the problem from PostgreSQL, including the authoritative test cases and their expected outputs.
10. **Batch Construction**: The server builds a batch payload consisting of the user's source code, the selected language ID, and each test case's `stdin` input.
11. **Dispatch to Judge0**: The server sends the batch to Judge0 via RapidAPI (`submitBatch`).
12. **Polling**: The server polls Judge0 (`pollBatchResults`) with the received tokens until all executions complete.
13. **Result Comparison**: The server iterates over the returned execution outputs and compares each `stdout` value against the authoritative expected output from PostgreSQL. It also checks for compilation errors, runtime exceptions, and timeout or memory limit flags.
14. **Verdict Generation**: If any test case fails, the overall submission status is marked accordingly (such as Wrong Answer, Compilation Error, or Runtime Error). If all test cases match, the status is marked as Accepted.
15. **Database Persistence**: The server creates a `Submission` record and multiple `TestCaseResult` records in PostgreSQL.
16. **Problem Solved Record**: If the verdict is Accepted, the server upserts a `ProblemSolved` record linking the user and problem.
17. **Client Feedback**: The server returns a sanitized submission object back to the client, which updates the UI with the final verdict and per-case results table.

---

## 4. Architecture

```text
+-----------------------------------------------------------+
|                          Browser                          |
|  - Next.js Client Components (Monaco Editor, UI tables)   |
+-----------------------------------------------------------+
                             |
                             | Server Actions / API calls
                             v
+-----------------------------------------------------------+
|                 Next.js App Router (Node.js)              |
|  - Clerk Middleware & Auth checks                         |
|  - Server Actions (executeCode, getProblemForSolver)       |
|  - API Routes (/api/create-problem, /api/playlists)       |
+-----------------------------------------------------------+
         |                          |                    |
         | Auth verification        | Database queries   | Code execution
         v                          v                    v
+------------------+     +---------------------+  +-----------------+
|      Clerk       |     |     PostgreSQL      |  |     RapidAPI    |
| (Auth & Sessions)|     |  (via Prisma ORM)   |  |   (Judge0 CE)   |
+------------------+     +---------------------+  +-----------------+
                                                           |
                                                           v
                                                  +-----------------+
                                                  |     Judge0      |
                                                  | (Code Execution |
                                                  |    Sandboxes)   |
                                                  +-----------------+
```

### Component Roles

- **Browser**: Runs the React-based user interface, manages editor input, displays problem descriptions, and triggers server actions.
- **Next.js**: Acts as the single application backend. It runs server actions, protects routes, coordinates with Clerk, talks to PostgreSQL via Prisma, and interfaces with the external Judge0 API.
- **Clerk**: Manages identity, registration, sign-in sessions, and provides user tokens that are mapped to database user records.
- **PostgreSQL + Prisma**: Stores relational application data: user records, problem statements, test cases, submissions, individual test case results, solved flags, and user playlists.
- **RapidAPI**: Acts as the gateway endpoint provider for accessing the hosted Judge0 Community Edition API.
- **Judge0**: An external code execution service that runs submitted source code against provided `stdin` inside isolated execution workers and returns execution output, exit codes, resource metrics, and status messages.

---

## 5. Code Execution and Judging Workflow

Judging is handled entirely on the server side to ensure integrity. The execution flow is implemented in `src/modules/problems/actions/index.js` inside `executeCode`:

```text
User clicks Run
       ↓
executeCode(source_code, language_id, problemId)
       ↓
Verify Clerk session (currentUser)
       ↓
Find database User (clerkId lookup)
       ↓
Fetch Problem from PostgreSQL (retrieve testCases)
       ↓
Extract stdin and expected_outputs from database testCases
       ↓
Build batch requests (source_code, language_id, stdin)
       ↓
submitBatch() -> POST to RapidAPI Judge0 batch endpoint
       ↓
pollBatchResults() -> Loop GET request until status_id not in [1, 2]
       ↓
Receive raw Judge0 results (stdout, stderr, compile_output, time, memory)
       ↓
Compare stdout with authoritative expected_outputs
       ↓
Compute overall verdict (Accepted, Wrong Answer, Compilation Error, etc.)
       ↓
db.submission.create() -> Save submission
       ↓
db.testCaseResult.createMany() -> Save per-test-case records
       ↓
If Accepted: db.problemSolved.upsert()
       ↓
Return sanitized submission to client
```

### Core Data Fields Explained

- `source_code`: The user's solution code string submitted from the Monaco Editor.
- `language_id`: The integer ID identifying the compiler or runtime to Judge0 (e.g. 71 for Python, 63 for JavaScript, 54 for C++).
- `stdin`: The raw input string passed to the running program through standard input.
- `stdout`: The string emitted by the program on standard output during execution.
- `expected output`: The reference output stored with the problem in PostgreSQL. This is authoritative data and is never supplied by the solver client.
- `status`: The evaluation outcome. Possible values include Accepted, Wrong Answer, Compilation Error, Runtime Error, Time Limit Exceeded, or Memory Limit Exceeded.
- `memory`: Memory consumed by the process as reported by Judge0 (converted to KB).
- `time`: CPU time spent during execution as reported by Judge0 (in seconds).
- `Submission`: The top-level database record representing a single attempt at solving a problem.
- `TestCaseResult`: A database record storing the granular outcome of a single test case under a submission.
- `ProblemSolved`: A tracking record that guarantees a user is marked as having solved a problem once an Accepted verdict is achieved.

---

## 6. Important Security and Data Flow Design

An important design requirement for an online judge is establishing a clear trust boundary between the solver client and the server.

### The Trust Boundary

The solver client sends only:
- `source_code`: The code written by the user.
- `language_id`: The target language ID.
- `id`: The target problem ID.

The solver client does NOT send:
- Expected test case outputs.
- User ID (the server derives this from the verified session).
- Reference solutions or validation rules.

### Server-Side Guarantees

1. **Server-Side Expected Outputs**: The server ignores any client assumptions about expected outputs. It fetches the problem directly from PostgreSQL and uses the stored outputs as the sole authority.
2. **Sanitized Solver Problem View**: When a user opens a problem, the server calls `getProblemForSolver()`. This function explicitly omits `referenceSolution` and strips the `output` field from every item in `testCases` before sending data to the browser.
3. **Sanitized Submission Response**: When `executeCode()` completes, it cleans the returned submission object to remove raw expected outputs before sending the result back to the frontend.
4. **Identity Enforcement**: The user ID associated with submissions and solved records is always looked up from the verified Clerk session token on the server. A user cannot submit code on behalf of another user.

This structure protects the problem test cases from being inspected directly from network payloads or client state.

---

## 7. Problem Creation / Admin Workflow

Problem creation is restricted to users with the `ADMIN` role. The workflow is handled through `src/app/api/create-problem/route.js` and `src/modules/problems/components/CreateProblemForm.jsx`.

```text
Admin User opens /create-problem
       ↓
Fills out problem details:
- Title, Description, Difficulty, Tags
- Examples, Constraints, Hints, Editorial
- Test cases (inputs and expected outputs)
- Starter code snippets (JavaScript, Python, C++)
- Reference solutions (including Python)
       ↓
Submits form to POST /api/create-problem
       ↓
Server checks currentUserRole() === "ADMIN"
       ↓
Server validates required fields and presence of referenceSolution.PYTHON
       ↓
Server submits reference Python code + test cases to Judge0 batch API
       ↓
Server polls Judge0 results
       ↓
Checks that every test case returned status_id === 3 (Accepted)
       ↓
If validation fails:
- Abort creation and return 400 with test case failure details
       ↓
If validation passes:
- Store problem in PostgreSQL via db.problem.create()
- Mark isVerified = false (or admin verified)
```

### Why Reference Solution Validation Exists

Allowing a problem with faulty test cases or an incorrect reference solution breaks the platform for all solvers. Before any problem is written to the database, the server compiles and executes the problem creator's reference Python solution against all supplied test cases through Judge0.

If the reference solution produces an incorrect output, triggers a runtime exception, or times out, the problem is rejected with an error indicating which test case failed.

*Note: Currently, reference validation specifically runs against the Python reference solution.*

---

## 8. Database Design

The database schema is defined in `prisma/schema.prisma` and managed through Prisma ORM.

### Entity Relationship Overview

```text
User
 ├── Submissions (1:N)
 ├── Problems created (1:N)
 ├── ProblemSolved (1:N)
 └── Playlists (1:N)

Problem
 ├── Submissions (1:N)
 ├── ProblemSolved (1:N)
 └── ProblemInPlaylist (1:N)

Submission
 └── TestCaseResult (1:N)

Playlist
 └── ProblemInPlaylist (1:N)
```

### Key Models

- **User**: Represents a registered user.
  - `id`: UUID primary key.
  - `clerkId`: Unique Clerk user identifier.
  - `email`: User email address.
  - `role`: Enum with values `USER` or `ADMIN`.
  - `firstName`, `lastName`, `imageUrl`: Profile details.
  - Relations: `submissions`, `problems`, `solvedProblems`, `playlists`.

- **Problem**: Represents a coding problem.
  - `id`: UUID primary key.
  - `title`, `description`, `difficulty` (EASY, MEDIUM, HARD), `tags`.
  - `examples`, `constraints`, `hints`, `editorial`.
  - `testCases`: JSON array containing inputs and expected outputs.
  - `codeSnippets`: JSON containing starter templates for each supported language.
  - `referenceSolution`: JSON containing reference solutions.
  - `userId`: Foreign key linking to the admin creator.
  - `isVerified`: Boolean indicating verification status.

- **Submission**: Represents a single code execution attempt.
  - `id`: UUID primary key.
  - `userId`, `problemId`: Foreign keys.
  - `sourceCode`: JSON containing submitted code.
  - `language`: Language name string (python, javascript, cpp).
  - `stdin`, `stdout`, `stderr`, `compileOutput`.
  - `status`: Overall verdict (Accepted, Wrong Answer, etc.).
  - `time`, `memory`: Metrics reported by the judge.
  - `submittedAt`: Timestamp.

- **TestCaseResult**: Represents the execution outcome for one specific test case in a submission.
  - `id`: UUID primary key.
  - `submissionId`: Foreign key linking to the parent submission.
  - `testCase`: 1-based index of the test case.
  - `passed`: Boolean indicating match.
  - `stdout`, `expected`, `stderr`, `compileOutput`, `status`, `time`, `memory`.

- **ProblemSolved**: Join record tracking whether a user has successfully solved a problem.
  - Uses a compound unique constraint `@@unique([userId, problemId])` to prevent duplicate records.

- **Playlist & ProblemInPlaylist**: Allows users to organize problems into custom lists.
  - `Playlist`: Holds name, optional description, and creator `userId`.
  - `ProblemInPlaylist`: Join model linking a problem to a playlist.

---

## 9. Project Structure

```text
skill-forge/
├── prisma/
│   ├── schema.prisma         # Prisma schema definitions
│   ├── seed.js               # Database problem seeding script
│   └── migrations/           # Database migration files
├── prisma.config.ts          # Prisma configuration for migrations and seed
├── public/                   # Static assets and icons
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Clerk sign-in and sign-up routes
│   │   ├── (root)/           # Main application shell
│   │   │   ├── problems/     # Problem listing page
│   │   │   ├── profile/      # User profile and stats
│   │   │   └── my-playlists/ # User playlists view
│   │   ├── create-problem/   # Admin problem creation page
│   │   ├── problem/[id]/     # Problem solver page with Monaco editor
│   │   ├── api/              # Route handlers
│   │   │   ├── create-problem/
│   │   │   └── playlists/
│   │   ├── layout.js         # Root layout with ClerkProvider
│   │   └── globals.css       # Global styles and Tailwind configuration
│   ├── components/           # Shared UI components
│   │   ├── ui/               # Radix / Shadcn primitive components
│   │   └── providers/        # Theme providers
│   ├── lib/                  # Shared utilities
│   │   ├── db.js             # Prisma client connection instance
│   │   ├── judge0.js         # Judge0 client, batch submission, polling logic
│   │   └── utils.js          # Tailwind class merging helper
│   ├── modules/              # Domain-specific modules
│   │   ├── auth/             # Clerk user onboarding and role queries
│   │   ├── problems/         # Problem actions, solver UI, tables, modals
│   │   └── profile/          # Profile queries and components
│   ├── seed/                 # Problem seed datasets (DP, strings)
│   └── proxy.js              # Clerk middleware configuration
├── package.json              # Project dependencies and npm scripts
└── package-lock.json         # Pinned dependency tree
```

### Notable Modules

- `src/lib/judge0.js`: Contains functions to map language names to Judge0 IDs, submit batches to the RapidAPI Judge0 endpoint, and poll results until execution finishes.
- `src/modules/problems/actions/index.js`: Houses server actions for loading problems (`getProblemForSolver`), running submissions (`executeCode`), fetching past attempts (`getSubmissionByCurrentUserForProblem`), and deleting problems.
- `src/app/problem/[id]/page.jsx`: The solver interface integrating the Monaco Editor, tab navigation (submissions, hints, editorial), test case run button, and execution result tables.
- `src/app/api/create-problem/route.js`: The admin API endpoint that validates the Python reference solution through Judge0 before storing the problem.

---

## 10. Local Development Setup

Follow these steps to run SkillForge locally:

### 1. Clone the repository

```bash
git clone https://github.com/itzzfalcon52/skill-forge.git
cd skill-forge
```

### 2. Install dependencies

This project uses `npm` (as indicated by `package-lock.json`):

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` or `.env.local` file in the root directory. Add the following required keys:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/skillforge?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Judge0 via RapidAPI
RAPIDAPI_JUDGE0_KEY=your_rapidapi_key_here
RAPIDAPI_JUDGE0_HOST="judge0-ce.p.rapidapi.com"
```

Do not commit real secret values to version control.

---

## 11. Database Setup

SkillForge requires a running PostgreSQL instance.

### 1. Run migrations or push schema

Once your `DATABASE_URL` is set in your environment file, initialize the database schema:

```bash
npx prisma db push
```

Alternatively, if you want to use migrations:

```bash
npx prisma migrate dev
```

Generate the local Prisma client:

```bash
npx prisma generate
```

### 2. Seed problems (Optional)

The repository includes a collection of programming problems in `src/seed/`. The seed runner (`prisma/seed.js`) requires at least one `ADMIN` user to exist in the database because every problem must link to a creator `userId`.

1. Start the application and sign up through the Clerk interface.
2. Update your user record in PostgreSQL to have the `ADMIN` role:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

3. Run the seed script:

```bash
npm run seed
```

This runs `npx prisma db seed` using the seed runner defined in `prisma.config.ts`.

---

## 12. Running the Project

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Ensure PostgreSQL is accessible and your Clerk and RapidAPI Judge0 environment variables are populated before testing code submissions.

---

## 13. Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

*Note: Ensure all required environment variables are set in your production environment before triggering the build.*

---

## 14. Judge0 Integration

SkillForge does not maintain its own execution sandbox workers. Instead, it delegates code execution to the external Judge0 Community Edition service hosted on RapidAPI.

The integration is configured in `src/lib/judge0.js`:

- **API Base URL**: `https://judge0-ce.p.rapidapi.com`
- **Supported Languages and IDs**:
  - Python: `71`
  - JavaScript: `63`
  - C++: `54`
- **Batch Submission**: Requests are sent to `POST /submissions/batch?base64_encoded=false` with code, language ID, and test inputs.
- **Result Polling**: The server polls `GET /submissions/batch?tokens=...` at 1.5-second intervals until all submissions have finished processing (`status_id` outside of 1 [In Queue] and 2 [Processing]).

---

## 15. Authentication and Authorization

### Authentication

Authentication is handled by Clerk (`@clerk/nextjs`). Clerk manages the login lifecycle, session cookies, and user identity.

When a user logs in, the `onBoardUser` server action synchronizes the Clerk user into the PostgreSQL `User` table using an upsert operation on `clerkId`. This ensures the database always has an internal UUID reference for the user.

### Authorization

Authorization is determined by the `role` column on the `User` record (`USER` or `ADMIN`):

- **Normal Users (`USER`)**: Can view problems, execute code, save submission records, and manage personal playlists.
- **Admins (`ADMIN`)**: Have access to the problem creation portal (`/create-problem`) and problem deletion actions. The `currentUserRole()` function queries the database to verify the user's role before allowing admin actions.

---

## 16. Submission History

Every time a user runs code, the outcome is stored in the database. Submissions are associated with both the problem and the authenticated user:

```text
Clerk Session Token
        ↓
Clerk User ID (clerkId)
        ↓
Database User (id)
        ↓
Submission.userId  <-----+
                         |  Queried together
Submission.problemId <---+
```

When a user loads the submissions tab on a problem page, the application calls `getSubmissionByCurrentUserForProblem(problemId)`.

The query filters submissions where `problemId` matches the open problem and `userId` matches the currently authenticated database user. Users only see their own submission history.

---

## 17. Current Limitations

Being realistic about the current state of the codebase:

- **Third-Party Dependency on RapidAPI / Judge0**: Execution speed and availability depend entirely on the external RapidAPI Judge0 endpoint. If the RapidAPI key expires, hits quota limits, or faces latency, code execution stalls.
- **Synchronous Polling**: The server action polls Judge0 in a blocking `while` loop with a 1.5-second sleep interval. Under heavy concurrent usage, holding server action connections open while polling is inefficient compared to webhooks or a background worker queue.
- **Language Set**: Only three languages (Python, JavaScript, C++) are currently mapped in `src/lib/judge0.js`.
- **Reference Solution Validation Scope**: Admin problem creation only tests the Python reference solution against test cases. JavaScript and C++ reference solutions are not validated before saving.
- **No Solver Custom Test Cases**: Solvers currently run their code exclusively against the problem's predefined test cases. There is no custom input runner in the UI yet.
- **Unpaginated Submission Tab**: Problem submissions are fetched as a single list without pagination.

---

## 18. Future Improvements

Practical areas for improvement based on the existing architecture:

- Switch Judge0 integration from active polling to webhook callbacks or background job queues.
- Add support for more languages (such as Java, Go, TypeScript, and Rust).
- Add validation for JavaScript and C++ reference solutions during problem creation.
- Add an interactive custom input tab allowing solvers to test arbitrary inputs before submitting.
- Introduce pagination for problem listings and submission histories.
- Add execution rate limiting to prevent spamming execution requests against the Judge0 API.

---

## 19. Learning and Project Context

Building SkillForge was an exercise in understanding how full-stack developer tools and online judges function behind the scenes.

Key takeaways from building it:

- **Server-Side Trust Boundaries**: Learning why critical evaluation data (expected outputs, reference solutions) must never be trusted to or exposed on the client.
- **Asynchronous Execution Flow**: Managing the dispatch, batching, and polling lifecycle of an external sandbox execution service.
- **Relational Data Modeling**: Structuring schemas with Prisma to link authentication identities, problem statements, submissions, per-test-case results, and solved state.
- **Decoupling Auth from Application Logic**: Understanding how to use an external provider (Clerk) for identity while maintaining internal database authority over user roles and relationships.

---

## 20. License

No license has been specified for this project yet. All rights are reserved by the repository owner.
