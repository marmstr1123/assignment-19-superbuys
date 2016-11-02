
var categoryListings = [
   {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
   {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
   {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
]
//var booksContainer = document.querySelector('.books-container')

var BooksNstuffMOD = Backbone.Model.extend({

})

var booksColl = Backbone.Collection.extend({
   model: BooksNstuffMOD,
   parse: function(rawJSONres){
      console.log(rawJSONres.items)
      return rawJSONres.items
   },

   url: '',

   initialize: function(bookCat){
      console.log(bookCat)
      this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + bookCat
   }
})

// var thisCollectionOfBooks = new booksColl()
// console.log(thisCollectionOfBooks)
// thisCollectionOfBooks.fetch().then(function(var1){
//})

var AppRouter = Backbone.Router.extend({
   routes: {
      //"books/:category/:specificCat" : "showSubcategory",
      "books/:genCat": "showGeneralCategory", //wtf man!!! cant seem to get it working...
      "" : "showHome"
   },

   showHome: function(){
      console.log("routingHome")


      var homePageInstance = categoryListings

      var listProfiles = new ViewTemplateConstructor('.content-area', homePageTemplateFn)
      listProfiles.render(homePageInstance);


   },

   showGeneralCategory: function(clickedCat){
      console.log(clickedCat)
      var generalPageInstancs  = new booksColl(clickedCat)
      console.log(clickedCat)
      generalPageInstancs .fetch().then(function(){
         var booksProfile = new ViewTemplateConstructor('.content-area', booksTemplateFn )
         booksProfile.render(generalPageInstancs);
      })



   },

   showSubcategory: function(generalCat, subCat){
      var booksSectionView = new ViewTemplateConstructor('.content-area', booksTemplateFn)
      fetchAndRender(subCat, booksSectionView, subCat)
   },


   initialize: function(){
      //console.log('backbone ROUTING')
      Backbone.history.start()
   }


})

var app = new AppRouter()
