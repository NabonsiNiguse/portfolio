# Nabonsi Portfolio — Django REST API

Production-ready Django 5 backend powering the React portfolio frontend.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Django 5.x + Django REST Framework |
| Database | SQLite (dev) / PostgreSQL (prod via `DATABASE_URL`) |
| Images | Pillow |
| CORS | django-cors-headers |
| Environment | django-environ |

---

## API Endpoints

| Method | URL | Description |
|---|---|---|
| GET | `/api/skills/` | All skill groups with their tag arrays |
| GET | `/api/projects/` | All projects (stack & highlights as arrays) |
| GET | `/api/certifications/` | All certifications |
| GET | `/api/experience/` | All timeline entries |
| POST | `/api/contact/` | Submit a contact inquiry (5/day per IP) |

All list endpoints return a flat JSON array — no pagination wrapper.

---

## Local Setup

### 1. Activate the virtual environment

```bash
# Windows
.\venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
# Copy the template
copy .env.example .env   # Windows
cp .env.example .env     # macOS / Linux

# Edit .env and set a real SECRET_KEY before deploying
```

### 4. Run migrations

```bash
python manage.py migrate
```

### 5. Create a superuser (for `/admin/`)

```bash
python manage.py createsuperuser
```

Follow the prompts. You'll use these credentials to log in to the admin panel.

### 6. Start the development server

```bash
python manage.py runserver
```

The API is now live at **http://127.0.0.1:8000/api/**  
The admin panel is at **http://127.0.0.1:8000/admin/**

---

## Admin Panel Quick-Start

Log in at `/admin/` and you'll see:

- **Skill Groups** — Add/edit skill categories and their badge tags inline.
- **Projects** — Add projects; enter comma-separated stack tags and one highlight per line.
- **Certifications** — Add credentials with optional badge images.
- **Experience / Timeline Entries** — Add timeline milestones. Use the `order` field to set display sequence.
- **Contact Inquiries** — View-only. Populated by the public contact form. You can read and delete, not edit.

Use the **order** field on any list view — it's directly editable in the table without opening each record.

---

## Production Deployment

1. Set `DEBUG=False` in `.env`
2. Set `DATABASE_URL=postgres://...` pointing to your PostgreSQL instance
3. Set a strong, unique `SECRET_KEY`
4. Set `ALLOWED_HOSTS` to your domain(s)
5. Run `python manage.py collectstatic`
6. Serve with gunicorn: `gunicorn config.wsgi:application`
7. Serve media/static files through NGINX or upload to S3

---

## Project Structure

```
backend/
├── manage.py
├── requirements.txt
├── .env                  ← your local secrets (never commit)
├── .env.example          ← template to share safely
├── config/
│   ├── settings.py       ← all settings, env-driven
│   ├── urls.py           ← root URL config
│   ├── wsgi.py
│   └── asgi.py
└── portfolio/
    ├── models.py         ← 5 data models
    ├── serializers.py    ← DRF serializers with camelCase aliasing
    ├── views.py          ← read-only viewsets + rate-limited contact view
    ├── urls.py           ← DefaultRouter registration
    ├── admin.py          ← polished admin with inlines and read-only inquiry view
    └── migrations/
        └── 0001_initial.py
```
