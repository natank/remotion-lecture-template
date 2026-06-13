## Practical Example

**App: Mini Ticketing System**
see `./docs/lecture-planning.md` for more details.
A simple full-stack web application: a support/task ticketing board with a REST API backend and a React frontend. Chosen because it is immediately relatable, involves real SDLC decisions, and demonstrates the full AI-assisted dev loop (spec → design → implement → verify) within a single live session.

### applicable documents
- `./docs/lecture-planning.md` - lecture planning document

### Tech stack
- **Backend:** Node.js + Express (TypeScript), in-memory store (no DB setup needed for demo)
- **Frontend:** React + Vite (TypeScript), Tailwind CSS for quick styling
- **Communication:** REST API over JSON

### Features to build live (ordered by SDLC phase)

| # | Feature | SDLC phase demonstrated |
|---|---------|------------------------|
| 1 | `GET /tickets` — list all tickets | Spec + Implementation |
| 2 | `POST /tickets` — create a ticket (title, description, priority) | Implementation |
| 3 | `PATCH /tickets/:id/status` — update status (open → in-progress → closed) | Implementation |
| 4 | Frontend ticket list view — displays all tickets with status badges | Design + Implementation |
| 5 | Frontend "New Ticket" form — calls POST /tickets | Implementation |
| 6 | Frontend status toggle button — calls PATCH /tickets/:id/status | Verification |

### Demo flow (what the presenter does with AI)

1. **Idea → Spec:** Ask AI to write a product vision document for the ticketing system (1 paragraph, data model, endpoints). (output : product vision document)
2. **Requirements Gathering:** Ask AI to develop PRD with user stories and acceptance criteria. (output : PRD)
2. **Design:** Ask AI to scaffold the project structure (Express app + React app in a monorepo). (output : project structure)
3. **Implementation Planning:** Ask AI to break the work into ordered tasks (AI produces a checklist). (output : implementation plan, including development foundation tasks)
4. **Implementation:** Use AI to generate backend routes and frontend components one feature at a time.
5. **Verification:** Show AI catching a bug (e.g., missing status validation) via a prompt like "review this route for edge cases."
6. **Wrap-up:** Open the running app in the browser, create a ticket live, change its status.



### Ticket data model
```ts
interface Ticket {
  id: string;          // uuid
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "closed";
  createdAt: string;   // ISO timestamp
}
```

### Key talking points during demo
- Show the AI prompt, not just the output — audience sees *how* to ask.
- Deliberately make a vague request first, then refine it — illustrates the engineer mindset.
- Point out where human judgment is still needed (data model decisions, UX choices).
- The SDLC checklist produced in step 3 maps directly to the phases on slide 4.

### Out of scope for demo (to keep it to ~15 min)
- Authentication / user accounts
- Persistent database
- Deployment