const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate')

////Read data from file
///Template
const tempCourse = fs.readFileSync(
    '${__dirname}/data.json',
    'utf-8'
    );
    

 //   const dataObj = JSON.parse(tempCourse);//string to JavaScript Object JSON


 const templateHTMLCourse = fs.readFileSync(
    '${__dirname}/template/templateCourse.html',
    'utf-8'
 );


 //module.exports = (htmlStr, course)=>{ //fat arrow or lambda
 //let output = htmlStr.replace(/{%NAME%}/g, course.courseName);
 //output = output.replace(/{%IMAGE%}/g, course.image);
 // output = output.replace(/{%FROM%}/g, course.from);
//output = output.replace(/{%INSTRUCTOR%}/g, course.instructor);
 //output = output.replace(/{%CREDITS%}/g, course.credit);
 //output = output.replace(/{%DESCRIPTION%}/g, course.description);
 //output = output.replace(/{%ID%}/g, course.id);
 // return output; 
//}
 ////////////////////
//Create Server
//const server = httpServer.createServer(function (req, res) {//call back function
const server = httpServer.createServer( (req, res) =>{//call back function

   // const urlParameter = url.parse(req.url, true);
  //  console.log(JSON.stringify(urlParameter.query));//convert to string
   // console.log(JSON.stringify(urlParameter.pathname));//convert to string
    const {query,pathname} = url.parse(req.url, true); //object destructors 
    if(urlParameter.query.id){// if there is query parameter named id read as string
    //Courses page
    if (pathname === '/' || pathname.toLowerCase() === '/courses') {
        res.writeHead(200, {//everything ran successfully
            'Content-type': 'text/html'
        });
        const course = dataObj[Number(query.id)];//convert string to numeric value
        const StrCourseName = JSON.stringify(course);
        const courseHTML = replaceTemplate(templateHTMLCourse, course);
//function that will replace values in the HTML
        // res.end('We received our first request from the client resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id} ${course} ${JASON.sringify(course)}')
    //convert object to string
    res.end(courseHTML);
    }
    else{
        res.writeHead(404, {//server did not find what you were looking for
            'Content-type': 'text/html'
        });
        res.end('resource not found')
    }
    }
});

//Start listening to requests
server.listen(8000, 'localhost', function(){
    console.log('Listening to requests on port 8000');
});