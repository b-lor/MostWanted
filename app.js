/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch (searchType) {
    case 'yes':
      // TODO: search by name
      searchByName(people);
      break;
    case 'no':
      searchByTraits(people);
      break;
    default:
      alert("Wrong! Please try again, following the instructions dummy. :)");
      app(people); // restart app
      break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation', multiple traits' .");
  let filteredPeople;
  switch (userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    // so on and so forth
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
      case "multiple traits":
      filteredPeople = searchMultipleTraits(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }
  let foundPerson = filteredPeople[0];
  mainMenu(foundPerson, people);
}

function searchMultipleTraits(people) {
  let userInputChoice = prompt("Select 1 or more criteria: 'gender', 'height', 'weight', 'eye color', 'age'. 'Quit'").toLowerCase();
  let current = [];
  let filteredPeople = people;
  let persons;
  current = userInputChoice.split(",");
  if(!validateMultipleTraits(current)){
    alert("Error. If more than 1 trait is selected, please leave a space in between");
    return searchMultipleTraits(people);
  }
  for (var i = 0; i < current.length; i++) {
      switch(current[i]){
        case "gender":
        filteredPeople = (searchByGender(filteredPeople));
        break;
        case "height":
        filteredPeople = (searchByHeight(filteredPeople));
        break;
        case "weight":
        filteredPeople = (searchByWeight(filteredPeople));
        break;
        case "eye color":
        filteredPeople = (searchByEyeColor(filteredPeople));
        break;
        case "age":
        filteredPeople = (searchByAge(filteredPeople));
        break;
        case "quit":
        return;
        default:
        alert("You have entered an invalid selection. Try Again.");
        searchMultipleTraits(people);
        break;
      }
  }
  if(filteredPeople.length === 1){
    let foundPerson = filteredPeople[0];
    mainMenu(foundPerson, people);
  }
  else if(filteredPeople.length === 0){
    alert("No person found. Try again");
    searchByMultipleTraits(people);
  }
  else{
    alert("There are more than 1 matches.");
    displayPeople(filteredPeople);
    mainMenu(searchByName(filteredPeople)[0], people);
  }
}

function validateMultipleTraits(input){
  for (var i = 0; i < input.length; i++) {
    input[i] = input[i].trim();
  }
  traitsArray = ["gender", "height", "weight", "eye color", "age", "quit"];
  let isCriteria = false;
  for (var i = 0; i < input.length; i++) {
    isCriteria = false;
    for (var j = 0; j < traitsArray.length; j++) {
      if(traitsArray[j] === input[i]){
        isCriteria = true;
      }
    }
    if(!isCriteria){
      return false;
    }
  }
  return true;
}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is person in inches?");
  let newArray = people.filter(function (el) {
    if (el.height == userInputHeight) {
      return true;
    }
    // return true if el.weight matches userInputHeight
  });
  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");
  let newArray = people.filter(function (el) {
    if (el.weight == userInputWeight) {
      return true;
    }
  });
  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What is the person's eye color?");
  let newArray = people.filter(function (el) {
    if (el.eyeColor == userInputEyeColor) {
      return true;
    }
  });
  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("What is the person's gender?");
  let newArray = people.filter(function (el) {
    if (el.gender == userInputGender) {
      return true;
    }
  });
  return newArray;
}

function searchByAge(people) {
  getDob(people);
  let userInputAge = prompt("What is the person's age?");
  let newArray = people.filter(function (el) {
    if (userInputAge == el.age) {
      return true;
    }
  });
  return newArray;
}

function getDob(people) {
  let arrayDob = people.map(function (el) {
    return el.dob;
  });
  calculateAge(arrayDob, people);
}

function calculateAge(arrayDob, people) {
  let today = new Date();
  for (i = 0; i < arrayDob.length; i++) {
    let dob = new Date(arrayDob[i]);
    let age = today.getFullYear() - dob.getFullYear();
    let month = today.getMonth() - dob.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    people[i].age = age;
  }
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?");
  let newArray = people.filter(function (el) {
    if (el.occupation == userInputOccupation) {
      return true;
    }
  });
  return newArray;
}

// function searchMultipleTraits(people) {
//   let userInputOccupation = prompt("Please enter 1 or more traits");
//   let newArray = people.filter(function (el) {
//     if (el.occupation == userInputOccupation) {
//       return true;
//     }
//   });
//   return newArray;
// }

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch (displayOption) {
    case "info":
      // TODO: get person's info
      return displayPerson(person, people);
      break;
    case "family":
      // TODO: get person's family
      return displayFamily(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants
      return anyDescendants(person, people);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  var firstName = prompt("What is the person's first name?");
  var lastName = prompt("What is the person's last name?");
  var listName = people.filter(function (el) {
    if (firstName.toLowerCase() === el.firstName.toLowerCase() && lastName.toLowerCase() === el.lastName.toLowerCase()) {
      return true;
    }
    else {
      return false;
    }
  });
  //console.log(listName[0])
  mainMenu(listName[0], people);
}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Height: " + person.height + " in." + "\n";
  personInfo += "Weight: " + person.weight + " lbs." + "\n";
  personInfo += "Age: " + person.dob + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";

  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback) {
  do {
    var response = prompt(question).trim();
  } while (!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}

function displayFamily(person, people) {
  let family = "";
  if (person.parents.length > 0) {
    family = "Parents: " + "\n" + findName(person.parents[0], people) + "\n";
    if (person.parents.length > 1) {
      family += findName(person.parents[1], people) + "\n" + "\n";
    }
  }
  if (person.currentSpouse !== null) {
    family += "Spouse: " + "\n" + findName(person.currentSpouse, people) + "\n" + "\n";
  }
  if (anyChildren(people, person).length > 1) {
    family += "Children: " + "\n" + anyChildren(people, person) + "\n" + "\n";
  }
  if (anySiblings(people, person).length > 1) {
    family += "Siblings: " + "\n" + anySiblings(people, person) + "\n" + "\n";
  }
  alert(family)
  //console.log(family);
}

function findName(id, people) {
  let name = people.filter(function (el) {
    if (el.id == id) {
      return true;
    }
  });
  return name[0].firstName + " " + name[0].lastName;
}

function anyChildren(people, person) {
  let string = " ";
  let children = people.filter(function (el) {
    for (let i = 0; i < el.parents.length; i++) {
      if (el.parents[i] === person.id) {
        return true;
      }
    }
  });
  for (var i = 0; i < children.length; i++) {
    string = string.concat(children[i].firstName + " " + children[i].lastName + "\n");
  }
  return string;
}

function anySiblings(people, person) {
  let siblings = people.filter(function (el) {
    if (el.id === person.id) {
      return false;
    }
    if (el.parents.length === 2) {
      if (el.parents[0] === person.parents[0] && el.parents[1] === person.parents[1] ||
        el.parents[1] === person.parents[0] && el.parents[0] === person.parents[1]) {
        return true;
      }
    }
    if (el.parents.length === 1) {
      if (el.parents.length === person.parents.length) {
        if (el.parents[0] === person.parents[0]) {
          return true;
        }
      }
    }
  });

  let string = " ";
  for (var i = 0; i < siblings.length; i++) {
    string = string.concat(siblings[i].firstName + " " + siblings[i].lastName + "\n");
  }
  return string;
}

function anyDescendants(person, people) {
  var descendants = findDescendants(person, people);
  if (descendants.length === 0) {
    descendants = "There are no descendants."
  }
  alert(descendants)
 // console.log(descendants)
}

function findDescendants(person, people) {
  var descendant = getDescendants(person, people);
  var descendantsToReturn = "";
  for (var i = 0; i < descendant.length; i++) {
    descendantsToReturn += descendant[i].firstName + " " + descendant[i].lastName + "\n";

    if (i >= 0) {
      var grandChildren = findDescendants(descendant[i], people);
      descendantsToReturn += grandChildren;
    }
  }
  //console.log(descendantsToReturn)
  return descendantsToReturn;
}

function getDescendants(person, people) {

  let descendants = people.filter(function (el) {
    if (el.parents.length === 0) {
      return false;
    }
    else if (el.parents[0] === person.id || el.parents[1] === person.id) {
      return true;
    }
  });
  return descendants;
}

function getAge(dateString) {
  let dates = dateString.split("/");
  let d = new Date();

  let userMonth = dates[0];
  let userDay = dates[1];
  let userYear = dates[2];

  let curMonth= d.getMonth()+1;
  let curDay = d.getDate();
  let curYear = d.getFullYear();

  let age = curYear - userYear;

  if((curMonth < userMonth) || ( (curMonth == userMonth) && curDay < userDay)){
      age--;
  }
  return age;
}


