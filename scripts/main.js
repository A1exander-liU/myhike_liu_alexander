function read_display_Quote() {
    //console.log("inside the function")

    //get into the right collection
    db.collection("quotes").doc("Tuesday")
        .onSnapshot(TuesdayDoc => {
            console.log(TuesdayDoc.data());
            document.getElementById("quote_goes_here").innerHTML = TuesdayDoc.data().quote;
        })
}
read_display_Quote();

function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // lets me know who is the user that logged to get the UID
            currentUser = db.collection("users").doc(user.uid); // will go to the firebase and go to the document of the user
            currentUser.get().then(userDoc => {
                // get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name)
                $("#name_goes_here").text(user_Name); //jQuery
                // document.getElementByID("name_goes_here").innerText = user_Name
            })
        }
    })
}
insertName()

function writeHikeData() {
    max = 21;
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");
    for (i = 1; i <= max; i++) {
        hikesRef.add({ //add to database, autogen ID
            code: "id" + i,
            name: "hike" + i,
            details: "Alexander says this hike is amazing!  You will love going on hike" + i
        })
    }
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name; // get value of the "name" key
                var details = doc.data().details; // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images" + collection + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");