# Thaffny - Aesthetic Beauty Services Website

A sophisticated React website featuring elegant serif typography, golden and pink tones, and a blushing hero section.

## Features

- **Hero Section**: Beautiful blushing aesthetic with golden and pink gradients
- **Services Section**: Showcasing eyelashes, lips, and eyebrows services
- **About Section**: Storytelling section with elegant typography
- **Contact Section**: WhatsApp integration for events and consultations
- **Elegant Design**: Sophisticated serif fonts (Playfair Display & Cormorant Garamond)
- **Responsive**: Fully responsive design for all devices

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

### WhatsApp Number

To set your WhatsApp number, edit these files and update the `phoneNumber` variable:
- `src/components/Contact.jsx` (line ~5)
- `src/components/Schedule.jsx` (line ~95)

Format: country code + number (no + or spaces)
Example: `5511987654321` for Brazil

## CRM System

The website includes a built-in CRM system for managing appointments:

### Features:
- **Form-based scheduling**: Clients can fill out a form on the website
- **Local storage**: Appointments are saved in browser localStorage
- **Admin panel**: Access at `/admin` to view and manage all appointments
- **Export data**: Export appointments as JSON file
- **Status management**: Update appointment status (pending, confirmed, completed, cancelled)
- **WhatsApp integration**: Direct links to contact clients via WhatsApp

### Accessing the Admin Panel:
Navigate to `http://localhost:5173/admin` to view all appointments.

### Data Storage:
Currently, appointments are stored in browser localStorage. For production, you should:
1. Replace localStorage with a backend API
2. Add authentication to the admin panel
3. Set up a database (PostgreSQL, MongoDB, etc.)
4. Implement email notifications

The CRM utility functions are in `src/utils/crm.js` and can be easily adapted to work with an API.

## Technologies

- React 18
- Vite
- CSS3 with custom animations
- Google Fonts (Playfair Display & Cormorant Garamond)

