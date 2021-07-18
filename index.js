axios.get('https://api.chucknorris.io/jokes/categories')
    // requesting data from the api
    .then(response => {
        //  console.log(response.data);
        let categoryreponse = response.data;
        // if api allows the request as a successful response

        let i;
        let x = 0;
        let y = 1;

        let categorysectionbox = document.getElementById("categorysectionbox");
        let categoryboxrow;

        for (i = 0; i < categoryreponse.length; i++) {
            if (i == 0) {
                // creating row for each 4 category
                categoryboxrow = document.createElement("div");
                categoryboxrow.id = "categoryboxrow" + (i + 1);
                categoryboxrow.className = "categoryboxrow";
            }
            if (x == 4 * y) {
                // creating row for each 4 category
                categoryboxrow = document.createElement("div");
                categoryboxrow.id = "categoryboxrow" + (y + 1);
                categoryboxrow.className = "categoryboxrow";
                y++;
            }
            // inserting elements dynamically so that it could adjust the quantity of data coming by itself and hence could arrange them accordingly 
            let categorybox = document.createElement("div");
            let categoryboxbutton = document.createElement("button");
            var uppercaseFirstLetterData = categoryreponse[i].charAt(0).toUpperCase() + categoryreponse[i].slice(1);
            // for making first letter of collected data Capital
            categoryboxbutton.innerHTML = uppercaseFirstLetterData;
            categoryboxbutton.onclick = function () {
                clickeme(this.id)
                // this.id will give the id of the clicked button
            };
            categoryboxbutton.className = "categoryboxbutton";
            categoryboxbutton.id = "categoryboxbutton" + (i + 1);
            categorybox.appendChild(categoryboxbutton);
            categorybox.id = "categorybox" + (i + 1);
            categorybox.className = "categorybox";
            categoryboxrow.style.display = "flex";
            categoryboxrow.style.flexDirection = "row";
            categoryboxrow.appendChild(categorybox);
            categorysectionbox.appendChild(categoryboxrow);
            x++;
        }

        let newjoke = document.getElementById("fetchnewjoke");

        let jokessection = document.getElementById("jokessection");
        let selectedcategory = document.getElementById("selectedcategory");
        let jokesectionbox = document.getElementById("jokesectionbox");
        let jokes = document.getElementById("jokes");

        let buttonid;
        var lowercaseFirstLetterData;

        let checkedsame = 0;
        // for checking if the same title button is pressed again and again

        let idcheckingarray = [];
        // for selecting different joke category after clicking on different category


        function clickeme(ididentifier) {

            if (ididentifier != idcheckingarray[0]) {
                checkedsame = 0;
                // for selecting different joke category after clicking on different category
            }
            idcheckingarray[0] = ididentifier;

            buttonid = document.getElementById(ididentifier);

            lowercaseFirstLetterData = buttonid.innerHTML.charAt(0).toLowerCase() + buttonid.innerHTML.slice(1);
            // making the first case capital back to normal because we have to fetch data from api



            axios.get("https://api.chucknorris.io/jokes/random?category=" + lowercaseFirstLetterData)
                // requesting data from the api
                .then(response => {

                    // if api allows the request as a successful response

                    // starting jokes showing section

                    let requestedjoke = response.data;

                    if (checkedsame == 0) {
                        var uppercaseFirstLetterData2 = requestedjoke.categories[0].charAt(0).toUpperCase() + requestedjoke.categories[0].slice(1);

                        selectedcategory.innerHTML = "Selected Category : " + uppercaseFirstLetterData2;
                        // fetching the data for category showing
                        jokes.innerHTML = requestedjoke.value;
                        checkedsame = 1;
                        // for checking if the same title button is pressed again and again

                    }
                })
                .catch(error => console.error(error)); // if api declines the request

            //  we are getting the data in JSON form directly because of axios

        }

        // for fetching new joke after clicking new joke
        newjoke.addEventListener("click", () => {
            if(buttonid == null){
                jokes.innerHTML ="First Select any Category";

            }
            else{
                axios.get("https://api.chucknorris.io/jokes/random?category=" + lowercaseFirstLetterData)
                .then(response => {
                    console.log(buttonid.innerHTML)
                    let newrequestedjoke = response.data;
                    var uppercaseFirstLetterData3 = newrequestedjoke.categories[0].charAt(0).toUpperCase() + newrequestedjoke.categories[0].slice(1);
                    selectedcategory.innerHTML = "Selected Category : " + uppercaseFirstLetterData3;
                    // fetching the data for category showing
                    jokes.innerHTML = newrequestedjoke.value;
                })
                .catch(error =>{
                    console.error(error)
                    console.log("Some Error,");

                });
            }
            
        });

    })
    .catch(error => console.error(error)); // if api declines the request

//  we are getting the data in JSON form directly because of axios






