import { txCol } from "../src/services/firebase.js";
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const USER_UID = "TtaNpa2uHIVdev0XSfBLTuwvirJ2"; // Replace with the actual user UID

const sampleTransactions = [
  // January
  { title: "Groceries", amount: 75.50, type: "expense", category: "Food", date: new Date(2024, 0, 5).toISOString() },
  { title: "Salary", amount: 2500.00, type: "income", category: "Other", date: new Date(2024, 0, 10).toISOString() },
  { title: "Coffee", amount: 4.25, type: "expense", category: "Food", date: new Date(2024, 0, 12).toISOString() },
  { title: "Internet Bill", amount: 60.00, type: "expense", category: "Bills", date: new Date(2024, 0, 15).toISOString() },
  { title: "Books", amount: 30.00, type: "expense", category: "Shopping", date: new Date(2024, 0, 18).toISOString() },
  { title: "Freelance Payment", amount: 300.00, type: "income", category: "Other", date: new Date(2024, 0, 22).toISOString() },
  { title: "Gym Membership", amount: 40.00, type: "expense", category: "Health", date: new Date(2024, 0, 25).toISOString() },
  { title: "Movie Tickets", amount: 25.00, type: "expense", category: "Entertainment", date: new Date(2024, 0, 28).toISOString() },
  { title: "Rent", amount: 1200.00, type: "expense", category: "Bills", date: new Date(2024, 0, 30).toISOString() },
  { title: "Side Gig", amount: 150.00, type: "income", category: "Other", date: new Date(2024, 0, 31).toISOString() },

  // February
  { title: "Dinner with friends", amount: 45.00, type: "expense", category: "Food", date: new Date(2024, 1, 2).toISOString() },
  { title: "Consulting Fee", amount: 750.00, type: "income", category: "Other", date: new Date(2024, 1, 7).toISOString() },
  { title: "Public Transport", amount: 20.00, type: "expense", category: "Travel", date: new Date(2024, 1, 9).toISOString() },
  { title: "Mobile Bill", amount: 35.00, type: "expense", category: "Bills", date: new Date(2024, 1, 14).toISOString() },
  { title: "New Clothes", amount: 80.00, type: "expense", category: "Shopping", date: new Date(2024, 1, 16).toISOString() },
  { title: "Investment Dividend", amount: 100.00, type: "income", category: "Other", date: new Date(2024, 1, 20).toISOString() },
  { title: "Pharmacy", amount: 15.00, type: "expense", category: "Health", date: new Date(2024, 1, 23).toISOString() },
  { title: "Streaming Service", amount: 12.99, type: "expense", category: "Entertainment", date: new Date(2024, 1, 25).toISOString() },
  { title: "Car Fuel", amount: 50.00, type: "expense", category: "Travel", date: new Date(2024, 1, 27).toISOString() },
  { title: "Gift", amount: 20.00, type: "expense", category: "Other", date: new Date(2024, 1, 28).toISOString() },

  // March
  { title: "Electricity Bill", amount: 80.25, type: "expense", category: "Bills", date: new Date(2024, 2, 1).toISOString() },
  { title: "Shopping", amount: 120.00, type: "expense", category: "Shopping", date: new Date(2024, 2, 3).toISOString() },
  { title: "Project Payment", amount: 1500.00, type: "income", category: "Other", date: new Date(2024, 2, 8).toISOString() },
  { title: "Restaurant", amount: 65.00, type: "expense", category: "Food", date: new Date(2024, 2, 10).toISOString() },
  { title: "Flight Tickets", amount: 250.00, type: "expense", category: "Travel", date: new Date(2024, 2, 15).toISOString() },
  { title: "Water Bill", amount: 25.00, type: "expense", category: "Bills", date: new Date(2024, 2, 18).toISOString() },
  { title: "Online Course", amount: 70.00, type: "expense", category: "Education", date: new Date(2024, 2, 20).toISOString() },
  { title: "Bonus", amount: 500.00, type: "income", category: "Other", date: new Date(2024, 2, 25).toISOString() },
  { title: "Doctor Visit", amount: 90.00, type: "expense", category: "Health", date: new Date(2024, 2, 28).toISOString() },
  { title: "Concert Tickets", amount: 90.00, type: "expense", category: "Entertainment", date: new Date(2024, 2, 30).toISOString() },

  // April
  { title: "Travel to mountains", amount: 300.00, type: "expense", category: "Travel", date: new Date(2024, 3, 1).toISOString() },
  { title: "Bonus", amount: 1000.00, type: "income", category: "Other", date: new Date(2024, 3, 5).toISOString() },
  { title: "Groceries", amount: 80.00, type: "expense", category: "Food", date: new Date(2024, 3, 7).toISOString() },
  { title: "Gas Bill", amount: 40.00, type: "expense", category: "Bills", date: new Date(2024, 3, 10).toISOString() },
  { title: "New Shoes", amount: 70.00, type: "expense", category: "Shopping", date: new Date(2024, 3, 12).toISOString() },
  { title: "Dividends", amount: 200.00, type: "income", category: "Other", date: new Date(2024, 3, 15).toISOString() },
  { title: "Dentist", amount: 110.00, type: "expense", category: "Health", date: new Date(2024, 3, 18).toISOString() },
  { title: "Gaming Subscription", amount: 10.00, type: "expense", category: "Entertainment", date: new Date(2024, 3, 20).toISOString() },
  { title: "Bus Fare", amount: 15.00, type: "expense", category: "Travel", date: new Date(2024, 3, 22).toISOString() },
  { title: "Charity Donation", amount: 50.00, type: "expense", category: "Other", date: new Date(2024, 3, 25).toISOString() },

  // May
  { title: "Concert Tickets", amount: 90.00, type: "expense", category: "Entertainment", date: new Date(2024, 4, 1).toISOString() },
  { title: "Health Checkup", amount: 150.00, type: "expense", category: "Health", date: new Date(2024, 4, 3).toISOString() },
  { title: "Salary", amount: 2500.00, type: "income", category: "Other", date: new Date(2024, 4, 8).toISOString() },
  { title: "Groceries", amount: 90.00, type: "expense", category: "Food", date: new Date(2024, 4, 10).toISOString() },
  { title: "Electricity Bill", amount: 70.00, type: "expense", category: "Bills", date: new Date(2024, 4, 15).toISOString() },
  { title: "New Gadget", amount: 200.00, type: "expense", category: "Shopping", date: new Date(2024, 4, 18).toISOString() },
  { title: "Freelance Income", amount: 400.00, type: "income", category: "Other", date: new Date(2024, 4, 22).toISOString() },
  { title: "Yoga Classes", amount: 50.00, type: "expense", category: "Health", date: new Date(2024, 4, 25).toISOString() },
  { title: "Museum Visit", amount: 20.00, type: "expense", category: "Entertainment", date: new Date(2024, 4, 28).toISOString() },
  { title: "Weekend Trip", amount: 180.00, type: "expense", category: "Travel", date: new Date(2024, 4, 30).toISOString() },

  // June
  { title: "Dinner out", amount: 55.00, type: "expense", category: "Food", date: new Date(2024, 5, 2).toISOString() },
  { title: "Investment Return", amount: 300.00, type: "income", category: "Other", date: new Date(2024, 5, 7).toISOString() },
  { title: "Train Ticket", amount: 30.00, type: "expense", category: "Travel", date: new Date(2024, 5, 9).toISOString() },
  { title: "Subscription Service", amount: 15.00, type: "expense", category: "Bills", date: new Date(2024, 5, 14).toISOString() },
  { title: "Home Decor", amount: 100.00, type: "expense", category: "Shopping", date: new Date(2024, 5, 16).toISOString() },
  { title: "Consulting Income", amount: 600.00, type: "income", category: "Other", date: new Date(2024, 5, 20).toISOString() },
  { title: "Therapy Session", amount: 75.00, type: "expense", category: "Health", date: new Date(2024, 5, 23).toISOString() },
  { title: "Sporting Event", amount: 40.00, type: "expense", category: "Entertainment", date: new Date(2024, 5, 25).toISOString() },
  { title: "Taxi Fare", amount: 25.00, type: "expense", category: "Travel", date: new Date(2024, 5, 27).toISOString() },
  { title: "Donation", amount: 30.00, type: "expense", category: "Other", date: new Date(2024, 5, 29).toISOString() },

  // July
  { title: "Groceries", amount: 85.00, type: "expense", category: "Food", date: new Date(2024, 6, 1).toISOString() },
  { title: "Salary", amount: 2500.00, type: "income", category: "Other", date: new Date(2024, 6, 5).toISOString() },
  { title: "Coffee", amount: 5.00, type: "expense", category: "Food", date: new Date(2024, 6, 7).toISOString() },
  { title: "Phone Bill", amount: 45.00, type: "expense", category: "Bills", date: new Date(2024, 6, 10).toISOString() },
  { title: "New Clothes", amount: 110.00, type: "expense", category: "Shopping", date: new Date(2024, 6, 12).toISOString() },
  { title: "Project Bonus", amount: 250.00, type: "income", category: "Other", date: new Date(2024, 6, 15).toISOString() },
  { title: "Gym Fees", amount: 40.00, type: "expense", category: "Health", date: new Date(2024, 6, 18).toISOString() },
  { title: "Cinema", amount: 20.00, type: "expense", category: "Entertainment", date: new Date(2024, 6, 20).toISOString() },
  { title: "Bus Pass", amount: 50.00, type: "expense", category: "Travel", date: new Date(2024, 6, 22).toISOString() },
  { title: "Pet Supplies", amount: 35.00, type: "expense", category: "Other", date: new Date(2024, 6, 25).toISOString() },

  // August
  { title: "Restaurant Meal", amount: 70.00, type: "expense", category: "Food", date: new Date(2024, 7, 1).toISOString() },
  { title: "Freelance Work", amount: 800.00, type: "income", category: "Other", date: new Date(2024, 7, 5).toISOString() },
  { title: "Hotel Stay", amount: 200.00, type: "expense", category: "Travel", date: new Date(2024, 7, 7).toISOString() },
  { title: "Utility Bill", amount: 95.00, type: "expense", category: "Bills", date: new Date(2024, 7, 10).toISOString() },
  { title: "Electronics", amount: 150.00, type: "expense", category: "Shopping", date: new Date(2024, 7, 12).toISOString() },
  { title: "Rental Income", amount: 700.00, type: "income", category: "Other", date: new Date(2024, 7, 15).toISOString() },
  { title: "Dental Checkup", amount: 120.00, type: "expense", category: "Health", date: new Date(2024, 7, 18).toISOString() },
  { title: "Theme Park", amount: 60.00, type: "expense", category: "Entertainment", date: new Date(2024, 7, 20).toISOString() },
  { title: "Car Maintenance", amount: 100.00, type: "expense", category: "Travel", date: new Date(2024, 7, 22).toISOString() },
  { title: "Software License", amount: 49.99, type: "expense", category: "Other", date: new Date(2024, 7, 25).toISOString() },
];

async function addSampleData() {
  if (!USER_UID) {
    console.error("USER_UID is not defined. Please provide a user UID.");
    return;
  }

  try {
    console.log(`Adding sample data for user: ${USER_UID}`);
    for (const transaction of sampleTransactions) {
      await txCol(USER_UID).add(transaction);
      console.log(`Added transaction: ${transaction.title}`);
    }
    console.log("Sample data added successfully!");
  } catch (error) {
    console.error("Error adding sample data:", error);
  } finally {
    // Exit the process after data is added or if an error occurs
    process.exit(0);
  }
}

addSampleData();
