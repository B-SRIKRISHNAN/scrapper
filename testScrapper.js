const chromedriver = require('chromedriver');
const webdriver = require('selenium-webdriver');
const cmdInput = require('readline');
const { stdin, stdout } = require('process');
const { Options } = require('selenium-webdriver/chrome');
const { PageLoadStrategy } = require('selenium-webdriver/lib/capabilities');
const { addConsoleHandler } = require('selenium-webdriver/lib/logging');
const { readFile, readFileSync } = require('fs');
const Iconv = require('iconv').Iconv
const values = cmdInput.createInterface({
    input: process.stdin,
    output: process.stdout
})
let groupId;
let artifactId;
let dependencyInputs = [];
let url = "https://start.spring.io";

let callAgain = async ()=>values.question("Enter dependency (Press enter to stop adding): ", async (deps) => {
    if (deps == "") {
        // choice = "";
        
        await accessWeb(dependencyInputs, groupId, artifactId);
        values.close();
       
        // values.close();
    }
    dependencyInputs.push(deps.trim());
    await callAgain();
    // values.close()
})


let getFromFile = ()=>{
    //  let data = new Iconv("UTF-16","UTF-8").convert(
    //     readFileSync(
    //         "projectConfig.txt")).toString("utf-8")
    // OneDrive\\Desktop\\BSK\\Project to fill my song and podcast db\\scrapper\\
    readFile("projectConfig.txt","UTF-8",
     (err,data)=>{
        console.log(err);
        let stringFromFile = data
        console.log(stringFromFile);
        let strings  = data.split("\n");
        for(let string of strings)
        {
        console.log(string);
        if(string.includes("groupId: "))
        {
            console.log("yes");
        let index = string.indexOf("groupId: ")
           groupId =  string.substring(index + 9)
        }
        if(string.includes("artifactId: "))
        {
            let index = string.indexOf("artifactId: ")
            artifactId = string.substring(index + 12)
        }
 
    }
    console.log(groupId);
    console.log(artifactId);
    callAgain();
    })
   
}
getFromFile();

let accessWeb = async (dep1, groupName, artifactName) => {
    
    let browser = await new webdriver.Builder().setChromeOptions(new Options().addArguments("--headless","--window-size=1920,1080").setUserPreferences({"download.default_directory":"C:\\users\\bsk19\\downloads"})).forBrowser('chrome').build();
    await browser.get(url);
    let generateProject = await browser.findElement(webdriver.By.css("#generate-project"))
    let groupNAme = await browser.findElement(webdriver.By.css('#input-group'))
    await groupNAme.clear()
    await groupNAme.sendKeys(groupName);

    let artifact = await browser.findElement(webdriver.By.css('#input-artifact'))
    await artifact.clear();
    await artifact.sendKeys(artifactName);


    
    // let class_name = await allDeps[0].getAttribute('class');
   
    let exploreDeps = await browser.findElement(webdriver.By.css('#explore-dependencies'));
    await exploreDeps.click()
    let allDeps = await browser.findElements(webdriver.By.css("li"));
    allDeps.forEach(async (element) => {
        try {
    //         if(dep1.length>0)
    // {
            let text = await element.findElement(webdriver.By.css('strong')).getText();
           
                for (let dep of dep1) {
                if (text == dep) {
                    console.log(text);
                    await element.click();
                }
            }
        
        } catch (e) {
            console.log("Not found"); 
        }

    })

    setTimeout(async () => {

        try{
    await generateProject.click()}catch(e){console.log(e);}
    //   .then(async res=>{
    //     await browser.quit();
    //   })

        setTimeout(async () => { 
            await browser.quit();

        console.log("closed session");
        process.exit(0);
    
     }, 2000);

    }, 5000);


};
// values.question("Enter group id: ",  (answer) => {
//     values.question("enter artifact id: ", async answer2 => {
//         // groupId = answer;
//         // artifactId = answer2;
//         // let choice = "y"
      

        // values.close();

//     })
   
    

// })
// values.on("close",()=>{
//     console.log("Bye bye");
// process.exit(0);
// })



// let whatInAWebPage =  ()=>  axios.get(url);
// whatInAWebPage().then(data=>{
//     // console.log(data.data);
//     let $ = cheerio.load(data.data);
//     let input = $('#search');
//     console.log(input.children());
//     // $('#search').each(function (I,e){
//     //     let links =
//     //     console.log(links)});
// })
// .catch(error=>console.error(error));

