// scripts.js

var MAX = 10;

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
	caption_input = $( "#caption-input" ).val();
	major_input = $( "#major-input" ).val();
	ID = parseInt($( "#cartoon_image" ).attr('data-name'));

	// if both fields are complete!
	if (caption_input && major_input){
		console.log("Picture: " + ID + " Caption: " + caption_input + " Major: " + major_input);

		// make the ajax call
		$.ajax({
            url: '/createCaption',
            data: { caption: caption_input, major: major_input, picID: ID},
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
	if (!caption_input){
		$( "#caption-input" ).addClass("incomplete");
	}
	// if major field is empty
	if (!major_input){
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


// welcome the user and make them aware of the study
alert("Welcome!\n" + 
	"Please create a unique funny caption, enter your college major and submit!\n" +
	"Thank you for your participation in this psychological research study")
