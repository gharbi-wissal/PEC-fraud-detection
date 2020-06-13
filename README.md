# PEC-fraud-detection
### Backend development

<!-- Install pip dependencies: `pip install -r requirements.txt` -->

Run `python app.py` in backend root (will watch files and restart server on port `8081` on change).

### Frontend development

Navigate inside the frontend directory: `cd frontend`

Install npm dependencies: `npm install` 

Run `npm start` in frontend root (will watch files and restart dev-server on port `4200` on change).
All calls made to `/api` will be proxied to backend server (default port for backend `8081`), this can be changed in `proxy.conf.json`.
