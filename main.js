class Technician {
    /* Create a Technician (name / preference) */
    constructor(name, preference = "Any") {
        this.name = name;
        this.preference = preference;
        this.workingTime = 0;
        membersT.push(this);
    }

    /* Allow to edit a Technician name */
    editName(newName) {
        this.name = newName;
    }

    /* Update working time by the duration for a technician*/
    addTime(duration) {
        this.workingTime += duration;
        return this;
    }

    /* Take an array full with Technician objects as input and return the Technician with the least workingTime */
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
    constructor(times, members) {
        do {
            let sideMembers = members.slice()
            let array = [];
            for (let i = 0; i < times.length; i++) {
                let tech = Technician.minTime(sideMembers);
                console.log(array, tech)
                tech.addTime(times[i]["duration"]);
                let index = sideMembers.indexOf(tech);
                sideMembers.splice(index, 1);
                array.push(tech);
            }
            this.time = array;
            break;
        } while (true)
    }
}


function schedule(days, times, members) {
    const list = [];
    for (let i = 0; i < days; i++) {
        let name = "Jour" + i.toString();
        name = new Days(times, members);
        list.push(name);
    }
    return list;
}

function main() {
    let noms = ["Céline", "Karine", "FabienneR", "FabienneS", "Nicolas", "Coralie", "Marielle", "Bérangère", "Audrey"];
    let times = [ { start: '9h', end: '16h', duration: 7},
              { start: '12h', end: '20h', duration: 8 },
              { start: '9h', end: '15h', duration: 6},
              { start: '20h', end: '8h', duration: 12 } ];
    /* Create 10 test tech */
    for (let i = 0; i < 9; i++) {
        let temp = "test" + i.toString();
        temp = new Technician(noms[i]);
    }
    /* console.log(members);
    console.log("----------------------------------------------------------------")
    let test = new Days(7,7,8,12,members);
    console.log(test)
    console.log("----------------------------------------------------------------")
    console.log(members) */
    console.log("----------------------------------------------------------------")
    console.log(schedule(28, times, membersT));
    console.log("----------------------------------------------------------------")
    console.log(membersT)
}

const membersT = [];
main()