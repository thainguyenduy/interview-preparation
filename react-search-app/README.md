# React Search & Record App

A React application with Search and Record components that displays search results with navigation.

## Features

- **Search Component**: Select a person from dropdown list (loaded on initialization)
- **Record Component**: Display selected record with Previous/Next navigation
- Dropdown shows ID and Name for each person
- Navigate through results using Next and Previous buttons

## Installation

1. Navigate to the project directory:
```bash
cd react-search-app
```

2. Install dependencies:
```bash
npm install
```

## Running the App

Start the development server:
```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000)

## How to Use

1. Select a person from the dropdown list (showing ID and Name)
2. The selected record will be displayed immediately
3. If multiple results exist, use "Next" button to view subsequent results
4. Use "Previous" button to go back to previous results

## Project Structure

```
react-search-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Search.js
│   │   ├── Search.css
│   │   ├── Record.js
│   │   └── Record.css
│   ├── data/
│   │   └── mockData.js    # Mock data in JSON format
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Mock Data

The app includes sample data stored in `src/data/mockData.js` with the following fields:
- ID
- Name
- Email
- Role

You can modify the mock data in `src/data/mockData.js` or replace it with an API call.
