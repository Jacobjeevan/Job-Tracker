# Job Tracker

Objective: Build a job tracker app to keep track jobs I have applied to (and learn React/Redux).

An earlier version of this project was built using Django (frontend and backend), which is alive at jobtracker-django.herokuapp.com.

This version aims to rebuild the project (keeping Django for Frontend, but rebuilding it with REST API for backend, and React for frontend).

Refer to [Plan](docs/plan.md) for detailed implementation plan of the project. You are also welcome to checkout [lessons](docs/lessons.md) for a list of things (including mistakes) I learned from implementing these two projects.

### Deployments:

- [Django with REST backend with React Frontend](https://jobtracker-react.herokuapp.com/)
- [Django backend with Django Frontend](https://jobtracker-django.herokuapp.com/)

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
