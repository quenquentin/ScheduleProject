const fns = require("date-fns");
const fs = require('fs');

class Technician {
    /** Creates Technician objects
     * @param name: Technician's name
     * @type name: string
     * @param preference: Technician's preference concerning when he/she doesn't want to work during the week
     * @type preference: string (Day of the week with capital letter and in english)
     * */
    constructor(name, preference = "Any") {
        this.name = name;
        this.preference = preference;
        this.workingTime = 0;
        membersT.push(this);
    }

    /** Allows to edit name of a Technician object
     * @param newName: New name that will be updated
     * @type newName: string
     * */
    editName(newName) {
        this.name = newName;
    }

    /** Allows to increase/decrease (if value is negative) workingTime of a Technician object
     * @param duration: Value of increasing workingTime
     * @type duration: integer
     * @return type: Object of Technician Class
     * */
    addTime(duration) {
        this.workingTime += duration;
        return this;
    }


    /** Takes an array as input and returns the Technician with the least workingTime among all
     * @param array: array full of Technician objects
     * @type array: array
     * @return minimum: Technician with the least value in workingTime
     * @type minimum: Object of Technician class
     * */
    static minTime(array) {
        let minimum = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i].workingTime < minimum.workingTime) {
                minimum = array[i];
            }
        }
        return minimum;
    }
}

/**
 * Do not forget :  times = [ { start: '9h', end: '10h', duration: 1}, { start '15h', end: '18h', duration: 3 } ]
 * */

class Days {
	/** Creates Days objects with a Tech assigned to it following preferences and working time
	 * @param times: Contains all working times
     * @type times: array
     * @param members: Contains all Technicians
     * @type members: array
	 * @param date: Date of today
     * @type date: Date (dd-MM)
	 * */
    constructor(times, members, date) {
        this.date = fns.format(date, "dd-MM")
        let available = members.slice();
        let array = [];
		let i = 0;
		let techPref = True;
		let Tlength = times.length
        while (i < Tlength && techPref == True) { 
            do {
                let tech = Technician.minTime(available);
                if (tech.preference !== fns.format(date, "EEEE")) {
                    techPref = False;
                }
                else {
                    let index = available.indexOf(tech);
                    available.splice(index, 1);
					i++;
                }
            } while(available.length !== 0)
            if (available.length === 0) {
                throw new Error("Il est impossible de trouver un arrangement selon les préférences pour cette date : " + this.date);
            }
            let tech = Technician.minTime(available);
            tech.addTime(times[i]["duration"]);
            let index = available.indexOf(tech);
            available.splice(index, 1);
            array.push(tech);
        }
        this.times = array;
    }
	/** Allows to print out the Technician associated to a specific Day
	 * @param times: Contains the Technician associated to that day
     * @type times: array
	 * */
    printOut(times) {
		console.assert(times >= 0, "PrintOut a valid number");
		let length = times.length;
        for (let i = 0; i-1 < length; i++) {
            console.log("Horaire" + i.toString() + "=" + this.times[i]);
        }
    }
}

/** Creates a schedule based on args given by user
 * @param days: Contains the worker associated to that day
 * @type days: integer
 * @param times: Contains all working times possible
 * @type times: array
 * @param members: Contains all Technicians
 * @type members: array
 * */
function schedule(days, times, members) {
    const list = [];
    let date = new Date();
    for (let i = 0; i < days; i++) {
        let name = "Jour" + i.toString();
        name = new Days(times, members, date);
        list.push(name);
        date = fns.addDays(date, 1)
    }
    return list;
}


class Times {
	constructor(start, end, duration) {
		this.start = start;
		this.end = end;
		this.duration = duration;
	}
	/** Allows to put data in a dictionnary to be transformed in JSON format later
	 * @param days: Contains all Days you want to transform (basically every single one here)
	 * @type data: array
	 * */
	sortData(data) {
		let start = [];
		let end = [];
		let duration[];
		let length = data.length;
		for (let i = 0; i < length; i++) {
			start.push(data[i].start);
			start.push(data[i].start);
			start.push(data[i].start);
		}
		dictionnary = {"start": start; "end": end; "duration": duration}
		return dictionnary;
	}
}



function jsonWriter(data) {
	
}

/* fs.writeFile("data.json", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
*/

/**
 *
 * */
function main() {
    let noms = ["Person1", "Person2", "Person3", "Person4", "Person5", "Person6", "Person7", "Person8", "Person9"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let times = [{start: '9h', end: '16h', duration: 7},
        {start: '12h', end: '20h', duration: 8},
        {start: '9h', end: '15h', duration: 6},
        {start: '20h', end: '8h', duration: 12}];
    /* Create 10 test tech */
    try {
        for (let i = 0; i < 9; i++) {
            let temp = "test" + i.toString();
            // temp = new Technician(noms[i], days[i % days.length]);
            temp = new Technician(noms[i], "Wednesday");
        }
        console.log("----------------------------------------------------------------")
        console.log(schedule(28, times, membersT));
        console.log("----------------------------------------------------------------")
        console.log(membersT)
    }
    catch (e) {
        console.error(e)
    }
}

const membersT = [];
main()
