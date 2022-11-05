// Veronica Richey Week 5 Coding Assignment

//•	Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
// •	Use at least one array.
// •	Use at least two classes.
// •	Your menu should have the options to create, view, and delete elements

// The first class I created was Diver. Within diver I made the constructors name and certificationLevel.
// I used a descride method and template literal to return the divers name has an certificationLevel.

 class Diver {
    constructor (name, certificationLevel) {
        this.name = name;
        this.certificationLevel = certificationLevel;
        
    }
    describe(){
        return `${this.name} has an ${this.certificationLevel}.`;
    }
    addCertification(diver, certification) {
        if (diver instanceof Diver) {
            diver.certificationLevel.push(certification)
        } else {
            throw new Error(`You can only add an instance of Diver. Argument is not a diver: ${diver}`);
        }
    }
}

// Within class Instructor I added an addDivers method so I could input divers who received certifications from the Instructor.
// When a diver is added to an instructor its added to the this.diver array but only if its a instance of a diver.
// the Describe method for the Instructor prints out the name of the Instructor and how many divers he/she has. 

class Instructor {
    constructor (name) {
        this.name = name;
        this.divers = [];
    }

    addDivers(diver) {
        if(diver instanceof Diver) {
    this.divers.push(diver);
        } else {
            throw new Error(`You can only add an instance of Diver. Argument is not a diver: ${diver}`)
        }   
    }
    

    describe() {
        return `${this.name} has ${this.divers.length} divers.`;
    }
}

// I created a class Menu where the constructor does not take any arguements but it will create a this.instructor array 
// I added a start method to enter the menu and used a switch to create the menu.

class Menu {
    constructor() {
        this.instructor = [];
        this.selectedInstructor = null;
    }
    
    start() { 
    
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1' :
                    this.createInstructor();
                    break;
                case '2' :
                    this.viewInstructor();
                    break;
                case '3' :
                    this.deleteInstructor();
                    break;
                case '4' :
                    this.displayInstructor();
                    break;
                    default:
                        selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Have a Fin-Tastic Day!');
    }
// Based on what the user inputs when prompted we will enter that case.

// Here I am using a Method showMainMenuOptions which will return the main menu options prompt :
    showMainMenuOptions() { 
        return prompt(`
        0) Exit
        1) Create New Instructor
        2) View Instructor
        3) Delete Instructor
        4) Display All Instructors
        `);
    }
 // When a user is in the Instructor Menu Options they will view this prompt.   
    showInstructorMenuOptions(instructorInfo) {
        return prompt(`
        0) Back
        1) Create Diver
        2) Delete Diver
        -------------------
        ${instructorInfo}
        `);
    }
// Once an instructor is added using the menu the display instructor option will show a list of all the instructors that
// have been added to the this.instructor array.

    displayInstructor() { 
        let instructorString = '';
        for(let i= 0; i < this.instructor.length; i++) {
            instructorString += i + ') ' + this.instructor[i].name + '\n';
        }
        alert(instructorString);
    }

// To create an Instructor the user will answer the name of the Instructor and that name will be pushed
// to the New Instructor array which can then be viewed in the view instructor prompt
    createInstructor() { 
        let name = prompt('Enter name of Instructor:');
           this.instructor.push(new Instructor(name));
    }
        
// when the user selects the view instructor option it will ask the user the index of the instructor they wish to see
// as long as it is a valid index of the this.instructor array the prompt will show the instructor name and the names of
// any divers who have received their certification from that instructor.

    viewInstructor() {
        
        let index = prompt('Enter the index of the Instructor you wish to see:');
        if (index > -1 && index < this.instructor.length){
            this.selectedInstructor = this.instructor[index];
            let description = 'Instructors Name: ' + this.selectedInstructor.name + '\n';
        
// This will also show the Instructor Menu Options and allow the user to create or delete a diver in that instructor.
            for (let i = 0; i < this.selectedInstructor.divers.length; i++) {
                description += i + ') ' + this.selectedInstructor.divers[i].name + ' - ' + this.selectedInstructor.divers[i].certificationLevel + '\n';

            }

            let selection = this.showInstructorMenuOptions(description);
            switch (selection) {
                case '1' :
                    this.createDiver();
                    break;
                case '2' :
                    this.deleteDiver();
            }
        }
    }
// when user selects create diver option they will be prompted to enter divers name and then their certification level.
    createDiver() {
        let name = prompt('Enter name of New Diver:');
        let certificationLevel = prompt('What is your current certification level?:');
        this.selectedInstructor.divers.push(new Diver(name, certificationLevel));
    }

// if the user chooses to delete a diver they will be prompted to input the index of the diver in the diver array and it will splice
// the index only.
    deleteDiver () {
        let index = prompt('Enter index of the Diver you wish to delete:');
        if (index > -1 && index < this.selectedInstructor.divers.length) {
         this.selectedInstructor.divers.splice(index, 1);
       
        }
    }

// And finally to delete an instructor from the instructor array a user can select option delete instructor and they will be prompted to enter the 
// index of that instructor which will remove it from the array using splice again.
    deleteInstructor() {
        let index = prompt('Enter the index of the Instructor you wish to delete');
        if (index > -1 && index < this.instructor.length) {
            this.instructor.splice(index, 1); 
        }

    }
}

let menu = new Menu();
menu.start();