# Leads Project

## About Leads Project

Leads Project is a web application built with Laravel, React, Tailwind, Inertia and MySQL to manage leads, providing the CRUD functionalities.

## Requirements

Make sure you have the following installed:

- PHP >= 8.2
- Composer
- MySQL or another DBMS supported by Laravel
- Node.js & NPM

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   Clone the Git repository to your local machine:
   ```bash
   git clone https://github.com/onedev111/ff_home_assessment.git
   cd ff_home_assessment

2. **Install PHP dependencies with Composer:**

   Once inside the project directory, run the following command to install all PHP dependencies:
   ```bash
   composer install
   ```

3. **Set up the `.env` file:**

   Copy the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and configure your environment settings, such as database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_user
   DB_PASSWORD=your_database_password
   ```

4. **Generate the application key:**

   Run the following command to generate a key for the application:
   ```bash
   php artisan key:generate
   ```

5. **Run the migrations and seed the database:**

   To set up the database schema and seed it with initial data, run:
   ```bash
   php artisan migrate
   ```
   ```bash
   php artisan db:seed
   ```

6. **Install JavaScript dependencies:**

   To manage the frontend dependencies, use npm:
   ```bash
   npm install
   ```

7. **Compile the assets:**

   Compile the frontend assets (CSS, JS, etc.):
   ```bash
   npm run dev
   ```

8. **Run the development server:**

   Start the Laravel development server:
   ```bash
   php artisan serve
   ```

   The application will be accessible at `http://localhost:8000`.

## Additional Notes

- If you need to use a different database, make sure to adjust the `.env` file accordingly and re-run the migrations.
- For production environments, use `npm run prod` to compile assets and optimize performance.

## License

The Leads Project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
