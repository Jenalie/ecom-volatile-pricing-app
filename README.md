# Ecom Volatile Pricing App

A Laravel 8 + Vue.js application for demonstrating dynamic pricing quotes for precious metals.

## Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
* [Database Setup](#database-setup)
* [Frontend Setup](#frontend-setup)
* [Running the Application](#running-the-application)
* [API Endpoints](#api-endpoints)

## Requirements

* PHP >= 7.4
* MySQL
* Node.js >= 18
* npm or yarn
* Composer
* Laravel 8

## Installation

1. Install PHP dependencies:

```bash
composer install
```

2. Install Node.js dependencies:

```bash
npm install
```

## Database Setup

1. Create the database:

```sql
CREATE DATABASE ecom_pricing;
```

2. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecom_pricing
DB_USERNAME=root
DB_PASSWORD=
```

4. Generate the application key:

```bash
php artisan key:generate
```

5. Run migrations:

```bash
php artisan migrate
```

6. Seed the database:

```bash
php artisan db:seed --class="Database\Seeders\DatabaseSeeder"
```

**Note:** If you get duplicate entry errors, clear the table first:

```bash
php artisan tinker
>>> DB::table('products')->truncate();
```

## Frontend Setup

1. Ensure dependencies are installed:

```bash
npm install
```

2. Build frontend assets:

```bash
npm run dev
```

> This uses Laravel Mix to compile Vue components (e.g., `resources/js/QuoteDemo.vue`) and Tailwind CSS.

## Running the Application

1. Serve Laravel backend on a custom port if needed:

```bash
php artisan serve --port=8000
```

2. Visit the application in your browser:

```
http://127.0.0.1:8000
```

3. Frontend assets are served via Vite / Laravel Mix:

```bash
npm run dev
```

## API Endpoints

### 1. Get Quote

```
POST /api/quote
```

**Request Body:**

```json
{
  "sku": "GOLD-1OZ",
  "qty": 1
}
```

**Response:**

```json
{
  "quote_id": 1,
  "unit_price_cents": 2500,
  "quote_expires_at": "2025-09-05T12:00:00Z"
}
```

### 2. Checkout

```
POST /api/checkout
```

**Request Body:**

```json
{
  "quote_id": 1
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Order placed. Awaiting payment authorization…"
}
```

**Possible Errors:**

* `REQUOTE_REQUIRED` – Prices moved, get a new quote.
* `OUT_OF_STOCK` – Item sold out.
* `invalid_signature` – Payment validation failed.
* `unknown_intent` – Unknown payment error.

## Notes

* Make sure `public` directory exists for Laravel to serve assets.
* If you experience Vue/Tailwind compilation errors, ensure all npm packages are installed and the correct Node.js version is used.
* Database tables must exist before seeding.
