# Sports Booking App

## Introduction

This project involves building a booking app for the operations team of a sports technology company. The app allows managers to manage customer bookings for various sports at multiple centers. Each center offers different sports, each with multiple courts or resources, and bookings are made in 60-minute slots.

The key objectives are to:
- Create an intuitive interface for viewing and creating bookings.
- Ensure no double bookings occur.
- Provide a simple and functional backend and frontend solution.

## Design Decisions

### Core Functionality

#### 1. Create a Booking
- Users are prompted to select the center, sport, and desired date for the booking.
- The system queries the available courts and displays time slots for the selected sport.
- Slots are dynamically generated based on the availability of courts on the given date.
- After selecting a time slot, the system assigns the court to the user and creates a booking under their name.
- The booking is saved in the system, ensuring the court is reserved for that time slot.

#### 2. View Bookings
- The center manager can view all bookings by selecting a center, sport, and date.
- The system displays a list of both reserved and available courts for the selected sport and date.
- This feature helps center managers monitor court utilization and manage operational needs based on the reservation status of courts.

### Design Considerations and Choices
- Fixed 1-hour time slots were implemented for standardizing booking duration.
- Center managers can view both available and reserved courts for a specific day and hour.
- To ensure data consistency and prevent double booking, the system checks for court availability before creating a booking.

## Implementation Details

### Backend
- The backend is built using Node.js, providing a scalable and non-blocking architecture.
- Express.js is used as the framework for handling HTTP requests and building RESTful APIs.

### Database
- MongoDB is used for storing and managing data related to centers, sports, courts, and bookings.

### Data Models
- **Center Model**: Contains details of each center, such as name, location, and the sports it offers.
- **Sport Model**: Represents the different sports available at each center, with attributes for the number of courts/resources available.
- **Booking Model**: Records each booking, including customer name, court, sport, date, and time slot.
- **User Model**: Contains the details of the center manager, who manages customer bookings.

### JWT Authentication
- JWT authentication is used to validate the center manager's identity and ensure valid session duration.
- Details from the JWT token are used to retrieve center manager-related data.

### APIs
- **Create Booking API**: Allows users to create new bookings. It checks for court availability in MongoDB to prevent double bookings. If a court is available, the booking is confirmed and stored.
- **View Bookings API**: Retrieves all bookings for a specific center, sport, and date, allowing center managers to view available and reserved slots.

### Frontend
- A simple web interface is created using HTML, CSS, and JavaScript.
- Center managers can use the interface to view bookings and manage court availability.

### Error Handling and Validation
- Basic validation is provided for inputs such as date, time, and customer information.
- The app handles edge cases like booking a slot that is already reserved, ensuring proper error messages are displayed.

## Challenges and Solutions

### Challenge 1: Double Booking Prevention
- **Solution**: A query system in MongoDB checks for existing bookings before confirming a new booking, ensuring courts are booked only once per time slot.

### Challenge 2: Managing Relationships Between Centers, Sports, Courts, and Bookings
- **Solution**: MongoDB's document-based structure is used to store related data in a flexible format, making it easy to query and manage relationships.

### Challenge 3: Real-time Data Updates and Accuracy
- **Solution**: Frequent database updates and server-side logic ensure availability status is refreshed after every booking action.

## Future Improvements
- Add real-time updates or notifications for customers on booking confirmations, cancellations, or court availability.
- Improve the booking system by adding filters for court types, time preferences, or price ranges.
- Extend the app’s functionality by building a mobile-friendly version for easier access and bookings.
- Implement a feedback or rating system for customers to review facilities and court conditions.
