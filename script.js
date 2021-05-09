//Project Name:- TRIP GENIE
//----------MENU----------
//1. Flight Ticket Booking
//2. Train Ticket Booking
//3. Bus Ticket Booking
//4. Hotel Booking
//5. Holiday Package Booking
//6. Tourist Places to visit in India(State-wise)

const puppy=require("puppeteer");
const fs = require("fs");

const choice=1; //Select the Choice 1 or 2 or 3 or 4 or 5 or 6
const trip="ONEWAY"; //Select "ONEWAY" or "ROUND"
const sourceCity="New Delhi"; //Select the Source City(from)
const destinationCity="Imphal"; //Select the Destination City(to)
const departureDate='div[aria-label="Sat May 15 2021"]'; //Write Day, Month, Date, Year at the particular locations keeping other syntax as it is.
const returnDate='div[aria-label="Thu May 20 2021"]'; //Write Day, Month, Date, Year at the particular locations keeping other syntax as it is.
const Number_of_Adults='li[data-cy="adults-2"]'; //Select 1 or 2 or 3 or 4 or 5 or 6 or 7 or 8 or 9 or 10(for >9) 
const Number_of_Children='li[data-cy="children-2"]'; //Select 0 or 1 or 2 or 3 or 4 or 5 or 6 or 7(for >6)
const Number_of_Infants='li[data-cy="infants-0"]'; //Select 0 or 1 or 2 or 3 or 4 or 5 or 6 or 7(for >6)
const travelClass_forFlights="Economy"; //Select Economy or Premium Economy or Business
const travelClass_forTrains="Sleeper Class"; //Select "All Class" or "Sleeper Class" or "Third AC" or "Second AC" or "First AC" or "Second Seating" or "AC Chair Car" or "First Class" or "Third AC Economy"
const Child_0_Age="Digit4"; //Write 0 or 1 or 2 or 3 or 4 or 5 or 6 or 7 or 8 or 9 keeping other syntax as it is.              
const Child_1_Age="Digit9"; //Write 0 or 1 or 2 or 3 or 4 or 5 or 6 or 7 or 8 or 9 keeping other syntax as it is.                
const Child_2_Age="Digit0"; //Write 0 or 1 or 2 or 3 or 4 or 5 or 6 or 7 or 8 or 9 keeping other syntax as it is.                
const Child_3_Age="Digit0"; //Write 0 or 1 or 2 or 3 or 4 or 5 or 6 or 7 or 8 or 9 keeping other syntax as it is.                
const travelFor="Leisure"; //Select "Work" or "Leisure"

//Global Information
let obj={};
let flightHeadings=[];
let flightHeading;
let trainHeading;
let busHeading;
let holidayPackageHeading;
let hotelHeading;
let check=true;
let screenshotName;

//Menu Displaying
console.log("Project Name:- TRIP GENIE");
console.log("----------MENU----------");
console.log("1. Flight Ticket Booking");
console.log("2. Train Ticket Booking");
console.log("3. Bus Ticket Booking");
console.log("4. Hotel Booking");
console.log("5. Holiday Package Booking");
console.log("6. Tourist Places to visit in India(State-wise)");

async function main()
{
    let browser=await puppy.launch({
        headless: false,
        defaultViewport: false,
        args:['--start-maximized']    //To make Browser Fullscreen.
    });
    let tabs=await browser.pages();
    let tab=tabs[0];
    await tab.goto("https://www.makemytrip.com");
    
    if(choice==1)
    {
        await flightTicketBooking(tab,browser);
    }
    else if(choice==2)
    {
        await trainTicketBooking(tab,browser);
    }     
    else if(choice==3)
    {
        await busTicketBooking(tab,browser);
    }   
    else if(choice==4)
    {
        await hotelBooking(tab,browser);
    }  
    else if(choice==5)
    {
        await holidayPackageBooking(tab,browser);
    }  
    else if(choice==6)
    {
        await Tourist_Places_to_visit_in_India(tab,browser);
    }  
    else
    {
        console.log("Wrong Choice. Please Try Again.");
    }
}

async function flightTicketBooking(tab,browser)
{
    //Removing "Login or Create Account" Popup Box
    await tab.waitForTimeout(1000);
    await tab.waitForSelector(".widgetLoader",{visible: true});
    await tab.waitForSelector(".fswTabs.latoBlack.greyText",{visible: true});
    await tab.click('li[data-cy="oneWayTrip');

    //Selecting Trip
    if(trip=="ONEWAY")
    {
        await tab.click('li[data-cy="oneWayTrip"]');
    }
    else
    {
        await tab.click('li[data-cy="roundTrip"]');
    }
    
    //Entering Source City
    await tab.waitForSelector('label[for="fromCity"]',{visible: true});
    await tab.click('label[for="fromCity"]');
    await tab.waitForSelector('label[for="fromCity"]',{visible: true});
    await tab.type(".react-autosuggest__input.react-autosuggest__input--open",sourceCity);
    await tab.waitForTimeout(3000);
    await tab.keyboard.press("ArrowDown");                                 
    await tab.keyboard.press("Enter");

    //Entering Destination City
    await tab.type(".react-autosuggest__input.react-autosuggest__input--open",destinationCity);
    await tab.waitForTimeout(3000);
    await tab.keyboard.press("ArrowDown");
    await tab.keyboard.press("Enter");

    //Departure Date
    await tab.click(departureDate);
                                                                         

    //Return Date
    if(trip=="ROUND")
    {
        await tab.click(returnDate);
    }                                                

    //Travellers & Class
    await tab.click(".fsw_inputBox.flightTravllers.inactiveWidget");
    
    //Clicking on Number of Adults
    await tab.click(Number_of_Adults);
    
    //Clicking on Number of Children
    await tab.click(Number_of_Children);
    
    //Clicking on Number of Infants
    await tab.click(Number_of_Infants);

    //Clicking on Travel Class
    if(travelClass_forFlights=="Economy")
    {
        await tab.click('li[data-cy="travelClass-0"]');
    }
    else if(travelClass_forFlights=="Premium Economy")
    {
        await tab.click('li[data-cy="travelClass-1"]');
    }
    else
    {
        await tab.click('li[data-cy="travelClass-2"]');
    }
    
    //Clicking on Apply Button
    await tab.click(".primaryBtn.btnApply.pushRight");

    //Clicking on Search Button
    await tab.click(".primaryBtn.font24.latoBold.widgetSearchBtn");

    //Getting Information for "ROUND" Trip
    if(trip=="ROUND")
    {
        await tab.waitForSelector(".fontSize16.blackText.appendLR20.appendBottom20.paddingTop20",{visible: true});
        let flightHeadingsTags=await tab.$$(".fontSize16.blackText.appendLR20.appendBottom20.paddingTop20");

        for(let i=0;i<flightHeadingsTags.length;i++)
        {
            let heading=await tab.evaluate(function(ele) {
                return ele.textContent;
            }, flightHeadingsTags[i]);
            flightHeadings.push(heading);
        }
        
        let i1=1;
        obj[flightHeadings[0]]=[];
        obj[flightHeadings[1]]=[];
    
        let listingCards0=await tab.$$("div.splitVw div.paneView:first-child .splitViewListing");
        let len=listingCards0.length;

        for(let i=0;i<len;i++)
        {
            await flightInfo_ROUNDTrip(tab,i,i,check);
        }
        check=false;
        let listingCards1=await tab.$$("div.splitVw div.paneView:nth-child(2) .splitViewListing");

        check=false;
        for(let k=0;k<listingCards1.length-1;k++)
        {
            check=false;
            await flightInfo_ROUNDTrip(tab,k,i1,check,len);
            i1++;
        }
        screenshotName="Flight_Ticket_Info_ROUND_Trip.jpeg";
    }
    else
    {
        await tab.waitForSelector(".fli-list .listingCard",{visible: true});
        flightHeading=sourceCity+" → "+destinationCity;

        obj[flightHeading]=[];
        
        let listingCards=await tab.$$(".fli-list .listingCard"); 
        let len=listingCards.length;

        for(let i=0;i<len;i++)
        {
            await flightInfo_ONEWAYTrip(tab,i,i);
        }
        screenshotName="Flight_Ticket_Info_ONEWAY_Trip.jpeg";
    }
    await tab.waitForTimeout(4000);
    await captureScreenshot(tab,browser);
}

async function flightInfo_ROUNDTrip(tab,i,i1,check,len)
{
    //Extracting "Flight Name" Information
    let FlightNameTag=await tab.$$(".boldFont.blackText");
    let FlightName=[];
    for(let i=0;i<FlightNameTag.length;i++)
    {
        let text1=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, FlightNameTag[i]);
        FlightName.push(text1);
    }

    //Extracting "Source Time" Information
    let SourceTimeTag=await tab.$$(".timingOption.makeFlex.spaceBtwCenter.textCenter.fontSize12 div:first-child p:first-child");
    let SourceTime=[];
    for(let i=0;i<SourceTimeTag.length;i++)
    {
        let text2=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, SourceTimeTag[i]);
        SourceTime.push(text2);
    }

    //Extracting "Source City" Information
    let SourceCityTag=await tab.$$(".timingOption.makeFlex.spaceBtwCenter.textCenter.fontSize12 div:first-child p:last-child");
    let SourceCity=[];
    for(let i=0;i<SourceCityTag.length;i++)
    {
        let text3=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, SourceCityTag[i]);
        SourceCity.push(text3);
    }

    //Extracting "Total Time" Information
    let TotalTimeTag=await tab.$$(".timingOption.makeFlex.spaceBtwCenter.textCenter.fontSize12 div:nth-child(2) p:first-child");
    let TotalTime=[];
    for(let i=0;i<TotalTimeTag.length;i++)
    {
        let text4=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, TotalTimeTag[i]);
        TotalTime.push(text4);
    }

    //Extracting "Number Of Stops" Information
    let NumberOfStopsTag=await tab.$$(".timingOption.makeFlex.spaceBtwCenter.textCenter.fontSize12 div:nth-child(2) p:last-child");
    let NumberOfStops=[];
    for(let i=0;i<NumberOfStopsTag.length;i++)
    {
        let text5=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, NumberOfStopsTag[i]);
        NumberOfStops.push(text5);
    }

    //Extracting "Destination Time" Information
    let DestinationTimeTag=await tab.$$(".timingOption.makeFlex.spaceBtwCenter.textCenter.fontSize12 div:nth-child(3) p:first-child");
    let DestinationTime=[];
    for(let i=0;i<DestinationTimeTag.length;i++)
    {
        let text6=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, DestinationTimeTag[i]);
        DestinationTime.push(text6);
    }

    //Extracting "Destination City" Information
    let DestinationCityTag=await tab.$$(".timingOption.makeFlex.spaceBtwCenter.textCenter.fontSize12 div:nth-child(3) p:last-child");
    let DestinationCity=[];
    for(let i=0;i<DestinationCityTag.length;i++)
    {
        let text7=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, DestinationCityTag[i]);
        DestinationCity.push(text7);
    }

    //Extracting "Flight Ticket Price" Information
    let FlightTicketPriceTag=await tab.$$(".blackText.fontSize16.blackFont.appendRight12");
    let FlightTicketPrice=[];
    for(let i=0;i<FlightTicketPriceTag.length;i++)
    {
        let text8=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, FlightTicketPriceTag[i]);
        FlightTicketPrice.push(text8);
    }
    
    if(check==true)
    {
        check=false;
        let obj11={};
        obj11["Flight Name"]=FlightName[i];
        obj11["Source Time"]=SourceTime[i+i];
        obj11["Source City"]=SourceCity[i];
        obj11["Total Time"]=TotalTime[i+i];
        obj11["Number Of Stops"]=NumberOfStops[i];
        obj11["Destination Time"]=DestinationTime[i];
        obj11["Destination City"]=DestinationCity[i];
        obj11["Flight Ticket Price"]=FlightTicketPrice[i];
        obj[flightHeadings[0]].push(obj11);
        check=false;
    }
    if(check==false)
    {
        let obj12={};
        obj12["Flight Name"]=FlightName[i+len];
        obj12["Source Time"]=SourceTime[i+len+i1+(len-1)];
        obj12["Source City"]=SourceCity[i+len];
        obj12["Total Time"]=TotalTime[i+len+i1+(len-1)];
        obj12["Number Of Stops"]=NumberOfStops[i+len];
        obj12["Destination Time"]=DestinationTime[i+len];
        obj12["Destination City"]=DestinationCity[i+len];
        obj12["Flight Ticket Price"]=FlightTicketPrice[i+len];
        if(obj12["Flight Name"])
        {
            obj[flightHeadings[1]].push(obj12);
        }
    }
    fs.writeFileSync("Flight_Ticket_Info_ROUND_Trip.json", JSON.stringify(obj));
}

async function flightInfo_ONEWAYTrip(tab,i,i,len)
{
    //Extracting "Flight Name" Information
    let FlightNameTag=await tab.$$(".boldFont.blackText.airlineName");
    let FlightName=[];
    for(let i=0;i<FlightNameTag.length;i++)
    {
        let text1=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, FlightNameTag[i]);
        FlightName.push(text1);
    }

    //Extracting "Source Time" Information
    let SourceTimeTag=await tab.$$(".makeFlex.spaceBtwCenter.textCenter.fontSize12 div:first-child p:first-child");
    let SourceTime=[];
    for(let i=0;i<SourceTimeTag.length;i++)
    {
        let text2=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, SourceTimeTag[i]);
        SourceTime.push(text2);
    }

    //Extracting "Source City" Information
    let SourceCityTag=await tab.$$(".makeFlex.spaceBtwCenter.textCenter.fontSize12 div:first-child p:last-child");
    let SourceCity=[];
    for(let i=0;i<SourceCityTag.length;i++)
    {
        let text3=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, SourceCityTag[i]);
        SourceCity.push(text3);
    }

    //Extracting "Total Time" Information
    let TotalTimeTag=await tab.$$(".makeFlex.spaceBtwCenter.textCenter.fontSize12 div:nth-child(2) p");
    let TotalTime=[];
    for(let i=0;i<TotalTimeTag.length;i++)
    {
        let text4=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, TotalTimeTag[i]);
        TotalTime.push(text4);
    }

    //Extracting "Number Of Stops" Information
    let NumberOfStopsTag=await tab.$$(".makeFlex.spaceBtwCenter.textCenter.fontSize12 div:nth-child(2) div");
    let NumberOfStops=[];
    for(let i=0;i<NumberOfStopsTag.length;i++)
    {
        let text5=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, NumberOfStopsTag[i]);
        NumberOfStops.push(text5);
    }

    //Extracting "Destination Time" Information
    let DestinationTimeTag=await tab.$$(".makeFlex.spaceBtwCenter.textCenter.fontSize12 div:nth-child(3) p:first-child");
    let DestinationTime=[];
    for(let i=0;i<DestinationTimeTag.length;i++)
    {
        let text6=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, DestinationTimeTag[i]);
        DestinationTime.push(text6);
    }

    //Extracting "Destination City" Information
    let DestinationCityTag=await tab.$$(".makeFlex.spaceBtwCenter.textCenter.fontSize12 div:nth-child(3) p:last-child");
    let DestinationCity=[];
    for(let i=0;i<DestinationCityTag.length;i++)
    {
        let text7=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, DestinationCityTag[i]);
        DestinationCity.push(text7);
    }

    //Extracting "Flight Ticket Price" Information
    let FlightTicketPriceTag=await tab.$$(".priceSection .blackText.fontSize18.blackFont");
    let FlightTicketPrice=[];
    for(let i=0;i<FlightTicketPriceTag.length;i++)
    {
        let text8=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, FlightTicketPriceTag[i]);
        FlightTicketPrice.push(text8);
    }
    
        let obj11={};
        obj11["Flight Name"]=FlightName[i];
        obj11["Source Time"]=SourceTime[i+i];
        obj11["Source City"]=SourceCity[i];
        obj11["Total Time"]=TotalTime[i+i+i];
        obj11["Number Of Stops"]=NumberOfStops[i+i];
        obj11["Destination Time"]=DestinationTime[i];
        obj11["Destination City"]=DestinationCity[i];
        obj11["Flight Ticket Price"]=FlightTicketPrice[i];
        obj[flightHeading].push(obj11);
    
    fs.writeFileSync("Flight_Ticket_Info_ONEWAY_Trip.json", JSON.stringify(obj));
}

async function trainTicketBooking(tab,browser)
{
    //Removing "Login or Create Account" Popup Box
    await tab.waitForSelector(".widgetLoader",{visible: true});
    await tab.waitForSelector(".fswTabs.latoBlack.greyText",{visible: true});
    await tab.click('li[data-cy="oneWayTrip');

    //Clicking on "Trains" Button
    await tab.click(".chNavIcon.appendBottom2.chSprite.chTrains");

    //Entering Source City
    await tab.waitForSelector('label[for="fromCity"]',{visible: true});
    await tab.click('label[for="fromCity"]');
    await tab.waitForSelector('label[for="fromCity"]',{visible: true});
    await tab.type(".react-autosuggest__input.react-autosuggest__input--open",sourceCity);
    await tab.waitForTimeout(2500);
    await tab.keyboard.press("ArrowDown");                                 
    await tab.keyboard.press("Enter");

    //Entering Destination City
    await tab.click('label[for="toCity"]');
    await tab.waitForSelector('label[for="toCity"]',{visible: true});
    await tab.type(".react-autosuggest__input.react-autosuggest__input--open",destinationCity);
    await tab.waitForTimeout(2500);
    await tab.keyboard.press("ArrowDown");                                 
    await tab.keyboard.press("Enter");

    //Entering Travel Date
    await tab.click('label[for="travelDate"]');
    await tab.click(departureDate);

    //Entering Travel Class
    await tab.waitForTimeout(1000);
    await tab.waitForSelector('label[for="travelFor"]',{visible: true});
    await tab.click('label[for="travelFor"]');
    await tab.waitForTimeout(500);
    await tab.click('label[for="travelFor"]');
    await tab.waitForSelector(".rsw_inputBox.travelFor.inactiveWidget.activeWidget .travelForPopup",{visible: true});
    if(travelClass_forTrains=="All Class")
    {
        await tab.click('li[data-cy="ALL"]');
    }
    else if(travelClass_forTrains=="Sleeper Class")
    {
        await tab.click('li[data-cy="SL"]');
    }
    else if(travelClass_forTrains=="Third AC")
    {
        await tab.click('li[data-cy="3A"]');
    }
    else if(travelClass_forTrains=="Second AC")
    {
        await tab.click('li[data-cy="2A"]');
    }
    else if(travelClass_forTrains=="First AC")
    {
        await tab.click('li[data-cy="1A"]');
    }
    else if(travelClass_forTrains=="Second Seating")
    {
        await tab.click('li[data-cy="2S"]');
    }
    else if(travelClass_forTrains=="AC Chair Car")
    {
        await tab.click('li[data-cy="CC"]');
    }
    else if(travelClass_forTrains=="First Class")
    {
        await tab.click('li[data-cy="FC"]');
    }
    else
    {
        await tab.click('li[data-cy="3E"]');
    }

    //Clicking on Search Button
    await tab.click(".primaryBtn.font24.latoBold.widgetSearchBtn");

    //Clicking on "Click to update" Buttons
    await tab.waitForSelector(".deepskyBlueText.font12",{visible: true});
    let updateTags=await tab.$$(".deepskyBlueText.font12");
    for(let i=0;i<updateTags.length;i++)
    {
        await updateTags[i].click();
    }

    //Getting Information
    await tab.waitForSelector(".trainList",{visible: true});
    trainHeading=sourceCity+" → "+destinationCity;

    obj[trainHeading]=[];

    let trainList=await tab.$$(".trainList");
    let len=trainList.length;

    for(let i=0;i<len;i++)
    {
        await trainInfo(tab,i,i);
    }
    screenshotName="Train_Ticket_Info.jpeg";
    await tab.waitForTimeout(4000);
    await captureScreenshot(tab,browser);
}

async function trainInfo(tab,i,i,len)
{
    //Extracting "Train Name" Information
    let TrainNameTag=await tab.$$(".font22.latoBlack.appendBottom10");
    let TrainName=[];
    for(let i=0;i<TrainNameTag.length;i++)
    {
        let text1=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, TrainNameTag[i]);
        TrainName.push(text1);
    }
    
    //Extracting "Train Number" Information
    let TrainNumberTag=await tab.$$(".makeFlex.end.appendBottom20 div:first-child p span:first-child");
    let TrainNumber=[];
    for(let i=0;i<TrainNumberTag.length;i++)
    {
        let text2=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, TrainNumberTag[i]);
        TrainNumber.push(text2);
    }

    //Extracting "Source Time" Information
    let SourceTimeTag=await tab.$$(".makeFlex.end.appendBottom20 div:nth-child(2) div:first-child p:first-child");
    let SourceTime=[];
    for(let i=0;i<SourceTimeTag.length;i++)
    {
        let text3=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, SourceTimeTag[i]);
        SourceTime.push(text3);
    }
    
    //Extracting "Source City" Information
    let SourceCityTag=await tab.$$(".makeFlex.end.appendBottom20 div:nth-child(2) div:first-child p:nth-child(2)");
    let SourceCity=[];
    for(let i=0;i<SourceCityTag.length;i++)
    {
        let text4=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, SourceCityTag[i]);
        SourceCity.push(text4);
    }

    //Extracting "Total Time" Information
    let TotalTimeTag=await tab.$$(".makeFlex.end.appendBottom20 div:nth-child(2) div:nth-child(3) p:first-child");
    let TotalTime=[];
    for(let i=0;i<TotalTimeTag.length;i++)
    {
        let text5=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, TotalTimeTag[i]);
        TotalTime.push(text5);
    }

    //Extracting "Destination Time" Information
    let DestinationTimeTag=await tab.$$(".makeFlex.end.appendBottom20 div:nth-child(2) div:nth-child(5) p:first-child");
    let DestinationTime=[];
    for(let i=0;i<DestinationTimeTag.length;i++)
    {
        let text6=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, DestinationTimeTag[i]);
        DestinationTime.push(text6);
    }

    //Extracting "Destination City" Information
    let DestinationCityTag=await tab.$$(".makeFlex.end.appendBottom20 div:nth-child(2) div:nth-child(5) p:nth-child(2)");
    let DestinationCity=[];
    for(let i=0;i<DestinationCityTag.length;i++)
    {
        let text7=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, DestinationCityTag[i]);
        DestinationCity.push(text7);
    }
    
        let obj11={};
        obj11["Train Name"]=TrainName[i];
        obj11["Train Number"]=TrainNumber[i+i+i];
        obj11["Source Time"]=SourceTime[i];
        obj11["Source Railway Station"]=SourceCity[i];
        obj11["Total Time"]=TotalTime[i];
        obj11["Destination Time"]=DestinationTime[i];
        obj11["Destination Railway Station"]=DestinationCity[i];
        obj[trainHeading].push(obj11);
    
    fs.writeFileSync("Train_Ticket_Info.json", JSON.stringify(obj));
}

async function busTicketBooking(tab,browser)
{
    //Removing "Login or Create Account" Popup Box
    await tab.waitForSelector(".widgetLoader",{visible: true});
    await tab.waitForSelector(".fswTabs.latoBlack.greyText",{visible: true});
    await tab.click('li[data-cy="oneWayTrip');

    //Clicking on "Buses" Button
    await tab.click(".chNavIcon.appendBottom2.chSprite.chBuses");

    //Entering Source City
    await tab.waitForSelector('label[for="fromCity"]',{visible: true});
    await tab.click('label[for="fromCity"]');
    await tab.waitForSelector('label[for="fromCity"]',{visible: true});
    await tab.type(".react-autosuggest__input.react-autosuggest__input--open",sourceCity);
    await tab.waitForTimeout(2500);
    await tab.keyboard.press("ArrowDown");                                 
    await tab.keyboard.press("Enter");

    //Entering Destination City
    await tab.click('label[for="toCity"]');
    await tab.waitForSelector('label[for="toCity"]',{visible: true});
    await tab.type(".react-autosuggest__input.react-autosuggest__input--open",destinationCity);
    await tab.waitForTimeout(2500);
    await tab.keyboard.press("ArrowDown");                                 
    await tab.keyboard.press("Enter");

    //Entering Travel Date
    await tab.click("#travelDate");
    await tab.click(departureDate);

    //Clicking on Search Button
    await tab.click(".primaryBtn.font24.latoBold.widgetSearchBtn");

    //Getting Information
    await tab.waitForSelector("#busList .bus-card",{visible: true});
    busHeading=sourceCity+" → "+destinationCity;

    obj[busHeading]=[];

    let busCards=await tab.$$("#busList .bus-card");
    let len=busCards.length;

    for(let i=0;i<len-9;i++)
    {
        await busInfo(tab,i,i);
    }
    screenshotName="Bus_Ticket_Info.jpeg";
    await tab.waitForTimeout(4000);
    await captureScreenshot(tab,browser);
}

async function busInfo(tab,i,i,len)
{
    //Extracting "Bus Name" Information
    let BusNameTag=await tab.$$(".latoBlack.font22.blackText.appendRight15");
    let BusName=[];
    for(let i=0;i<BusNameTag.length;i++)
    {
        let text1=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, BusNameTag[i]);
        BusName.push(text1);
    }

    //Extracting "Bus Type" Information
    let BusTypeTag=await tab.$$(".makeFlex.column.bus-view-left .makeFlex.column.appendBottom22 .makeFlex.hrtlCenter.font12.blackText span");
    let BusType=[];
    for(let i=0;i<BusTypeTag.length;i++)
    {
        let text2=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, BusTypeTag[i]);
        BusType.push(text2);
    }

    //Extracting "Seats Left" Information
    let SeatsLeftTag=await tab.$$(".makeFlex.column.bus-view-left .makeFlex.column.appendBottom22 .makeFlex.hrtlCenter.font12.blackText .sc-fjdhpX.fXgCif");
    let SeatsLeft=[];
    for(let i=0;i<SeatsLeftTag.length;i++)
    {  
        let text3=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, SeatsLeftTag[i]);
        SeatsLeft.push(text3);
    }

    //Extracting "Window Seats" Information
    let WindowSeatsTag=await tab.$$(".makeFlex.column.bus-view-left .makeFlex.column.appendBottom22 .makeFlex.hrtlCenter.font12.blackText ul:nth-child(2)");
    let WindowSeats=[];
    for(let i=0;i<WindowSeatsTag.length;i++)
    {
        let text4=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, WindowSeatsTag[i]);
        WindowSeats.push(text4);
    }

    //Extracting "Source Time" Information
    let SourceTimeTag=await tab.$$(".makeFlex.column.bus-view-left .makeFlex.row.hrtlCenter.appendBottom20 div:first-child");
    let SourceTime=[];
    for(let i=0;i<SourceTimeTag.length;i++)
    {
        let text5=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, SourceTimeTag[i]);
        SourceTime.push(text5);
    }

    //Extracting "Total Time" Information
    let TotalTimeTag=await tab.$$(".makeFlex.column.bus-view-left .makeFlex.row.hrtlCenter.appendBottom20 div:nth-child(3)");
    let TotalTime=[];
    for(let i=0;i<TotalTimeTag.length;i++)
    {
        let text6=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, TotalTimeTag[i]);
        TotalTime.push(text6);
    }

    //Extracting "Destination Time" Information
    let DestinationTimeTag=await tab.$$(".makeFlex.column.bus-view-left .makeFlex.row.hrtlCenter.appendBottom20 div:nth-child(5)");
    let DestinationTime=[];
    for(let i=0;i<DestinationTimeTag.length;i++)
    {
        let text7=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, DestinationTimeTag[i]);
        DestinationTime.push(text7);
    }

    //Extracting "Bus Ticket Price" Information
    let BusTicketPriceTag=await tab.$$(".price-section .makeFlex.column.end div:nth-child(2) #price");
    let BusTicketPrice=[];
    for(let i=0;i<BusTicketPriceTag.length;i++)
    {
        let text8=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, BusTicketPriceTag[i]);
        BusTicketPrice.push(text8);
    }
    
        let obj11={};
        obj11["Bus Name"]=BusName[i];
        obj11["Bus Type"]=BusType[i+i+i];
        obj11["Seats Left"]=SeatsLeft[i+i];
        obj11["Window Seats"]=SeatsLeft[i+i+1];
        obj11["Source Time"]=SourceTime[i];
        obj11["Total Time"]=TotalTime[i];
        obj11["Destination Time"]=DestinationTime[i];
        obj11["Bus Ticket Price"]=BusTicketPrice[i];
        obj[busHeading].push(obj11);
    
    fs.writeFileSync("Bus_Ticket_Info.json", JSON.stringify(obj));
}

async function hotelBooking(tab,browser)
{
    //Removing "Login or Create Account" Popup Box
    await tab.waitForSelector(".widgetLoader",{visible: true});
    await tab.waitForSelector(".fswTabs.latoBlack.greyText",{visible: true});
    await tab.click('li[data-cy="oneWayTrip');

    //Clicking on "Hotels" Button
    await tab.click(".chNavIcon.appendBottom2.chSprite.chHotels");

    //Entering City
    await tab.waitForSelector('label[for="city"]',{visible: true});
    await tab.click('label[for="city"]');
    await tab.waitForSelector('label[for="city"]',{visible: true});
    await tab.type(".react-autosuggest__input.react-autosuggest__input--open",destinationCity);
    await tab.waitForTimeout(2500);
    await tab.keyboard.press("ArrowDown");
    await tab.keyboard.press("Enter");

    //Selecting CHECK-IN Date
    await tab.click('label[for="checkin"]');
    await tab.click(departureDate);
                                                                         
    //Selecting CHECK-OUT Date
    await tab.click(returnDate);

    //Selecting Guests
    await tab.click('label[for="guest"]');
    
        //Clicking on Number of Adults
        await tab.click(Number_of_Adults);
        await tab.waitForTimeout(1000);
    
        //Clicking on Number of Children
        await tab.click(Number_of_Children);
        await tab.waitForTimeout(1000);

        //Selecting Children Age
        if(Number_of_Children=='li[data-cy="children-0"]')
        {
            return;
        }
        else if(Number_of_Children=='li[data-cy="children-1"]')
        {
            await tab.click('select[data-cy="childAge-0"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_0_Age);
            await tab.keyboard.press("Enter");
        }
        else if(Number_of_Children=='li[data-cy="children-2"]')
        {
            await tab.click('select[data-cy="childAge-0"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_0_Age);
            await tab.keyboard.press("Enter");

            await tab.click('select[data-cy="childAge-1"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_1_Age);
            await tab.keyboard.press("Enter");
        }
        else if(Number_of_Children=='li[data-cy="children-3"]')
        {
            await tab.click('select[data-cy="childAge-0"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_0_Age);
            await tab.keyboard.press("Enter");

            await tab.click('select[data-cy="childAge-1"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_1_Age);
            await tab.keyboard.press("Enter");

            await tab.click('select[data-cy="childAge-2"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_2_Age);
            await tab.keyboard.press("Enter");
        }
        else //Number_of_Children=='li[data-cy="children-4"]'
        {
            await tab.click('select[data-cy="childAge-0"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_0_Age);
            await tab.keyboard.press("Enter");

            await tab.click('select[data-cy="childAge-1"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_1_Age);
            await tab.keyboard.press("Enter");

            await tab.click('select[data-cy="childAge-2"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_2_Age);
            await tab.keyboard.press("Enter");

            await tab.click('select[data-cy="childAge-3"]');
            await tab.waitForTimeout(1000);
            await tab.keyboard.press(Child_3_Age);
            await tab.keyboard.press("Enter");
        }
    
    //Clicking on "APPLY" Button
    await tab.click(".primaryBtn.btnApply");

    //Selecting "TRAVELLING FOR"
    await tab.click('label[for="travelFor"]');
    if(travelFor=="Work")
    {
        await tab.click('li[data-cy="travelFor-Work"]');
    }
    else
    {
        await tab.click('li[data-cy="travelFor-Leisure"]');
    }

    //Clicking on "Search" Button
    await tab.click(".primaryBtn.font24.latoBold.widgetSearchBtn");

    //Getting Information
    try {
        await tab.waitForSelector(".makeFlex.flexOne.padding20.relative.lftCol");
        } catch (error) {
        console.log("Webpage Maintenance in Progress. Please Try Again after 5 minutes.")
      }

    hotelHeading="Hotels in "+destinationCity;

    obj[hotelHeading]=[];

    let hotelCards=await tab.$$(".makeFlex.flexOne.padding20.relative.lftCol");
    let len=hotelCards.length;

    for(let i=0;i<len;i++)
    {
        await hotelBookingInfo(tab,i,i);
    }
    screenshotName="Hotel_Booking_Info.jpeg";
    await tab.waitForTimeout(8000);
    await captureScreenshot(tab,browser);
}

async function hotelBookingInfo(tab,i,i,len)
{
    //Extracting "Hotel Name" Information
    let HotelNameTag=await tab.$$(".latoBlack.font22.blackText.appendBottom12");
    let HotelName=[];
    for(let i=0;i<HotelNameTag.length;i++)   
    {
        let text1=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, HotelNameTag[i]);
        HotelName.push(text1);
    }

    //Extracting "Hotel Address" Information
    let HotelAddressTag=await tab.$$(".tile__placeHolder.font12.font12.latoBold.appendBottom5.grayText.pc__middle");
    let HotelAddress=[];
    for(let i=0;i<HotelAddressTag.length;i++)  
    {
        let text2=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, HotelAddressTag[i]);
        HotelAddress.push(text2);
    }

    //Extracting "Hotel Ratings" Information
    let HotelRatingsTag=await tab.$$("#hlistpg_hotel_user_rating");
    let HotelRatings=[];
    for(let i=0;i<HotelRatingsTag.length;i++)  
    {  
        let text3=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, HotelRatingsTag[i]);
        HotelRatings.push(text3);
    }

    //Extracting "Hotel Price" Information
    let HotelPriceTag=await tab.$$(".latoBlack.font26.blackText.appendBottom5");
    let HotelPrice=[];
    for(let i=0;i<HotelPriceTag.length;i++)   
    {
        let text5=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, HotelPriceTag[i]);
        HotelPrice.push(text5);
    }
    
        let obj11={};
        obj11["Hotel Name"]=HotelName[i];
        obj11["Hotel Address"]=HotelAddress[i];
        obj11["Hotel Ratings"]=HotelRatings[i];
        obj11["Price"]=HotelPrice[i];
        obj[hotelHeading].push(obj11);
    
    fs.writeFileSync("Hotel_Booking_Info.json", JSON.stringify(obj));
}

async function holidayPackageBooking(tab,browser)
{
    //Removing "Login or Create Account" Popup Box
    await tab.waitForSelector(".widgetLoader",{visible: true});
    await tab.waitForSelector(".fswTabs.latoBlack.greyText",{visible: true});
    await tab.click('li[data-cy="oneWayTrip');

    //Clicking on "Holidays" Button
    await tab.click(".chNavIcon.appendBottom2.chSprite.chHolidays");

    //Entering Source City
    await tab.waitForSelector('label[for="fromCity"]',{visible: true});
    await tab.click('label[for="fromCity"]');
    await tab.waitForSelector('label[for="fromCity"]',{visible: true});
    await tab.type(".react-autosuggest__input.react-autosuggest__input--open",sourceCity);
    await tab.waitForTimeout(2500);
    await tab.keyboard.press("ArrowDown");                                 
    await tab.keyboard.press("Enter");

    //Entering Destination City
    await tab.type(".react-autosuggest__input.react-autosuggest__input--open",destinationCity);
    await tab.waitForTimeout(2500);
    await tab.keyboard.press("ArrowDown");
    await tab.keyboard.press("Enter");

    //Clicking on Search Button
    await tab.click(".primaryBtn.font24.latoBold.widgetSearchBtn");

    //Getting Information
    try {
        await tab.waitForSelector(".HolidayCard.commonSlider .slick-slide.slick-active");
        } catch (error) {
        console.log("Webpage Maintenance in Progress. Please Try Again after 5 minutes.")
      }
    
        holidayPackageHeading=sourceCity+" → "+destinationCity+" Holiday Packages";

        obj[holidayPackageHeading]=[];

        let holidayCards=await tab.$$(".HolidayCard.commonSlider .slick-slide.slick-active");
        let len=holidayCards.length;

        for(let i=0;i<len;i++)
        {
            await holidayPackagesInfo(tab,i,i);
        }
        screenshotName="Holiday_Packages_Info.jpeg";
        await tab.waitForTimeout(4000);
        await captureScreenshot(tab,browser);
}

async function holidayPackagesInfo(tab,i,i,len)
{
    //Extracting "Holiday Package Name" Information
    let HolidayPackageNameTag=await tab.$$(".font18.blackText.latoBlack.appendBottom3.ellipsis.width270.lineHeight20.tooltip");
    let HolidayPackageName=[];
    for(let i=0;i<HolidayPackageNameTag.length;i++)
    {
        let text1=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, HolidayPackageNameTag[i]);
        HolidayPackageName.push(text1);
    }

    //Extracting "Holiday Package Duration" Information
    let HolidayPackageDurationTag=await tab.$$(".itemDaysInfo");
    let HolidayPackageDuration=[];
    for(let i=0;i<HolidayPackageDurationTag.length;i++)
    {
        let text2=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, HolidayPackageDurationTag[i]);
        HolidayPackageDuration.push(text2);
    }

    //Extracting "Holiday Package Destination" Information
    let HolidayPackageDestinationTag=await tab.$$(".packageDaySubSection.firstTag");
    let HolidayPackageDestination=[];
    for(let i=0;i<HolidayPackageDestinationTag.length;i++)
    {  
        let text3=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, HolidayPackageDestinationTag[i]);
        HolidayPackageDestination.push(text3);
    }

    //Extracting "Holiday Package Attractions" Information
    let HolidayPackageAttractionsTag=await tab.$$(".itineraryList");
    let HolidayPackageAttractions=[];
    for(let i=0;i<HolidayPackageAttractionsTag.length;i++)
    {
        let text4=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, HolidayPackageAttractionsTag[i]);
        HolidayPackageAttractions.push(text4);
    }

    //Extracting "Holiday Package Price" Information
    let HolidayPackagePriceTag=await tab.$$(".latoBlack.font16");
    let HolidayPackagePrice=[];
    for(let i=0;i<HolidayPackagePriceTag.length;i++)
    {
        let text5=await tab.evaluate(function(ele) {
            return ele.textContent;
        }, HolidayPackagePriceTag[i]);
        HolidayPackagePrice.push(text5);
    }
    
        let obj11={};
        obj11["Holiday Package Name"]=HolidayPackageName[i];
        obj11["Holiday Package Duration"]=HolidayPackageDuration[i];
        obj11["Holiday Package Number of Nights, City"]=HolidayPackageDestination[i];
        obj11["Holiday Package Attractions"]=HolidayPackageAttractions[i];
        obj11["Holiday Package Price"]=HolidayPackagePrice[i];
        obj[holidayPackageHeading].push(obj11);
    
    fs.writeFileSync("Holiday_Packages_Info.json", JSON.stringify(obj));
}

async function Tourist_Places_to_visit_in_India(tab,browser)
{
    const tab1 = await browser.newPage();          // open new tab1
    await tab1.goto("https://www.tourplan2india.com/state-wise-popular-tourist-places-in-india/");
    screenshotName="Tourist_Places_to_visit_in_India(State wise)_Info.jpeg";
    await tab.waitForTimeout(6000);
    await captureScreenshot(tab1,browser);
}

async function captureScreenshot(tab,browser) 
{
  // If Screenshots Directory does not exist then create one.
  if (!fs.existsSync("screenshots")) 
  {
    fs.mkdirSync("screenshots");
  }

  try {
    // Capture Screenshot and store it into screenshots Directory.
    await tab.screenshot({ 
        fullPage: true,
        path: "screenshots/"+screenshotName });  
  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log("\nScreenshot Captured.");
  }
}

main();