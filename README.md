# [budgetTrackerNimmsta]

## 📖 Project Overview

- **Purpose**: The goal of the application is to manage or track incomes and expenses
- **Core Features**:
  - Budget Visualization
  - ListView of Transactions
  - Adding new Transactions
  - Deleting new Transactions

![HomeScreen](<Simulator Screenshot - iPhone 14 - 2025-03-06 at 15.44.01.png>)

## 🚀 Getting Started

### Prerequisites

- Have Xcode or Android Studio installed and a emulator set-up
- For iOS have Cocoapods installed. For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

### Installation

1. Clone the repository
2. cd [/budgetTrackerNimmsta]
3. npm install
4. npm start

# For Android
npm run android

# For iOS

1. cd [/budgetTrackerNimmsta/ios]
2. ```
   pod install
   ```
cd [/budgetTrackerNimmsta]
3. npm run ios

If it doesn't run please open Xcode and open the `` budgetTrackerNimmsta.xcworkspace `` file inside the ios file. 

## Technologies & Design Decisions

### Tech Stack

Frontend: [Bare React Native]

State Management: [ Zustand ]

Navigation: [React Navigation]

Persistence: [ AsyncStorage ]

Styling: [ StyleSheet ]

## Key Design Decisions

### Architecture:

I went with a component based approach, to increase the readability and maintainability of the code. If I were to expand the project, I would go into a atomic-component approach. 

#### Folder structure rationale

[budgetTrackerNimmsta]/
├── .bundle/   
├── android
├── ios
├── node_modules       
├── src/
│   ├── components/    # Reusable components
│   ├── navigation/    # Navigation setup
│   ├── screens/       # Application screens
│   ├── store/         # State management
├── App.tsx            # Main application entry
└── package.json

### State Management:

I chose to go with Zustand because it's light-weight and easy to get started with. The project is not complex, so choosing something like Redux or mobX was overkill.
I created a single store file, where all the logic is handled and added comments to all the functions. 

### Design

I went with a simple color scheme focusing mainly on the Nimmsta brand color for income and red for expenses. Otherwise made use of white and grey to be able to bring important elements in focus. 

The HomeScreen is used for visualizing data with both numbers and a PieChart. There is also a FlatList for going over all the transactions. Transactions can also be deleted by sliding a transaction from right to left. 
Besides that created a simple Form for adding new transaction. 


To improve the project, I would add filtering of the FlatList by date and categories. Furthermore, I would add a additional Screen to view individual transactions and to edit them if necessary. 

Code-wise I would add tests and and more animations, including to the PieChart when it loads and would create types for colors and a utils folder for future helper functions. 



