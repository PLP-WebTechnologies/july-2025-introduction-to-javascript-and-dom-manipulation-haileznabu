// ============================================
// PART 1: VARIABLES, DATA TYPES & CONDITIONALS
// ============================================

// Variable declarations - different data types
let studentName = "" // String variable
let grades = [] // Array to store grades
let totalGrades = 0 // Number variable
let isCalculated = false // Boolean variable
const maxGrade = 100 // Constant variable
const minGrade = 0 // Constant variable

// Get DOM elements for interaction
const nameInput = document.getElementById("studentName")
const gradeInput = document.getElementById("gradeInput")
const addGradeBtn = document.getElementById("addGradeBtn")
const calculateBtn = document.getElementById("calculateBtn")
const resultsDiv = document.getElementById("results")
const letterGradeDiv = document.getElementById("letterGrade")
const gradesListDiv = document.getElementById("gradesList")

console.log("JavaScript Fundamentals Project Loaded!")
console.log("Initial grades array:", grades)

// ============================================
// PART 2: CUSTOM FUNCTIONS (At least 2 required)
// ============================================

// Function 1: Calculate average grade
function calculateAverage(gradesArray) {
  // Input validation using conditionals
  if (gradesArray.length === 0) {
    console.log("No grades to calculate average")
    return 0
  }

  let sum = 0
  // Using a for loop to sum all grades
  for (let i = 0; i < gradesArray.length; i++) {
    sum += gradesArray[i]
  }

  const average = sum / gradesArray.length
  console.log(`Calculated average: ${average.toFixed(2)}`)
  return average
}

// Function 2: Convert numeric grade to letter grade using conditional
function getLetterGrade(numericGrade) {
  let letterGrade = ""
  let message = ""

  // Conditional statements to determine letter grade
  if (numericGrade >= 90) {
    letterGrade = "A"
    message = "Excellent work!"
  } else if (numericGrade >= 80) {
    letterGrade = "B"
    message = "Good job!"
  } else if (numericGrade >= 70) {
    letterGrade = "C"
    message = "Average performance "
  } else if (numericGrade >= 60) {
    letterGrade = "D"
    message = "Needs improvement"
  } else {
    letterGrade = "F"
    message = "Keep studying!"
  }

  console.log(`Grade ${numericGrade} converts to ${letterGrade}: ${message}`)
  return { letter: letterGrade, message: message }
}

// Function 3: Validate grade input
function validateGrade(grade) {
  // Multiple conditional checks
  if (isNaN(grade)) {
    return { valid: false, message: "Please enter a valid number" }
  } else if (grade < minGrade) {
    return { valid: false, message: `Grade cannot be less than ${minGrade}` }
  } else if (grade > maxGrade) {
    return { valid: false, message: `Grade cannot be more than ${maxGrade}` }
  } else {
    return { valid: true, message: "Valid grade" }
  }
}

// Function 4: Format student report
function generateStudentReport(name, gradesArray, average) {
  const gradeInfo = getLetterGrade(average)

  return `
        <h3>Student Report</h3>
        <p><strong>Student:</strong> ${name || "Anonymous"}</p>
        <p><strong>Total Grades:</strong> ${gradesArray.length}</p>
        <p><strong>Average:</strong> ${average.toFixed(2)}%</p>
        <p><strong>Letter Grade:</strong> ${gradeInfo.letter}</p>
        <p><strong>Status:</strong> ${gradeInfo.message}</p>
    `
}

// ============================================
// PART 3: LOOPS (At least 2 examples required)
// ============================================

// Loop Example 1: Display all grades using forEach
function displayAllGrades() {
  console.log("Displaying all grades using forEach loop:")

  if (grades.length === 0) {
    gradesListDiv.innerHTML = "<p>No grades entered yet.</p>"
    return
  }

  let gradesHTML = "<h4>All Grades:</h4>"

  // forEach loop to iterate grades array
  grades.forEach((grade, index) => {
    console.log(`Grade ${index + 1}: ${grade}%`)
    gradesHTML += `<div class="grade-item">Grade ${index + 1}: ${grade}%</div>`
  })

  gradesListDiv.innerHTML = gradesHTML
}

// Loop Example 2: Generate grade statistics using for loop
function generateGradeStats() {
  if (grades.length === 0) return

  let highest = grades[0]
  let lowest = grades[0]
  let passingGrades = 0

  console.log("Calculating statistics using for loop:")

  // For loop to find highest, lowest, and count passing grades
  for (let i = 0; i < grades.length; i++) {
    const currentGrade = grades[i]

    // Find highest grade
    if (currentGrade > highest) {
      highest = currentGrade
    }

    // Find lowest grade
    if (currentGrade < lowest) {
      lowest = currentGrade
    }

    // Count passing grades (60 or above)
    if (currentGrade >= 60) {
      passingGrades++
    }

    console.log(`Processing grade ${i + 1}: ${currentGrade}%`)
  }

  return {
    highest: highest,
    lowest: lowest,
    passing: passingGrades,
    failing: grades.length - passingGrades,
  }
}

// Loop Example 3: Create countdown animation using while loop
function createCountdown() {
  let count = 5
  const demoOutput = document.getElementById("demoOutput")

  console.log("Starting countdown using while loop:")

  const countdownInterval = setInterval(() => {
    if (count > 0) {
      demoOutput.innerHTML = `<h4>Demo starting in: ${count}</h4>`
      console.log(`Countdown: ${count}`)
      count--
    } else {
      demoOutput.innerHTML = `<h4>Demo Complete!</h4><p>Check the console for detailed logs!</p>`
      console.log("Countdown finished!")
      clearInterval(countdownInterval)
    }
  }, 1000)
}

// ============================================
// PART 4: DOM INTERACTIONS (At least 3 required)
// ============================================

// DOM Interaction 1: Add grade button click event
addGradeBtn.addEventListener("click", () => {
  const gradeValue = Number.parseFloat(gradeInput.value)
  const nameValue = nameInput.value.trim()

  // Update student name if provided
  if (nameValue && nameValue !== studentName) {
    studentName = nameValue
    console.log(`Student name updated to: ${studentName}`)
  }

  // Validate grade input
  const validation = validateGrade(gradeValue)

  if (validation.valid) {
    // Add grade to array
    grades.push(gradeValue)
    totalGrades++

    // Update DOM to show success
    gradeInput.style.borderColor = "#28a745"
    gradeInput.value = "" // Clear input

    // Display updated grades list
    displayAllGrades()

    console.log(`Added grade: ${gradeValue}. Total grades: ${totalGrades}`)

    // Show success message
    resultsDiv.innerHTML = `<p class="success"> Grade ${gradeValue}% added successfully!</p>`
  } else {
    // Show error message
    gradeInput.style.borderColor = "#dc3545"
    resultsDiv.innerHTML = `<p class="danger">${validation.message}</p>`
    console.log(`Invalid grade: ${validation.message}`)
  }
})

// DOM Interaction 2: Calculate final grade button click event
calculateBtn.addEventListener("click", () => {
  if (grades.length === 0) {
    resultsDiv.innerHTML = `<p class="warning">Please add some grades first!</p>`
    return
  }

  // Calculate average using custom function
  const average = calculateAverage(grades)

  // Generate and display student report
  const report = generateStudentReport(studentName, grades, average)
  resultsDiv.innerHTML = report

  // Get and display letter grade
  const gradeInfo = getLetterGrade(average)
  letterGradeDiv.innerHTML = `
        <h4> Final Grade: ${gradeInfo.letter}</h4>
        <p>${gradeInfo.message}</p>
    `

  // Generate and display statistics
  const stats = generateGradeStats()
  const statsHTML = `
        <h4>Grade Statistics:</h4>
        <p><strong>Highest:</strong> ${stats.highest}%</p>
        <p><strong>Lowest:</strong> ${stats.lowest}%</p>
        <p><strong>Passing Grades:</strong> ${stats.passing}</p>
        <p><strong>Failing Grades:</strong> ${stats.failing}</p>
    `

  letterGradeDiv.innerHTML += statsHTML

  isCalculated = true
  console.log("Final calculation completed!")
})

// DOM Interaction 3: Show grade history button
document.getElementById("showHistoryBtn").addEventListener("click", () => {
  const historyDiv = document.getElementById("gradeHistory")

  if (grades.length === 0) {
    historyDiv.innerHTML = "<p>No grade history available.</p>"
    return
  }

  let historyHTML = "<h4> Complete Grade History:</h4>"

  // Using for...of loop to display history
  let gradeNumber = 1
  for (const grade of grades) {
    const gradeInfo = getLetterGrade(grade)
    historyHTML += `
            <div class="grade-item">
                <strong>Grade ${gradeNumber}:</strong> ${grade}% (${gradeInfo.letter}) - ${gradeInfo.message}
            </div>
        `
    gradeNumber++
  }

  historyDiv.innerHTML = historyHTML
  console.log("Grade history displayed")
})

// DOM Interaction 4: Clear history button
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  // Confirm before clearing
  const confirmClear = confirm("Are you sure you want to clear all grades?")

  if (confirmClear) {
    // Reset all variables
    grades = []
    totalGrades = 0
    isCalculated = false
    studentName = ""

    // Clear all DOM elements
    document.getElementById("gradeHistory").innerHTML = ""
    gradesListDiv.innerHTML = ""
    resultsDiv.innerHTML = ""
    letterGradeDiv.innerHTML = ""
    nameInput.value = ""
    gradeInput.value = ""

    // Reset input styling
    gradeInput.style.borderColor = "#e1e5e9"

    console.log("All data cleared!")
    alert(" All grades have been cleared!")
  }
})

// DOM Interaction 5: Demo button with interactive features
document.getElementById("demoBtn").addEventListener("click", () => {
  console.log("=== RUNNING INTERACTIVE DEMO ===")

  // Start countdown animation
  createCountdown()

  // Demonstrate all concepts after countdown
  setTimeout(() => {
    // sample grades for demonstration
    const sampleGrades = [85, 92, 78, 88, 95]
    grades = [...sampleGrades] // Spread operator
    totalGrades = grades.length
    studentName = "Demo Student"

    // Update name input
    nameInput.value = studentName

    // Display all grades
    displayAllGrades()

    // Calculate and show results
    const average = calculateAverage(grades)
    const report = generateStudentReport(studentName, grades, average)
    resultsDiv.innerHTML = report

    // Show letter grade
    const gradeInfo = getLetterGrade(average)
    letterGradeDiv.innerHTML = `
            <h4> Demo Final Grade: ${gradeInfo.letter}</h4>
            <p>${gradeInfo.message}</p>
        `

    console.log("=== DEMO COMPLETED ===")
  }, 6000)
})

// Initializtion
console.log("Student Grade Calculator initialized!")
console.log("Variables declared:", { studentName, grades, totalGrades, isCalculated })

// Demonstrate initial conditionals
if (grades.length === 0) {
  console.log("Starting with empty grades array - ready for input!")
} else {
  console.log("Grades array has existing data")
}
