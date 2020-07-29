
var counter = document.getElementById('counter').innerHTML;

var clicked1 = false;
$("#product1 .checkall").on("click", function () {
   $("#product1 .checkhour").prop("checked", !clicked1);
   clicked1 = !clicked1;
   this.innerHTML = clicked1 ? 'Remove From Cart' : 'Add To Cart';
   if (clicked1 === true) {
      counter++;
   }
   if (clicked1 === false) {
      counter--;
   }
   document.getElementById('counter').innerHTML = counter;

});

var clicked2 = false;
$("#product2 .checkall").on("click", function () {
   $("#product2 .checkhour").prop("checked", !clicked2);
   clicked2 = !clicked2;
   this.innerHTML = clicked2 ? 'Remove From Cart' : 'Add To Cart';
   if (clicked2 === true) {
      counter++;
   }
   if (clicked2 === false) {
      counter--;
   }
   document.getElementById('counter').innerHTML = counter;

});

var clicked3 = false;
$("#product3 .checkall").on("click", function () {
   $("#product3 .checkhour").prop("checked", !clicked3);
   clicked3 = !clicked3;
   this.innerHTML = clicked3 ? 'Remove From Cart' : 'Add To Cart';
   if (clicked3 === true) {
      counter++;
   }
   if (clicked3 === false) {
      counter--;
   }
   document.getElementById('counter').innerHTML = counter;

});

var clicked4 = false;
$("#product4 .checkall").on("click", function () {
   $("#product4 .checkhour").prop("checked", !clicked4);
   clicked4 = !clicked4;
   this.innerHTML = clicked4 ? 'Remove From Cart' : 'Add To Cart';
   if (clicked4 === true) {
      counter++;
   }
   if (clicked4 === false) {
      counter--;
   }
   document.getElementById('counter').innerHTML = counter;

});

var clicked5 = false;
$("#product5 .checkall").on("click", function () {
   $("#product5 .checkhour").prop("checked", !clicked5);
   clicked5 = !clicked5;
   this.innerHTML = clicked5 ? 'Remove From Cart' : 'Add To Cart';
   if (clicked5 === true) {
      counter++;
   }
   if (clicked5 === false) {
      counter--;
   }
   document.getElementById('counter').innerHTML = counter;

});

var clicked6 = false;
$("#product6 .checkall").on("click", function () {
   $("#product6 .checkhour").prop("checked", !clicked6);
   clicked6 = !clicked6;
   this.innerHTML = clicked6 ? 'Remove From Cart' : 'Add To Cart';
   if (clicked6 === true) {
      counter++;
   }
   if (clicked6 === false) {
      counter--;
   }
   document.getElementById('counter').innerHTML = counter;

});

var clicked7 = false;
$("#product7 .checkall").on("click", function () {
   $("#product7 .checkhour").prop("checked", !clicked7);
   clicked7 = !clicked7;
   this.innerHTML = clicked7 ? 'Remove From Cart' : 'Add To Cart';
   if (clicked7 === true) {
      counter++;
   }
   if (clicked7 === false) {
      counter--;
   }
   document.getElementById('counter').innerHTML = counter;

});

var clicked8 = false;
$("#product8 .checkall").on("click", function () {
   $("#product8 .checkhour").prop("checked", !clicked8);
   clicked8 = !clicked8;
   this.innerHTML = clicked8 ? 'Remove From Cart' : 'Add To Cart';
   if (clicked8 === true) {
      counter++;
   }
   if (clicked8 === false) {
      counter--;
   }
   document.getElementById('counter').innerHTML = counter;

});

$('.checkout').click(function () {
   alert(cartProducts)
})

$('.product1 .add').click(function () {
   var name = $('.product' + i).text();
   alert(name);
})
