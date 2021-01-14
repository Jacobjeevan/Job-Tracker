# Job Tracker (React Frontend/Django Backend)

#### Objectives

- Build a job tracker app to keep track jobs I have applied to.
- Rebuild the app in other languages to learn and strength my understanding of other languages

This version rebuilds the project - Reworks Django to user REST API and uses React for frontend.

Refer to [Plan](docs/plan.md) for detailed implementation plan of the project. You are also welcome to checkout [lessons](docs/lessons.md) for a list of things (including mistakes) I learned from implementing the project.

### Deployments :rocket:

- [Job Tracker](https://jobtracker-react.herokuapp.com/): Deployed on Heroku

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
- [ ] Adding autofill (locations) to add job form
- [x] Refactor frontend
  - Functional components, removing Redux and using React context
- [ ] Decouple and containerize (Docker)
  - Right now, webpack is used to compile frontend files, which are then served by Django Backend.
- [ ] Deploy containers on Digital Ocean Droplet using Buddy
