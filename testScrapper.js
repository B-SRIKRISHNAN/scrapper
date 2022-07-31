const chromedriver = require('chromedriver');
const webdriver = require('selenium-webdriver');
const cmdInput = require('readline');
const { stdin, stdout } = require('process');
const values = cmdInput.createInterface({
    input: process.stdin,
    output: process.stdout
})
let groupId;
let artifactId;
let dependencyInputs = [];
let url = "https://start.spring.io";
let accessWeb = async (dep1, groupName, artifactName) => {
    let browser = await new webdriver.Builder().forBrowser('chrome').build();
    let site = await browser.get(url);
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
                    element.click();
                }
            }
        
        } catch (e) {
            console.log("Not found"); 
        }

    })

    setTimeout(async () => {

    await generateProject.click()
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
values.question("Enter group id: ",  (answer) => {
    values.question("enter artifact id: ", async answer2 => {
        groupId = answer;
        artifactId = answer2;
        // let choice = "y"
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
       await callAgain();


        // values.close();

    })
   
    

})
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

