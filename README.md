# Job Tracker (React/Node.js)

#### Objectives

- Build a job tracker app to keep track jobs I have applied to.
- Rebuild the app in other languages to learn and strength my understanding of other languages

This version rebuilds the project - Reworks Django to user REST API and uses React for frontend.

I reworked the project once and switched to Node.js for backend (while modifying frontend to integrate bettwe with the new backend).

Refer to [Plan](docs/plan.md) for detailed implementation plan of the project. You are also welcome to checkout [lessons](docs/lessons.md) for a list of things (including mistakes) I learned from implementing the project.

### Deployments :rocket:

- Job Tracker: ~~Deployed on Heroku~~ Taken down for maintenance.

### Progress:

- [x] Django with REST API
- [x] React for frontend as well as Redux for state management
  - [x] Add job form
  - [x] Display jobs table
- [x] Authentication
  - [x] Register/Login pages
  - [x] Hiding specific routes such as add form
- [x] Integrating with Geolocation API to fetch location coordinates
- [x] Integrating with Mapbox API
- [x] Initial Deployment
- [x] Added cleaned up plan
- [x] Refactor frontend
  - Functional components, removing Redux and using React context
- [x] Rewrite backend in Node.js
  - [x] Add backend tests
  - [x] Modify frontend to integrate with new backend
- [ ] Deploy containers on Digital Ocean Droplet using Dokku
- [ ] Frontend redesign (In progress)
  - [ ] Redesign frontend to use Tailwind CSS framework
  - [ ] Add a frontend landing page
- [ ] New Features
  - [ ] Toast for notifications
  - [ ] Autofill support for form location
    - [ ] Slight refactor for location model to use label/region, instead of city and state (allows for worldwide support; Currently backend API is restricted to US)
