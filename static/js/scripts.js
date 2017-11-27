// scripts.js

var MAX = 4;

// reset the input fields to be blank
function reset (){
	$( "#caption-input" ).removeClass("incomplete");
	$( "#major-input" ).removeClass("incomplete");
	$( "#caption-input" ).val("");
	$( "#major-input" ).val("");
}

// randomly select a new picture
function newPic(){
	// get a new picture to display!
	pic_num = Math.floor(Math.random() * MAX);
	src = "/static/images/Cartoon" + pic_num + ".jpg"
	$('#cartoon_image').attr('src', src);
	$('#cartoon_image').attr('data-name', pic_num);

}

// random picture on page load and refresh
newPic();

// the submit button has been clicked!
$( "#submit_button" ).click(function() {
	cap = $( "#caption-input" ).val();
	maj = $( "#major-input" ).val();
	ID = parseInt($( "#cartoon_image" ).attr('data-name'));

	// if both fields are complete!
	if (cap && maj){
		alert("Thank you for submitting your response!");
		console.log("Caption: " + cap + " Major: " + maj);

		// make the ajax call
		$.ajax({
            url: '/createCaption',
            data: { caption: cap, major: maj, picID: ID},
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });

		// get ready for next submission
		reset();
		newPic();
	}

	// if caption field is empty
	if (!cap){
		$( "#caption-input" ).addClass("incomplete");
	}
	// if major field is empty
	if (!maj){
		$( "#major-input" ).addClass("incomplete");
	}
});


// the skip button has been clicked!
$( "#skip_button" ).click(function() {

	// reset input fields
	reset();

	// get a new picture to display!
	newPic();
});


alert("Welcome!\n" + 
	"Please create a unique funny caption, enter your college major and submit!\n" +
	"Thank you for your participation in this psychological research study")
