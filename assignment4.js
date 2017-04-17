// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');
})();

var interests;
var programming;
var comics;
var full_array = [];

function getData()
{
  var int_req = new XMLHttpRequest();
  int_req.open("GET", "http://www.mattbowytz.com/simple_api.json?data=interests", false);
  int_req.send();

  var prog_req = new XMLHttpRequest();
  prog_req.open("GET", "http://www.mattbowytz.com/simple_api.json?data=programming", false);
  prog_req.send();

  var com_req = new XMLHttpRequest();
  com_req.open("GET", "http://www.mattbowytz.com/simple_api.json?data=comics", false);
  com_req.send();

  var int_resp = int_req.response;
  interests = int_resp.split(",");

  var prog_resp = prog_req.response;
  programming = prog_resp.split(",");

  var com_resp = com_req.response;
  comics = com_resp.split(",");


  format(interests);
  format(programming);
  format(comics);

  interests = rmQuote(interests);
  programming = rmQuote(programming);
  comics = rmQuote(comics);
  interests = rmQuote2(interests);
  programming = rmQuote2(programming);
  comics = rmQuote2(comics);
  full_array = full_array.concat((interests));
  full_array = full_array.concat((programming));
  full_array = full_array.concat((comics));


}
function searchData()
{
    var out_array = [];
    var in_val = document.getElementById("my_input").value;

    if(in_val == "")
    {
      document.getElementById("output").innerHTML = " ";
    }

    for (i = 0; i < full_array.length; i++)
    {
        var my_string = full_array[i];
        for(j = (in_val.length -1); j >= 0; j-- )
        {

            if (my_string[j].toUpperCase() == in_val[j].toUpperCase() )
            {
              if(j == 0)
              {
                out_array.push(my_string);
                document.getElementById("output").innerHTML = out_array;
              }
            }

            else
            {
              break;
            }
        }
    }
}

function format(inputArray)
{
  for (i = 0; i < inputArray.length; i++)
  {
    if(inputArray[i].includes(']'))
    {
      var in_ar = inputArray[i].split(']');
      inputArray[i] = in_ar[0];
    }

    if(inputArray[i].includes('['))
    {
      var in_ar = inputArray[i].split('[');
      inputArray[i] = in_ar[0];
    }
  }
  //get rid of first 3 and last 2 data
  inputArray.shift();
  inputArray.shift();
  inputArray.shift();
  inputArray.pop();
  inputArray.pop();
}

function rmQuote(inputArray)
{

  for (i = 0; i < inputArray.length; i++)
  {
    var str = inputArray[i];
    if(str[0] == '"' || str[0] == ' ')
    {
      var str2 = str.slice(1);
      inputArray[i] = str2;
    }
  }
  return inputArray;
}

function rmQuote2(inputArray)
{
  for (i = 0; i < inputArray.length; i++)
  {
    var str = inputArray[i];
    if(str[str.length-1] == '"')
    {
      inputArray[i]  = str.slice(0, -1);
    }
  }
  return inputArray;
}
