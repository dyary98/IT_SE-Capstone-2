// Required modules
import { writeFile } from "fs";

// Sample data (replace this with your actual data retrieval logic)
const courseData = [
  {
    courseTitle: "ITE404",
    meetingTime: "Monday 10:00 AM - 12:00 PM",
    meetingLocation: "Room 101",
    courseDescription: "Introduction to Node.js and Web Development",
  },
  // Add more course data as needed
];

// Your full name and AUIS email address
const fullName = "Sako Hussein Ahmed";
const email = "18084@auis.edu.krd";

// Function to generate the HTML table
const generateHTMLTable = (data) => {
  let tableHtml = `
    <table>
      <thead>
        <tr>
          <th>Course Title</th>
          <th>Meeting Time</th>
          <th>Meeting Location</th>
          <th>Course Description</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.forEach((course) => {
    tableHtml += `
        <tr>
          <td>${course.courseTitle}</td>
          <td>${course.meetingTime}</td>
          <td>${course.meetingLocation}</td>
          <td>${course.courseDescription}</td>
        </tr>
    `;
  });

  tableHtml += `
      </tbody>
    </table>
  `;

  return tableHtml;
};

// Determine the theme based on the current time
const isDaytime = () => {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 7 && hours < 19; // 07:00 to 18:59 is considered daytime
};

// Generate the HTML table
const htmlTable = generateHTMLTable(courseData);

// Determine the CSS file to use based on the theme
const cssFile = isDaytime() ? "styles-bright.css" : "styles-dark.css";

// Create the full HTML page
const fullHTMLPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${cssFile}"> <!-- Include the appropriate CSS file -->
    <title>${fullName} - ${email}</title> <!-- Set the page title here -->
</head>
<body>
    <h1>Course Information</h1>
    ${htmlTable}
</body>
</html>
`;

// Write the HTML to a file
writeFile("course_page.html", fullHTMLPage, (err) => {
  if (err) {
    console.error("Error writing HTML file:", err);
  } else {
    console.log("HTML page created successfully.");
  }
});
