#!/bin/bash

# This line is the fix 👇
trap "echo 'Stopping all servers...'; kill 0" SIGINT

echo "Starting backend..."
cd backend
source venv/bin/activate
python3 manage.py runserver &
cd ..

echo "Starting frontend..."
cd frontend
npm run dev &
cd ..

wait