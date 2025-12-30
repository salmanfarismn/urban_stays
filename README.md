# UrbanStays

A full-stack Airbnb-style vacation rental listing platform built with Node.js, Express, MongoDB, and Mongoose. Users can create listings, upload images, browse properties by category, leave reviews, and manage their accounts.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Routes](#-api-routes)
- [Models & Database Schema](#-models--database-schema)
- [Middleware & Authentication](#-middleware--authentication)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Listing Management**
  - Create, read, update, and delete vacation listings
  - Image uploads with Cloudinary storage
  - Automatic geolocation using OpenStreetMap Nominatim API
  - Filter listings by category (beach, mountains, cities, pools, castles, camping, farms, arctic, surfing)

- **User Authentication**
  - Local authentication with Passport.js
  - Secure password hashing via `passport-local-mongoose`
  - Session management with MongoDB store
  - Account creation, login, logout, and account deletion

- **Reviews & Ratings**
  - Authenticated users can leave reviews and ratings (1-5 stars)
  - Review management (create, delete)
  - Reviews cascade deleted when parent listing or author is removed

- **Image Management**
  - Upload images directly to Cloudinary
  - Automatic image optimization and resizing
  - Secure file handling with Multer

- **Input Validation**
  - Server-side validation using Joi schemas
  - Comprehensive error handling and user feedback via flash messages

- **Authorization & Access Control**
  - Middleware-based route protection
  - Ownership verification for listing and review operations

- **Flash Notifications**
  - Success and error messages displayed to users
  - Session-based message delivery

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js 22.18.0 |
| **Framework** | Express 5.1.0 |
| **Database** | MongoDB + Mongoose 8.18.0 |
| **Templating** | EJS + ejs-mate 4.0.0 |
| **Authentication** | Passport.js + passport-local |
| **File Upload** | Multer 2.0.2 + Cloudinary storage |
| **Validation** | Joi 18.0.1 |
| **Session Store** | connect-mongo 5.1.0 |
| **HTTP Utilities** | Axios 1.12.2, method-override 3.0.0 |
| **Flash Messages** | connect-flash 0.1.1 |

---

## 📁 Project Structure

```
UrbanStays/
├── app.js                          # Main application entry point
├── cloudConfig.js                  # Cloudinary configuration
├── middleware.js                   # Authentication & validation middleware
├── schema.js                       # Joi validation schemas
├── package.json                    # Dependencies & project metadata
├── .env                            # Environment variables (not in repo)
├── .gitignore                      # Git ignore rules
│
├── controllers/                    # Route handlers
│   ├── listingsController.js       # Listing CRUD operations
│   ├── userController.js           # User auth & account management
│   └── reviewController.js         # Review operations
│
├── models/                         # Mongoose schemas
│   ├── listing.js                  # Listing model
│   ├── user.js                     # User model with Passport plugin
│   └── reviews.js                  # Review model
│
├── routes/                         # Express routers
│   ├── listings.js                 # Listing endpoints
│   ├── user.js                     # User/auth endpoints
│   └── reviews.js                  # Review endpoints
│
├── views/                          # EJS templates
│   ├── layouts/
│   │   └── boilerplate.ejs         # Main layout wrapper
│   ├── includes/
│   │   ├── navbar.ejs              # Navigation bar
│   │   ├── footer.ejs              # Footer
│   │   └── flash.ejs               # Flash message display
│   └── listings/
│       ├── index.ejs               # Listing grid view
│       ├── show.ejs                # Listing detail view
│       ├── new.ejs                 # Create listing form
│       ├── edit.ejs                # Edit listing form
│       ├── signup.ejs              # User signup form
│       ├── login.ejs               # User login form
│       ├── account.ejs             # User account page
│       └── error.ejs               # Error page
│
├── public/                         # Static assets
│   ├── css/
│   │   ├── style.css               # Main stylesheet
│   │   ├── map.css                 # Map styling
│   │   └── rating.css              # Rating display styles
│   └── js/
│       ├── bootstrap.js            # Bootstrap initialization
│       ├── map.js                  # Map functionality
│       └── taxButton.js            # Tax calculator
│
├── init/                           # Database initialization
│   ├── index.js                    # Seed script
│   └── data.js                     # Sample listing data
│
├── utils/                          # Utility modules
│   ├── ExpressError.js             # Custom error class
│   └── wrapAsync.js                # Async error wrapper
│
└── uploads/                        # Local image cache (gitignored)
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v22 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas cluster)
- **Cloudinary Account** (free tier available at cloudinary.com)
- **OpenStreetMap Nominatim API** (free, no key required)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/UrbanStays.git
   cd UrbanStays
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` File**
   ```bash
   touch .env
   ```
   
   Add the following variables (see [Environment Variables](#environment-variables)):
   ```
   ATLAS_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/wanderlust
   SECRET=your_session_secret_here_min_32_chars
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

4. **(Optional) Seed the Database**
   ```bash
   node init/index.js
   ```
   > **Note:** The seed script uses a local MongoDB instance at `mongodb://127.0.0.1:27017/wanderlust`. Modify `init/index.js` if using MongoDB Atlas.

---

## 🔐 Environment Variables

| Variable | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `ATLAS_URL` | String | ✅ | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/wanderlust` |
| `SECRET` | String | ✅ | Session encryption secret (use strong 32+ char value) | `your_super_secret_key_here` |
| `CLOUDINARY_NAME` | String | ✅ | Cloudinary cloud name | `djpq8abc1` |
| `CLOUDINARY_API` | String | ✅ | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_SECRET` | String | ✅ | Cloudinary API secret | `AbCdEf1234567890` |
| `NODE_ENV` | String | ⭕ | Environment (development/production) | `development` |

> **⚠️ Security:** Never commit `.env` to version control. Add it to `.gitignore`.

---

## ▶️ Running the Application

### Development Mode

```bash
npm start
# or with nodemon for auto-reload (install: npm install --save-dev nodemon)
nodemon app.js
```

The app will start on **http://localhost:3000**

### Production Mode

```bash
NODE_ENV=production npm start
```

Ensure all environment variables are set in your production environment.

---

## 🌐 API Routes

### Listings Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/listings` | ❌ | Get all listings or filter by category |
| GET | `/listings/new` | ✅ | Show new listing form |
| POST | `/listings` | ✅ | Create a new listing (with image) |
| GET | `/listings/:id` | ❌ | Show listing details & reviews |
| GET | `/listings/:id/edit` | ✅ | Show edit form (owner only) |
| PUT | `/listings/:id` | ✅ | Update listing (owner only) |
| DELETE | `/listings/:id` | ✅ | Delete listing (owner only) |

### Reviews Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/listings/:id/reviews` | ✅ | Create a review |
| DELETE | `/listings/:id/reviews/:reviewId` | ✅ | Delete review (author only) |

### User/Auth Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/user/signup` | ❌ | Show signup form |
| POST | `/user` | ❌ | Register new user |
| GET | `/user/login` | ❌ | Show login form |
| POST | `/user/login` | ❌ | Authenticate user (Passport) |
| GET | `/user/logout` | ✅ | Logout user |
| GET | `/user/:id/account` | ✅ | Show user account page |
| DELETE | `/user/:id` | ✅ | Delete user account & cascade data |

---

## 🗄️ Models & Database Schema

### Listing Model

```javascript
{
  title: String (required),
  description: String,
  image: {
    url: String,           // Cloudinary URL
    filename: String       // Cloudinary public ID
  },
  price: Number,
  location: String,
  country: String,
  geometry: {
    type: "Point",
    coordinates: [Number, Number]  // [longitude, latitude]
  },
  category: String (enum: [
    "trending", "rooms", "cities", "pools", "mountains", 
    "castles", "camping", "farms", "arctic", "beach", "surfing"
  ]),
  reviews: [ObjectId],     // Reference to Review
  owner: ObjectId          // Reference to User
}
```

### User Model

```javascript
{
  username: String (unique, auto-added by Passport),
  email: String (required),
  password: String (hashed, auto-managed by Passport)
}
```

### Review Model

```javascript
{
  comment: String,
  rating: Number (min: 1, max: 5),
  createdAt: Date (default: now),
  author: ObjectId         // Reference to User
}
```

---

## 🔒 Middleware & Authentication

| Middleware | Purpose |
|-----------|---------|
| `isLoggedIn` | Ensures user is authenticated; redirects to login if not |
| `isAuth` | Verifies user is the listing owner |
| `isReviewAuth` | Verifies user is the review author |
| `validateListing` | Server-side Joi validation for listing data |
| `validateReview` | Server-side Joi validation for review data |
| `saveRedirectUrl` | Captures original URL for post-login redirect |

**Example Middleware Chain:**
```javascript
router.put(
  "/:id",
  isLoggedIn,       // Must be logged in
  isAuth,           // Must be listing owner
  upload.single('listing[image]'),  // Handle image
  validateListing,  // Validate data
  wrapAsync(listingController.updateListing)
);
```

---

## 🚢 Deployment

### MongoDB Atlas Setup

1. Create a free MongoDB Atlas cluster
2. Whitelist your IP address
3. Generate a connection string with your credentials
4. Set `ATLAS_URL` in production environment

### Deployment Platforms

#### Render.com (Recommended)

1. Create a Render account and connect your GitHub repo
2. Create a new Web Service
3. Set environment variables in Render dashboard
4. Deploy

#### Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
heroku config:set ATLAS_URL=<your_uri> SECRET=<secret> ...
git push heroku main
```

#### AWS / DigitalOcean / Other

- Ensure Node.js, npm, and environment variables are configured
- Use a process manager like `pm2` for production
- Serve static files via CDN or reverse proxy (nginx)

---

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

---

## 📧 Support

For issues, questions, or suggestions, please open a [GitHub Issue](https://github.com/yourusername/UrbanStays/issues).

---

## 🎯 Future Enhancements

- [ ] Wishlist / favorites feature
- [ ] Advanced search & filtering (price range, amenities)
- [ ] Booking calendar & availability management
- [ ] Payment integration (Stripe/PayPal)
- [ ] User ratings & trust score
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Mobile-responsive improvements
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Automated tests (Jest, Mocha)

---

**Built with ❤️ by Salman Faris**
