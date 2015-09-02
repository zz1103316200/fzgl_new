$(document).ready(function() {
			
			pageSetUp();
			//alert($('#sa1').attr('data-slider-value'));

			/*
			 * KNOB
			 */
		
		    $('.knob').knob({
		        change: function (value) {
		            //console.log("change : " + value);
		        },
		        release: function (value) {
		            //console.log(this.$.attr('value'));
		            //console.log("release : " + value);
		        },
		        cancel: function () {
		            //console.log("cancel : ", this);
		        }
		    });
		});
function sendValue(){
	//alert("sss");
	$.post("./newServlet/yxjk_3_7_cspz_Servlet",{sampleTime:$('#sa1').attr('data-slider-value'),responseTime:$('#sa2').attr('data-slider-value'),concurrentNum:$('#sa3').attr('data-slider-value'),cpuValue:$('#ra1').val(),ramValue:$('#ra2').val(),hddValue:$('#ra3').val(),},function(text){
				
		
   }
   );
}