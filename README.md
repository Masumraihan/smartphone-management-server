# Product Management Dashboard

## Overview

This project is a product management dashboard designed to facilitate efficient management of product data. It offers comprehensive CRUD operations for products, along with features like bulk delete and advanced data filtering. The server-side code handles data storage, authentication, and serves API endpoints for the frontend client.

### Features

- Full CRUD operations for managing products.
- Bulk delete option for efficient inventory management.
- Smart and robust data filtering for effective product selection.
- Authentication and authorization mechanisms.
- Secure data storage using MongoDB with Mongoose.
- Express.js server for handling API requests.

### Additional Features

- **Role-based Access Control:** Three roles are implemented - SuperAdmin, Manager, and Seller.
- **Role-specific Functionality:** Each role has access to specific functionalities, ensuring secure and controlled access.
- **New Roles and Functionality:**
  - **SuperAdmin:** Can access all functionalities.
  - **Manager:** Can add and update products.
  - **Seller:** Can sell products, view sales history, and download invoices.

## Installation

Before running the project, ensure you have Node.js and npm (or yarn or pnpm) installed on your machine.

### Clone the Repository

```bash
git clone https://github.com/your-username/product-management-dashboard.git
cd product-management-dashboard
```

## Install Dependencies

```
npm install
yarn install
pnpm install
```

## Run Project

```
npm dev
yarn dev
pnpm dev
```

### [Project Overview Video](https://drive.google.com/file/d/1nUbvemq86N7Wdczt7YCQtpot0zAqv7St/view?usp=sharing)

### [Client Github](https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-fronten-Masumraihan)

### [Live Api](https://server-tau-fawn.vercel.app/)
