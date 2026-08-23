# HRMS - Human Resource Management System

A comprehensive, modern, full-stack Human Resource Management System (HRMS) built with Next.js, Prisma, and NextAuth. Neon HRMS is designed to streamline core HR operations such as employee onboarding, attendance tracking, leave management, and payroll processing, all wrapped in a sleek, interactive, neon-dark interface.

## 🚀 Features

### 🔐 Authentication & Authorization
- **Credentials-Based Login:** Secure authentication using NextAuth.js and bcrypt password hashing.
- **Role-Based Access Control:** Distinct roles for `ADMIN` and `EMPLOYEE`, ensuring users only see what they are authorized to access.
- **Middleware Protection:** Secure routing that redirects unauthorized access automatically.

### 📊 Interactive Dashboards
- **Admin Hub:** A bird's-eye view of total employees, pending leave requests, daily attendance metrics, and pending payrolls.
- **Employee Portal:** Quick-access cards to personal profiles, attendance check-ins, and leave management.

### 👤 Profile Management
- Employees can view and edit their personal information (Name, Address, Phone).
- Admins have overarching visibility into employee details (Employee ID, Job Roles, etc.).

### 🕒 Attendance Tracking
- **One-Click Check-In/Out:** Employees can seamlessly clock their daily hours.
- **Real-Time History:** View recent attendance logs. Admins can view the attendance history for the entire organization.

### 🏖 Leave & Time-Off Management
- **Seamless Applications:** Employees can request Paid, Sick, or Unpaid leaves with specific date ranges and remarks.
- **Approval Workflows:** Admins can review, approve, or reject leave requests with a single click, automatically updating employee records.

### 💰 Payroll & Salary Management
- **Payroll Generation:** Admins can generate monthly salary slips, factoring in base salary and deductions.
- **Read-Only Visibility:** Employees can securely view their net pay, deductions, and payment status.

---

## 🛠 Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Database:** SQLite (Development) / PostgreSQL (Production ready)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js (v4)](https://next-auth.js.org/)
- **Styling:** Custom CSS Modules with a Modern Neon-Dark Design System

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository (if applicable) and navigate to the project directory:**
   ```bash
   git clone https://github.com/Y4-0/HRMS.git
   cd HRMS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   Ensure your `.env` file is properly configured with your `DATABASE_URL` and `NEXTAUTH_SECRET`. Then, run the migrations and seed the database:
   ```bash
   npx prisma migrate dev --name init
   node prisma/seed.js
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing Credentials

The `prisma/seed.js` script populates the database with two initial users for testing:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@hrms.com` | `admin123` |
| **Employee** | `employee@hrms.com` | `emp123` |

---

## 📄 License
This project is licensed under the MIT License.
