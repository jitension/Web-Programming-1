
exports.createMetrics=function(text){ 
        return new Promise(function(fulfill, reject)
        { 
            if (!text)
            {
			reject("Enter The Valid Text");
		
		    }


      var list=text.replace(/[^\w\s]|_/g,"").replace(";","").replace(/\s+/g,"|").split("|")
      list = list.filter(String);

     //total number of letters in the text 
      let totalletters=0;
      for(let i =0;i<list.length;i++)
      {
          let letters =list[i];
           for(let j=0;j<letters.length;j++)
           {
               if(isletter(letters[j]))
               {
                   totalletters=totalletters+1;
               }
           }
      }

      function isletter(s)
     {
       return /^[a-zA-Z]+$/.test(s);
     }
 
            var allwords=list.length;

// total number of unique words that appear in the text.
     var uniqueWords= new Set();
     for(let i=0;i<list.length;i++)
      {
          uniqueWords.add(list[i].toLowerCase());

      }

//number of words in the text that are 6 or more letters long.
   var longestWord = 0;
   for( i = 0; i < list.length; i++)
              {
    if(list[i].length >= 6)
	longestWord+=1; 
                } 
//----------------------------------------------------------------------------------------------------------------

 //the average number of letters in a word in the text    
           var wordAvg = 0;
           var avgLen = (totalletters / list.length).toFixed(2);
 //----------------------------------------------------------------------------------------------------------------

// calculation Of text complexity    
    var sentence=text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    var textComplexity= (allwords/sentence.length + (longestWord * 100)/allwords).toFixed(2);
  
  // Calculate the wordOccurrences
     wordOccurrences={};
    for(let i=0;i<list.length;i++)
    {
        value=list[i].toLowerCase();
        if(wordOccurrences[value]==undefined) 
        {
            wordOccurrences[value]=1
        }
        else wordOccurrences[value]+=1;
     } 
   

  fulfill({totalLetters:totalletters, totalWords:allwords, 
      uniqueWords:uniqueWords.size, longWords:longestWord ,
      averageWordLength:avgLen,textComplexity:textComplexity,wordOccurrences:wordOccurrences
    });
    });
}





