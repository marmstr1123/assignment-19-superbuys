
var ViewTemplateConstructor = function(domElSelector , htmlTemplFunction){
   this.domEl = domElSelector

   this.buildHTMLTemplate = htmlTemplFunction

   this.render = function(data){

      var tgtEl = document.querySelector(this.domEl)
      tgtEl.innerHTML = this.buildHTMLTemplate(data)
   }
}

var homePageTemplateFn = function(categorieslistings){
   console.log(categoryListings)
   var bigStr = categoryListings.map(function(categoryObj){
      console.log(categoryObj.catName)
      console.log(categoryObj.subcatList)
      let smallArr = categoryObj.subcatList
      return `
      <div class="col-xs-12 col-sm-4">
         <div class="bookNamesLists">
            <a href="#/books/${categoryObj.catName}"><h1>${categoryObj.catName}</h1><a>
            <ul>
               ${smallArr.map(function(cats){return`<a href="#/books/${cats}"><li>${cats}</li></a>`}).join('')}
            </ul>
         </div>
      </div>

      `
   }).join('')
   console.log(bigStr)

   return bigStr
}

var booksTemplateFn = function(homeCollData){
   console.log(homeCollData)
   let bigStr =`<h1> this stuff </h1>`
      bigStr+= homeCollData.models.map(function(booksObj){
      console.log(booksObj)
      let whatINeed = booksObj.get('volumeInfo') ///fuck yes transfer below

      return `
         <div class="col-xs-12 col-sm-4">
            <div class="bookNamesLists">
               <img src="${booksObj.get('volumeInfo').imageLinks.thumbnail}">
               <h1> ${booksObj.get('volumeInfo').title}</h1>
            </div>
         </div>

      `
   }).join('')
   console.log(bigStr)

   return bigStr
}
