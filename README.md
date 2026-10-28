# Simple CRM System

A beginner-friendly Customer Relationship Management demo that can be hosted on **GitHub Pages**.

## Features
- Add, edit, search, and delete customer records
- Filter customers by status
- Dashboard counts for customers, leads, and follow-ups
- Responsive layout for desktop and mobile
- Browser local storage for demo records

## Deploy on GitHub Pages
1. Sign in to GitHub and create a new repository, for example `simple-crm`.
2. Extract this ZIP file on your computer.
3. Upload the contents of this folder to the repository root. Make sure `index.html`, `style.css`, and `app.js` are at the top level.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/(root)`, then click **Save**.
7. Wait a minute or two. GitHub will show the published website URL in the Pages section.

## Important limitation
This is a front-end learning/demo project. Records are stored only in the browser that created them and do not sync between users or devices. It has no real authentication or server database. Do not enter real, confidential, or sensitive customer information. For a production CRM, add a backend API, database, authentication, authorization, backups, and appropriate privacy/security controls.

## Run locally
Open `index.html` in a modern browser. No build tools are required.
