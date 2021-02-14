#!/bin/bash

npx sequelize-cli db:migrate
node seeder/seed.js -i
npm run test